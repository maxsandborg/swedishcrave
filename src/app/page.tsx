import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedCandy } from '@/lib/utils';
import { categories } from '@/data/categories';
import { stores } from '@/data/stores';
import { brands } from '@/data/brands';
import { articles } from '@/data/articles';
import {
  Star,
  Flame,
  Store,
  ArrowRight,
  BookOpen,
  Candy,
  ShoppingBag,
  Sparkles,
  Heart,
  Trophy,
  Globe,
  MapPin,
  Palette,
  Zap,
  Droplets,
  Circle,
  FlaskConical,
  Cherry,
  Mail,
  Crown,
  BadgeCheck,
  Building2,
  Users,
  TrendingUp,
  Megaphone,
} from 'lucide-react';
import ExpandableStoreList from '@/components/ExpandableStoreList';

// Category color mapping for the gradient cards
const categoryColors: Record<string, { gradient: string; text: string; shadow: string }> = {
  gummies: {
    gradient: 'from-[#FECC02] to-[#FFE347]',
    text: 'text-[#5A4800]',
    shadow: 'shadow-[0_6px_20px_rgba(254,204,2,0.3)]',
  },
  chocolate: {
    gradient: 'from-[#8B5E3C] to-[#6B3F22]',
    text: 'text-[#FFF3E6]',
    shadow: 'shadow-[0_6px_20px_rgba(123,74,43,0.3)]',
  },
  sour: {
    gradient: 'from-[#22C55E] to-[#4ADE80]',
    text: 'text-[#052E16]',
    shadow: 'shadow-[0_6px_20px_rgba(34,197,94,0.3)]',
  },
  licorice: {
    gradient: 'from-[#1A1A2E] to-[#2D2D44]',
    text: 'text-[#F0F0F0]',
    shadow: 'shadow-[0_6px_20px_rgba(0,0,0,0.3)]',
  },
  salmiak: {
    gradient: 'from-[#2D7FF9] to-[#60A5FA]',
    text: 'text-white',
    shadow: 'shadow-[0_6px_20px_rgba(45,127,249,0.3)]',
  },
  classic: {
    gradient: 'from-[#FF4D9B] to-[#FF80B5]',
    text: 'text-white',
    shadow: 'shadow-[0_6px_20px_rgba(255,77,155,0.3)]',
  },
};

// Category icon component mapping
function CategoryIcon({ slug, className }: { slug: string; className?: string }) {
  const size = className || 'w-10 h-10';
  switch (slug) {
    case 'gummies':
      return <Cherry className={size} />;
    case 'chocolate':
      return <Heart className={size} />;
    case 'sour':
      return <Zap className={size} />;
    case 'licorice':
      return <Circle className={size} />;
    case 'salmiak':
      return <Droplets className={size} />;
    case 'classic':
      return <Star className={size} />;
    default:
      return <Candy className={size} />;
  }
}


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

export default function Home() {
  const featuredCandy = getFeaturedCandy().slice(0, 6);

  // Get 3 most recent articles for blog section
  const recentArticles = articles.slice(0, 3);

  // ── TIERED STORE LOGIC ──
  // Featured = affiliate partners (paying stores)
  const featuredStores = stores.filter((s) => s.affiliateStatus === 'live');
  // Verified = stores with logos + good data (free tier, incentivizes upgrade)
  const verifiedStores = stores.filter(
    (s) => s.affiliateStatus !== 'live' && s.logo && s.rating >= 4.3
  );
  // Listed = everyone else
  const listedStores = stores.filter(
    (s) => s.affiliateStatus !== 'live' && (!s.logo || s.rating < 4.3)
  );

  // Brand profiles — the big candy manufacturers (not stores)
  const featuredBrands = brands.filter((b) =>
    ['bubs', 'malaco', 'marabou', 'cloetta', 'fazer'].includes(b.slug)
  );

  // Premium partners — stores with logos (shown in trust strip)
  const partnerStores = stores.filter((s) => s.logo);

  // Blog card gradient backgrounds
  const blogGradients = [
    'bg-gradient-to-br from-[#FFE347] to-[#FF8C42]',
    'bg-gradient-to-br from-[#60A5FA] to-[#8B5CF6]',
    'bg-gradient-to-br from-[#4ADE80] to-[#22C55E]',
  ];

  return (
    <>
      {/* ========== 1. HERO — "#1 Swedish Candy Guide" ========== */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center min-h-[420px] md:min-h-[480px]">
          {/* Hero Text */}
          <div>
            <span className="inline-flex items-center gap-1.5 bg-sc-yellow-soft text-sc-text font-semibold text-[13px] px-4 py-1.5 rounded-sc-full border border-sc-yellow mb-4">
              <Crown className="w-3.5 h-3.5 text-sc-orange" /> #1 Swedish Candy Guide in the US
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-[52px] font-bold leading-[1.1] text-sc-text mb-5">
              Discover the{' '}
              <span className="bg-gradient-to-r from-sc-primary to-sc-orange bg-clip-text text-transparent">
                Sweetest Side
              </span>
              <br />
              of Sweden
            </h1>
            <p className="text-lg text-sc-text-muted leading-relaxed mb-7 max-w-[440px]">
              The most complete guide to Swedish candy stores, brands, and reviews. Trusted by {stores.length}+ stores and {brands.length} major brands.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="/where-to-buy"
                className="inline-flex items-center gap-2 bg-sc-primary text-white font-semibold text-base px-7 py-3.5 rounded-sc-full hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Store className="w-5 h-5" /> Find a Store
              </Link>
              <Link
                href="/candy"
                className="inline-flex items-center gap-2 bg-white text-sc-text font-semibold text-base px-7 py-3.5 rounded-sc-full border-2 border-sc-border hover:border-sc-primary hover:text-sc-primary transition-all"
              >
                <Candy className="w-5 h-5" /> Browse Candy
              </Link>
            </div>
            <div className="flex gap-7 items-center">
              <div className="flex items-center gap-2 text-sm text-sc-text-muted">
                <Store className="w-4 h-4 text-sc-teal" /> {stores.length} Stores
              </div>
              <div className="flex items-center gap-2 text-sm text-sc-text-muted">
                <Star className="w-4 h-4 fill-sc-yellow text-sc-yellow" /> {brands.length} Brands
              </div>
              <div className="flex items-center gap-2 text-sm text-sc-text-muted">
                <MapPin className="w-4 h-4 text-sc-blue" /> 100% Swedish
              </div>
            </div>
          </div>

          {/* Hero Visual - Animated Blob with Candy Grid */}
          <div className="relative flex justify-center items-center h-[380px] md:h-[440px]">
            {/* Floating candy decorations */}
            <span className="absolute top-[10%] right-[5%] opacity-40 animate-float-candy" style={{ animationDelay: '0s' }}>
              <Candy className="w-7 h-7 text-sc-pink" />
            </span>
            <span className="absolute bottom-[15%] left-[5%] opacity-40 animate-float-candy" style={{ animationDelay: '2s' }}>
              <Sparkles className="w-7 h-7 text-sc-yellow" />
            </span>
            <span className="absolute top-[50%] right-[2%] opacity-40 animate-float-candy" style={{ animationDelay: '4s' }}>
              <Heart className="w-6 h-6 text-sc-primary" />
            </span>

            {/* Blob shape */}
            <div className="w-[340px] h-[320px] sm:w-[400px] sm:h-[360px] md:w-[440px] md:h-[400px] bg-gradient-to-br from-sc-yellow-soft via-sc-orange-soft to-sc-pink-soft animate-blob-float flex items-center justify-center relative">
              {/* Real candy product grid inside blob */}
              <div className="grid grid-cols-2 gap-3 p-6 z-10">
                {[
                  { image: '/images/candy/ahlgrens-bilar.png', label: 'Ahlgrens Bilar', bg: 'bg-[#FFF8E1]' },
                  { image: '/images/candy/marabou-choklad.png', label: 'Marabou', bg: 'bg-[#F3E5F5]' },
                  { image: '/images/candy/bubs-skulls.png', label: 'BUBS Skulls', bg: 'bg-[#E8F5E9]' },
                  { image: '/images/candy/djungelvral.png', label: 'Djungelvrål', bg: 'bg-[#E3F2FD]' },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className={`w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px] ${item.bg} rounded-sc-md flex flex-col items-center justify-center shadow-md hover:scale-110 hover:-rotate-3 transition-transform cursor-pointer overflow-hidden ${i === 1 ? '-translate-y-3' : ''} ${i === 2 ? 'translate-y-2' : ''}`}
                  >
                    <Image
                      src={item.image}
                      alt={item.label}
                      width={80}
                      height={80}
                      className="object-contain w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] md:w-[76px] md:h-[76px]"
                    />
                    <span className="text-[10px] font-semibold text-sc-text-muted mt-0.5">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 2. STORE DIRECTORY — Where to Buy Swedish Candy ========== */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-sc-teal-soft to-sc-bg">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 bg-sc-teal-soft text-[#00897B] font-semibold text-[13px] px-4 py-1.5 rounded-sc-full border border-sc-teal/30 mb-3">
              <ShoppingBag className="w-3.5 h-3.5" /> Store Directory
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-sc-text mb-2">
              Where to Buy Swedish Candy
            </h2>
            <p className="text-sc-text-muted max-w-[560px] mx-auto">
              {stores.length} stores compared &mdash; from premium partners to independent shops
            </p>
          </div>

          {/* ── FEATURED STORES (Paid tier — affiliate partners) ── */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-4 h-4 text-sc-orange" />
              <h3 className="text-sm font-bold text-sc-text uppercase tracking-wide">Featured Partners</h3>
              <span className="text-[10px] font-semibold bg-sc-orange/10 text-sc-orange px-2 py-0.5 rounded-sc-full">Sponsored</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredStores.map((store) => (
                <div
                  key={store.slug}
                  className="bg-white rounded-sc-lg border-2 border-sc-teal/30 shadow-[0_8px_32px_rgba(0,201,183,0.08)] overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      {store.logo ? (
                        <div className="w-[60px] h-[60px] rounded-sc-sm bg-sc-bg border border-sc-border flex items-center justify-center overflow-hidden flex-shrink-0">
                          <Image
                            src={store.logo}
                            alt={store.name}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-[60px] h-[60px] rounded-sc-sm bg-sc-teal-soft flex items-center justify-center flex-shrink-0">
                          <Store className="w-7 h-7 text-sc-teal" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-bold text-sc-text">{store.name}</h4>
                          <Crown className="w-4 h-4 text-sc-orange flex-shrink-0" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <StarRating rating={store.rating} />
                          <span className="text-[13px] text-sc-text-muted">{store.rating.toFixed(1)}</span>
                          <span className="text-[11px] text-sc-text-muted/60">•</span>
                          <span className="text-[11px] text-sc-text-muted/60">{store.priceRange}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[14px] text-sc-text-muted leading-relaxed mb-4">{store.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {store.features.slice(0, 4).map((feature) => (
                        <span key={feature} className="text-[11px] font-medium bg-sc-teal-soft text-[#00897B] px-2.5 py-1 rounded-sc-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={store.affiliateUrl}
                        target="_blank"
                        rel="sponsored noopener"
                        className="inline-flex items-center gap-2 bg-sc-teal text-white font-semibold text-[14px] px-6 py-3 rounded-sc-full hover:shadow-lg hover:-translate-y-0.5 transition-all"
                      >
                        Shop {store.name.split(' ')[0]} <ArrowRight className="w-4 h-4" />
                      </a>
                      <Link
                        href={`/stores/${store.slug}`}
                        className="text-sc-text-muted text-[13px] font-semibold hover:text-sc-primary transition-colors"
                      >
                        Full review →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── VERIFIED STORES (Free tier — good data, incentivize upgrade) ── */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BadgeCheck className="w-4 h-4 text-sc-blue" />
              <h3 className="text-sm font-bold text-sc-text uppercase tracking-wide">Verified Stores</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {verifiedStores.slice(0, 8).map((store) => (
                <Link
                  key={store.slug}
                  href={`/stores/${store.slug}`}
                  className="group bg-white rounded-sc-md p-5 border border-sc-border hover:border-sc-blue hover:shadow-[0_8px_24px_rgba(45,127,249,0.1)] hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {store.logo ? (
                      <div className="w-[40px] h-[40px] rounded-sc-sm bg-sc-bg border border-sc-border flex items-center justify-center overflow-hidden flex-shrink-0">
                        <Image
                          src={store.logo}
                          alt={store.name}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-[40px] h-[40px] rounded-sc-sm bg-sc-blue-soft flex items-center justify-center flex-shrink-0">
                        <Store className="w-5 h-5 text-sc-blue" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-sc-text group-hover:text-sc-primary transition-colors truncate">{store.name}</h4>
                      <div className="flex items-center gap-1">
                        <StarRating rating={store.rating} />
                        <span className="text-[11px] text-sc-text-muted">{store.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[12px] text-sc-text-muted line-clamp-2 mb-3">{store.description.split('.')[0]}.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-sc-blue-soft text-sc-blue px-2 py-0.5 rounded-sc-full inline-flex items-center gap-1">
                      <BadgeCheck className="w-3 h-3" /> Verified
                    </span>
                    <span className="text-[11px] text-sc-text-muted/60">{store.priceRange}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── LISTED STORES (Basic listing — everyone else) ── */}
          {listedStores.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-sc-text-muted" />
                <h3 className="text-sm font-bold text-sc-text uppercase tracking-wide">More Stores</h3>
              </div>
              <ExpandableStoreList
                stores={listedStores.map((s) => ({ slug: s.slug, name: s.name, shipsTo: s.shipsTo }))}
                initialCount={6}
              />
            </div>
          )}

          <div className="text-center mt-6">
            <Link
              href="/where-to-buy"
              className="inline-flex items-center gap-2 text-sc-primary font-bold text-sm hover:gap-3 transition-all"
            >
              View full store comparison <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== 3. MOST POPULAR — Hero + grid layout with real images ========== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-sc-bg">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-sc-orange/10 text-sc-orange font-semibold text-[13px] px-4 py-1.5 rounded-sc-full border border-sc-orange/20 mb-3">
                <Flame className="w-3.5 h-3.5" /> Editor&apos;s Picks
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-sc-text">
                Most Popular Swedish Candy
              </h2>
              <p className="text-sc-text-muted mt-1 max-w-[480px]">
                Rated by our team &mdash; these are the Swedish candies worth trying first.
              </p>
            </div>
            <Link
              href="/candy"
              className="inline-flex items-center gap-1.5 text-sc-primary font-semibold text-sm hover:gap-2.5 transition-all shrink-0"
            >
              Browse all {featuredCandy.length > 6 ? '30+' : '33'} candies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredCandy.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
              {/* ── HERO CARD — #1 product gets spotlight ── */}
              <Link
                href={`/candy/${featuredCandy[0].slug}`}
                className="group relative bg-white rounded-sc-lg overflow-hidden border border-sc-border hover:border-sc-primary/40 hover:shadow-2xl transition-all row-span-2"
              >
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <span className="bg-sc-orange text-white text-[11px] font-bold px-3 py-1.5 rounded-sc-full inline-flex items-center gap-1 shadow-lg">
                    <Trophy className="w-3 h-3" /> #1 Pick
                  </span>
                  {featuredCandy[0].trending && (
                    <span className="bg-white/90 backdrop-blur-sm text-sc-text text-[11px] font-semibold px-3 py-1 rounded-sc-full inline-flex items-center gap-1 border border-sc-border">
                      <Flame className="w-3 h-3 text-sc-orange" /> Trending on TikTok
                    </span>
                  )}
                </div>
                <div className="h-[240px] lg:h-full lg:min-h-[340px] bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={featuredCandy[0].image}
                    alt={featuredCandy[0].name}
                    width={280}
                    height={280}
                    className="object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:bg-gradient-to-t lg:from-white lg:via-white/95 lg:to-transparent lg:pt-16 lg:pb-6 lg:px-6">
                  <div className="flex items-center gap-2 mb-1.5">
                    <StarRating rating={featuredCandy[0].rating.overall} />
                    <span className="text-sm font-semibold text-sc-text">{featuredCandy[0].rating.overall.toFixed(1)}</span>
                    <span className="text-xs text-sc-text-muted">&middot; {featuredCandy[0].brand}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-sc-text mb-1 group-hover:text-sc-primary transition-colors">
                    {featuredCandy[0].name}
                  </h3>
                  <p className="text-sm text-sc-text-muted mb-3 line-clamp-2">{featuredCandy[0].description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-sc-primary">{featuredCandy[0].priceRange}</span>
                      {featuredCandy[0].affiliateLinks[0] && (
                        <span className="text-xs text-sc-text-muted">at {featuredCandy[0].affiliateLinks[0].store}</span>
                      )}
                    </div>
                    <span className="bg-sc-primary text-white px-4 py-2 rounded-sc-full text-sm font-semibold group-hover:bg-sc-dark transition-colors inline-flex items-center gap-1.5">
                      Read Review <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* ── RIGHT COLUMN — 2x2 grid of remaining products ── */}
              <div className="grid grid-cols-2 gap-4">
                {featuredCandy.slice(1, 5).map((candy, i) => (
                  <Link
                    key={candy.slug}
                    href={`/candy/${candy.slug}`}
                    className="group bg-white rounded-sc-lg overflow-hidden border border-sc-border hover:border-sc-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  >
                    <div className="h-[120px] md:h-[140px] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
                      {i === 0 && candy.trending && (
                        <span className="absolute top-2 left-2 z-10 bg-sc-blue text-white text-[10px] font-bold px-2 py-0.5 rounded-sc-full inline-flex items-center gap-0.5">
                          <Flame className="w-2.5 h-2.5" /> Viral
                        </span>
                      )}
                      {i === 1 && (
                        <span className="absolute top-2 left-2 z-10 bg-sc-yellow text-sc-dark text-[10px] font-bold px-2 py-0.5 rounded-sc-full inline-flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5" /> Classic
                        </span>
                      )}
                      <Image
                        src={candy.image}
                        alt={candy.name}
                        width={140}
                        height={140}
                        className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <p className="text-[10px] font-semibold text-sc-text-muted/60 uppercase tracking-wider mb-0.5">{candy.brand}</p>
                      <h3 className="text-[14px] font-bold text-sc-text mb-1 group-hover:text-sc-primary transition-colors leading-tight">
                        {candy.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <StarRating rating={candy.rating.overall} />
                        <span className="text-[12px] font-medium text-sc-text-muted">{candy.rating.overall.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-sc-primary">
                          {candy.priceRange.split('\u2013')[0].trim()}
                        </span>
                        <span className="w-7 h-7 rounded-full bg-sc-primary/10 text-sc-primary flex items-center justify-center group-hover:bg-sc-primary group-hover:text-white transition-colors">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── DARK CTA STRIP — affiliate conversion push ── */}
          <div className="bg-gradient-to-r from-sc-dark to-[#2D2D4E] rounded-sc-lg p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mt-5">
            <div>
              <h3 className="text-white text-lg md:text-xl font-bold mb-1">
                Ready to try Swedish candy?
              </h3>
              <p className="text-white/50 text-sm">
                Free shipping from $69 at our partner stores. Every purchase supports SwedishCrave.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/stores/mums-swedish-candy"
                className="bg-sc-primary hover:bg-sc-primary/90 text-white px-6 py-3 rounded-sc-full text-sm font-bold transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
              >
                Shop Mums &mdash; Free Shipping <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/candy"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-sc-full text-sm font-semibold transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
              >
                Browse All Candy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 4. PREMIUM PARTNERS — Logo trust strip ========== */}
      <section className="py-10 md:py-12 bg-white border-y border-sc-border">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-sc-text-muted uppercase tracking-wider">
              Trusted by {partnerStores.length}+ Swedish candy stores &amp; brands
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {partnerStores.slice(0, 10).map((store) => (
              <Link
                key={store.slug}
                href={`/stores/${store.slug}`}
                className="group flex items-center justify-center h-[48px] w-[120px] md:w-[140px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
              >
                {store.logo ? (
                  <Image
                    src={store.logo}
                    alt={store.name}
                    width={120}
                    height={40}
                    className="object-contain max-h-[40px] w-auto"
                  />
                ) : (
                  <span className="text-sm font-bold text-sc-text-muted">{store.name}</span>
                )}
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/contact"
              className="text-sc-primary text-sm font-semibold hover:underline inline-flex items-center gap-1"
            >
              Want to be listed? Get in touch <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== 5. CATEGORIES ========== */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 bg-sc-yellow-soft text-sc-text font-semibold text-[13px] px-4 py-1.5 rounded-sc-full border border-sc-yellow mb-3">
              <Palette className="w-3.5 h-3.5 text-sc-orange" /> Browse by Type
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-sc-text mb-2">
              Find Your Favorite
            </h2>
            <p className="text-sc-text-muted max-w-[520px] mx-auto">
              Whether you like it sweet, sour, or salty &mdash; we&apos;ve got you covered
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {categories.map((category) => {
              const colors = categoryColors[category.slug] || categoryColors.classic;
              return (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className={`group bg-gradient-to-br ${colors.gradient} ${colors.text} ${colors.shadow} rounded-sc-md p-5 md:p-6 flex flex-col items-center justify-center text-center min-h-[140px] md:min-h-[150px] hover:-translate-y-1.5 hover:scale-[1.02] transition-all`}
                >
                  <span className="mb-2 group-hover:scale-[1.2] group-hover:-rotate-[10deg] transition-transform drop-shadow-sm">
                    <CategoryIcon slug={category.slug} className="w-10 h-10 md:w-11 md:h-11" />
                  </span>
                  <h3 className="text-sm md:text-[15px] font-bold">{category.name}</h3>
                  <span className="text-[11px] font-semibold opacity-70 mt-0.5">
                    {category.candySlugs.length} reviews
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== 6. BRAND PROFILES — Brands pay for visibility ========== */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 bg-sc-purple-soft text-sc-purple font-semibold text-[13px] px-4 py-1.5 rounded-sc-full border border-sc-purple/20 mb-3">
              <Building2 className="w-3.5 h-3.5" /> Brand Spotlight
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-sc-text mb-2">
              The Brands Behind the Candy
            </h2>
            <p className="text-sc-text-muted max-w-[560px] mx-auto">
              Meet the Swedish manufacturers making the candy everyone&apos;s talking about
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="group bg-white rounded-sc-md p-5 border border-sc-border text-center hover:-translate-y-1 hover:shadow-xl hover:border-sc-purple/30 transition-all"
              >
                <div className="w-[64px] h-[64px] mx-auto mb-3 rounded-sc-sm bg-sc-bg border border-sc-border flex items-center justify-center overflow-hidden">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-[15px] font-bold text-sc-text mb-1 group-hover:text-sc-purple transition-colors">{brand.name}</h3>
                <p className="text-[11px] text-sc-text-muted/70 mb-2">{brand.country} • Est. {brand.founded}</p>
                <span className="text-[11px] font-semibold text-sc-purple">{brand.candySlugs.length} products →</span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 text-sc-primary font-bold text-sm hover:gap-3 transition-all"
            >
              View all brands <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== 7. FROM THE BLOG ========== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-sc-yellow-soft text-sc-text font-semibold text-[13px] px-4 py-1.5 rounded-sc-full border border-sc-yellow mb-3">
                <BookOpen className="w-3.5 h-3.5 text-sc-orange" /> Latest Articles
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-sc-text">
                From the Blog
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-sc-primary font-bold text-sm hover:gap-2 flex items-center gap-1 transition-all"
            >
              All articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentArticles.map((article, i) => {
              const gradient = blogGradients[i % blogGradients.length];
              const siloLabels: Record<string, { label: string; color: string }> = {
                'beginner-guides': { label: 'Guide', color: 'bg-sc-blue text-white' },
                'brand-deep-dives': { label: 'Deep Dive', color: 'bg-sc-purple text-white' },
                'best-of': { label: 'Best Of', color: 'bg-sc-yellow text-sc-dark' },
                'vs-comparisons': { label: 'Comparison', color: 'bg-sc-orange text-white' },
                'where-to-buy': { label: 'Shopping', color: 'bg-sc-green text-white' },
                'health-ingredients': { label: 'Health', color: 'bg-sc-teal text-white' },
                'culture-lifestyle': { label: 'Culture', color: 'bg-sc-pink text-white' },
                'category-deep-dives': { label: 'Review', color: 'bg-sc-primary text-white' },
              };
              const silo = siloLabels[article.silo] || { label: 'Article', color: 'bg-sc-blue text-white' };

              const blogIcons: Record<string, React.ReactNode> = {
                'beginner-guides': <BookOpen className="w-12 h-12 text-white/80" />,
                'brand-deep-dives': <Sparkles className="w-12 h-12 text-white/80" />,
                'best-of': <Trophy className="w-12 h-12 text-white/80" />,
                'vs-comparisons': <Zap className="w-12 h-12 text-white/80" />,
                'where-to-buy': <ShoppingBag className="w-12 h-12 text-white/80" />,
                'health-ingredients': <FlaskConical className="w-12 h-12 text-white/80" />,
                'culture-lifestyle': <Globe className="w-12 h-12 text-white/80" />,
                'category-deep-dives': <Star className="w-12 h-12 text-white/80" />,
              };

              return (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group bg-white rounded-sc-md overflow-hidden border border-sc-border hover:-translate-y-1 hover:shadow-xl transition-all"
                >
                  <div className={`h-[160px] md:h-[170px] ${gradient} flex items-center justify-center`}>
                    {blogIcons[article.silo] || <Candy className="w-12 h-12 text-white/80" />}
                  </div>
                  <div className="p-5">
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-sc-full uppercase tracking-wide mb-2.5 ${silo.color}`}>
                      {silo.label}
                    </span>
                    <h3 className="text-[15px] md:text-base font-bold text-sc-text mb-1.5 leading-snug group-hover:text-sc-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-[13px] text-sc-text-muted line-clamp-2">
                      {article.metaDescription}
                    </p>
                  </div>
                  <div className="px-5 py-3 border-t border-sc-border flex justify-between text-xs text-sc-text-muted/60">
                    <span>5 min read</span>
                    <span>Mar 2026</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== 8. WHY SWEDISH CANDY ========== */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#1A1A2E] to-[#2D2D55] text-white relative overflow-hidden">
        {/* Curved top transition */}
        <div className="absolute top-0 left-0 right-0 h-[60px] bg-white" style={{ borderRadius: '0 0 50% 50%' }} />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white font-semibold text-[13px] px-4 py-1.5 rounded-sc-full mb-3">
              <MapPin className="w-3.5 h-3.5" /> Why Swedish?
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              What Makes It Different
            </h2>
            <p className="text-white/60 max-w-[520px] mx-auto">
              There&apos;s a reason Swedish candy is going viral
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <FlaskConical className="w-10 h-10 text-[#4ADE80]" />,
                title: 'No Artificial Colors',
                desc: 'Swedish candy uses natural colorings and avoids the artificial ingredients common in American candy.',
              },
              {
                icon: <Sparkles className="w-10 h-10 text-[#FFE347]" />,
                title: 'Unique Flavors',
                desc: "From salty licorice (salmiak) to oat-based gummies \u2014 flavors you literally can't find anywhere else.",
              },
              {
                icon: <Heart className="w-10 h-10 text-[#FF80B5]" />,
                title: 'L\u00F6rdagsgodis Culture',
                desc: "Swedes treat candy as a Saturday ritual \u2014 pick & mix, quality over quantity. It's a whole vibe.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white/[0.06] rounded-sc-md p-8 text-center border border-white/[0.08] hover:bg-white/[0.1] hover:-translate-y-1 transition-all"
              >
                <span className="block mb-4 mx-auto w-fit">{card.icon}</span>
                <h3 className="font-display text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 9. LIST YOUR STORE CTA ========== */}
      <section className="py-16 md:py-20">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-sc-bg to-white rounded-sc-lg border-2 border-sc-border p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-sc-primary/10 text-sc-primary font-semibold text-[13px] px-4 py-1.5 rounded-sc-full mb-4">
                  <Megaphone className="w-3.5 h-3.5" /> For Stores &amp; Brands
                </span>
                <h2 className="font-display text-2xl md:text-[28px] font-bold text-sc-text mb-3">
                  Get Your Store Featured
                </h2>
                <p className="text-[15px] text-sc-text-muted leading-relaxed mb-6">
                  SwedishCrave is the #1 resource for Swedish candy in the US. Get your store in front of thousands of candy lovers every month.
                </p>
                <Link
                  href="/advertise"
                  className="inline-flex items-center gap-2 bg-sc-primary text-white font-semibold text-[15px] px-7 py-3.5 rounded-sc-full hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  View Listing Plans <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Users className="w-6 h-6 text-sc-teal" />, label: 'Featured Placement', desc: 'Premium homepage slot' },
                  { icon: <TrendingUp className="w-6 h-6 text-sc-blue" />, label: 'SEO Visibility', desc: 'Rank in search results' },
                  { icon: <Star className="w-6 h-6 text-sc-yellow" />, label: 'Store Profile', desc: 'Full review page' },
                  { icon: <Globe className="w-6 h-6 text-sc-purple" />, label: 'Brand Exposure', desc: 'Reach US candy lovers' },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-sc-sm p-4 border border-sc-border">
                    <span className="block mb-2">{item.icon}</span>
                    <h4 className="text-[13px] font-bold text-sc-text mb-0.5">{item.label}</h4>
                    <p className="text-[11px] text-sc-text-muted/70">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 10. NEWSLETTER ========== */}
      <section className="py-16 md:py-20">
        <div className="max-w-[680px] mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-sc-yellow-soft via-sc-orange-soft to-sc-pink-soft rounded-sc-lg p-10 md:p-12 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <span className="absolute top-4 left-6 opacity-20 animate-float-candy">
              <Candy className="w-8 h-8 text-sc-primary" />
            </span>
            <span className="absolute bottom-4 right-6 opacity-20 animate-float-candy" style={{ animationDirection: 'reverse' }}>
              <Sparkles className="w-8 h-8 text-sc-orange" />
            </span>

            <h2 className="font-display text-2xl md:text-[28px] font-bold text-sc-text mb-2 relative z-10">
              <span className="inline-flex items-center gap-2">
                Get the Candy Drop <Mail className="w-6 h-6 text-sc-primary" />
              </span>
            </h2>
            <p className="text-[15px] text-sc-text-muted mb-6 relative z-10">
              Weekly picks, new product alerts, and exclusive discount codes.
            </p>
            <div className="flex gap-2.5 max-w-[420px] mx-auto relative z-10">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-sc-full border-2 border-sc-border bg-white text-[15px] font-sans outline-none focus:border-sc-primary transition-colors"
              />
              <button className="bg-sc-primary text-white font-semibold text-[15px] px-6 py-3.5 rounded-sc-full hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
