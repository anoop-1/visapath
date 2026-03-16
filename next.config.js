/** @type {import('next').NextConfig} */
const nextConfig = {
  // ISR: revalidate pages every 7 days
  experimental: {
    // Enable large page generation without timeout
    isrMemoryCacheSize: 256,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
    ],
  },
  // Redirect www to non-www
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.visapath.io' }],
        destination: 'https://visapath.io/:path*',
        permanent: true,
      },
    ];
  },
  // Cache static JSON aggressively
  async headers() {
    return [
      {
        source: '/visa/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=604800, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
