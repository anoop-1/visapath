'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Country data loaded client-side for search
const POPULAR_COUNTRIES = [
  { name: 'India', slug: 'india', demonym: 'indian', code: 'IN' },
  { name: 'China', slug: 'china', demonym: 'chinese', code: 'CN' },
  { name: 'Nigeria', slug: 'nigeria', demonym: 'nigerian', code: 'NG' },
  { name: 'Philippines', slug: 'philippines', demonym: 'filipino', code: 'PH' },
  { name: 'Pakistan', slug: 'pakistan', demonym: 'pakistani', code: 'PK' },
  { name: 'Bangladesh', slug: 'bangladesh', demonym: 'bangladeshi', code: 'BD' },
  { name: 'United States', slug: 'usa', demonym: 'american', code: 'US' },
  { name: 'United Kingdom', slug: 'uk', demonym: 'british', code: 'GB' },
  { name: 'Canada', slug: 'canada', demonym: 'canadian', code: 'CA' },
  { name: 'Australia', slug: 'australia', demonym: 'australian', code: 'AU' },
  { name: 'Germany', slug: 'germany', demonym: 'german', code: 'DE' },
  { name: 'France', slug: 'france', demonym: 'french', code: 'FR' },
  { name: 'UAE', slug: 'uae', demonym: 'emirati', code: 'AE' },
  { name: 'Saudi Arabia', slug: 'saudi-arabia', demonym: 'saudi', code: 'SA' },
  { name: 'Japan', slug: 'japan', demonym: 'japanese', code: 'JP' },
  { name: 'South Korea', slug: 'south-korea', demonym: 'south-korean', code: 'KR' },
  { name: 'Singapore', slug: 'singapore', demonym: 'singaporean', code: 'SG' },
  { name: 'Malaysia', slug: 'malaysia', demonym: 'malaysian', code: 'MY' },
  { name: 'Thailand', slug: 'thailand', demonym: 'thai', code: 'TH' },
  { name: 'Brazil', slug: 'brazil', demonym: 'brazilian', code: 'BR' },
  { name: 'Mexico', slug: 'mexico', demonym: 'mexican', code: 'MX' },
  { name: 'Turkey', slug: 'turkey', demonym: 'turkish', code: 'TR' },
  { name: 'Egypt', slug: 'egypt', demonym: 'egyptian', code: 'EG' },
  { name: 'South Africa', slug: 'south-africa', demonym: 'south-african', code: 'ZA' },
  { name: 'Italy', slug: 'italy', demonym: 'italian', code: 'IT' },
  { name: 'Spain', slug: 'spain', demonym: 'spanish', code: 'ES' },
  { name: 'Netherlands', slug: 'netherlands', demonym: 'dutch', code: 'NL' },
  { name: 'Switzerland', slug: 'switzerland', demonym: 'swiss', code: 'CH' },
  { name: 'New Zealand', slug: 'new-zealand', demonym: 'new-zealander', code: 'NZ' },
  { name: 'Qatar', slug: 'qatar', demonym: 'qatari', code: 'QA' },
  { name: 'Indonesia', slug: 'indonesia', demonym: 'indonesian', code: 'ID' },
  { name: 'Vietnam', slug: 'vietnam', demonym: 'vietnamese', code: 'VN' },
  { name: 'Russia', slug: 'russia', demonym: 'russian', code: 'RU' },
  { name: 'Kenya', slug: 'kenya', demonym: 'kenyan', code: 'KE' },
  { name: 'Colombia', slug: 'colombia', demonym: 'colombian', code: 'CO' },
  { name: 'Nepal', slug: 'nepal', demonym: 'nepalese', code: 'NP' },
  { name: 'Sri Lanka', slug: 'sri-lanka', demonym: 'sri-lankan', code: 'LK' },
  { name: 'Iran', slug: 'iran', demonym: 'iranian', code: 'IR' },
  { name: 'Morocco', slug: 'morocco', demonym: 'moroccan', code: 'MA' },
  { name: 'Ghana', slug: 'ghana', demonym: 'ghanaian', code: 'GH' },
];

function getFlagUrl(code) {
  return `https://flagcdn.com/24x18/${code.toLowerCase()}.png`;
}

export default function SearchBar() {
  const router = useRouter();
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [fromCountry, setFromCountry] = useState(null);
  const [toCountry, setToCountry] = useState(null);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  const filterCountries = (query) => {
    if (!query) return POPULAR_COUNTRIES.slice(0, 10);
    const q = query.toLowerCase();
    return POPULAR_COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(q) || c.demonym.toLowerCase().includes(q)
    ).slice(0, 8);
  };

  const handleSearch = () => {
    if (fromCountry && toCountry && fromCountry.code !== toCountry.code) {
      const slug = `${fromCountry.demonym.toLowerCase()}-to-${toCountry.slug}`;
      router.push(`/visa/${slug}`);
    }
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (fromRef.current && !fromRef.current.contains(e.target)) setShowFromDropdown(false);
      if (toRef.current && !toRef.current.contains(e.target)) setShowToDropdown(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div id="search" className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto] gap-3 items-end">
          {/* From Country */}
          <div ref={fromRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Passport</label>
            <div className="relative">
              {fromCountry && (
                <img src={getFlagUrl(fromCountry.code)} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-4 object-cover rounded-sm" />
              )}
              <input
                type="text"
                value={fromCountry ? fromCountry.name : fromQuery}
                onChange={(e) => {
                  setFromQuery(e.target.value);
                  setFromCountry(null);
                  setShowFromDropdown(true);
                }}
                onFocus={() => setShowFromDropdown(true)}
                placeholder="e.g. India"
                className={`w-full border border-gray-300 rounded-lg py-3 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-brand-500 focus:border-transparent ${fromCountry ? 'pl-12' : 'pl-4'}`}
              />
            </div>
            {showFromDropdown && (
              <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                {filterCountries(fromQuery).map(c => (
                  <button
                    key={c.code}
                    onClick={() => { setFromCountry(c); setFromQuery(''); setShowFromDropdown(false); }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-blue-50 transition-colors"
                  >
                    <img src={getFlagUrl(c.code)} alt="" className="w-6 h-4 object-cover rounded-sm" />
                    <span className="text-sm text-gray-900">{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Arrow */}
          <div className="hidden sm:flex items-center justify-center pb-1">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>

          {/* To Country */}
          <div ref={toRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Traveling To</label>
            <div className="relative">
              {toCountry && (
                <img src={getFlagUrl(toCountry.code)} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-4 object-cover rounded-sm" />
              )}
              <input
                type="text"
                value={toCountry ? toCountry.name : toQuery}
                onChange={(e) => {
                  setToQuery(e.target.value);
                  setToCountry(null);
                  setShowToDropdown(true);
                }}
                onFocus={() => setShowToDropdown(true)}
                placeholder="e.g. Canada"
                className={`w-full border border-gray-300 rounded-lg py-3 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-brand-500 focus:border-transparent ${toCountry ? 'pl-12' : 'pl-4'}`}
              />
            </div>
            {showToDropdown && (
              <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                {filterCountries(toQuery).map(c => (
                  <button
                    key={c.code}
                    onClick={() => { setToCountry(c); setToQuery(''); setShowToDropdown(false); }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-blue-50 transition-colors"
                  >
                    <img src={getFlagUrl(c.code)} alt="" className="w-6 h-4 object-cover rounded-sm" />
                    <span className="text-sm text-gray-900">{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={!fromCountry || !toCountry}
            className="bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Check Visa
          </button>
        </div>
      </div>
    </div>
  );
}
