import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const popularNationalities = [
    { name: 'Indian', slug: 'indian' },
    { name: 'Chinese', slug: 'chinese' },
    { name: 'Nigerian', slug: 'nigerian' },
    { name: 'Filipino', slug: 'filipino' },
    { name: 'Pakistani', slug: 'pakistani' },
    { name: 'Bangladeshi', slug: 'bangladeshi' },
  ];

  const popularDestinations = [
    { name: 'United States', slug: 'usa' },
    { name: 'Canada', slug: 'canada' },
    { name: 'United Kingdom', slug: 'uk' },
    { name: 'Australia', slug: 'australia' },
    { name: 'UAE (Dubai)', slug: 'uae' },
    { name: 'Germany', slug: 'germany' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Visa<span className="text-brand-500">Path</span></span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Free visa requirements guide for every country pair. Check if you need a visa, what documents are required, and how to apply.
            </p>
            <p className="text-xs text-gray-500">
              Information is for guidance only and may change. Always verify with the official embassy or consulate.
            </p>
          </div>

          {/* By Nationality */}
          <div>
            <h3 className="text-white font-semibold mb-4">By Passport</h3>
            <ul className="space-y-2">
              {popularNationalities.map(n => (
                <li key={n.slug}>
                  <Link href={`/visas-for/${n.slug}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {n.name} passport holders
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* By Destination */}
          <div>
            <h3 className="text-white font-semibold mb-4">By Destination</h3>
            <ul className="space-y-2">
              {popularDestinations.map(d => (
                <li key={d.slug}>
                  <Link href={`/visit/${d.slug}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                    Visit {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About VisaPath</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link href="/disclaimer" className="text-sm text-gray-400 hover:text-white transition-colors">Disclaimer</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} VisaPath. All rights reserved. Not affiliated with any government agency.</p>
        </div>
      </div>
    </footer>
  );
}
