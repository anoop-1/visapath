'use client';
import { useEffect, useRef } from 'react';

/**
 * Google AdSense Ad Unit Component
 * Supports responsive, fixed, and in-article ad formats
 */
export default function AdUnit({ slot, format = 'auto', className = '' }) {
  const adRef = useRef(null);
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (!adsenseId || adsenseId.includes('XXXX')) return;
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      // AdSense not loaded yet — that's fine
    }
  }, [adsenseId]);

  if (!adsenseId || adsenseId.includes('XXXX')) {
    // Development placeholder
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm ${className}`}
           style={{ minHeight: '90px' }}>
        Ad Placement: {slot}
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

/**
 * In-Article Ad — designed to flow within content
 */
export function InArticleAd({ slot }) {
  return (
    <div className="my-8 mx-auto max-w-2xl">
      <AdUnit slot={slot} format="fluid" className="min-h-[250px]" />
    </div>
  );
}

/**
 * Sidebar Ad — fixed 300x250 rectangle
 */
export function SidebarAd({ slot }) {
  return (
    <div className="sticky top-4">
      <AdUnit slot={slot} format="rectangle" className="w-[300px] min-h-[250px]" />
    </div>
  );
}
