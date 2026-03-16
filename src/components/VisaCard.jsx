import Link from 'next/link';

function getFlagUrl(code) {
  return `https://flagcdn.com/24x18/${code.toLowerCase()}.png`;
}

/**
 * Visa pair card — used in grids on homepage and hub pages
 */
export default function VisaCard({ pair }) {
  const statusColor = pair.visaRequired
    ? 'bg-red-100 text-red-700'
    : 'bg-green-100 text-green-700';

  const statusText = pair.visaRequired
    ? (pair.eVisaAvailable ? 'eVisa Available' : 'Visa Required')
    : 'Visa Free';

  return (
    <Link
      href={`/visa/${pair.slug}`}
      className="block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-brand-300 transition-all group"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1.5">
          <img src={getFlagUrl(pair.from)} alt="" className="w-6 h-4 object-cover rounded-sm" />
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <img src={getFlagUrl(pair.to)} alt="" className="w-6 h-4 object-cover rounded-sm" />
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor}`}>
          {statusText}
        </span>
      </div>

      <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors text-sm">
        {pair.seo?.title?.replace(/\s*\|\s*.*$/, '').replace(/\s*\d{4}$/, '') || pair.slug.replace(/-/g, ' ')}
      </h3>

      {pair.visaType && (
        <p className="text-xs text-gray-500 mt-1">{pair.visaType}</p>
      )}

      {pair.processingTime && (
        <p className="text-xs text-gray-400 mt-1">Processing: {pair.processingTime}</p>
      )}
    </Link>
  );
}

/**
 * Compact version for large grids
 */
export function VisaCardCompact({ slug, fromCode, toCode, title, visaRequired }) {
  return (
    <Link
      href={`/visa/${slug}`}
      className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg hover:shadow-sm hover:border-brand-200 transition-all"
    >
      <div className="flex items-center gap-1">
        <img src={getFlagUrl(fromCode)} alt="" className="w-5 h-3.5 object-cover rounded-sm" />
        <span className="text-gray-400 text-xs">→</span>
        <img src={getFlagUrl(toCode)} alt="" className="w-5 h-3.5 object-cover rounded-sm" />
      </div>
      <span className="text-sm text-gray-700 flex-1 truncate">{title}</span>
      <span className={`w-2 h-2 rounded-full shrink-0 ${visaRequired ? 'bg-red-400' : 'bg-green-400'}`} />
    </Link>
  );
}
