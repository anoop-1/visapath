import { NextResponse } from 'next/server';
import { searchPairs } from '@/lib/content';
import { countries } from '@/data/countries';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const query = q.toLowerCase();

  // Search country names and demonyms for suggestions
  const matchedCountries = countries.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.demonym.toLowerCase().includes(query) ||
    c.slug.includes(query)
  ).slice(0, 10);

  // Search existing visa pairs
  const matchedPairs = searchPairs(query).slice(0, 10);

  return NextResponse.json({
    countries: matchedCountries.map(c => ({
      name: c.name,
      slug: c.slug,
      demonym: c.demonym,
      code: c.code,
    })),
    pairs: matchedPairs.map(p => ({
      slug: p.slug,
      title: p.seo?.title || p.slug.replace(/-/g, ' '),
      visaRequired: p.visaRequired,
      from: p.from,
      to: p.to,
    })),
  });
}
