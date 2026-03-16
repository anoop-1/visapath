import Link from 'next/link';

function getFlagUrl(code) {
  return `https://flagcdn.com/40x30/${code.toLowerCase()}.png`;
}

/**
 * Grid of destination countries — used on homepage and hub pages
 */
export default function CountryGrid({ countries, linkPrefix = '/visit/', title = 'Popular Destinations' }) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {countries.map(country => (
          <Link
            key={country.slug}
            href={`${linkPrefix}${country.slug}`}
            className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-brand-300 transition-all group"
          >
            <img
              src={getFlagUrl(country.code)}
              alt={`${country.name} flag`}
              className="w-10 h-7 object-cover rounded shadow-sm"
            />
            <span className="text-sm font-medium text-gray-700 group-hover:text-brand-600 transition-colors text-center">
              {country.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * Nationality grid — links to /visas-for/[nationality]
 */
export function NationalityGrid({ nationalities }) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Passport</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {nationalities.map(n => (
          <Link
            key={n.slug}
            href={`/visas-for/${n.demonym.toLowerCase()}`}
            className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-brand-300 transition-all group"
          >
            <img
              src={getFlagUrl(n.code)}
              alt={`${n.name} flag`}
              className="w-10 h-7 object-cover rounded shadow-sm"
            />
            <span className="text-sm font-medium text-gray-700 group-hover:text-brand-600 transition-colors text-center">
              {n.demonym}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
