import { notFound } from 'next/navigation';
import Link from 'next/link';
import { countries, getCountry } from '@/data/countries';
import { getAvailablePairSlugs, getVisaPair } from '@/lib/content';
import VisaCard from '@/components/VisaCard';
import AdUnit, { InArticleAd } from '@/components/AdUnit';
import { AD_CONFIG } from '@/lib/ads';

export const revalidate = 604800;

export async function generateStaticParams() {
  return countries.map(c => ({ country: c.slug }));
}

export async function generateMetadata({ params }) {
  const country = getCountry(params.country);
  if (!country) return {};

  return {
    title: `Visit ${country.name} — Visa Requirements by Nationality 2026`,
    description: `Who needs a visa to visit ${country.name}? Check requirements for every nationality. Visa-free, eVisa, and visa-required countries listed.`,
    alternates: { canonical: `/visit/${params.country}` },
  };
}

function getFlagUrl(code) {
  return `https://flagcdn.com/48x36/${code.toLowerCase()}.png`;
}

export default function DestinationHubPage({ params }) {
  const country = getCountry(params.country);
  if (!country) notFound();

  // Find all pairs TO this country
  const allSlugs = getAvailablePairSlugs();
  const suffix = `-to-${country.slug}`;
  const matchingSlugs = allSlugs.filter(s => s.endsWith(suffix));
  const pairs = matchingSlugs.map(s => getVisaPair(s)).filter(Boolean);

  const visaFree = pairs.filter(p => !p.visaRequired);
  const eVisa = pairs.filter(p => p.visaRequired && p.eVisaAvailable);
  const visaRequired = pairs.filter(p => p.visaRequired && !p.eVisaAvailable);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Visit ${country.name} — Visa Requirements`,
    description: `Visa requirements for visiting ${country.name} from every country.`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Visit {country.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <img src={getFlagUrl(country.code)} alt={country.name} className="w-16 h-12 object-cover rounded-lg shadow" />
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Visit {country.name} — Visa Requirements
            </h1>
            <p className="text-gray-600 mt-1">
              Capital: {country.capital} &middot; Currency: {country.currency} &middot; {pairs.length} nationalities covered
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-green-700">{visaFree.length}</p>
            <p className="text-sm text-green-600">Can Enter Visa-Free</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-blue-700">{eVisa.length}</p>
            <p className="text-sm text-blue-600">eVisa Available</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-red-700">{visaRequired.length}</p>
            <p className="text-sm text-red-600">Need Embassy Visa</p>
          </div>
        </div>

        <AdUnit slot={AD_CONFIG.slots.headerBanner} />

        {visaFree.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full" />
              Nationalities That Can Enter {country.name} Visa-Free
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visaFree.map(pair => <VisaCard key={pair.slug} pair={pair} />)}
            </div>
          </section>
        )}

        <InArticleAd slot={AD_CONFIG.slots.inContent} />

        {eVisa.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full" />
              eVisa Available for {country.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {eVisa.map(pair => <VisaCard key={pair.slug} pair={pair} />)}
            </div>
          </section>
        )}

        {visaRequired.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full" />
              Visa Required for {country.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visaRequired.map(pair => <VisaCard key={pair.slug} pair={pair} />)}
            </div>
          </section>
        )}

        <section className="mt-12 prose-visa max-w-3xl">
          <h2>Visiting {country.name}</h2>
          <p>
            {country.name} is located in {country.subregion}, {country.region}. The capital is {country.capital}
            and the local currency is {country.currency}. {country.languages.length > 1
              ? `The main languages spoken are ${country.languages.join(', ')}.`
              : `The main language is ${country.languages[0]}.`}
          </p>
          <p>
            Whether you need a visa to enter {country.name} depends on your nationality. This page shows
            the visa requirements for every passport type. Click on your nationality above to see the
            exact requirements, fees, and application process.
          </p>
        </section>

        <AdUnit slot={AD_CONFIG.slots.footerBanner} className="mt-8" />
      </div>
    </>
  );
}
