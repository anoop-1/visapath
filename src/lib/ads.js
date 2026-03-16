// VisaPath — Ad and Affiliate Configuration
// All ad placements, affiliate links, and monetization config in one place

export const AD_CONFIG = {
  adsenseId: process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-XXXXXXXXXXXXXXXX',

  // Ad slot IDs — create these in your AdSense account
  slots: {
    headerBanner: '1234567890',      // 728x90 leaderboard
    sidebarRect: '2345678901',       // 300x250 medium rectangle
    inContent: '3456789012',         // responsive in-article
    footerBanner: '4567890123',      // 728x90 leaderboard
    stickyBottom: '5678901234',      // 320x50 mobile sticky
    betweenSections: '6789012345',   // responsive between content sections
  },
};

export const AFFILIATE_CONFIG = {
  ivisa: {
    baseUrl: 'https://www.ivisa.com',
    affiliateId: process.env.NEXT_PUBLIC_IVISA_AFF_ID || '',
    // Build affiliate link for a specific country pair
    buildLink: (fromCode, toCode) =>
      `https://www.ivisa.com/apply-online/${toCode}?utm_source=visapath&utm_medium=affiliate&ref=${AFFILIATE_CONFIG.ivisa.affiliateId}`,
  },
  visahq: {
    baseUrl: 'https://www.visahq.com',
    affiliateId: process.env.NEXT_PUBLIC_VISAHQ_AFF_ID || '',
    buildLink: (fromCode, toCode) =>
      `https://www.visahq.com/${toCode.toLowerCase()}-visa?utm_source=visapath&ref=${AFFILIATE_CONFIG.visahq.affiliateId}`,
  },
};

// Structured data for ad placements per page type
export const AD_PLACEMENTS = {
  visaPairPage: ['headerBanner', 'inContent', 'sidebarRect', 'betweenSections', 'footerBanner'],
  nationalityHub: ['headerBanner', 'inContent', 'sidebarRect', 'footerBanner'],
  destinationHub: ['headerBanner', 'inContent', 'sidebarRect', 'footerBanner'],
  homepage: ['headerBanner', 'sidebarRect', 'footerBanner'],
};
