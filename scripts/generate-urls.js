#!/usr/bin/env node
/**
 * Generate all VisaPath URLs for GSC indexing
 * Outputs a list of URLs that should be submitted to Google Search Console
 */

const { countries, makePairSlug } = require('../src/data/countries');
const fs = require('fs');
const path = require('path');

const PAIRS_DIR = path.join(__dirname, '..', 'src', 'data', 'visa-pairs');
function getAvailablePairSlugs() {
  try {
    return fs.readdirSync(PAIRS_DIR).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
  } catch { return []; }
}

const SITE_URL = 'https://visapath.vercel.app'; // Update when custom domain is set

const urls = [];

// 1. Homepage
urls.push({ url: `${SITE_URL}/`, priority: 'HIGH', type: 'homepage' });

// 2. All available visa pair pages (money pages)
const pairSlugs = getAvailablePairSlugs();
for (const slug of pairSlugs) {
  urls.push({ url: `${SITE_URL}/visa/${slug}`, priority: 'HIGH', type: 'visa-pair' });
}

// 3. Nationality hub pages (all 195 countries)
const demonyms = [...new Set(countries.map(c => c.demonym.toLowerCase().replace(/\s+/g, '-')))];
for (const d of demonyms) {
  urls.push({ url: `${SITE_URL}/visas-for/${d}`, priority: 'MEDIUM', type: 'nationality-hub' });
}

// 4. Destination hub pages (all 195 countries)
for (const c of countries) {
  urls.push({ url: `${SITE_URL}/visit/${c.slug}`, priority: 'MEDIUM', type: 'destination-hub' });
}

// 5. Sitemap
urls.push({ url: `${SITE_URL}/sitemap.xml`, priority: 'HIGH', type: 'sitemap' });

// Output summary
console.log(`=== VisaPath URL Generation ===`);
console.log(`Total URLs: ${urls.length}`);
console.log(`  Homepage: 1`);
console.log(`  Visa pair pages: ${pairSlugs.length}`);
console.log(`  Nationality hubs: ${demonyms.length}`);
console.log(`  Destination hubs: ${countries.length}`);
console.log(`  Sitemap: 1`);

// Write full URL list
const urlListPath = path.join(__dirname, '..', 'urls-for-gsc.txt');
fs.writeFileSync(urlListPath, urls.map(u => u.url).join('\n'));
console.log(`\nFull URL list saved to: urls-for-gsc.txt`);

// Write prioritized batches for drip feeding
const highPriority = urls.filter(u => u.priority === 'HIGH');
const medPriority = urls.filter(u => u.priority === 'MEDIUM');

const batchesPath = path.join(__dirname, '..', 'gsc-drip-batches.json');
const batches = {
  totalUrls: urls.length,
  priority3_visapath: {
    description: 'VisaPath URLs - 3rd priority after atlantisndt.com and ndt-connect.com',
    highPriority: highPriority.map(u => u.url),
    mediumPriority: medPriority.map(u => u.url),
    dailyBatchSize: 50,
    estimatedDays: Math.ceil(urls.length / 50),
  },
};
fs.writeFileSync(batchesPath, JSON.stringify(batches, null, 2));
console.log(`Drip-feed batch plan saved to: gsc-drip-batches.json`);
