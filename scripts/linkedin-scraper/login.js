// Open Chrome with ScraperProfile for manual LinkedIn login
// Run this ONCE to log into LinkedIn, then the scraper will use saved cookies

import { spawn } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

const PROFILE_PATH = 'C:/Users/priya/AppData/Local/Google/Chrome/ScraperProfile';
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

// Create profile dir if needed
if (!existsSync(PROFILE_PATH)) {
    mkdirSync(PROFILE_PATH, { recursive: true });
}

console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║   Opening Chrome with ScraperProfile                       ║');
console.log('╚═══════════════════════════════════════════════════════════╝');
console.log('');
console.log('1. Log into LinkedIn in the browser window');
console.log('2. Close the browser when done');
console.log('3. Run "npm run scrape" to start scraping');
console.log('');

spawn(CHROME_PATH, [
    `--user-data-dir=${PROFILE_PATH}`,
    'https://www.linkedin.com/login'
], {
    detached: true,
    stdio: 'ignore'
}).unref();

console.log('✅ Chrome opened! Log into LinkedIn and close the browser.');
