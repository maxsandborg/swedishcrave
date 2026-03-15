import Link from 'next/link';
import { getFeaturedCandy } from '@/lib/utils';
import { categories } from '@/data/categories';
import { stores } from '@/data/stores';
import { articles } from '@/data/articles';
import {
  Star,
  Flame,
  Store,
  ArrowRight,
  BookOpen,
  Candy,
  ShoppingBag,
  Truck,
  Package,
  Gift,
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
} from 'lucide-react';

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

// Product card background colors (rotating)
const productBgColors = [
  'bg-sc-yellow-soft',
  'bg-sc-pink-soft',
  'bg-sc-green-soft',
  'bg-sc-purple-soft',
];

// Badge styles
const badgeStyles: Record<string, string> = {
  bestseller: 'bg-sc-yellow text-sc-dark',
  trending: 'bg-sc-blue text-white',
  new: 'bg-sc-green text-white',
  featured: 'bg-sc-orange text-white',
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

export default function Home() {
  const featuredCandy = getFeaturedCandy().slice(0, 4);

  // Get 3 most recent articles for blog section
  const recentArticles = articles.slice(0, 3);

  // Mums store data
  const mumsStore = stores.find((s) => s.slug === 'mums-swedish-candy');

  // Other stores (not Mums)
  const otherStores = stores.filter((s) => s.slug !== 'mums-swedish-candy').slice(0, 5);

  // Store tag colors
  const storeTagColors = [
    'bg-sc-teal-soft text-[#00897B]',
    'bg-sc-yellow-soft text-[#8A6D00]',
    'bg-sc-pink-soft text-[#A02060]',
    'bg-sc-blue-soft text-[#3A50A0]',
    'bg-sc-green-soft text-[#1A6A3A]',
  ];

  // Store tag labels
  const storeTagLabels: Record<string, string> = {
    'swedish-sweets': 'Wide Range',
    'bonbon-nyc': 'Gift Boxes',
    sockerbit: 'Pick & Mix',
    amazon: 'Fast Delivery',
    'scandy-candy': 'Fresh Imports',
  };

  // Blog card gradient backgrounds
  const blogGradients = [
    'bg-gradient-to-br from-[#FFE347] to-[#FF8C42]',
    'bg-gradient-to-br from-[#60A5FA] to-[#8B5CF6]',
    'bg-gradient-to-br from-[#4ADE80] to-[#22C55E]',
  ];

  // Store icon mapping
  const storeIcons: Record<string, React.ReactNode> = {
    'swedish-sweets': <Globe className="w-8 h-8 text-sc-blue" />,
    'bonbon-nyc': <Gift className="w-8 h-8 text-sc-pink" />,
    sockerbit: <Candy className="w-8 h-8 text-sc-purple" />,
    amazon: <Truck className="w-8 h-8 text-sc-orange" />,
    'scandy-candy': <Package className="w-8 h-8 text-sc-teal" />,
  };

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center min-h-[420px] md:min-h-[480px]">
          {/* Hero Text */}
          <div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-[52px] font-bold leading-[1.1] text-sc-text mb-5">
              Discover the{' '}
              <span className="bg-gradient-to-r from-sc-primary to-sc-orange bg-clip-text text-transparent">
                Sweetest Side
              </span>
              <br />
              of Sweden
            </h1>
            <p className="text-lg text-sc-text-muted leading-relaxed mb-7 max-w-[440px]">
              From fizzy sour to smooth chocolate &mdash; find the best Swedish candy shops, honest reviews, and treats you can&apos;t get anywhere else.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="/candy"
                className="inline-flex items-center gap-2 bg-sc-primary text-white font-semibold text-base px-7 py-3.5 rounded-sc-full hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Candy className="w-5 h-5" /> Browse Candy
              </Link>
              <Link
                href="/blog/what-is-swedish-candy"
                className="inline-flex items-center gap-2 bg-white text-sc-text font-semibold text-base px-7 py-3.5 rounded-sc-full border-2 border-sc-border hover:border-sc-primary hover:text-sc-primary transition-all"
              >
                <BookOpen className="w-5 h-5" /> Read Our Guide
              </Link>
            </div>
            <div className="flex gap-7 items-center">
              <div className="flex items-center gap-2 text-sm text-sc-text-muted">
                <Star className="w-4 h-4 fill-sc-yellow text-sc-yellow" /> 81 Reviews
              </div>
              <div className="flex items-center gap-2 text-sm text-sc-text-muted">
                <Store className="w-4 h-4 text-sc-teal" /> 6 Stores
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
              {/* Candy grid inside blob */}
              <div className="grid grid-cols-2 gap-3 p-6 z-10">
                {[
                  { icon: <Cherry className="w-9 h-9 md:w-10 md:h-10 text-[#FECC02]" />, label: 'Gummies' },
                  { icon: <Heart className="w-9 h-9 md:w-10 md:h-10 text-[#8B5E3C]" />, label: 'Chocolate' },
                  { icon: <Zap className="w-9 h-9 md:w-10 md:h-10 text-[#22C55E]" />, label: 'Sour' },
                  { icon: <Circle className="w-9 h-9 md:w-10 md:h-10 text-[#1A1A2E]" />, label: 'Licorice' },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className={`w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px] bg-white rounded-sc-md flex flex-col items-center justify-center shadow-md hover:scale-110 hover:-rotate-3 transition-transform cursor-pointer ${i === 1 ? '-translate-y-3' : ''} ${i === 2 ? 'translate-y-2' : ''}`}
                  >
                    {item.icon}
                    <span className="text-[11px] font-semibold text-sc-text-muted mt-1.5">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURED CANDY ========== */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 bg-sc-yellow-soft text-sc-text font-semibold text-[13px] px-4 py-1.5 rounded-sc-full border border-sc-yellow mb-3">
              <Flame className="w-3.5 h-3.5 text-sc-orange" /> Trending Now
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-sc-text mb-2">
              Most Popular Swedish Candy
            </h2>
            <p className="text-sc-text-muted max-w-[520px] mx-auto">
              What Americans are loving right now &mdash; our top picks based on reviews and sales
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {featuredCandy.map((candy, i) => {
              const bgColor = productBgColors[i % productBgColors.length];
              const badge = candy.trending
                ? { label: 'Trending', style: badgeStyles.trending, icon: <Flame className="w-3 h-3" /> }
                : candy.featured
                ? { label: 'Bestseller', style: badgeStyles.bestseller, icon: <Star className="w-3 h-3" /> }
                : null;

              return (
                <Link
                  key={candy.slug}
                  href={`/candy/${candy.slug}`}
                  className="group bg-white rounded-sc-md overflow-hidden border border-sc-border hover:-translate-y-1 hover:shadow-xl hover:border-sc-yellow transition-all"
                >
                  <div className={`h-[160px] md:h-[180px] ${bgColor} flex items-center justify-center relative overflow-hidden`}>
                    {badge && (
                      <span className={`absolute top-3 left-3 z-10 text-[11px] font-bold px-2.5 py-1 rounded-sc-full inline-flex items-center gap-1 ${badge.style}`}>
                        {badge.icon} {badge.label}
                      </span>
                    )}
                    <Candy className="w-14 h-14 md:w-16 md:h-16 text-sc-text/20 group-hover:scale-110 group-hover:-rotate-6 transition-transform" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[15px] font-semibold text-sc-text mb-0.5 group-hover:text-sc-primary transition-colors">
                      {candy.name}
                    </h3>
                    <p className="text-xs text-sc-text-muted/70 mb-2">{candy.brand}</p>
                    <div className="flex items-center gap-1.5 mb-2">
                      <StarRating rating={candy.rating.overall} />
                      <span className="text-[13px] text-sc-text-muted ml-0.5">{candy.rating.overall.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sc-primary">
                        {candy.priceRange.split('\u2013')[0].trim()}
                      </span>
                      <span className="w-8 h-8 rounded-full border-2 border-sc-primary text-sc-primary flex items-center justify-center hover:bg-sc-primary hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== MUMS SHOP - FEATURED STORE ========== */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-sc-teal-soft to-sc-bg relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 bg-sc-teal-soft text-[#00897B] font-semibold text-[13px] px-4 py-1.5 rounded-sc-full border border-sc-teal/30 mb-3">
              <Trophy className="w-3.5 h-3.5" /> Editor&apos;s Pick
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-sc-text mb-2">
              Shop Swedish Candy
            </h2>
            <p className="text-sc-text-muted max-w-[520px] mx-auto">
              The best place to get authentic Swedish candy delivered to your door
            </p>
          </div>

          {/* Mums Featured Card */}
          {mumsStore && (
            <div className="bg-white rounded-sc-lg border-2 border-[#B0EDE4] shadow-[0_12px_48px_rgba(0,201,183,0.1)] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Left - Info */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-1.5 bg-sc-teal-soft text-[#00897B] font-bold text-[11px] px-3.5 py-1.5 rounded-sc-full uppercase tracking-wide self-start mb-4">
                    <Star className="w-3 h-3 fill-current" /> #1 Recommended Store
                  </span>
                  <h3 className="font-display text-2xl md:text-[28px] font-bold text-sc-text mb-3">
                    Mums &mdash; Premium Swedish Candy
                  </h3>
                  <p className="text-[15px] text-sc-text-muted leading-relaxed mb-5">
                    {mumsStore.description} Our top recommendation for a reason.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    {mumsStore.features.slice(0, 3).map((feature) => (
                      <span key={feature} className="flex items-center gap-1.5 text-[13px] font-medium text-sc-text-muted">
                        {feature.includes('shipping') ? (
                          <Truck className="w-4 h-4 text-sc-teal" />
                        ) : feature.includes('box') || feature.includes('Curated') ? (
                          <Package className="w-4 h-4 text-sc-teal" />
                        ) : (
                          <Star className="w-4 h-4 text-sc-teal" />
                        )}
                        {feature}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://www.mumscandy.com?sca_ref=10832159.NBy35zqtdZ"
                    target="_blank"
                    rel="sponsored noopener"
                    className="inline-flex items-center gap-2 bg-sc-teal text-white font-semibold text-[15px] px-7 py-3.5 rounded-sc-full hover:shadow-lg hover:-translate-y-0.5 transition-all self-start"
                  >
                    Shop Mums <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Right - Product Grid */}
                <div className="bg-gradient-to-br from-sc-teal-soft to-[#F0FDF9] p-6 md:p-8 grid grid-cols-3 gap-3 content-center">
                  {[
                    { name: 'Sour Crocs', price: '$8.99' },
                    { name: 'Berry Mix', price: '$9.99' },
                    { name: 'Daim Bites', price: '$7.49' },
                    { name: 'Salmiak', price: '$6.99' },
                    { name: 'Pick & Mix', price: '$12.99' },
                    { name: 'Sour Skulls', price: '$8.49' },
                  ].map((product) => (
                    <div
                      key={product.name}
                      className="bg-white rounded-sc-sm p-4 text-center shadow-sm hover:-translate-y-1 hover:rotate-[-2deg] hover:shadow-md transition-all cursor-pointer"
                    >
                      <Candy className="w-7 h-7 text-sc-teal mx-auto mb-2" />
                      <span className="text-[11px] font-bold text-sc-text block">{product.name}</span>
                      <span className="text-[13px] font-bold text-sc-teal mt-1 block">{product.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========== CATEGORIES ========== */}
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

      {/* ========== MORE STORES ========== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-sc-yellow-soft text-sc-text font-semibold text-[13px] px-4 py-1.5 rounded-sc-full border border-sc-yellow mb-3">
                <ShoppingBag className="w-3.5 h-3.5 text-sc-orange" /> Compare Stores
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-sc-text">
                More Places to Shop
              </h2>
            </div>
            <Link
              href="/where-to-buy"
              className="text-sc-primary font-bold text-sm hover:gap-2 flex items-center gap-1 transition-all"
            >
              Full comparison <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {otherStores.map((store, i) => {
              const tagColor = storeTagColors[i % storeTagColors.length];
              const tagLabel = storeTagLabels[store.slug] || 'Shop Now';
              return (
                <Link
                  key={store.slug}
                  href="/where-to-buy"
                  className="bg-sc-bg rounded-sc-md p-5 text-center border border-sc-border hover:border-sc-blue hover:shadow-[0_8px_24px_rgba(45,127,249,0.1)] hover:-translate-y-1 transition-all"
                >
                  <span className="block mb-2.5 mx-auto w-fit">
                    {storeIcons[store.slug] || <Store className="w-8 h-8 text-sc-text-muted" />}
                  </span>
                  <h3 className="text-sm font-bold text-sc-text mb-1">{store.name}</h3>
                  <p className="text-xs text-sc-text-muted/70 mb-2 line-clamp-2">{store.description.split('.')[0]}.</p>
                  <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-sc-full uppercase tracking-wide ${tagColor}`}>
                    {tagLabel}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== FROM THE BLOG ========== */}
      <section className="py-16 md:py-20">
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

      {/* ========== WHY SWEDISH CANDY ========== */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#1A1A2E] to-[#2D2D55] text-white relative overflow-hidden">
        {/* Curved top transition */}
        <div className="absolute top-0 left-0 right-0 h-[60px] bg-sc-bg" style={{ borderRadius: '0 0 50% 50%' }} />

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

      {/* ========== NEWSLETTER ========== */}
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
