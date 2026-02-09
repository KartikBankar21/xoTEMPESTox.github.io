// LinkedIn Post Scraper
// Handles browser automation and data extraction from LinkedIn
// Selectors verified from diagnostic dump on 2026-02-10

import config from './config.js';

/**
 * Scrapes posts from LinkedIn activity feed
 * @param {import('puppeteer-core').Page} page - Puppeteer page instance
 * @returns {Promise<Array>} Array of raw post data
 */
export async function scrapePosts(page) {
    const posts = [];

    log('Navigating to LinkedIn activity page...');

    // Navigate with retry logic
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            await page.goto(config.linkedInActivityUrl, {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            });
            break;
        } catch (navErr) {
            log(`Navigation attempt ${attempt} failed: ${navErr.message}`);
            if (attempt === 3) throw navErr;
            await delay(3000);
        }
    }

    // Wait for page to settle and posts to render
    await delay(5000);
    log(`Current URL: ${page.url()}`);

    // Click "see more" on all posts to expand full text
    const seeMoreButtons = await page.$$('.feed-shared-inline-show-more-text__see-more-less-toggle');
    log(`Found ${seeMoreButtons.length} "see more" buttons, clicking them...`);
    for (const btn of seeMoreButtons) {
        try {
            await btn.click();
            await delay(300);
        } catch (e) { /* ignore */ }
    }

    // Use .feed-shared-update-v2 as the post selector
    const SELECTOR = '.feed-shared-update-v2';

    // Scroll and collect posts
    let previousPostCount = 0;
    let scrollAttempts = 0;

    while (scrollAttempts < 100) {
        const postElements = await page.$$(SELECTOR);

        if (config.maxPosts > 0 && postElements.length >= config.maxPosts) {
            log(`Reached max posts limit (${config.maxPosts})`);
            break;
        }

        if (postElements.length === previousPostCount) {
            scrollAttempts++;
            if (scrollAttempts >= 8) {
                log('No more posts to load');
                break;
            }
        } else {
            scrollAttempts = 0;
            previousPostCount = postElements.length;
        }

        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await delay(2500);

        // Click "Show more results" / "Show more" pagination button if present
        try {
            const showMoreBtn = await page.$('button.scaffold-finite-scroll__load-button');
            if (showMoreBtn) {
                log('  → Clicking "Show more results" button...');
                await showMoreBtn.click();
                await delay(3000);
                scrollAttempts = 0; // Reset since new content is loading
            }
        } catch (e) { /* ignore */ }

        // Click any new "see more" (expand text) buttons that appeared
        const newSeeMore = await page.$$('.feed-shared-inline-show-more-text__see-more-less-toggle');
        for (const btn of newSeeMore) {
            try { await btn.click(); await delay(200); } catch (e) { }
        }

        log(`Loaded ${postElements.length} posts...`);
    }

    // Now extract data from each post
    const postContainers = await page.$$(SELECTOR);
    const postsToProcess = config.maxPosts > 0
        ? postContainers.slice(0, config.maxPosts)
        : postContainers;

    log(`Processing ${postsToProcess.length} posts...`);

    for (let i = 0; i < postsToProcess.length; i++) {
        try {
            log(`Processing post ${i + 1}/${postsToProcess.length}`);
            const postData = await extractPostData(page, postsToProcess[i], i);
            if (postData) {
                posts.push(postData);
                log(`  ✓ "${postData.text?.substring(0, 50)}..." | likes:${postData.likes} comments:${postData.comments} views:${postData.views}`);
            }
        } catch (error) {
            console.error(`  ✗ Error on post ${i + 1}:`, error.message);
        }
    }

    return posts;
}

/**
 * Extracts data from a single post element
 * Uses selectors verified from LinkedIn DOM diagnostic (Feb 2026)
 */
async function extractPostData(page, post, index) {
    if (!post) return null;

    const data = await post.evaluate((el) => {
        // === POST TEXT ===
        const textEl = el.querySelector('.break-words.tvm-parent-container');
        const text = textEl ? textEl.innerText.trim() : '';

        // === AUTHOR AVATAR ===
        const avatarEl = el.querySelector('.update-components-actor__avatar-image');
        const avatar = avatarEl ? avatarEl.src : '';

        // === DATE ===
        // LinkedIn uses relative dates like "2w", "1mo", etc.
        // The visually-hidden version has full text like "2 weeks ago • Edited"
        const dateEl = el.querySelector('.update-components-actor__sub-description .visually-hidden');
        const dateText = dateEl ? dateEl.innerText.trim() : '';
        // Parse relative date to ISO
        const date = parseRelativeDate(dateText);

        // === LIKES (reactions count) ===
        // Try multiple selectors for reactions
        const likesSelectors = [
            '.social-details-social-counts__social-proof-fallback-number',
            '.social-details-social-counts__reactions-count',
            '.social-details-social-counts__item--reactions .social-details-social-counts__count-value',
            '.social-details-social-counts__social-proof-content'
        ];

        let likes = 0;
        for (const selector of likesSelectors) {
            const reactionEl = el.querySelector(selector);
            if (reactionEl) {
                const text = reactionEl.innerText.replace(/,/g, '').match(/\d+/);
                if (text) {
                    likes = parseInt(text[0]);
                    break;
                }
            }
        }

        // === COMMENTS ===
        let comments = 0;
        const commentSelectors = [
            '.social-details-social-counts__comments .social-details-social-counts__count-value',
            'button[aria-label*="comment"]',
            '.social-details-social-counts__item--comments'
        ];

        for (const selector of commentSelectors) {
            const itemEls = el.querySelectorAll(selector);
            for (const itemEl of itemEls) {
                const label = itemEl.getAttribute('aria-label') || itemEl.innerText || '';
                const match = label.match(/(\d+)\s*comments?/i);
                if (match) {
                    comments = Math.max(comments, parseInt(match[1]));
                }
            }
        }

        // === IMPRESSIONS (views) ===
        const viewsSelectors = [
            '.ca-entry-point__num-views',
            '.analytics-entry-point__num-views',
            '.social-details-social-counts__item--views'
        ];
        let views = 0;
        for (const selector of viewsSelectors) {
            const viewsEl = el.querySelector(selector);
            if (viewsEl) {
                const text = viewsEl.innerText.trim();
                const match = text.replace(/,/g, '').match(/\d+/);
                if (match) {
                    views = parseInt(match[0]);
                    break;
                }
            }
        }

        // === POST URN (CRITICAL for dedup) ===
        let urn = el.getAttribute('data-urn') || el.getAttribute('data-id') || '';

        // Fallback to analytics link if data-urn is missing
        if (!urn) {
            const analyticsLink = el.querySelector('a[href*="/analytics/post-summary/"]');
            if (analyticsLink) {
                const urnMatch = analyticsLink.href.match(/urn:li:activity:(\d+)/);
                if (urnMatch) urn = `urn:li:activity:${urnMatch[1]}`;
            }
        }

        // If still no URN, try finding any activity link
        if (!urn) {
            const activityLink = el.querySelector('a[href*="/feed/update/urn:li:activity:"]');
            if (activityLink) {
                const urnMatch = activityLink.href.match(/urn:li:activity:(\d+)/);
                if (urnMatch) urn = `urn:li:activity:${urnMatch[1]}`;
            }
        }

        let originalUrl = urn ? `https://www.linkedin.com/feed/update/${urn}/` : '';

        // === SHARES/REPOSTS ===
        let shares = 0;
        // Reposts don't always show a count; check for repost buttons
        const allBtns = el.querySelectorAll('button[aria-label]');
        for (const btn of allBtns) {
            const label = btn.getAttribute('aria-label') || '';
            const repostMatch = label.match(/(\d+)\s*reposts?/i);
            if (repostMatch) {
                shares = parseInt(repostMatch[1]);
                break;
            }
        }

        // === MEDIA (images) ===
        const imageElements = el.querySelectorAll('.update-components-image__image-link img, .feed-shared-celebration-image img');
        const media = Array.from(imageElements).map((img, idx) => ({
            type: 'image',
            url: img.src || img.getAttribute('data-delayed-url') || '',
            alt: img.alt || `Image ${idx + 1}`,
            width: img.naturalWidth || 800,
            height: img.naturalHeight || 800
        })).filter(m => m.url && !m.url.includes('profile-displayphoto') && !m.url.includes('profile-framedphoto'));

        // === HASHTAGS ===
        const hashtagLinks = el.querySelectorAll('a[href*="keywords=%23"]');
        const hashtags = Array.from(hashtagLinks).map(a => {
            const text = a.innerText.trim();
            // Format is "hashtag\n#TagName"
            const match = text.match(/#(\w+)/);
            return match ? match[1].toLowerCase() : null;
        }).filter(Boolean);

        return {
            text,
            avatar,
            date,
            dateText,
            likes,
            comments,
            views,
            shares,
            urn,
            originalUrl,
            media,
            hashtags
        };

        // Helper to parse relative dates
        function parseRelativeDate(text) {
            const now = new Date();
            if (!text) return now.toISOString();

            // "2 weeks ago", "1 month ago", "3 days ago", "5 hours ago"
            const match = text.match(/(\d+)\s*(second|minute|hour|day|week|month|year)s?\s*ago/i);
            if (!match) return now.toISOString();

            const num = parseInt(match[1]);
            const unit = match[2].toLowerCase();

            switch (unit) {
                case 'second': now.setSeconds(now.getSeconds() - num); break;
                case 'minute': now.setMinutes(now.getMinutes() - num); break;
                case 'hour': now.setHours(now.getHours() - num); break;
                case 'day': now.setDate(now.getDate() - num); break;
                case 'week': now.setDate(now.getDate() - num * 7); break;
                case 'month': now.setMonth(now.getMonth() - num); break;
                case 'year': now.setFullYear(now.getFullYear() - num); break;
            }
            return now.toISOString();
        }
    });

    return data;
}

// Helper functions
function log(message) {
    if (config.debug) {
        console.log(`[Scraper] ${message}`);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { log, delay };
