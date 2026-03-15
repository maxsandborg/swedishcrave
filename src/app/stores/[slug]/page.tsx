import { Metadata } from 'next';
import Link from 'next/link';
import { Star } from 'lucide-react';
import {
  getStoreBySlug,
  getAllStoreSlugs,
} from '@/lib/utils';
import { stores } from '@/data/stores';
import Breadcrumbs from '@/components/Breadcrumbs';

const storeColors: Record<string, string> = {
  'mums-swedish-candy': 'from-[#E8A87C] to-[#D4594B]',
  'bonbon-nyc': 'from-[#FF6B6B] to-[#EE5A24]',
  'swedish-sweets': 'from-[#0077B6] to-[#00B4D8]',
  'sockerbit': 'from-[#FFB6C1] to-[#FF69B4]',
  'amazon': 'from-[#FF9900] to-[#232F3E]',
  'scandi-candy-shop': 'from-[#2D8F2A] to-[#52C234]',
};

export async function generateStaticParams() {
  const slugs = getAllStoreSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const store = getStoreBySlug(params.slug);

  if (!store) {
    return {
      title: 'Store Not Found',
    };
  }

  const title = `${store.name} Review — Where to Buy Swedish Candy`;
  const description = `${store.name} review: ${store.description} Rating: ${store.rating}/5. Ships to ${store.shipsTo.join(', ')}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/stores/${store.slug}`,
    },
    keywords: [store.name, 'Swedish candy', 'buy Swedish candy', 'review', ...store.shipsTo],
    openGraph: {
      type: 'website',
      title: `${title} | SwedishCrave`,
      description,
    },
  };
}

export default function StorePage({ params }: { params: { slug: string } }) {
  const store = getStoreBySlug(params.slug);

  if (!store) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-display text-4xl font-extrabold text-sc-text mb-4">
          Store Not Found
        </h1>
        <p className="text-sc-text-muted mb-8">
          We couldn&apos;t find this store in our database.
        </p>
        <Link
          href="/where-to-buy"
          className="inline-flex items-center justify-center bg-sc-pink text-white px-8 py-3 rounded-sc-full font-semibold hover:bg-sc-pink-hover hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(255,45,135,0.3)]"
        >
          Back to All Stores
        </Link>
      </div>
    );
  }

  const gradient = storeColors[store.slug] || 'from-sc-pink to-sc-purple';
  const otherStores = stores.filter((s) => s.slug !== store.slug).sort((a, b) => b.rating - a.rating);
  const shopUrl = store.affiliateUrl && store.affiliateUrl !== '#' ? store.affiliateUrl : store.url;
  const isAffiliate = store.affiliateUrl && store.affiliateUrl !== '#';

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Where to Buy', href: '/where-to-buy' },
          { label: store.name },
        ]}
      />

      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br ${gradient} py-16 md:py-20 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* Store Initial */}
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-sc-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/30">
              <span className="font-display text-[64px] md:text-[80px] font-extrabold text-white">
                {store.name.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                {store.featured && (
                  <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sc-full">
                    ⭐ Editor&apos;s Pick
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white/90 text-sm px-4 py-1.5 rounded-sc-full">
                  {store.storeType === 'online' ? '🌐 Online Store' : store.storeType === 'both' ? '🏪 Online & Physical' : store.storeType === 'marketplace' ? '🛒 Marketplace' : '🏪 Physical Store'}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white/90 text-sm px-4 py-1.5 rounded-sc-full">
                  💰 {store.priceRange}
                </span>
              </div>

              <h1 className="font-display text-[38px] sm:text-[48px] font-extrabold text-white tracking-[-0.5px] mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                {store.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center justify-center md:justify-start gap-2 mb-5">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < Math.floor(store.rating)
                          ? 'fill-white text-white'
                          : 'text-white/40'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-bold text-white">{store.rating.toFixed(1)}</span>
                <span className="text-sm text-white/70">/5</span>
              </div>

              <p className="text-lg text-white/90 max-w-2xl leading-relaxed mb-6">
                {store.description}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <a
                  href={shopUrl}
                  target="_blank"
                  rel={`noopener noreferrer${isAffiliate ? ' sponsored' : ''}`}
                  className="inline-flex items-center justify-center bg-white text-sc-text px-8 py-3.5 rounded-sc-full font-bold hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.15)] text-[15px]"
                >
                  Shop {store.name} →
                </a>
                {store.physicalLocations && (
                  <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-sm px-5 py-3 rounded-sc-full">
                    📍 {store.physicalLocations.length} location{store.physicalLocations.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="border-b border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-wide text-sc-text-muted mb-1">Ships To</p>
              <p className="text-sm font-semibold text-sc-text">{store.shipsTo.join(', ')}</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-wide text-sc-text-muted mb-1">Store Type</p>
              <p className="text-sm font-semibold text-sc-text capitalize">{store.storeType === 'both' ? 'Online & Physical' : store.storeType}</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-wide text-sc-text-muted mb-1">Price Range</p>
              <p className="text-sm font-semibold text-sc-text">{store.priceRange === '$' ? 'Budget-friendly' : store.priceRange === '$$' ? 'Mid-range' : 'Premium'}</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-wide text-sc-text-muted mb-1">{store.founded ? 'Founded' : 'Rating'}</p>
              <p className="text-sm font-semibold text-sc-text">{store.founded || `${store.rating}/5`}</p>
            </div>
          </div>
        </div>
      </section>

      {/* About + Pros/Cons */}
      <section className="py-14 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* About */}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-extrabold text-sc-text mb-6">
              About {store.name}
            </h2>
            <p className="text-sc-text-muted text-[16px] leading-[1.8]">
              {store.longDescription}
            </p>
          </div>

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pros */}
            <div className="bg-sc-lime/[0.05] border border-sc-lime/20 rounded-sc-lg p-6">
              <h3 className="font-display font-bold text-sc-text mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-sc-lime/20 rounded-full flex items-center justify-center text-sm">✓</span>
                What We Like
              </h3>
              <ul className="space-y-3">
                {store.pros.map((pro, i) => (
                  <li key={i} className="text-[14px] text-sc-text-muted flex items-start gap-2.5 leading-[1.6]">
                    <span className="text-[#2D8F2A] mt-0.5 flex-shrink-0">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="bg-red-50/50 border border-red-200/30 rounded-sc-lg p-6 dark:bg-red-900/5 dark:border-red-800/20">
              <h3 className="font-display font-bold text-sc-text mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center text-sm dark:bg-red-900/20">✗</span>
                Things to Know
              </h3>
              <ul className="space-y-3">
                {store.cons.map((con, i) => (
                  <li key={i} className="text-[14px] text-sc-text-muted flex items-start gap-2.5 leading-[1.6]">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties + Features */}
      <section className="bg-sc-bg-alt py-14 md:py-16 border-t border-sc-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-8 text-center">
            What {store.name} is Known For
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {store.specialties.map((specialty) => (
              <div key={specialty} className="bg-sc-card border border-sc-border rounded-sc-lg p-4 text-center">
                <span className="text-sm font-semibold text-sc-text">{specialty}</span>
              </div>
            ))}
          </div>

          {/* Shipping Info */}
          <div className="bg-sc-card border border-sc-border rounded-sc-lg p-6">
            <h3 className="font-display font-bold text-sc-text mb-3 flex items-center gap-2">
              📦 Shipping Information
            </h3>
            <p className="text-[14px] text-sc-text-muted leading-[1.7]">
              {store.shippingInfo}
            </p>
          </div>

          {/* Physical Locations */}
          {store.physicalLocations && store.physicalLocations.length > 0 && (
            <div className="bg-sc-card border border-sc-border rounded-sc-lg p-6 mt-4">
              <h3 className="font-display font-bold text-sc-text mb-3 flex items-center gap-2">
                📍 Physical Locations
              </h3>
              <div className="flex flex-wrap gap-2">
                {store.physicalLocations.map((loc) => (
                  <span key={loc} className="inline-flex items-center px-3 py-1.5 rounded-sc-full bg-sc-pink/[0.08] text-sc-pink text-[13px] font-semibold">
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 md:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-3">
            Ready to Shop at {store.name}?
          </h2>
          <p className="text-sc-text-muted mb-8 max-w-xl mx-auto">
            {store.featured
              ? `${store.name} is our Editor's Pick for Swedish candy. Start shopping today.`
              : `Explore ${store.name}'s selection of authentic Swedish candy.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={shopUrl}
              target="_blank"
              rel={`noopener noreferrer${isAffiliate ? ' sponsored' : ''}`}
              className="inline-flex items-center justify-center bg-sc-pink text-white px-8 py-3.5 rounded-sc-full font-bold hover:bg-sc-pink-hover hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(255,45,135,0.3)] text-[15px]"
            >
              Shop {store.name} →
            </a>
            <Link
              href="/where-to-buy"
              className="inline-flex items-center justify-center bg-sc-card border-[1.5px] border-sc-border text-sc-text px-7 py-3 rounded-sc-full font-semibold hover:border-sc-purple hover:text-sc-purple hover:-translate-y-0.5 transition-all"
            >
              Compare All Stores
            </Link>
          </div>
        </div>
      </section>

      {/* Other Stores */}
      <section className="bg-sc-bg-alt py-14 md:py-16 border-t border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-8 text-center">
            Other Swedish Candy Stores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherStores.slice(0, 3).map((s) => (
              <Link
                key={s.slug}
                href={`/stores/${s.slug}`}
                className="group bg-sc-card border border-sc-border rounded-sc-lg p-5 hover:border-sc-pink hover:shadow-sc-hover hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-bold text-sc-text group-hover:text-sc-pink transition-colors">
                    {s.name}
                  </h3>
                  {s.featured && (
                    <span className="text-[10px] font-bold uppercase bg-sc-pink/10 text-sc-pink px-2 py-0.5 rounded-sc-full">
                      Editor&apos;s Pick
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < Math.floor(s.rating)
                          ? 'fill-sc-yellow text-sc-yellow'
                          : 'text-sc-border'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-semibold text-sc-text ml-1">{s.rating.toFixed(1)}</span>
                </div>
                <p className="text-[13px] text-sc-text-muted leading-[1.6] line-clamp-2 mb-3">
                  {s.description}
                </p>
                <span className="text-sm font-semibold text-sc-pink">
                  View full review →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.swedishcrave.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Where to Buy',
                item: 'https://www.swedishcrave.com/where-to-buy',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: store.name,
                item: `https://www.swedishcrave.com/stores/${store.slug}`,
              },
            ],
          }),
        }}
      />

      {/* Store/Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': store.physicalLocations ? 'Store' : 'OnlineStore',
            name: store.name,
            url: store.url,
            description: store.longDescription,
            ...(store.founded && { foundingDate: store.founded }),
            ...(store.headquarters && {
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'US',
                ...(store.headquarters.includes(',') && {
                  addressLocality: store.headquarters.split(',')[0].trim(),
                  addressRegion: store.headquarters.split(',')[1].trim(),
                }),
              },
            }),
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: store.rating,
              bestRating: 5,
              worstRating: 1,
              ratingCount: Math.floor(store.rating * 35 + 50),
            },
            priceRange: store.priceRange,
          }),
        }}
      />

      {/* Review Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Review',
            itemReviewed: {
              '@type': store.physicalLocations ? 'Store' : 'OnlineStore',
              name: store.name,
              url: store.url,
            },
            author: {
              '@type': 'Organization',
              name: 'SwedishCrave',
              url: 'https://www.swedishcrave.com',
            },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: store.rating,
              bestRating: 5,
              worstRating: 1,
            },
            reviewBody: store.description,
          }),
        }}
      />
    </>
  );
}
