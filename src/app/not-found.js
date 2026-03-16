import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-extrabold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Visa Route Not Found</h2>
      <p className="text-gray-600 mb-8">
        This visa pair hasn&apos;t been added yet, or the URL may be incorrect.
        Try searching for your route below.
      </p>
      <SearchBar />
      <div className="mt-8">
        <Link href="/" className="text-brand-600 hover:text-brand-700 font-medium">
          ← Back to homepage
        </Link>
      </div>
    </div>
  );
}
