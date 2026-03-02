const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const MODELS_DIR = path.join(__dirname, '..', 'public', 'models');

function getMissing() {
  const svgs = fs.readdirSync(MODELS_DIR).filter(f => f.endsWith('.svg')).map(f => f.replace('.svg', ''));
  const jpgs = fs.readdirSync(MODELS_DIR).filter(f => f.endsWith('.jpg')).map(f => f.replace('.jpg', ''));
  const jpgSet = new Set(jpgs);
  return svgs.filter(name => !jpgSet.has(name));
}

function toSearchQuery(filename) {
  const parts = filename.split('-');
  const year = parts.pop();
  const words = parts.map(w => w.charAt(0).toUpperCase() + w.slice(1));
  return `${year} ${words.join(' ')}`;
}

function downloadImage(url, dest, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));
    const protocol = url.startsWith('https') ? https : http;
    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
      },
      timeout: 15000
    }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        let redirect = response.headers.location;
        if (redirect.startsWith('//')) redirect = 'https:' + redirect;
        downloadImage(redirect, dest, maxRedirects - 1).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        if (buffer.length < 3000) {
          reject(new Error(`Too small: ${buffer.length} bytes`));
          return;
        }
        fs.writeFileSync(dest, buffer);
        resolve();
      });
      response.on('error', reject);
    });
    request.on('error', reject);
    request.on('timeout', () => { request.destroy(); reject(new Error('Timeout')); });
  });
}

async function main() {
  const missing = getMissing();
  console.log(`Found ${missing.length} missing images\n`);

  const startIdx = parseInt(process.argv[2] || '0', 10);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();

  let downloaded = 0;
  let failed = 0;
  const failures = [];

  for (let i = startIdx; i < missing.length; i++) {
    const name = missing[i];
    const query = toSearchQuery(name);
    const dest = path.join(MODELS_DIR, `${name}.jpg`);

    console.log(`[${i + 1}/${missing.length}] Searching: "${query}"...`);

    try {
      // Use Bing Images
      const searchUrl = `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&qft=+filterui:imagesize-large`;
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(2000);

      // Collect ALL image URLs so we can try fallbacks
      const imageUrls = await page.evaluate(() => {
        const urls = [];
        const links = document.querySelectorAll('a.iusc');
        for (const link of links) {
          try {
            const m = JSON.parse(link.getAttribute('m'));
            if (m && m.murl) urls.push(m.murl);
          } catch(e) {}
        }
        if (urls.length === 0) {
          const items = document.querySelectorAll('[data-m]');
          for (const item of items) {
            try {
              const m = JSON.parse(item.getAttribute('data-m'));
              if (m && m.murl) urls.push(m.murl);
            } catch(e) {}
          }
        }
        return urls.slice(0, 10);
      });

      if (imageUrls.length === 0) {
        console.log(`  ✗ No image URLs found on page`);
        failed++;
        failures.push(name);
        await page.waitForTimeout(500);
        continue;
      }

      let success = false;
      for (let j = 0; j < imageUrls.length; j++) {
        try {
          await downloadImage(imageUrls[j], dest);
          const sz = fs.statSync(dest).size;
          console.log(`  ✓ Downloaded from result #${j + 1} (${Math.round(sz / 1024)}KB)`);
          downloaded++;
          success = true;
          break;
        } catch (dlErr) {
          if (j < imageUrls.length - 1) {
            console.log(`  ⟳ Result #${j + 1} failed (${dlErr.message}), trying next...`);
          } else {
            console.log(`  ✗ All ${imageUrls.length} results failed. Last: ${dlErr.message}`);
          }
          if (fs.existsSync(dest)) fs.unlinkSync(dest);
        }
      }
      if (!success) {
        failed++;
        failures.push(name);
      }

    } catch (err) {
      console.log(`  ✗ Error: ${err.message}`);
      failed++;
      failures.push(name);
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
    }

    await page.waitForTimeout(800 + Math.random() * 1200);
  }

  await browser.close();

  console.log(`\n--- Done ---`);
  console.log(`Downloaded: ${downloaded}`);
  console.log(`Failed: ${failed}`);
  if (failures.length > 0) {
    console.log(`\nFailed images:`);
    failures.forEach(f => console.log(`  - ${f}`));
  }
}

main().catch(console.error);
