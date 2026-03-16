const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://visapath.io';

export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml

# Block AI crawlers that don't respect content
User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
