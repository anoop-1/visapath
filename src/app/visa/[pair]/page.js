import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getVisaPair, getAvailablePairSlugs } from '@/lib/content';
import AdUnit, { InArticleAd, SidebarAd } from '@/components/AdUnit';
import AffiliateBox, { InlineAffiliateCTA } from '@/components/AffiliateBox';
import { AD_CONFIG } from '@/lib/ads';

// ISR: Regenerate every 7 days
export const revalidate = 604800;

// Generate all available pair pages at build time
export async function generateStaticParams() {
  const slugs = getAvailablePairSlugs();
  return slugs.map(pair => ({ pair }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const pair = getVisaPair(params.pair);
  if (!pair) return {};

  return {
    title: pair.seo?.title || `${params.pair.replace(/-/g, ' ')} visa requirements`,
    description: pair.seo?.description || pair.summary,
    keywords: pair.seo?.keywords || [],
    alternates: {
      canonical: `/visa/${params.pair}`,
    },
    openGraph: {
      title: pair.seo?.title,
      description: pair.seo?.description || pair.summary,
      type: 'article',
      url: `/visa/${params.pair}`,
    },
  };
}

function getFlagUrl(code) {
  return `https://flagcdn.com/48x36/${code.toLowerCase()}.png`;
}

function getCountryName(code) {
  const names = { IN: 'India', CA: 'Canada', SA: 'Saudi Arabia', AE: 'UAE', US: 'United States', GB: 'United Kingdom', AU: 'Australia', DE: 'Germany', FR: 'France', JP: 'Japan', SG: 'Singapore', QA: 'Qatar', OM: 'Oman', BH: 'Bahrain', KW: 'Kuwait' };
  return names[code] || code;
}

export default function VisaPairPage({ params }) {
  const pair = getVisaPair(params.pair);

  if (!pair) {
    notFound();
  }

  const fromName = getCountryName(pair.from);
  const toName = getCountryName(pair.to);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pair.seo?.title || `${fromName} to ${toName} Visa Requirements`,
    description: pair.summary,
    dateModified: pair.lastUpdated,
    author: { '@type': 'Organization', name: 'VisaPath' },
    publisher: { '@type': 'Organization', name: 'VisaPath', url: 'https://visapath.io' },
  };

  const faqJsonLd = pair.faqs?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pair.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  } : null;

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand-600">Home</Link>
            <span>/</span>
            <Link href={`/visas-for/${pair.slug.split('-to-')[0]}`} className="hover:text-brand-600 capitalize">
              {pair.slug.split('-to-')[0]} passport
            </Link>
            <span>/</span>
            <span className="text-gray-900">{toName}</span>
          </nav>
        </div>
      </div>

      {/* Header Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <AdUnit slot={AD_CONFIG.slots.headerBanner} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
          {/* Main Content */}
          <article className="prose-visa">
            {/* Hero Header */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <img src={getFlagUrl(pair.from)} alt={fromName} className="w-12 h-9 object-cover rounded shadow" />
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <img src={getFlagUrl(pair.to)} alt={toName} className="w-12 h-9 object-cover rounded shadow" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
                {fromName} to {toName} Visa Requirements
              </h1>

              {/* Status Badge */}
              <div className="flex flex-wrap gap-3 mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${pair.visaRequired ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {pair.visaRequired ? (
                    <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg> Visa Required</>
                  ) : (
                    <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Visa Free</>
                  )}
                </span>
                {pair.eVisaAvailable && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                    eVisa Available
                  </span>
                )}
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {pair.visaType && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 font-medium">Visa Type</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{pair.visaType}</p>
                  </div>
                )}
                {pair.stayDuration && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 font-medium">Max Stay</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{pair.stayDuration}</p>
                  </div>
                )}
                {pair.processingTime && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 font-medium">Processing</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{pair.processingTime}</p>
                  </div>
                )}
                {pair.visaFee && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 font-medium">Fee</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{pair.visaFee}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h2>Overview</h2>
              <p>{pair.summary}</p>
            </div>

            {/* Affiliate CTA */}
            <AffiliateBox fromCode={pair.from} toCode={pair.to} visaType={pair.visaType} countryName={toName} />

            {/* Requirements */}
            {pair.requirements?.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8 mb-8">
                <h2>Required Documents</h2>
                <ul>
                  {pair.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* In-article Ad */}
            <InArticleAd slot={AD_CONFIG.slots.inContent} />

            {/* Application Steps */}
            {pair.steps?.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h2>How to Apply — Step by Step</h2>
                <ol>
                  {pair.steps.map((step, i) => (
                    <li key={i}><strong>Step {i + 1}:</strong> {step}</li>
                  ))}
                </ol>
                {pair.eVisaAvailable && pair.eVisaUrl && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Apply Online:</strong>{' '}
                      <a href={pair.eVisaUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">
                        Official eVisa Portal →
                      </a>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Inline Affiliate CTA */}
            <InlineAffiliateCTA fromCode={pair.from} toCode={pair.to} countryName={toName} />

            {/* Tips */}
            {pair.tips?.length > 0 && (
              <div className="bg-amber-50 rounded-xl border border-amber-200 p-6 mb-8">
                <h2 className="text-amber-900">Pro Tips</h2>
                <ul className="space-y-2">
                  {pair.tips.map((tip, i) => (
                    <li key={i} className="text-amber-800 flex gap-2">
                      <span className="shrink-0">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Between-sections Ad */}
            <AdUnit slot={AD_CONFIG.slots.betweenSections} format="fluid" />

            {/* Common Reasons */}
            {pair.commonReasons?.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h2>Common Reasons to Visit {toName}</h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  {pair.commonReasons.map((reason, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Embassy Info */}
            {pair.embassyInfo && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h2>Embassy / Consulate Information</h2>
                <div className="space-y-2 text-sm">
                  <p><strong>{pair.embassyInfo.name}</strong></p>
                  {pair.embassyInfo.address && <p className="text-gray-600">{pair.embassyInfo.address}</p>}
                  {pair.embassyInfo.phone && <p>Phone: <a href={`tel:${pair.embassyInfo.phone}`} className="text-brand-600">{pair.embassyInfo.phone}</a></p>}
                  {pair.embassyInfo.website && <p>Website: <a href={pair.embassyInfo.website} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">{pair.embassyInfo.website}</a></p>}
                  {pair.embassyInfo.vfsLocations && (
                    <div className="mt-3">
                      <p className="font-medium text-gray-800 mb-1">VFS/VAC Centers:</p>
                      <div className="flex flex-wrap gap-2">
                        {pair.embassyInfo.vfsLocations.map((loc, i) => (
                          <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">{loc}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* FAQs */}
            {pair.faqs?.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h2>Frequently Asked Questions</h2>
                <div className="space-y-4 mt-4">
                  {pair.faqs.map((faq, i) => (
                    <details key={i} className="group border-b border-gray-100 pb-4 last:border-0">
                      <summary className="flex items-center justify-between cursor-pointer text-gray-900 font-medium hover:text-brand-600">
                        {faq.question}
                        <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <p className="mt-2 text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Related Pairs */}
            {pair.relatedPairs?.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h2>Related Visa Guides</h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  {pair.relatedPairs.map((slug, i) => (
                    <Link key={i} href={`/visa/${slug}`} className="bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full text-sm hover:bg-brand-100 transition-colors capitalize">
                      {slug.replace(/-/g, ' ')}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Last Updated */}
            <p className="text-xs text-gray-400 mt-4">
              Last updated: {pair.lastUpdated}. Information may change — always verify with the official embassy.
            </p>

            {/* Footer Ad */}
            <AdUnit slot={AD_CONFIG.slots.footerBanner} className="mt-8" />
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <SidebarAd slot={AD_CONFIG.slots.sidebarRect} />

            {/* Quick Apply Box */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-3">Quick Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Visa</span>
                  <span className="font-medium">{pair.visaRequired ? 'Required' : 'Not Required'}</span>
                </div>
                {pair.visaFee && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fee</span>
                    <span className="font-medium">{pair.visaFee}</span>
                  </div>
                )}
                {pair.processingTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Processing</span>
                    <span className="font-medium">{pair.processingTime}</span>
                  </div>
                )}
                {pair.stayDuration && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Stay</span>
                    <span className="font-medium">{pair.stayDuration}</span>
                  </div>
                )}
              </div>
              {pair.eVisaAvailable && pair.eVisaUrl && (
                <a
                  href={pair.eVisaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full text-center bg-brand-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-brand-700 transition-colors"
                >
                  Apply for eVisa →
                </a>
              )}
            </div>

            <SidebarAd slot={AD_CONFIG.slots.sidebarRect} />
          </aside>
        </div>
      </div>
    </>
  );
}
