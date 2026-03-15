import { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { candyItems } from '@/data/candy';
import {
  Cherry,
  Heart,
  Zap,
  Circle,
  Droplets,
  Star,
  Candy,
  ArrowRight,
  Palette,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Candy Categories — Browse Swedish Candy by Type',
  description:
    'Explore Swedish candy organized by type: gummies, chocolate, sour candy, licorice, salmiak, and classics. Find your perfect Swedish treat.',
  keywords:
    'Swedish candy categories, Swedish gummies, Swedish chocolate, Swedish licorice, salmiak candy, sour Swedish candy',
};

// Category color mapping (same as homepage for consistency)
const categoryColors: Record<
  string,
  { gradient: string; text: string; shadow: string; soft: string; accent: string }
> = {
  gummies: {
    gradient: 'from-[#FECC02] to-[#FFE347]',
    text: 'text-[#5A4800]',
    shadow: 'shadow-[0_8px_28px_rgba(254,204,2,0.25)]',
    soft: 'bg-sc-yellow-soft',
    accent: 'text-[#FECC02]',
  },
  chocolate: {
    gradient: 'from-[#8B5E3C] to-[#6B3F22]',
    text: 'text-[#FFF3E6]',
    shadow: 'shadow-[0_8px_28px_rgba(123,74,43,0.25)]',
    soft: 'bg-sc-orange-soft',
    accent: 'text-[#8B5E3C]',
  },
  sour: {
    gradient: 'from-[#22C55E] to-[#4ADE80]',
    text: 'text-[#052E16]',
    shadow: 'shadow-[0_8px_28px_rgba(34,197,94,0.25)]',
    soft: 'bg-sc-green-soft',
    accent: 'text-[#22C55E]',
  },
  licorice: {
    gradient: 'from-[#1A1A2E] to-[#2D2D44]',
    text: 'text-[#F0F0F0]',
    shadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.2)]',
    soft: 'bg-gray-100',
    accent: 'text-[#1A1A2E]',
  },
  salmiak: {
    gradient: 'from-[#2D7FF9] to-[#60A5FA]',
    text: 'text-white',
    shadow: 'shadow-[0_8px_28px_rgba(45,127,249,0.25)]',
    soft: 'bg-sc-blue-soft',
    accent: 'text-[#2D7FF9]',
  },
  classic: {
    gradient: 'from-[#FF4D9B] to-[#FF80B5]',
    text: 'text-white',
    shadow: 'shadow-[0_8px_28px_rgba(255,77,155,0.25)]',
    soft: 'bg-sc-pink-soft',
    accent: 'text-[#FF4D9B]',
  },
};

// Category icon component
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
          className={`w-3 h-3 ${
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

export default function CategoriesPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="text-center max-w-[640px] mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-sc-yellow-soft text-sc-text font-semibold text-[13px] px-4 py-1.5 rounded-sc-full border border-sc-yellow mb-4">
            <Palette className="w-3.5 h-3.5 text-sc-orange" /> Browse by Type
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-[52px] font-bold leading-[1.1] text-sc-text mb-4">
            Find Your{' '}
            <span className="bg-gradient-to-r from-sc-primary to-sc-orange bg-clip-text text-transparent">
              Favorite
            </span>
          </h1>
          <p className="text-lg text-sc-text-muted leading-relaxed max-w-[480px] mx-auto">
            From fizzy sour gummies to creamy chocolate and intense salmiak &mdash; explore Swedish candy organized by type.
          </p>
        </div>
      </section>

      {/* ========== CATEGORY CARDS (expanded) ========== */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {categories.map((category) => {
            const colors = categoryColors[category.slug] || categoryColors.classic;
            // Get top 3 candy items for this category to show preview
            const topCandy = category.candySlugs
              .slice(0, 3)
              .map((slug) => candyItems.find((c) => c.slug === slug))
              .filter(Boolean);

            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className={`group bg-white rounded-sc-md overflow-hidden border border-sc-border hover:-translate-y-1.5 hover:${colors.shadow} transition-all`}
              >
                {/* Gradient Header with Icon */}
                <div
                  className={`bg-gradient-to-br ${colors.gradient} ${colors.text} p-6 md:p-7 relative overflow-hidden`}
                >
                  {/* Decorative floating icon */}
                  <span className="absolute top-3 right-3 opacity-20">
                    <CategoryIcon slug={category.slug} className="w-16 h-16" />
                  </span>

                  <span className="relative z-10 block mb-3 group-hover:scale-110 group-hover:-rotate-[8deg] transition-transform">
                    <CategoryIcon slug={category.slug} className="w-11 h-11 drop-shadow-sm" />
                  </span>
                  <h2 className="relative z-10 font-display text-2xl font-bold mb-1">
                    {category.name}
                  </h2>
                  <span className="relative z-10 text-[13px] font-semibold opacity-80">
                    {category.candySlugs.length} candies reviewed
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6">
                  <p className="text-[14px] text-sc-text-muted leading-relaxed mb-4 line-clamp-3">
                    {category.description}
                  </p>

                  {/* Top candy preview chips */}
                  {topCandy.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {topCandy.map((c) => (
                        <span
                          key={c!.slug}
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-sc-full ${colors.soft} ${colors.accent}`}
                        >
                          <Candy className="w-3 h-3" />
                          {c!.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-sc-border">
                    <span className="text-[13px] font-semibold text-sc-primary">
                      Explore {category.name}
                    </span>
                    <span className="w-7 h-7 rounded-full border-2 border-sc-primary text-sc-primary flex items-center justify-center group-hover:bg-sc-primary group-hover:text-white transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========== WHY SWEDISH CANDY STANDS OUT ========== */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#1A1A2E] to-[#2D2D55] text-white relative overflow-hidden">
        {/* Curved top */}
        <div
          className="absolute top-0 left-0 right-0 h-[60px] bg-sc-bg"
          style={{ borderRadius: '0 0 50% 50%' }}
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white font-semibold text-[13px] px-4 py-1.5 rounded-sc-full mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Why It&apos;s Different
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              What Makes Each Category Special
            </h2>
            <p className="text-white/60 max-w-[520px] mx-auto">
              Swedish candy categories aren&apos;t just flavors &mdash; they&apos;re crafted traditions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <Cherry className="w-9 h-9 text-[#FFE347]" />,
                title: 'Better Gummies',
                desc: 'Natural fruit juices and softer gelatin bases create superior texture and more authentic flavors.',
              },
              {
                icon: <Heart className="w-9 h-9 text-[#D4915C]" />,
                title: 'Premium Chocolate',
                desc: 'Nordic dairy and higher cocoa butter content make Swedish chocolate creamier and richer.',
              },
              {
                icon: <Zap className="w-9 h-9 text-[#4ADE80]" />,
                title: 'Bold Sour Candy',
                desc: 'Citric acid blends create a cleaner, more complex sour taste without the chemical burn.',
              },
              {
                icon: <Droplets className="w-9 h-9 text-[#60A5FA]" />,
                title: 'Unique Salmiak',
                desc: 'Salty ammonium chloride licorice that creates a flavor sensation found nowhere else on Earth.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white/[0.06] rounded-sc-md p-6 text-center border border-white/[0.08] hover:bg-white/[0.1] hover:-translate-y-1 transition-all"
              >
                <span className="block mb-3 mx-auto w-fit">{card.icon}</span>
                <h3 className="font-display text-base font-bold mb-1.5">{card.title}</h3>
                <p className="text-[13px] text-white/70 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== QUICK START GUIDE ========== */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 bg-sc-teal-soft text-[#00897B] font-semibold text-[13px] px-4 py-1.5 rounded-sc-full border border-sc-teal/30 mb-3">
              <BookOpen className="w-3.5 h-3.5" /> New to Swedish Candy?
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-sc-text mb-2">
              Where to Start
            </h2>
            <p className="text-sc-text-muted max-w-[520px] mx-auto">
              Not sure which category is for you? Here&apos;s our recommendation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                step: '1',
                title: 'Start with Classics',
                desc: 'Try Ahlgrens Bilar and Marabou chocolate — the safe, universally loved choices that give you a solid Swedish candy foundation.',
                link: '/categories/classic',
                color: 'bg-sc-pink-soft border-sc-pink/20',
                stepColor: 'bg-sc-pink text-white',
              },
              {
                step: '2',
                title: 'Explore Sour & Gummies',
                desc: 'Move to BUBS Sour Skulls and Swedish gummies — the TikTok-famous treats with bold flavors and satisfying textures.',
                link: '/categories/gummies',
                color: 'bg-sc-yellow-soft border-sc-yellow/20',
                stepColor: 'bg-sc-yellow text-[#5A4800]',
              },
              {
                step: '3',
                title: 'Go Full Swedish',
                desc: 'Ready for an adventure? Try salmiak and real Swedish licorice — the authentic Scandinavian experience that divides the world.',
                link: '/categories/salmiak',
                color: 'bg-sc-blue-soft border-sc-blue/20',
                stepColor: 'bg-sc-blue text-white',
              },
            ].map((item) => (
              <Link
                key={item.step}
                href={item.link}
                className={`group ${item.color} border rounded-sc-md p-6 md:p-7 hover:-translate-y-1 transition-all`}
              >
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${item.stepColor} font-bold text-sm mb-4`}
                >
                  {item.step}
                </span>
                <h3 className="font-display text-lg font-bold text-sc-text mb-2">
                  {item.title}
                </h3>
                <p className="text-[14px] text-sc-text-muted leading-relaxed mb-4">
                  {item.desc}
                </p>
                <span className="text-[13px] font-semibold text-sc-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
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
              Ready to Shop?
            </h2>
            <p className="text-[15px] text-sc-text-muted mb-6 relative z-10">
              Find the best places to buy authentic Swedish candy online
            </p>
            <div className="flex flex-wrap justify-center gap-3 relative z-10">
              <Link
                href="/where-to-buy"
                className="inline-flex items-center gap-2 bg-sc-primary text-white font-semibold text-[15px] px-7 py-3.5 rounded-sc-full hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Where to Buy <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/candy"
                className="inline-flex items-center gap-2 bg-white text-sc-text font-semibold text-[15px] px-7 py-3.5 rounded-sc-full border-2 border-sc-border hover:border-sc-primary hover:text-sc-primary transition-all"
              >
                Browse All Candy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
