// LinkedIn Posts Scraper - Main Entry Point
// Supports three modes:
//   npm run scrape   → Phase 1 only: scrape raw data → raw_posts.json
//   npm run process  → Phase 2 only: process raw_posts.json → blogs_v2.json
//   npm run scrape-all → Both phases (scrape + process)

import puppeteer from 'puppeteer-core';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';
import config from './config.js';
import { scrapePosts, log, delay } from './scraper.js';
import { processPostWithLLM, isGeminiAvailable } from './llm.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAW_POSTS_PATH = resolve(__dirname, 'raw_posts.json');

// Parse CLI mode
const args = process.argv.slice(2);
const MODE = args.includes('--process-only') ? 'process'
    : args.includes('--scrape-only') ? 'scrape'
        : 'all';

async function main() {
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║           LinkedIn Posts Scraper v2.0                     ║');
    console.log('╚═══════════════════════════════════════════════════════════╝');

    if (MODE === 'scrape' || MODE === 'all') {
        await phaseScrape();
    }

    if (MODE === 'process' || MODE === 'all') {
        await phaseProcess();
    }
}

// ═══════════════════════════════════════════════
// PHASE 1: Scrape raw data from LinkedIn
// ═══════════════════════════════════════════════
async function phaseScrape() {
    console.log('\n⚠️  Make sure Chrome is CLOSED before running this script!\n');
    console.log('\n── Phase 1: Scraping LinkedIn ──────────────────────────────\n');

    let browser;
    try {
        log('Launching browser with Chrome profile...');
        browser = await puppeteer.launch({
            headless: false,
            channel: 'chrome',
            userDataDir: 'C:/Users/priya/AppData/Local/Google/Chrome/ScraperProfile',
            defaultViewport: null,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const pages = await browser.pages();
        const page = pages[0] || await browser.newPage();

        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        );

        log('Browser launched successfully');

        // Check login
        await page.goto('https://www.linkedin.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
        await delay(5000);

        const currentUrl = page.url();
        log(`Current URL: ${currentUrl}`);

        const isLoggedIn = !currentUrl.includes('/login') && !currentUrl.includes('/authwall');
        if (!isLoggedIn) {
            console.error('\n❌ Not logged into LinkedIn!');
            console.error('Run "npm run login" first to log in, then run scrape again.');
            await browser.close();
            process.exit(1);
        }
        log('Logged into LinkedIn ✓');

        // Scrape raw posts
        const rawPosts = await scrapePosts(page);
        log(`Scraped ${rawPosts.length} raw posts`);

        // Close browser
        await browser.close();
        browser = null;
        log('Browser closed');

        // Save raw posts
        writeFileSync(RAW_POSTS_PATH, JSON.stringify(rawPosts, null, 2), 'utf8');
        log(`Saved ${rawPosts.length} raw posts to raw_posts.json`);

        console.log('\n╔═══════════════════════════════════════════════════════════╗');
        console.log(`║  ✅ Phase 1 complete: ${rawPosts.length} posts scraped`);
        console.log(`║  📁 Raw data: raw_posts.json`);
        if (MODE === 'scrape') {
            console.log(`║  💡 Run "npm run process" to process through Gemini LLM`);
        }
        console.log('╚═══════════════════════════════════════════════════════════╝');

    } catch (error) {
        console.error('\n❌ Scrape error:', error.message);
        if (error.message.includes('Failed to launch')) {
            console.error('\n💡 Tips:');
            console.error('   1. Make sure Chrome is completely closed');
            console.error('   2. Try running as administrator');
        }
        throw error;
    } finally {
        if (browser) await browser.close();
    }
}

// ═══════════════════════════════════════════════
// PHASE 2: Process raw_posts.json → blogs_v2.json
// ═══════════════════════════════════════════════
async function phaseProcess() {
    console.log('\n── Phase 2: Processing & Merging ───────────────────────────\n');

    // Load raw posts
    if (!existsSync(RAW_POSTS_PATH)) {
        console.error('❌ raw_posts.json not found! Run "npm run scrape" first.');
        process.exit(1);
    }

    const rawPosts = JSON.parse(readFileSync(RAW_POSTS_PATH, 'utf8'));
    log(`Loaded ${rawPosts.length} raw posts from raw_posts.json`);

    // Load existing processed posts
    let existingPosts = [];
    if (existsSync(config.outputPath)) {
        try {
            const existing = readFileSync(config.outputPath, 'utf8');
            if (existing.trim()) {
                existingPosts = JSON.parse(existing);
                log(`Loaded ${existingPosts.length} existing processed posts`);
            }
        } catch (e) {
            log('Could not parse existing blogs_v2.json, starting fresh');
        }
    }

    // Build lookup of existing post IDs and collect all existing tags
    const existingById = new Map();
    const existingTagSet = new Set();
    for (const post of existingPosts) {
        existingById.set(post.id, post);
        if (post.tags) post.tags.forEach(t => existingTagSet.add(t));
    }
    const existingTags = [...existingTagSet].sort();
    log(`Existing tag vocabulary: ${existingTags.length} unique tags`);

    // Identify new vs existing posts
    const newPosts = [];
    const existingToUpdate = [];

    for (const raw of rawPosts) {
        const postId = raw.urn || `urn:li:share:${Date.now()}-${rawPosts.indexOf(raw)}`;
        if (existingById.has(postId)) {
            existingToUpdate.push({ raw, postId });
        } else {
            newPosts.push({ raw, postId });
        }
    }

    log(`New posts: ${newPosts.length}, Existing (metrics update only): ${existingToUpdate.length}`);

    // Check if Gemini is available for new posts
    const geminiAvailable = newPosts.length > 0 ? await isGeminiAvailable() : false;

    if (newPosts.length > 0 && !geminiAvailable) {
        log('⚠️  Gemini not available - new posts will use basic formatting');
    }

    // Process NEW posts (LLM or basic formatting)
    const processedNew = [];
    for (let i = 0; i < newPosts.length; i++) {
        const { raw, postId } = newPosts[i];
        log(`Processing new post ${i + 1}/${newPosts.length}: "${raw.text?.substring(0, 50)}..."`);

        let content;
        let tags;

        if (geminiAvailable) {
            log('  → Running through Gemini LLM...');
            const llmResult = await processPostWithLLM(raw, existingTags);
            if (llmResult) {
                content = {
                    raw: raw.text,
                    markdown: llmResult.markdown,
                    summary: llmResult.summary
                };
                tags = llmResult.tags;

                const formatted = buildPost(postId, llmResult.title, content, tags, raw);
                processedNew.push(formatted);
                log(`  ✓ LLM processed: "${llmResult.title}"`);

                // Small delay between LLM calls to avoid rate limits
                if (i < newPosts.length - 1) await delay(1000);
                continue;
            }
        }

        // Fallback: basic formatting
        const cleaned = cleanText(raw.text);
        const title = generateBasicTitle(cleaned);
        content = {
            raw: raw.text,
            markdown: cleaned,
            summary: cleaned.substring(0, 147) + '...'
        };
        tags = raw.hashtags || [];

        processedNew.push(buildPost(postId, title, content, tags, raw));
        log(`  ✓ Basic format: "${title}"`);
    }

    // Update EXISTING posts (metrics only)
    for (const { raw, postId } of existingToUpdate) {
        const existing = existingById.get(postId);
        existing.metrics = {
            likes: raw.likes || existing.metrics.likes,
            comments: raw.comments || existing.metrics.comments,
            views: raw.views || existing.metrics.views,
            shares: raw.shares || existing.metrics.shares
        };
        // Update media if scraped has more
        if (raw.media && raw.media.length > 0) {
            existing.media = raw.media.map((m, idx) => ({
                type: m.type || 'image',
                url: m.url,
                alt: m.alt || `Image ${idx + 1}`,
                width: m.width || 800,
                height: m.height || 800
            }));
        }
        // Update avatar
        if (raw.avatar) {
            existing.author.avatar = raw.avatar;
        }
        log(`  ↻ Updated metrics for: "${existing.title}"`);
    }

    // Merge: existing (updated) + new
    const allPosts = [...existingPosts, ...processedNew];

    // Deduplicate by ID
    const deduped = new Map();
    for (const post of allPosts) {
        deduped.set(post.id, post);
    }

    // Sort by date (newest first)
    const finalPosts = Array.from(deduped.values())
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    // Save
    writeFileSync(config.outputPath, JSON.stringify(finalPosts, null, 4), 'utf8');

    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log(`║  ✅ Successfully saved ${finalPosts.length} posts!`);
    console.log(`║  📁 Output: ${config.outputPath}`);
    console.log(`║  🆕 New: ${processedNew.length} | ↻ Updated: ${existingToUpdate.length}`);
    if (geminiAvailable && processedNew.length > 0) {
        console.log(`║  🤖 Gemini LLM processed: ${processedNew.length} posts`);
    }
    console.log('╚═══════════════════════════════════════════════════════════╝');
}

/**
 * Builds a blog post object
 */
function buildPost(id, title, content, tags, raw) {
    const slug = slugify(title, { lower: true, strict: true });
    return {
        id,
        title,
        slug,
        date: raw.date || new Date().toISOString(),
        author: {
            name: config.author.name,
            avatar: raw.avatar || '',
            profileUrl: config.author.profileUrl
        },
        metrics: {
            likes: raw.likes || 0,
            comments: raw.comments || 0,
            views: raw.views || 0,
            shares: raw.shares || 0
        },
        tags,
        content,
        media: (raw.media || []).filter(m => m.url).map((m, idx) => ({
            type: m.type || 'image',
            url: m.url,
            alt: m.alt || `Image ${idx + 1}`,
            width: m.width || 800,
            height: m.height || 800
        })),
        originalUrl: raw.originalUrl || ''
    };
}

/**
 * Basic text cleaning (fallback when Gemini is unavailable)
 */
function cleanText(text) {
    return text
        .replace(/hashtag\s*\n?\s*#(\w+)/gi, '#$1')
        .replace(/[\s\n]*…more\s*$/i, '')
        .replace(/(\s*#\w+\s*)+$/g, '')
        .replace(/\n\s*\n\s*\n/g, '\n\n')
        .trim();
}

function generateBasicTitle(text) {
    const lines = text.split('\n').filter(l => l.trim());
    if (!lines.length) return 'Untitled Post';
    let title = lines[0].replace(/#\w+/g, '').trim();
    if (title.length > 80) title = title.substring(0, 77) + '...';
    return title || 'Untitled Post';
}

// Run
main().catch(console.error);
