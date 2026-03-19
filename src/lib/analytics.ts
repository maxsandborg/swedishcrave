/**
 * Analytics utilities for SwedishCrave
 * Tracks affiliate clicks and custom events via GA4
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAffiliateClick(storeName: string, url: string, location: string) {
  // GA4 event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'affiliate_click', {
      store_name: storeName,
      affiliate_url: url,
      click_location: location, // e.g. 'store_card', 'article_cta', 'candy_page'
    });
  }
}

export function trackOutboundLink(url: string, label: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'outbound',
      event_label: label,
      transport_type: 'beacon',
      event_callback: () => {
        document.location.href = url;
      },
    });
  }
}
