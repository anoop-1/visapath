import { AFFILIATE_CONFIG } from '@/lib/ads';

/**
 * Affiliate CTA Box — placed on visa pair pages
 * Drives revenue through iVisa / VisaHQ referrals
 */
export default function AffiliateBox({ fromCode, toCode, visaType, countryName }) {
  const ivisaLink = AFFILIATE_CONFIG.ivisa.buildLink(fromCode, toCode);
  const visahqLink = AFFILIATE_CONFIG.visahq.buildLink(fromCode, toCode);

  return (
    <div className="bg-gradient-to-r from-brand-600 to-brand-800 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-start gap-4">
        <div className="bg-white/20 rounded-lg p-3 shrink-0">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">Apply for your {countryName} visa online</h3>
          <p className="text-blue-100 text-sm mb-4">
            Skip the embassy queue. Get your {visaType || 'visa'} processed online with expert assistance and document review.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={ivisaLink}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-white text-brand-700 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors"
            >
              Apply via iVisa
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href={visahqLink}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-white/20 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/30 transition-colors border border-white/30"
            >
              Check on VisaHQ
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Compact inline affiliate CTA
 */
export function InlineAffiliateCTA({ fromCode, toCode, countryName }) {
  const ivisaLink = AFFILIATE_CONFIG.ivisa.buildLink(fromCode, toCode);

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4 flex items-center gap-3">
      <span className="text-2xl">💡</span>
      <div className="flex-1">
        <p className="text-sm text-amber-900">
          <strong>Need help?</strong> Professional visa agents can handle your {countryName} visa application from start to finish.
        </p>
      </div>
      <a
        href={ivisaLink}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="shrink-0 bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors"
      >
        Get Help
      </a>
    </div>
  );
}
