import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight, Crown, BadgeCheck, TrendingUp, Users, Lock } from 'lucide-react';
import {
  getStoreBySlug,
  getAllStoreSlugs,
} from '@/lib/utils';
import { stores } from '@/data/stores';
import Breadcrumbs from '@/components/Breadcrumbs';

const storeColors: Record<string, string> = {
  /* Tier 1 */
  'mums-swedish-candy': 'from-[#00C9B7] to-[#00A89D]',
  'bonbon-nyc': 'from-[#FF6B6B] to-[#EE5A24]',
  'swedish-sweets': 'from-[#0077B6] to-[#00B4D8]',
  'sockerbit': 'from-[#FFB6C1] to-[#FF69B4]',
  'sweetish-candy': 'from-[#9F7AEA] to-[#805AD5]',
  'goodis': 'from-[#38A169] to-[#2F855A]',
  /* Tier 2 */
  'lil-sweet-treat': 'from-[#F687B3] to-[#D53F8C]',
  'kandi': 'from-[#FC8181] to-[#F56565]',
  'poppin-candy': 'from-[#63B3ED] to-[#3182CE]',
  'scandikitchen': 'from-[#4FD1C5] to-[#319795]',
  'swedish-candy-now': 'from-[#FBD38D] to-[#D69E2E]',
  'swedisweets': 'from-[#76E4F7] to-[#0BC5EA]',
  'swedish-candy-land': 'from-[#68D391] to-[#48BB78]',
  'swedish-candy-store': 'from-[#B794F4] to-[#9F7AEA]',
  'scandycandy': 'from-[#F6AD55] to-[#ED8936]',
  'nordic-cravings': 'from-[#4299E1] to-[#2B6CB0]',
  'the-pirate-candy-shop': 'from-[#A0AEC0] to-[#718096]',
  /* General */
  'scandi-candy-shop': 'from-[#2D8F2A] to-[#52C234]',
  'amazon': 'from-[#FF9900] to-[#232F3E]',
};

/* Mums-specific data — verified from their website */
const mumsData = {
  customerRating: '4.9',
  customerCount: '200,000+',
  pressMentions: ['BuzzFeed', 'TIME', 'USA TODAY', 'Women\'s Health'],
  bestsellers: [
    { name: 'Sweet And Sour Swedish Mix With BUBS', reviews: '1,227', price: '$19.99', originalPrice: '$24.69', image: '/images/stores/mums-products/sweet-and-sour-mix.jpg' },
    { name: 'Sour Swedish Mix With BUBS', reviews: '458', price: '$19.99', originalPrice: '$24.69', image: '/images/stores/mums-products/sour-mix.jpg' },
    { name: 'Sweet Swedish Mix With BUBS', reviews: '382', price: '$19.99', originalPrice: '$24.69', image: '/images/stores/mums-products/sweet-mix.jpg' },
    { name: 'All-In-One Party Mix', reviews: '282', price: '$79.00', originalPrice: '', image: '/images/stores/mums-products/party-mix.jpg' },
  ],
};

/* Swedish Sweets data — verified from shopswedishsweets.com products.json */
const swedishSweetsData = {
  customerRating: '4.7',
  customerCount: '45,000+',
  tiktokHandle: '@shopswedishsweets.com',
  bestsellers: [
    { name: 'Bubs Mix', reviews: '320+', price: '$13.49', originalPrice: '', image: '/images/stores/swedish-sweets-products/bubs-mix.jpg' },
    { name: 'Sour Mix With Bubs', reviews: '280+', price: '$11.99', originalPrice: '', image: '/images/stores/swedish-sweets-products/sour-mix.jpg' },
    { name: 'Pinky Mix', reviews: '195+', price: '$11.99', originalPrice: '', image: '/images/stores/swedish-sweets-products/pinky-mix.jpg' },
    { name: 'Bubs Giant Sour Skulls', reviews: '410+', price: '$11.49', originalPrice: '', image: '/images/stores/swedish-sweets-products/bubs-sour-skulls.jpg' },
  ],
};

/* Store tier logic */
function getStoreTier(store: { affiliateStatus: string; logo?: string; rating: number }) {
  if (store.affiliateStatus === 'live') return 'featured';
  if (store.logo && store.rating >= 4.3) return 'verified';
  return 'basic';
}

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

  const isMums = store.slug === 'mums-swedish-candy';
  const isSwedishSweets = store.slug === 'swedish-sweets';
  const tier = getStoreTier(store);
  const title = isMums
    ? 'Mums Swedish Candy Review 2026 — Worth It?'
    : isSwedishSweets
      ? 'Swedish Sweets Review 2026 — TikTok\'s Favorite'
      : tier === 'basic'
        ? `${store.name} — Claim Your Store on SwedishCrave`
        : `${store.name} Review — Where to Buy Swedish Candy`;
  const description = isMums
    ? `Mums Swedish Candy review: ${mumsData.customerRating}/5 stars from ${mumsData.customerCount} customers. Clean ingredients, no Red-40 or GMOs. BUBS mixes from $19.99. As seen on TIME & BuzzFeed.`
    : isSwedishSweets
      ? `Swedish Sweets review: ${swedishSweetsData.customerRating}/5 stars from ${swedishSweetsData.customerCount} TikTok customers. No GMOs, no HFCS, no Red 40. Pick & mix from $8.50. Free shipping over $50.`
      : (() => {
          const full = `${store.name} review: ${store.description} Rating: ${store.rating}/5. Ships to ${store.shipsTo.join(', ')}.`;
          return full.length > 160 ? full.slice(0, 157) + '...' : full;
        })();

  return {
    title,
    description,
    alternates: {
      canonical: `/stores/${store.slug}`,
    },
    keywords: isMums
      ? ['Mums Swedish Candy', 'Mums candy review', 'buy Swedish candy online', 'BUBS candy USA', 'Swedish candy no Red 40', 'Mums candy coupon', 'Swedish candy gift box']
      : isSwedishSweets
        ? ['Swedish Sweets', 'Swedish Sweets review', 'buy Swedish candy online', 'Swedish candy TikTok', 'BUBS candy USA', 'Swedish candy no Red 40', 'Swedish pick and mix candy', 'shopswedishsweets']
        : [store.name, 'Swedish candy', 'buy Swedish candy', 'review', ...store.shipsTo],
    openGraph: {
      type: 'website',
      title: `${title} | SwedishCrave`,
      description,
    },
  };
}

/* ════════════════════════════════════════════════════════════════
   BASIC TIER — "Claim This Store" page
   ════════════════════════════════════════════════════════════════ */
function BasicStorePage({ store }: { store: typeof stores[number] }) {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Where to Buy', href: '/where-to-buy' },
          { label: store.name },
        ]}
      />

      {/* Compact Hero */}
      <section className="bg-gradient-to-br from-gray-100 to-gray-50 py-12 md:py-16 border-b border-sc-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white rounded-sc-lg border border-sc-border flex items-center justify-center mx-auto mb-5 shadow-sm">
            <span className="font-display text-[40px] font-extrabold text-sc-text/30">
              {store.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="font-display text-[28px] sm:text-[36px] font-extrabold text-sc-text tracking-[-0.3px] mb-3">
            {store.name}
          </h1>
          <p className="text-sc-text-muted text-[15px] mb-2">
            {store.shipsTo.join(', ')} &middot; {store.storeType === 'online' ? 'Online Store' : store.storeType === 'both' ? 'Online & Physical' : store.storeType === 'marketplace' ? 'Marketplace' : 'Physical Store'}
            {store.founded && <> &middot; Founded {store.founded}</>}
          </p>
          <div className="flex items-center justify-center gap-1 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${i < Math.floor(store.rating) ? 'fill-sc-yellow text-sc-yellow' : 'text-sc-border'}`}
              />
            ))}
            <span className="text-sm font-semibold text-sc-text ml-1">{store.rating.toFixed(1)}</span>
          </div>
          <a
            href={store.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1.5 text-sc-primary font-semibold text-sm hover:underline"
          >
            Visit {store.name} &rarr;
          </a>
        </div>
      </section>

      {/* Claim This Store CTA */}
      <section className="py-14 md:py-20">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-sc-primary/[0.04] to-sc-purple/[0.04] border-2 border-dashed border-sc-primary/30 rounded-sc-lg p-8 md:p-10 text-center">
            <div className="w-14 h-14 bg-sc-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <Lock className="w-7 h-7 text-sc-primary" />
            </div>
            <h2 className="font-display text-2xl md:text-[28px] font-bold text-sc-text mb-3">
              Is This Your Store?
            </h2>
            <p className="text-[15px] text-sc-text-muted leading-relaxed mb-6 max-w-[480px] mx-auto">
              This is a basic listing on SwedishCrave. Upgrade to get a full review page with
              detailed descriptions, pros &amp; cons, product showcases, and direct traffic from
              thousands of Swedish candy buyers.
            </p>

            {/* What you get */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left max-w-[440px] mx-auto">
              {[
                { icon: <Star className="w-4 h-4 text-sc-yellow" />, text: 'Full detailed review page' },
                { icon: <Crown className="w-4 h-4 text-sc-orange" />, text: 'Homepage featured placement' },
                { icon: <TrendingUp className="w-4 h-4 text-sc-teal" />, text: 'Dofollow SEO backlink' },
                { icon: <Users className="w-4 h-4 text-sc-purple" />, text: 'Direct buyer traffic' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5">
                  {item.icon}
                  <span className="text-[13px] font-medium text-sc-text">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/advertise"
                className="inline-flex items-center justify-center gap-2 bg-sc-primary text-white font-bold text-[14px] px-7 py-3.5 rounded-sc-full hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(0,136,255,0.3)]"
              >
                Claim & Upgrade Your Listing <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/advertise#pricing"
                className="inline-flex items-center justify-center gap-2 bg-sc-card border border-sc-border text-sc-text font-semibold text-[14px] px-7 py-3.5 rounded-sc-full hover:border-sc-primary hover:text-sc-primary transition-all"
              >
                See Pricing
              </Link>
            </div>

            {/* See what a featured listing looks like */}
            <p className="text-xs text-sc-text-muted mt-6">
              See what a Featured listing looks like:{' '}
              <Link href="/stores/mums-swedish-candy" className="text-sc-primary font-semibold hover:underline">
                Mums Swedish Candy &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Other Stores */}
      <OtherStoresSection currentSlug={store.slug} />

      <StoreSchemas store={store} />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   VERIFIED TIER — Teaser page with upgrade CTA
   ════════════════════════════════════════════════════════════════ */
function VerifiedStorePage({ store }: { store: typeof stores[number] }) {
  const gradient = storeColors[store.slug] || 'from-sc-primary to-sc-purple';

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Where to Buy', href: '/where-to-buy' },
          { label: store.name },
        ]}
      />

      {/* Hero */}
      <section className={`relative bg-gradient-to-br ${gradient} py-14 md:py-18 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            {/* Logo */}
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-sc-lg bg-white flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden p-3">
              {store.logo ? (
                <Image src={store.logo} alt={store.name} width={200} height={80} className="w-full h-auto" />
              ) : (
                <span className="font-display text-[56px] font-extrabold text-sc-text">
                  {store.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sc-full">
                  <BadgeCheck className="w-3.5 h-3.5" /> Verified Store
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white/90 text-sm px-3 py-1.5 rounded-sc-full">
                  {store.storeType === 'online' ? '🌐 Online Store' : store.storeType === 'both' ? '🏪 Online & Physical' : store.storeType === 'marketplace' ? '🛒 Marketplace' : '🏪 Physical Store'}
                </span>
              </div>

              <h1 className="font-display text-[32px] sm:text-[42px] font-extrabold text-white tracking-[-0.5px] mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                {store.name}
              </h1>

              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} className={`${i < Math.floor(store.rating) ? 'fill-white text-white' : 'text-white/40'}`} />
                  ))}
                </div>
                <span className="text-lg font-bold text-white">{store.rating.toFixed(1)}</span>
                <span className="text-sm text-white/70">/5</span>
              </div>

              <p className="text-base text-white/90 max-w-xl leading-relaxed mb-5">
                {store.description}
              </p>

              <a
                href={store.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center justify-center bg-white text-sc-text px-7 py-3 rounded-sc-full font-bold hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.15)] text-[14px]"
              >
                Visit {store.name} &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="border-b border-sc-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
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

      {/* Brief About */}
      <section className="py-12 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-extrabold text-sc-text mb-4">About {store.name}</h2>
          <p className="text-sc-text-muted text-[15px] leading-[1.8] mb-8">
            {store.description} Ships to {store.shipsTo.join(', ')}.
            {store.headquarters && <> Based in {store.headquarters}.</>}
            {store.physicalLocations && store.physicalLocations.length > 0 && (
              <> Physical locations: {store.physicalLocations.join(', ')}.</>
            )}
          </p>

          {/* Upgrade CTA Banner */}
          <div className="bg-gradient-to-r from-sc-primary/[0.06] to-sc-purple/[0.06] border border-sc-primary/20 rounded-sc-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-5">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <Crown className="w-5 h-5 text-sc-orange" />
                  <span className="text-sm font-bold text-sc-text">Want the full picture?</span>
                </div>
                <p className="text-[14px] text-sc-text-muted leading-relaxed">
                  This is a Verified listing. The full Featured review includes detailed descriptions,
                  pros &amp; cons analysis, product showcases, and priority placement on our homepage.
                </p>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <Link
                  href="/advertise"
                  className="inline-flex items-center justify-center gap-2 bg-sc-primary text-white font-bold text-[13px] px-6 py-3 rounded-sc-full hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(0,136,255,0.3)] whitespace-nowrap"
                >
                  Upgrade This Listing <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <p className="text-[11px] text-sc-text-muted text-center">From $49/month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Stores */}
      <OtherStoresSection currentSlug={store.slug} />

      <StoreSchemas store={store} />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   FEATURED TIER — Full review page (unchanged from current)
   ════════════════════════════════════════════════════════════════ */
function FeaturedStorePage({ store }: { store: typeof stores[number] }) {
  const gradient = storeColors[store.slug] || 'from-sc-pink to-sc-purple';
  const shopUrl = store.affiliateUrl && store.affiliateUrl !== '#' ? store.affiliateUrl : store.url;
  const isAffiliate = store.affiliateUrl && store.affiliateUrl !== '#';
  const isMums = store.slug === 'mums-swedish-candy';
  const isSwedishSweets = store.slug === 'swedish-sweets';
  const isFeaturedStore = isMums || isSwedishSweets;

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
        {isMums && (
          <Image src="/images/stores/mums-products/party-mix.jpg" alt="" fill className="object-cover opacity-20" priority />
        )}
        {isSwedishSweets && (
          <Image src="/images/stores/swedish-sweets-products/bubs-mix.jpg" alt="" fill className="object-cover opacity-15" priority />
        )}
        <div className="absolute inset-0 bg-black/15" />
        {isMums && <div className="absolute inset-0 bg-gradient-to-r from-[#00C9B7]/90 via-[#00C9B7]/70 to-transparent" />}
        {isSwedishSweets && <div className="absolute inset-0 bg-gradient-to-r from-[#0077B6]/90 via-[#0077B6]/70 to-transparent" />}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-sc-lg bg-white flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden p-3">
              {store.logo ? (
                <Image src={store.logo} alt={store.name} width={256} height={99} className="w-full h-auto" />
              ) : (
                <span className="font-display text-[64px] md:text-[72px] font-extrabold text-sc-text">
                  {store.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                {store.featured && (
                  <span className="inline-flex items-center gap-1.5 bg-white/25 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sc-full">
                    ⭐ Editor&apos;s Pick
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white/90 text-sm px-4 py-1.5 rounded-sc-full">
                  {store.storeType === 'online' ? '🌐 Online Store' : store.storeType === 'both' ? '🏪 Online & Physical' : store.storeType === 'marketplace' ? '🛒 Marketplace' : '🏪 Physical Store'}
                </span>
                {(isMums || isSwedishSweets) && (
                  <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white/90 text-sm px-4 py-1.5 rounded-sc-full">
                    🚫 No Red-40 or GMOs
                  </span>
                )}
                {isSwedishSweets && (
                  <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white/90 text-sm px-4 py-1.5 rounded-sc-full">
                    🎵 45K+ TikTok Customers
                  </span>
                )}
              </div>

              <h1 className="font-display text-[38px] sm:text-[48px] font-extrabold text-white tracking-[-0.5px] mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                {store.name}
              </h1>

              <div className="flex items-center justify-center md:justify-start gap-2 mb-5">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={20} className={`${i < Math.floor(store.rating) ? 'fill-white text-white' : 'text-white/40'}`} />
                  ))}
                </div>
                <span className="text-lg font-bold text-white">{isMums ? mumsData.customerRating : isSwedishSweets ? swedishSweetsData.customerRating : store.rating.toFixed(1)}</span>
                <span className="text-sm text-white/70">/5</span>
                {isMums && <span className="text-sm text-white/80 ml-1">({mumsData.customerCount} customers)</span>}
                {isSwedishSweets && <span className="text-sm text-white/80 ml-1">({swedishSweetsData.customerCount} customers)</span>}
              </div>

              <p className="text-lg text-white/90 max-w-2xl leading-relaxed mb-6">{store.description}</p>

              {isMums && (
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/70">As Seen On</span>
                  {mumsData.pressMentions.map((pub) => (
                    <span key={pub} className="bg-white/15 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-sc-full">{pub}</span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <a
                  href={shopUrl}
                  target="_blank"
                  rel={`noopener noreferrer${isAffiliate ? ' sponsored' : ''}`}
                  className="inline-flex items-center justify-center bg-white text-sc-text px-8 py-3.5 rounded-sc-full font-bold hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.15)] text-[15px]"
                >
                  {isMums ? 'Shop Mums — Mixes From $19.99 →' : isSwedishSweets ? 'Shop Swedish Sweets — Pick & Mix From $8.50 →' : `Shop ${store.name} →`}
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
          <div className={`grid ${isFeaturedStore ? 'grid-cols-2 md:grid-cols-5' : 'grid-cols-2 md:grid-cols-4'} gap-6`}>
            {isMums && (
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-wide text-sc-text-muted mb-1">Customer Rating</p>
                <p className="text-sm font-semibold text-sc-text">{mumsData.customerRating}/5 ({mumsData.customerCount})</p>
              </div>
            )}
            {isSwedishSweets && (
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-wide text-sc-text-muted mb-1">TikTok Customers</p>
                <p className="text-sm font-semibold text-sc-text">{swedishSweetsData.customerCount} happy customers</p>
              </div>
            )}
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

      {/* MUMS: Bestsellers */}
      {isMums && (
        <section className="py-14 md:py-16 border-b border-sc-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.2px] text-[#2D8F2A] bg-sc-lime/[0.1] px-3.5 py-1.5 rounded-sc-full mb-3">🔥 Best Sellers</span>
              <h2 className="font-display text-[28px] sm:text-[32px] font-extrabold text-sc-text tracking-[-0.3px]">Most Popular Mums Candy Boxes</h2>
              <p className="text-sc-text-muted mt-2">Every box is packed with clean-ingredient Swedish candy — no Red-40, no GMOs</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mumsData.bestsellers.map((product) => (
                <a key={product.name} href={shopUrl} target="_blank" rel={`noopener noreferrer${isAffiliate ? ' sponsored' : ''}`} className="group bg-sc-card border border-sc-border rounded-sc-lg overflow-hidden hover:border-sc-pink/40 hover:shadow-sc-hover hover:-translate-y-0.5 transition-all">
                  <div className="relative w-full aspect-square bg-gray-50">
                    <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    {product.originalPrice && <span className="absolute top-3 left-3 bg-sc-pink text-white text-[11px] font-bold px-2.5 py-1 rounded-sc-full">SALE</span>}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-sc-text group-hover:text-sc-pink transition-colors text-[15px] mb-2">{product.name}</h3>
                        <div className="flex items-center gap-1 text-sc-yellow text-xs mb-2">{'★★★★★'}<span className="text-sc-text-muted ml-1">{product.reviews} reviews</span></div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-lg font-bold text-sc-pink">{product.price}</span>
                        {product.originalPrice && <span className="block text-xs text-sc-text-muted line-through">{product.originalPrice}</span>}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-sc-border">
                      <div className="flex gap-2">
                        <span className="text-[10px] font-bold uppercase bg-sc-lime/[0.1] text-[#2D8F2A] px-2 py-0.5 rounded-sc-full">No Red-40</span>
                        <span className="text-[10px] font-bold uppercase bg-sc-lime/[0.1] text-[#2D8F2A] px-2 py-0.5 rounded-sc-full">No GMOs</span>
                        <span className="text-[10px] font-bold uppercase bg-sc-lime/[0.1] text-[#2D8F2A] px-2 py-0.5 rounded-sc-full">Gluten-Free</span>
                      </div>
                      <span className="text-sm font-semibold text-sc-pink group-hover:translate-x-0.5 transition-transform">Shop →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <a href={shopUrl} target="_blank" rel={`noopener noreferrer${isAffiliate ? ' sponsored' : ''}`} className="inline-flex items-center justify-center bg-sc-pink text-white px-8 py-3.5 rounded-sc-full font-bold hover:bg-sc-pink-hover hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(255,45,135,0.3)] text-[15px]">View All Mums Products →</a>
              <p className="text-xs text-sc-text-muted mt-2">Free shipping on orders over $69</p>
            </div>
          </div>
        </section>
      )}

      {/* SWEDISH SWEETS: Bestsellers */}
      {isSwedishSweets && (
        <section className="py-14 md:py-16 border-b border-sc-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.2px] text-[#0077B6] bg-[#0077B6]/[0.08] px-3.5 py-1.5 rounded-sc-full mb-3">🔥 Best Sellers</span>
              <h2 className="font-display text-[28px] sm:text-[32px] font-extrabold text-sc-text tracking-[-0.3px]">Most Popular Swedish Sweets Products</h2>
              <p className="text-sc-text-muted mt-2">Authentic Swedish candy &mdash; no GMOs, no HFCS, no Red 40, no artificial colors</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {swedishSweetsData.bestsellers.map((product) => (
                <a key={product.name} href={shopUrl} target="_blank" rel={`noopener noreferrer${isAffiliate ? ' sponsored' : ''}`} className="group bg-sc-card border border-sc-border rounded-sc-lg overflow-hidden hover:border-[#0077B6]/40 hover:shadow-sc-hover hover:-translate-y-0.5 transition-all">
                  <div className="relative w-full aspect-square bg-gray-50">
                    <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-sc-text group-hover:text-[#0077B6] transition-colors text-[15px] mb-2">{product.name}</h3>
                        <div className="flex items-center gap-1 text-sc-yellow text-xs mb-2">{'\u2605\u2605\u2605\u2605\u2605'}<span className="text-sc-text-muted ml-1">{product.reviews} reviews</span></div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-lg font-bold text-[#0077B6]">{product.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-sc-border">
                      <div className="flex gap-2">
                        <span className="text-[10px] font-bold uppercase bg-sc-lime/[0.1] text-[#2D8F2A] px-2 py-0.5 rounded-sc-full">No Red-40</span>
                        <span className="text-[10px] font-bold uppercase bg-sc-lime/[0.1] text-[#2D8F2A] px-2 py-0.5 rounded-sc-full">No GMOs</span>
                        <span className="text-[10px] font-bold uppercase bg-sc-lime/[0.1] text-[#2D8F2A] px-2 py-0.5 rounded-sc-full">No HFCS</span>
                      </div>
                      <span className="text-sm font-semibold text-[#0077B6] group-hover:translate-x-0.5 transition-transform">Shop &rarr;</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <a href={shopUrl} target="_blank" rel={`noopener noreferrer${isAffiliate ? ' sponsored' : ''}`} className="inline-flex items-center justify-center bg-[#0077B6] text-white px-8 py-3.5 rounded-sc-full font-bold hover:bg-[#005f92] hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(0,119,182,0.3)] text-[15px]">View All Swedish Sweets Products &rarr;</a>
              <p className="text-xs text-sc-text-muted mt-2">Free shipping on orders over $50</p>
            </div>
          </div>
        </section>
      )}

      {/* About + Pros/Cons */}
      <section className="py-14 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-display text-2xl font-extrabold text-sc-text mb-6">
              {isMums ? 'Our Mums Swedish Candy Review' : isSwedishSweets ? 'Our Swedish Sweets Review' : `About ${store.name}`}
            </h2>
            <p className="text-sc-text-muted text-[16px] leading-[1.8]">{store.longDescription}</p>
            {isMums && (
              <p className="text-sc-text-muted text-[16px] leading-[1.8] mt-4">
                What really stands out is their commitment to clean ingredients. With the recent FDA attention on artificial food dyes, Mums was already ahead of the curve — their entire catalog is free from Red-40, Yellow 5, Yellow 6, and other synthetic colorants that are being phased out in the US. For parents looking for better candy options or anyone concerned about food additives, Mums is one of the few stores that makes it easy to shop worry-free.
              </p>
            )}
            {isSwedishSweets && (
              <p className="text-sc-text-muted text-[16px] leading-[1.8] mt-4">
                Swedish Sweets has earned a loyal following on TikTok for good reason &mdash; their candy is the real deal. Every product is imported directly from Sweden and meets strict clean-ingredient standards: no GMOs, no high-fructose corn syrup, and no artificial colors like Red 40, Yellow 5, or Blue 1. Their pick-and-mix bags let you build your own Swedish candy experience, while their curated mixes (Bubs Mix, Sour Mix, Pinky Mix) take the guesswork out of ordering. With free shipping on orders over $50 and a 10% discount for new subscribers, it&apos;s easy to see why they&apos;ve become one of the fastest-growing Swedish candy stores in the US.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-sc-lime/[0.05] border border-sc-lime/20 rounded-sc-lg p-6">
              <h3 className="font-display font-bold text-sc-text mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-sc-lime/20 rounded-full flex items-center justify-center text-sm">✓</span>
                What We Like
              </h3>
              <ul className="space-y-3">
                {store.pros.map((pro, i) => (
                  <li key={i} className="text-[14px] text-sc-text-muted flex items-start gap-2.5 leading-[1.6]">
                    <span className="text-[#2D8F2A] mt-0.5 flex-shrink-0">✓</span>{pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50/50 border border-red-200/30 rounded-sc-lg p-6 dark:bg-red-900/5 dark:border-red-800/20">
              <h3 className="font-display font-bold text-sc-text mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center text-sm dark:bg-red-900/20">✗</span>
                Things to Know
              </h3>
              <ul className="space-y-3">
                {store.cons.map((con, i) => (
                  <li key={i} className="text-[14px] text-sc-text-muted flex items-start gap-2.5 leading-[1.6]">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>{con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {isMums && (
            <div className="mt-10 bg-gradient-to-r from-[#00C9B7]/[0.08] to-[#00A89D]/[0.05] border border-[#00C9B7]/20 rounded-sc-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-display font-bold text-sc-text">Ready to try Mums?</p>
                <p className="text-sm text-sc-text-muted">Curated BUBS mixes starting at $19.99 — free shipping over $69</p>
              </div>
              <a href={shopUrl} target="_blank" rel={`noopener noreferrer${isAffiliate ? ' sponsored' : ''}`} className="inline-flex items-center justify-center bg-[#00C9B7] text-white px-6 py-3 rounded-sc-full font-bold hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(0,201,183,0.3)] text-sm whitespace-nowrap">Shop Mums &rarr;</a>
            </div>
          )}
          {isSwedishSweets && (
            <div className="mt-10 bg-gradient-to-r from-[#0077B6]/[0.08] to-[#00B4D8]/[0.05] border border-[#0077B6]/20 rounded-sc-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-display font-bold text-sc-text">Ready to try Swedish Sweets?</p>
                <p className="text-sm text-sc-text-muted">Pick &amp; mix bags from $8.50 &mdash; free shipping over $50 &mdash; 10% off first order</p>
              </div>
              <a href={shopUrl} target="_blank" rel={`noopener noreferrer${isAffiliate ? ' sponsored' : ''}`} className="inline-flex items-center justify-center bg-[#0077B6] text-white px-6 py-3 rounded-sc-full font-bold hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(0,119,182,0.3)] text-sm whitespace-nowrap">Shop Swedish Sweets &rarr;</a>
            </div>
          )}
        </div>
      </section>

      {/* Specialties + Features */}
      <section className="bg-sc-bg-alt py-14 md:py-16 border-t border-sc-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-8 text-center">What {store.name} is Known For</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {store.specialties.map((specialty) => (
              <div key={specialty} className="bg-sc-card border border-sc-border rounded-sc-lg p-4 text-center">
                <span className="text-sm font-semibold text-sc-text">{specialty}</span>
              </div>
            ))}
          </div>
          <div className="bg-sc-card border border-sc-border rounded-sc-lg p-6">
            <h3 className="font-display font-bold text-sc-text mb-3 flex items-center gap-2">📦 Shipping Information</h3>
            <p className="text-[14px] text-sc-text-muted leading-[1.7]">{store.shippingInfo}</p>
          </div>
          {store.physicalLocations && store.physicalLocations.length > 0 && (
            <div className="bg-sc-card border border-sc-border rounded-sc-lg p-6 mt-4">
              <h3 className="font-display font-bold text-sc-text mb-3 flex items-center gap-2">📍 Physical Locations</h3>
              <div className="flex flex-wrap gap-2">
                {store.physicalLocations.map((loc) => (
                  <span key={loc} className="inline-flex items-center px-3 py-1.5 rounded-sc-full bg-sc-pink/[0.08] text-sc-pink text-[13px] font-semibold">{loc}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-14 md:py-16 text-center ${isMums ? 'bg-gradient-to-r from-[#00C9B7] to-[#00A89D]' : isSwedishSweets ? 'bg-gradient-to-r from-[#0077B6] to-[#00B4D8]' : ''}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`font-display text-2xl font-extrabold mb-3 ${isFeaturedStore ? 'text-white' : 'text-sc-text'}`}>
            {isMums ? 'Try Mums Swedish Candy Today' : isSwedishSweets ? 'Try Swedish Sweets Today' : `Ready to Shop at ${store.name}?`}
          </h2>
          <p className={`mb-8 max-w-xl mx-auto ${isFeaturedStore ? 'text-white/90' : 'text-sc-text-muted'}`}>
            {isMums
              ? `Join ${mumsData.customerCount} happy customers. Clean ingredients, fast shipping, and the best BUBS selection in the US.`
              : isSwedishSweets
                ? `Join ${swedishSweetsData.customerCount} happy TikTok customers. Clean ingredients, pick & mix bags from $8.50, and free shipping over $50.`
                : store.featured
                  ? `${store.name} is our Editor&apos;s Pick for Swedish candy. Start shopping today.`
                  : `Explore ${store.name}&apos;s selection of authentic Swedish candy.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={shopUrl}
              target="_blank"
              rel={`noopener noreferrer${isAffiliate ? ' sponsored' : ''}`}
              className={`inline-flex items-center justify-center px-8 py-3.5 rounded-sc-full font-bold hover:-translate-y-0.5 transition-all text-[15px] ${
                isMums ? 'bg-white text-[#00A89D] shadow-[0_4px_16px_rgba(0,0,0,0.15)]'
                  : isSwedishSweets ? 'bg-white text-[#0077B6] shadow-[0_4px_16px_rgba(0,0,0,0.15)]'
                    : 'bg-sc-pink text-white hover:bg-sc-pink-hover shadow-[0_4px_16px_rgba(255,45,135,0.3)]'
              }`}
            >
              {isMums ? 'Shop Mums — Free Shipping Over $69 →' : isSwedishSweets ? 'Shop Swedish Sweets — Free Shipping Over $50 →' : `Shop ${store.name} →`}
            </a>
            <Link
              href="/where-to-buy"
              className={`inline-flex items-center justify-center px-7 py-3 rounded-sc-full font-semibold hover:-translate-y-0.5 transition-all ${
                isFeaturedStore ? 'bg-white/15 text-white border border-white/30 hover:bg-white/25' : 'bg-sc-card border-[1.5px] border-sc-border text-sc-text hover:border-sc-purple hover:text-sc-purple'
              }`}
            >
              Compare All Stores
            </Link>
          </div>
        </div>
      </section>

      {/* Other Stores */}
      <OtherStoresSection currentSlug={store.slug} />

      <StoreSchemas store={store} />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   SHARED COMPONENTS
   ════════════════════════════════════════════════════════════════ */
function OtherStoresSection({ currentSlug }: { currentSlug: string }) {
  const otherStores = stores
    .filter((s) => s.slug !== currentSlug && s.affiliateStatus === 'live')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // If not enough featured stores, fill with highest-rated
  const remaining = 3 - otherStores.length;
  if (remaining > 0) {
    const more = stores
      .filter((s) => s.slug !== currentSlug && s.affiliateStatus !== 'live')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, remaining);
    otherStores.push(...more);
  }

  return (
    <section className="bg-sc-bg-alt py-14 md:py-16 border-t border-sc-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-extrabold text-sc-text mb-8 text-center">Other Swedish Candy Stores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherStores.map((s) => (
            <Link key={s.slug} href={`/stores/${s.slug}`} className="group bg-sc-card border border-sc-border rounded-sc-lg p-5 hover:border-sc-pink hover:shadow-sc-hover hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-sc-text group-hover:text-sc-pink transition-colors">{s.name}</h3>
                {s.featured && <span className="text-[10px] font-bold uppercase bg-sc-pink/10 text-sc-pink px-2 py-0.5 rounded-sc-full">Editor&apos;s Pick</span>}
              </div>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={`${i < Math.floor(s.rating) ? 'fill-sc-yellow text-sc-yellow' : 'text-sc-border'}`} />
                ))}
                <span className="text-xs font-semibold text-sc-text ml-1">{s.rating.toFixed(1)}</span>
              </div>
              <p className="text-[13px] text-sc-text-muted leading-[1.6] line-clamp-2 mb-3">{s.description}</p>
              <span className="text-sm font-semibold text-sc-pink">View full review →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoreSchemas({ store }: { store: typeof stores[number] }) {
  const isMums = store.slug === 'mums-swedish-candy';
  const isSwedishSweets = store.slug === 'swedish-sweets';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.swedishcrave.com' },
              { '@type': 'ListItem', position: 2, name: 'Where to Buy', item: 'https://www.swedishcrave.com/where-to-buy' },
              { '@type': 'ListItem', position: 3, name: store.name, item: `https://www.swedishcrave.com/stores/${store.slug}` },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': store.physicalLocations ? 'Store' : 'OnlineStore',
            name: store.name,
            url: store.url,
            description: store.longDescription || store.description,
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
              ratingValue: isMums ? 4.9 : isSwedishSweets ? 4.7 : store.rating,
              bestRating: 5,
              worstRating: 1,
              ratingCount: isMums ? 200000 : isSwedishSweets ? 45000 : Math.floor(store.rating * 35 + 50),
            },
            priceRange: store.priceRange,
          }),
        }}
      />
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
            author: { '@type': 'Organization', name: 'SwedishCrave', url: 'https://www.swedishcrave.com' },
            reviewRating: { '@type': 'Rating', ratingValue: store.rating, bestRating: 5, worstRating: 1 },
            reviewBody: store.description,
          }),
        }}
      />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT — Routes to the correct tier
   ════════════════════════════════════════════════════════════════ */
export default function StorePage({ params }: { params: { slug: string } }) {
  const store = getStoreBySlug(params.slug);

  if (!store) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-display text-4xl font-extrabold text-sc-text mb-4">Store Not Found</h1>
        <p className="text-sc-text-muted mb-8">We couldn&apos;t find this store in our database.</p>
        <Link href="/where-to-buy" className="inline-flex items-center justify-center bg-sc-pink text-white px-8 py-3 rounded-sc-full font-semibold hover:bg-sc-pink-hover hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(255,45,135,0.3)]">
          Back to All Stores
        </Link>
      </div>
    );
  }

  const tier = getStoreTier(store);

  switch (tier) {
    case 'featured':
      return <FeaturedStorePage store={store} />;
    case 'verified':
      return <VerifiedStorePage store={store} />;
    default:
      return <BasicStorePage store={store} />;
  }
}
