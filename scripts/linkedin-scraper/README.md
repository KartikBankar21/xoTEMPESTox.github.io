# LinkedIn Posts Scraper

Scrapes LinkedIn posts and exports to `blogs_v2.json` format for the portfolio.
Uses Gemini LLM to transform raw LinkedIn posts into clean blog-style content.

## Setup

```bash
cd scripts/linkedin-scraper
npm install
cp .env.example .env   # Then add your Gemini API key
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Google Gemini API key for content transformation |
| `GEMINI_MODEL` | No | Model to use (default: `gemini-2.0-flash`) |

## Usage

### First-time login
```bash
npm run login
```
Opens Chrome with a dedicated scraper profile. Log into LinkedIn manually, then close Chrome.

### Scrape posts
```bash
npm run scrape
```

## How It Works

1. Launches Chrome with `ScraperProfile` (separate from your main Chrome)
2. Navigates to your LinkedIn activity page
3. Scrolls to load all posts (clicks "Show more results" for pagination)
4. Extracts: text, images, reactions, comments, shares, views, timestamps
5. Saves raw data to `raw_posts.json` (Phase 1)
6. Processes through Gemini LLM (Phase 2):
   - **New posts** → generates title, summary, clean markdown, and 5 curated tags
   - **Existing posts** → only updates metrics (likes, views, comments)
7. Saves final output to `public/data/blogs_v2.json`

## Project Structure

```
├── index.js          # Entry point & two-phase pipeline
├── scraper.js        # Browser automation & post extraction
├── formatter.js      # Data → blogs_v2.json format
├── llm.js            # Gemini LLM integration
├── config.js         # Paths & scraping settings
├── login.js          # One-time LinkedIn login helper
├── .env.example      # Environment variable template
└── .gitignore
```

## Roadmap

- [x] Gemini LLM content transformation
- [x] Incremental updates (only new posts processed)
- [x] Curated tag generation with existing tag reuse
- [x] "Show more results" pagination
- [ ] Video media support
- [ ] Scheduled runs (cron/Task Scheduler)
