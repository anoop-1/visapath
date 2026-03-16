import { notFound } from 'next/navigation';
import Link from 'next/link';
import { countries } from '@/data/countries';
import { getAvailablePairSlugs, getVisaPair } from '@/lib/content';
import VisaCard from '@/components/VisaCard';
import AdUnit, { InArticleAd } from '@/components/AdUnit';
import { AD_CONFIG } from '@/lib/ads';

export const revalidate = 604800;

// Generate pages for all nationalities
export async function generateStaticParams() {
  return countries.map(c => ({
    nationality: c.demonym.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }) {
  const country = countries.find(c =>
    c.demonym.toLowerCase().replace(/\s+/g, '-') === params.nationality
  );
  if (!country) return {};

  return {
    title: `${country.demonym} Passport Visa Requirements 2026 — Where Can You Travel?`,
    description: `Complete visa guide for ${country.demonym} passport holders. See which countries you can visit visa-free, which require a visa, and where eVisa is available.`,
    alternates: { canonical: `/visas-for/${params.nationality}` },
  };
}

function getFlagUrl(code) {
  return `https://flagcdn.com/48x36/${code.toLowerCase()}.png`;
}

export default function NationalityHubPage({ params }) {
  const country = countries.find(c =>
    c.demonym.toLowerCase().replace(/\s+/g, '-') === params.nationality
  );

  if (!country) notFound();

  // Find all available pairs from this nationality
  const allSlugs = getAvailablePairSlugs();
  const prefix = country.demonym.toLowerCase().replace(/\s+/g, '-') + '-to-';
  const matchingSlugs = allSlugs.filter(s => s.startsWith(prefix));
  const pairs = matchingSlugs.map(s => getVisaPair(s)).filter(Boolean);

  // Categorize
  const visaFree = pairs.filter(p => !p.visaRequired);
  const eVisa = pairs.filter(p => p.visaRequired && p.eVisaAvailable);
  const visaRequired = pairs.filter(p => p.visaRequired && !p.eVisaAvailable);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${country.demonym} Passport Visa Requirements`,
    description: `Visa requirements for ${country.demonym} passport holders traveling abroad.`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">{country.demonym} passport</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <img src={getFlagUrl(country.code)} alt={country.name} className="w-16 h-12 object-cover rounded-lg shadow" />
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              {country.demonym} Passport Visa Guide
            </h1>
            <p className="text-gray-600 mt-1">
              Passport power rank: #{country.passportRank} &middot; {pairs.length} destinations covered
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-green-700">{visaFree.length}</p>
            <p className="text-sm text-green-600">Visa Free</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-blue-700">{eVisa.length}</p>
            <p className="text-sm text-blue-600">eVisa Available</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-red-700">{visaRequired.length}</p>
            <p className="text-sm text-red-600">Visa Required</p>
          </div>
        </div>

        <AdUnit slot={AD_CONFIG.slots.headerBanner} />

        {/* Visa Free Countries */}
        {visaFree.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full" />
              Visa-Free Destinations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visaFree.map(pair => <VisaCard key={pair.slug} pair={pair} />)}
            </div>
          </section>
        )}

        <InArticleAd slot={AD_CONFIG.slots.inContent} />

        {/* eVisa Countries */}
        {eVisa.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full" />
              eVisa Available
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {eVisa.map(pair => <VisaCard key={pair.slug} pair={pair} />)}
            </div>
          </section>
        )}

        {/* Visa Required Countries */}
        {visaRequired.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full" />
              Visa Required
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visaRequired.map(pair => <VisaCard key={pair.slug} pair={pair} />)}
            </div>
          </section>
        )}

        {/* SEO text */}
        <section className="mt-12 prose-visa max-w-3xl">
          <h2>{country.demonym} Passport Travel Guide</h2>
          <p>
            The {country.demonym} passport currently ranks #{country.passportRank} in global passport power.
            {country.demonym} citizens can travel to various destinations around the world, with some
            offering visa-free entry, others providing eVisa facilities, and many requiring a traditional
            visa application through an embassy or consulate.
          </p>
          <p>
            This page shows all available visa information for {country.demonym} passport holders.
            Click on any destination to see detailed requirements, application steps, documents needed,
            and processing times.
          </p>
        </section>

        <AdUnit slot={AD_CONFIG.slots.footerBanner} className="mt-8" />
      </div>
    </>
  );
}
