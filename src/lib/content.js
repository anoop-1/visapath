import fs from 'fs';
import path from 'path';

const PAIRS_DIR = path.join(process.cwd(), 'src', 'data', 'visa-pairs');

/**
 * Load a specific visa pair by slug
 * Returns null if not found (pair hasn't been generated yet)
 */
export function getVisaPair(slug) {
  const filePath = path.join(PAIRS_DIR, `${slug}.json`);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Get all available visa pair slugs (only generated ones)
 */
export function getAvailablePairSlugs() {
  try {
    return fs.readdirSync(PAIRS_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));
  } catch {
    return [];
  }
}

/**
 * Get all pairs for a given nationality (from country slug)
 */
export function getPairsForNationality(nationalitySlug) {
  const slugs = getAvailablePairSlugs();
  const matching = slugs.filter(s => {
    // Pattern: "{demonym}-to-{country}" — check if starts with the expected demonym
    const parts = s.split('-to-');
    return parts.length === 2;
  });

  // Load and filter by actual from country code
  const pairs = [];
  for (const slug of matching) {
    const pair = getVisaPair(slug);
    if (pair) {
      // We need to check if this pair's from country matches the nationality
      pairs.push(pair);
    }
  }
  return pairs;
}

/**
 * Get all pairs for a given destination country
 */
export function getPairsForDestination(countrySlug) {
  const slugs = getAvailablePairSlugs();
  const matching = slugs.filter(s => s.endsWith(`-to-${countrySlug}`));
  return matching.map(s => getVisaPair(s)).filter(Boolean);
}

/**
 * Get popular pairs (for homepage)
 */
export function getPopularPairs() {
  const popularSlugs = [
    'indian-to-usa', 'indian-to-canada', 'indian-to-uk',
    'indian-to-uae', 'indian-to-australia', 'indian-to-saudi-arabia',
    'chinese-to-usa', 'chinese-to-japan', 'chinese-to-uk',
    'nigerian-to-usa', 'nigerian-to-canada', 'nigerian-to-uk',
    'filipino-to-usa', 'filipino-to-canada', 'filipino-to-japan',
    'pakistani-to-usa', 'pakistani-to-uk', 'pakistani-to-canada',
    'brazilian-to-usa', 'mexican-to-canada', 'turkish-to-germany',
    'egyptian-to-uae', 'bangladeshi-to-saudi-arabia', 'vietnamese-to-japan',
  ];

  return popularSlugs
    .map(slug => getVisaPair(slug))
    .filter(Boolean);
}

/**
 * Search pairs by query string
 */
export function searchPairs(query) {
  const q = query.toLowerCase().trim();
  const slugs = getAvailablePairSlugs();

  return slugs
    .filter(slug => slug.includes(q))
    .slice(0, 20)
    .map(slug => getVisaPair(slug))
    .filter(Boolean);
}
