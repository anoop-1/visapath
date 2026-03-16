import SearchBar from '@/components/SearchBar';
import VisaCard from '@/components/VisaCard';
import CountryGrid, { NationalityGrid } from '@/components/CountryGrid';
import AdUnit from '@/components/AdUnit';
import { AD_CONFIG } from '@/lib/ads';
import { getPopularPairs } from '@/lib/content';

// Popular destinations for the grid
const POPULAR_DESTINATIONS = [
  { name: 'United States', slug: 'usa', code: 'US' },
  { name: 'Canada', slug: 'canada', code: 'CA' },
  { name: 'United Kingdom', slug: 'uk', code: 'GB' },
  { name: 'Australia', slug: 'australia', code: 'AU' },
  { name: 'Germany', slug: 'germany', code: 'DE' },
  { name: 'France', slug: 'france', code: 'FR' },
  { name: 'Japan', slug: 'japan', code: 'JP' },
  { name: 'UAE', slug: 'uae', code: 'AE' },
  { name: 'Singapore', slug: 'singapore', code: 'SG' },
  { name: 'Thailand', slug: 'thailand', code: 'TH' },
  { name: 'Italy', slug: 'italy', code: 'IT' },
  { name: 'Spain', slug: 'spain', code: 'ES' },
  { name: 'Netherlands', slug: 'netherlands', code: 'NL' },
  { name: 'Saudi Arabia', slug: 'saudi-arabia', code: 'SA' },
  { name: 'New Zealand', slug: 'new-zealand', code: 'NZ' },
  { name: 'South Korea', slug: 'south-korea', code: 'KR' },
  { name: 'Malaysia', slug: 'malaysia', code: 'MY' },
  { name: 'Switzerland', slug: 'switzerland', code: 'CH' },
];

const POPULAR_NATIONALITIES = [
  { name: 'India', slug: 'india', demonym: 'Indian', code: 'IN' },
  { name: 'China', slug: 'china', demonym: 'Chinese', code: 'CN' },
  { name: 'Nigeria', slug: 'nigeria', demonym: 'Nigerian', code: 'NG' },
  { name: 'Philippines', slug: 'philippines', demonym: 'Filipino', code: 'PH' },
  { name: 'Pakistan', slug: 'pakistan', demonym: 'Pakistani', code: 'PK' },
  { name: 'Bangladesh', slug: 'bangladesh', demonym: 'Bangladeshi', code: 'BD' },
  { name: 'Indonesia', slug: 'indonesia', demonym: 'Indonesian', code: 'ID' },
  { name: 'Vietnam', slug: 'vietnam', demonym: 'Vietnamese', code: 'VN' },
  { name: 'Egypt', slug: 'egypt', demonym: 'Egyptian', code: 'EG' },
  { name: 'Brazil', slug: 'brazil', demonym: 'Brazilian', code: 'BR' },
  { name: 'Mexico', slug: 'mexico', demonym: 'Mexican', code: 'MX' },
  { name: 'Turkey', slug: 'turkey', demonym: 'Turkish', code: 'TR' },
];

// JSON-LD structured data for homepage
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'VisaPath',
  url: 'https://visapath.io',
  description: 'Free visa requirements guide for every country pair worldwide.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://visapath.io/visa/{search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  const popularPairs = getPopularPairs();

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Do you need a visa?
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Check visa requirements for any passport and destination. Free, instant, and always up to date.
          </p>
          <SearchBar />
          <p className="text-sm text-blue-200 mt-4">
            Covering 195 countries &middot; 37,000+ routes &middot; Updated for 2026
          </p>
        </div>
      </section>

      {/* Header Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdUnit slot={AD_CONFIG.slots.headerBanner} />
      </div>

      {/* Popular Routes */}
      {popularPairs.length > 0 && (
        <section id="popular" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Most Searched Visa Routes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularPairs.slice(0, 12).map(pair => (
              <VisaCard key={pair.slug} pair={pair} />
            ))}
          </div>
        </section>
      )}

      {/* In-content Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdUnit slot={AD_CONFIG.slots.inContent} format="fluid" />
      </div>

      {/* Destinations Grid */}
      <div id="destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CountryGrid countries={POPULAR_DESTINATIONS} />
      </div>

      {/* Nationalities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NationalityGrid nationalities={POPULAR_NATIONALITIES} />
      </div>

      {/* SEO Content Block */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Complete Visa Requirements Guide</h2>
        <div className="prose-visa">
          <p>
            VisaPath helps travelers instantly check whether they need a visa before booking flights.
            Select your passport country and destination to see the exact requirements, application steps,
            required documents, processing times, and fees.
          </p>
          <p>
            Our database covers every country pair — that is over 37,000 unique visa routes — so whether
            you hold an Indian passport traveling to Canada, a Nigerian passport heading to the UK, or
            a Filipino passport visiting Japan, you will find the information you need right here.
          </p>
          <p>
            Every guide includes step-by-step application instructions, document checklists, embassy
            contact details, and practical tips from experienced travelers. We also show you if an
            eVisa or visa-on-arrival option is available, saving you a trip to the embassy.
          </p>
        </div>
      </section>

      {/* Footer Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <AdUnit slot={AD_CONFIG.slots.footerBanner} />
      </div>
    </>
  );
}
