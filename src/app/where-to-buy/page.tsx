import { Metadata } from 'next';
import Link from 'next/link';
import { stores } from '@/data/stores';
import {
  Star,
  ArrowRight,
  ShoppingBag,
  Trophy,
  Truck,
  Package,
  Globe,
  Gift,
  Candy,
  Sparkles,
  CheckCircle,
  Clock,
  ShieldCheck,
  MapPin,
  ExternalLink,
  Zap,
  Heart,
  BookOpen,
  Cherry,
  Droplets,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Where to Buy Swedish Candy Online (2026 Guide)',
  description:
    'Find the best places to buy authentic Swedish candy online. Compare trusted retailers with fast US shipping, honest reviews, and exclusive discount codes.',
  keywords:
    'where to buy Swedish candy, buy Swedish candy online, Swedish candy stores, Mums Swedish Candy, Swedish Sweets, BonBon NYC',
};

// Star rating component
function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.3;
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < full
              ? 'fill-sc-yellow text-sc-yellow'
              : i === full && hasHalf
              ? 'fill-sc-yellow/50 text-sc-yellow'
              : 'text-gray-200'
          }`}
        />
      ))}
    </span>
  );
}

// Store icon mapping
const storeIcons: Record<string, React.ReactNode> = {
  'mums-swedish-candy': <Candy className="w-8 h-8 text-sc-primary" />,
  'swedish-sweets': <Globe className="w-8 h-8 text-sc-blue" />,
  'scandy-candy': <Package className="w-8 h-8 text-sc-teal" />,
  'swedish-candy-store': <ShoppingBag className="w-8 h-8 text-sc-purple" />,
  'bonbon-nyc': <Gift className="w-8 h-8 text-sc-pink" />,
  sockerbit: <Candy className="w-8 h-8 text-sc-orange" />,
  amazon: <Truck className="w-8 h-8 text-[#FF9900]" />,
};

// Store accent colors
const storeAccents: Record<string, { bg: string; border: string; badge: string }> = {
  'mums-swedish-candy': { bg: 'bg-sc-teal-soft', border: 'border-sc-teal/20', badge: 'bg-sc-teal text-white' },
  'swedish-sweets': { bg: 'bg-sc-blue-soft', border: 'border-sc-blue/20', badge: 'bg-sc-blue text-white' },
  'scandy-candy': { bg: 'bg-sc-green-soft', border: 'border-sc-green/20', badge: 'bg-sc-green text-white' },
  'swedish-candy-store': { bg: 'bg-sc-purple-soft', border: 'border-sc-purple/20', badge: 'bg-sc-purple text-white' },
  'bonbon-nyc': { bg: 'bg-sc-pink-soft', border: 'border-sc-pink/20', badge: 'bg-sc-pink text-white' },
  sockerbit: { bg: 'bg-sc-orange-soft', border: 'border-sc-orange/20', badge: 'bg-sc-orange text-white' },
  amazon: { bg: 'bg-sc-yellow-soft', border: 'border-sc-yellow/20', badge: 'bg-[#FF9900] text-white' },
};

export default function WhereToBuyPage() {
  // Mums is always featured first
  const mumsStore = stores.find((s) => s.slug === 'mums-swedish-candy');

  // Live affiliate stores (excluding Mums) first, then pending, then others
  const otherStores = stores
    .filter((s) => s.slug !== 'mums-swedish-candy')
    .sort((a, b) => {
      const statusOrder = { live: 0, pending: 1, none: 2 };
      const aOrder = statusOrder[a.affiliateStatus];
      const bOrder = statusOrder[b.affiliateStatus];
      if (aOrder !== bOrder) return aOrder - bOrder;
      return b.rating - a.rating;
    });

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="text-center max-w-[640px] mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-sc-yellow-soft text-sc-text font-semibold text-[13px] px-4 py-1.5 rounded-sc-full border border-sc-yellow mb-4">
            <ShoppingBag className="w-3.5 h-3.5 text-sc-orange" /> Trusted Retailers
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-[52px] font-bold leading-[1.1] text-sc-text mb-4">
            Where to Buy{' '}
            <span className="bg-gradient-to-r from-sc-primary to-sc-orange bg-clip-text text-transparent">
              Swedish Candy
            </span>
          </h1>
          <p className="text-lg text-sc-text-muted leading-relaxed max-w-[500px] mx-auto">
            We&apos;ve vetted every store for authenticity, shipping speed, and customer service. Here are our top picks for 2026.
          </p>
        </div>
      </section>

      {/* ========== MUMS — FEATURED STORE ========== */}
      {mumsStore && (
        <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-sc-lg border-2 border-[#B0EDE4] shadow-[0_12px_48px_rgba(0,201,183,0.1)] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left — Info */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-sc-teal-soft text-[#00897B] font-bold text-[11px] px-3.5 py-1.5 rounded-sc-full uppercase tracking-wide">
                    <Trophy className="w-3 h-3 fill-current" /> #1 Recommended
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-sc-green-soft text-sc-green font-bold text-[11px] px-3.5 py-1.5 rounded-sc-full uppercase tracking-wide">
                    <CheckCircle className="w-3 h-3" /> Affiliate Partner
                  </span>
                </div>

                <h2 className="font-display text-2xl md:text-[28px] font-bold text-sc-text mb-1">
                  {mumsStore.name}
                </h2>

                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={mumsStore.rating} />
                  <span className="text-sm font-semibold text-sc-text">{mumsStore.rating.toFixed(1)}</span>
                  <span className="text-[13px] text-sc-text-muted">&middot; {mumsStore.commission} commission</span>
                </div>

                <p className="text-[15px] text-sc-text-muted leading-relaxed mb-6">
                  {mumsStore.description}
                </p>

                <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
                  {mumsStore.features.slice(0, 4).map((feature) => (
                    <span key={feature} className="flex items-center gap-1.5 text-[13px] font-medium text-sc-text-muted">
                      <CheckCircle className="w-3.5 h-3.5 text-sc-teal" />
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <Truck className="w-4 h-4 text-sc-teal" />
                  <span className="text-[13px] font-medium text-sc-text-muted">
                    Ships to: {mumsStore.shipsTo.join(', ')}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={mumsStore.affiliateUrl}
                    target="_blank"
                    rel="sponsored noopener"
                    className="inline-flex items-center gap-2 bg-sc-teal text-white font-semibold text-[15px] px-7 py-3.5 rounded-sc-full hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    Shop Mums <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={mumsStore.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-sc-text font-semibold text-[15px] px-7 py-3.5 rounded-sc-full border-2 border-sc-border hover:border-sc-teal hover:text-sc-teal transition-all"
                  >
                    Visit Website <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right — Visual */}
              <div className="bg-gradient-to-br from-sc-teal-soft to-[#F0FDF9] p-6 md:p-8 flex flex-col justify-center">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'Sour Skulls', icon: <Zap className="w-6 h-6 text-sc-green" /> },
                    { name: 'Berry Mix', icon: <Cherry className="w-6 h-6 text-sc-pink" /> },
                    { name: 'Daim Bites', icon: <Heart className="w-6 h-6 text-[#8B5E3C]" /> },
                    { name: 'Salmiak', icon: <Droplets className="w-6 h-6 text-sc-blue" /> },
                    { name: 'Pick & Mix', icon: <Candy className="w-6 h-6 text-sc-orange" /> },
                    { name: 'Gift Box', icon: <Gift className="w-6 h-6 text-sc-primary" /> },
                  ].map((product) => (
                    <div
                      key={product.name}
                      className="bg-white rounded-sc-sm p-4 text-center shadow-sm hover:-translate-y-1 hover:rotate-[-2deg] hover:shadow-md transition-all"
                    >
                      <span className="block mx-auto mb-2 w-fit">{product.icon}</span>
                      <span className="text-[11px] font-bold text-sc-text block">{product.name}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 bg-white/80 rounded-sc-sm p-4 text-center">
                  <p className="text-[12px] text-sc-text-muted font-medium">
                    Use our link for the best deals &mdash; supporting SwedishCrave at no extra cost to you
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========== ALL OTHER STORES ========== */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-sc-yellow-soft text-sc-text font-semibold text-[13px] px-4 py-1.5 rounded-sc-full border border-sc-yellow mb-3">
              <Globe className="w-3.5 h-3.5 text-sc-orange" /> Compare Stores
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-sc-text">
              More Places to Shop
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {otherStores.map((store) => {
            const accent = storeAccents[store.slug] || storeAccents.amazon;
            const icon = storeIcons[store.slug] || <ShoppingBag className="w-8 h-8 text-sc-text-muted" />;
            const isLive = store.affiliateStatus === 'live';
            const isPending = store.affiliateStatus === 'pending';

            return (
              <div
                key={store.slug}
                className="bg-white rounded-sc-md overflow-hidden border border-sc-border hover:-translate-y-1 hover:shadow-xl transition-all flex flex-col"
              >
                {/* Card Header */}
                <div className={`${accent.bg} ${accent.border} border-b p-5 md:p-6`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="block">{icon}</span>
                    <div className="flex gap-1.5">
                      {isLive && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-sc-full bg-sc-green-soft text-sc-green uppercase tracking-wide">
                          <CheckCircle className="w-3 h-3" /> Partner
                        </span>
                      )}
                      {isPending && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-sc-full bg-sc-yellow-soft text-[#8A6D00] uppercase tracking-wide">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-bold text-sc-text mb-1">
                    {store.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <StarRating rating={store.rating} />
                    <span className="text-[13px] font-semibold text-sc-text">{store.rating.toFixed(1)}</span>
                    {store.commission !== 'Varies' && (
                      <span className="text-[12px] text-sc-text-muted">&middot; {store.commission}</span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 md:p-6 flex-1 flex flex-col">
                  <p className="text-[14px] text-sc-text-muted leading-relaxed mb-4 flex-1">
                    {store.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {store.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-sc-full bg-sc-bg text-sc-text-muted"
                      >
                        <CheckCircle className="w-3 h-3 text-sc-green" />
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Ships To */}
                  <div className="flex items-center gap-1.5 mb-5 text-[13px] text-sc-text-muted">
                    <MapPin className="w-3.5 h-3.5" />
                    Ships to: {store.shipsTo.join(', ')}
                  </div>

                  {/* CTA */}
                  {isLive ? (
                    <a
                      href={store.affiliateUrl}
                      target="_blank"
                      rel="sponsored noopener"
                      className="flex items-center justify-center gap-2 w-full bg-sc-primary text-white font-semibold text-[14px] py-3 rounded-sc-full hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                      Shop {store.name.split(' ')[0]} <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <a
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-white text-sc-text font-semibold text-[14px] py-3 rounded-sc-full border-2 border-sc-border hover:border-sc-primary hover:text-sc-primary transition-all"
                    >
                      Visit {store.name.split(' ')[0]} <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========== BUYING GUIDE ========== */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#1A1A2E] to-[#2D2D55] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[60px] bg-sc-bg" style={{ borderRadius: '0 0 50% 50%' }} />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white font-semibold text-[13px] px-4 py-1.5 rounded-sc-full mb-3">
              <BookOpen className="w-3.5 h-3.5" /> Buying Guide
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              How to Buy Swedish Candy Online
            </h2>
            <p className="text-white/60 max-w-[520px] mx-auto">
              Five tips to get the best experience ordering Swedish candy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <ShieldCheck className="w-9 h-9 text-[#4ADE80]" />,
                title: '1. Choose a Trusted Retailer',
                desc: 'Stick to the stores listed above — we\'ve vetted them for authenticity and customer service. Avoid unknown sellers on marketplaces.',
              },
              {
                icon: <Candy className="w-9 h-9 text-[#FFE347]" />,
                title: '2. Start with Iconic Flavors',
                desc: 'New to Swedish candy? Begin with Ahlgrens Bilar, Marabou Milk Chocolate, or BUBS Sour Skulls — classics for a reason.',
              },
              {
                icon: <Sparkles className="w-9 h-9 text-[#FF80B5]" />,
                title: '3. Explore by Category',
                desc: 'Try gummies first, then chocolate, then venture into licorice and salmiak. Each category has distinct flavor profiles.',
              },
              {
                icon: <Truck className="w-9 h-9 text-[#60A5FA]" />,
                title: '4. Check Shipping Details',
                desc: 'Most retailers ship within 3-5 business days. Keep chocolate orders cool in summer — upgrade to expedited if needed.',
              },
              {
                icon: <Gift className="w-9 h-9 text-[#C084FC]" />,
                title: '5. Try Subscription Boxes',
                desc: 'Several stores offer monthly candy boxes — a great way to discover new products at a discounted rate.',
              },
              {
                icon: <Heart className="w-9 h-9 text-[#FF80B5]" />,
                title: '6. Support Specialty Stores',
                desc: 'Buying from dedicated Swedish candy stores means fresher products, better selection, and supporting passionate importers.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white/[0.06] rounded-sc-md p-6 border border-white/[0.08] hover:bg-white/[0.1] hover:-translate-y-1 transition-all"
              >
                <span className="block mb-3 w-fit">{card.icon}</span>
                <h3 className="font-display text-base font-bold mb-1.5">{card.title}</h3>
                <p className="text-[13px] text-white/70 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="py-16 md:py-20">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 bg-sc-blue-soft text-sc-blue font-semibold text-[13px] px-4 py-1.5 rounded-sc-full border border-sc-blue/20 mb-3">
              <BookOpen className="w-3.5 h-3.5" /> FAQ
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-sc-text">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Is Swedish candy available on Amazon?',
                a: 'Yes, Amazon carries a wide selection of Swedish candy, often with Prime shipping. However, prices vary significantly and some sellers may not stock authentic products. We recommend checking reviews carefully and comparing prices with the specialized Swedish candy retailers listed above.',
              },
              {
                q: 'How long does shipping typically take?',
                a: 'Most specialty retailers ship within 3-5 business days domestically. International shipping from Sweden can take 1-3 weeks. Expedited options are usually available for an additional fee.',
              },
              {
                q: 'Can chocolate melt during shipping?',
                a: 'Quality retailers use insulated packaging and coolant to prevent melting, even in warm months. If ordering during summer, consider upgrading to expedited shipping for guaranteed freshness.',
              },
              {
                q: "What's the best way to store Swedish candy?",
                a: 'Keep chocolate and filled candies in a cool, dry place (ideally 60-70°F). Gummies and hard candies are more shelf-stable. Avoid direct sunlight. Most candies stay fresh for several months in proper conditions.',
              },
              {
                q: 'Are there bulk ordering options?',
                a: 'Yes, several retailers offer bulk pricing and custom gift boxes. Mums Swedish Candy and Swedish Sweets both offer bulk options, reducing per-unit costs for large orders — great for parties and events.',
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-sc-md border border-sc-border p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-display text-base font-bold text-sc-text mb-2">{faq.q}</h3>
                <p className="text-[14px] text-sc-text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-[680px] mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-sc-yellow-soft via-sc-orange-soft to-sc-pink-soft rounded-sc-lg p-10 md:p-12 text-center relative overflow-hidden">
            <span className="absolute top-4 left-6 opacity-20">
              <Candy className="w-8 h-8 text-sc-primary" />
            </span>
            <span className="absolute bottom-4 right-6 opacity-20">
              <Sparkles className="w-8 h-8 text-sc-orange" />
            </span>

            <h2 className="font-display text-2xl md:text-[28px] font-bold text-sc-text mb-2 relative z-10">
              Not Sure What to Try?
            </h2>
            <p className="text-[15px] text-sc-text-muted mb-6 relative z-10">
              Browse our candy reviews and find your perfect Swedish treat
            </p>
            <div className="flex flex-wrap justify-center gap-3 relative z-10">
              <Link
                href="/candy"
                className="inline-flex items-center gap-2 bg-sc-primary text-white font-semibold text-[15px] px-7 py-3.5 rounded-sc-full hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Candy className="w-5 h-5" /> Browse Candy
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 bg-white text-sc-text font-semibold text-[15px] px-7 py-3.5 rounded-sc-full border-2 border-sc-border hover:border-sc-primary hover:text-sc-primary transition-all"
              >
                Explore Categories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

