import { countries } from '@/data/countries';
import { getAvailablePairSlugs } from '@/lib/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://visapath.io';

export async function GET() {
  const pairSlugs = getAvailablePairSlugs();

  const urls = [];

  // Homepage
  urls.push({ loc: SITE_URL, changefreq: 'weekly', priority: '1.0' });

  // All visa pair pages (the money pages)
  for (const slug of pairSlugs) {
    urls.push({
      loc: `${SITE_URL}/visa/${slug}`,
      changefreq: 'monthly',
      priority: '0.9',
    });
  }

  // Nationality hub pages
  const demonyms = [...new Set(countries.map(c => c.demonym.toLowerCase().replace(/\s+/g, '-')))];
  for (const demonym of demonyms) {
    urls.push({
      loc: `${SITE_URL}/visas-for/${demonym}`,
      changefreq: 'monthly',
      priority: '0.8',
    });
  }

  // Destination hub pages
  for (const country of countries) {
    urls.push({
      loc: `${SITE_URL}/visit/${country.slug}`,
      changefreq: 'monthly',
      priority: '0.8',
    });
  }

  // Build XML — split into sitemap index if >50k URLs
  const xml = buildSitemapXml(urls);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
}

function buildSitemapXml(urls) {
  const urlEntries = urls
    .map(u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}
