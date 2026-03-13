import Link from 'next/link';
import { getFeaturedCandy, getTrendingCandy } from '@/lib/utils';
import { categories } from '@/data/categories';
import CandyCard from '@/components/CandyCard';
import CategoryCard from '@/components/CategoryCard';

export default function Home() {
  const featuredCandy = getFeaturedCandy().slice(0, 4);
  const trendingCandy = getTrendingCandy().slice(0, 4);

  // Hero showcase candies — hand-picked for visual variety
  const heroCandy = [
    { name: 'BUBS Sour Skulls', brand: 'BUBS', rating: 4.3, emoji: '💀', bg: 'candy-bg-sour' },
    { name: 'Marabou Milk', brand: 'Marabou', rating: 4.2, emoji: '🍫', bg: 'candy-bg-chocolate' },
    { name: 'Ahlgrens Bilar', brand: 'Ahlgrens', rating: 4.5, emoji: '🚗', bg: 'candy-bg-gummies' },
    { name: 'Djungelvrål', brand: 'Malaco', rating: 4.0, emoji: '🫠', bg: 'candy-bg-salmiak' },
  ];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative py-20 md:py-24 lg:py-28 overflow-hidden bg-sc-bg">
        {/* Decorative blobs */}
        <div className="absolute -top-[100px] -right-[50px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,45,135,0.06)_0%,transparent_70%)] rounded-full" />
        <div className="absolute -bottom-[80px] -left-[80px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(108,92,231,0.05)_0%,transparent_70%)] rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[60px] items-center">
            {/* Left — Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-sc-yellow-soft border border-[rgba(255,210,63,0.3)] px-[18px] py-2 rounded-sc-full text-[13px] font-semibold text-[#B8860B] mb-6">
                <span className="w-2 h-2 rounded-full bg-sc-yellow animate-[pulse-dot_2s_ease-in-out_infinite]" />
                Trending on TikTok — 120M+ views
              </div>
              <h1 className="font-display text-[42px] sm:text-[50px] lg:text-[56px] font-black leading-[1.08] tracking-[-1.5px] text-sc-text mb-5">
                Your Guide to <br />
                <span className="text-gradient-pink">Swedish Candy</span>
              </h1>
              <p className="text-[17px] sm:text-lg text-sc-text-muted leading-[1.7] mb-9 max-w-[480px]">
                Expert reviews, honest ratings, and the best places to buy authentic Swedish sweets in the USA. From BUBS to Marabou — we&apos;ve tasted them all.
              </p>
              <div className="flex flex-wrap gap-3.5">
                <Link
                  href="/candy"
                  className="inline-flex items-center gap-2 bg-sc-pink text-white px-7 py-3.5 rounded-sc-full text-[15px] font-semibold shadow-[0_4px_16px_rgba(255,45,135,0.35)] hover:bg-sc-pink-hover hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(255,45,135,0.45)] transition-all"
                >
                  Browse All Candy →
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-sc-card text-sc-text border-[1.5px] border-sc-border px-7 py-3.5 rounded-sc-full text-[15px] font-semibold shadow-sc-sm hover:border-sc-purple hover:text-sc-purple hover:shadow-sc-md hover:-translate-y-0.5 transition-all"
                >
                  🇸🇪 How It Works
                </Link>
              </div>
            </div>

            {/* Right — Candy Showcase Grid */}
            <div className="relative hidden md:grid grid-cols-2 gap-4">
              {/* Floating Badges */}
              <div className="absolute -top-2.5 right-2.5 bg-sc-card rounded-sc-full px-4 py-2 text-xs font-semibold shadow-sc-lg z-10 text-sc-pink border border-sc-pink/15 animate-[float_4s_ease-in-out_infinite]">
                🔥 #1 TikTok Trend
              </div>
              <div className="absolute bottom-5 -left-5 bg-sc-card rounded-sc-full px-4 py-2 text-xs font-semibold shadow-sc-lg z-10 text-sc-purple border border-sc-purple/15 animate-[float_4s_ease-in-out_infinite_0.5s]">
                ⭐ 4.5 avg rating
              </div>

              {heroCandy.map((item, i) => (
                <div
                  key={item.name}
                  className={`bg-sc-card border border-sc-border rounded-sc-lg overflow-hidden shadow-sc-sm hover:-translate-y-1 hover:shadow-sc-hover transition-all ${
                    i % 2 === 1 ? 'mt-[30px]' : ''
                  }`}
                >
                  <div className={`h-[140px] flex items-center justify-center text-[48px] ${item.bg}`}>
                    {item.emoji}
                  </div>
                  <div className="p-3.5 px-4">
                    <div className="font-bold text-sm text-sc-text">{item.name}</div>
                    <div className="text-xs text-sc-text-muted mt-0.5">{item.brand}</div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-sc-yellow">
                      {'★'.repeat(Math.floor(item.rating))}
                      {item.rating % 1 !== 0 ? '☆' : ''}
                      <span className="font-semibold text-sc-text ml-1">{item.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF BAR ═══ */}
      <div className="bg-sc-card border-y border-sc-border py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-2.5 text-sm text-sc-text-muted">
              <span className="text-xl">🍬</span>
              <span><strong className="text-sc-text font-extrabold">20+</strong> Candies reviewed</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-sc-text-muted">
              <span className="text-xl">⭐</span>
              <span><strong className="text-sc-text font-extrabold">4.5</strong> Average rating</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-sc-text-muted">
              <span className="text-xl">🏪</span>
              <span><strong className="text-sc-text font-extrabold">6</strong> Verified stores</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-sc-text-muted">
              <span className="text-xl">🇸🇪</span>
              <span><strong className="text-sc-text font-extrabold">6</strong> Iconic brands</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-sc-text-muted">
              <span className="text-xl">🇺🇸</span>
              <span>Ships to USA</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ FEATURED CANDY ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.2px] text-sc-pink bg-sc-pink/[0.08] px-3.5 py-1.5 rounded-sc-full mb-3">
              🔥 Staff Picks
            </span>
            <h2 className="font-display text-[32px] sm:text-4xl font-extrabold text-sc-text tracking-[-0.5px]">
              Featured Candy
            </h2>
            <p className="text-base text-sc-text-muted mt-2">
              Handpicked Swedish sweets that everyone should try
            </p>
          </div>
          <Link
            href="/candy"
            className="hidden md:flex items-center gap-1 text-sm font-semibold text-sc-pink hover:gap-2 transition-all"
          >
            View all candy →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredCandy.map((candy) => (
            <CandyCard key={candy.slug} candy={candy} />
          ))}
        </div>

        <div className="md:hidden text-center mt-6">
          <Link href="/candy" className="text-sm font-semibold text-sc-pink">
            View all candy →
          </Link>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <div className="bg-sc-bg-alt">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.2px] text-sc-purple bg-sc-purple/[0.08] px-3.5 py-1.5 rounded-sc-full mb-3">
              🎨 Explore
            </span>
            <h2 className="font-display text-[32px] sm:text-4xl font-extrabold text-sc-text tracking-[-0.5px]">
              Browse by Category
            </h2>
            <p className="text-base text-sc-text-muted mt-2">
              Find your perfect Swedish candy match
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.slice(0, 6).map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                candyCount={category.candySlugs.length}
              />
            ))}
          </div>
        </section>
      </div>

      {/* ═══ TRENDING ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.2px] text-[#2D8F2A] bg-sc-lime/[0.12] px-3.5 py-1.5 rounded-sc-full mb-3">
              📈 Hot Right Now
            </span>
            <h2 className="font-display text-[32px] sm:text-4xl font-extrabold text-sc-text tracking-[-0.5px]">
              Trending on TikTok
            </h2>
            <p className="text-base text-sc-text-muted mt-2">
              The Swedish candies everyone&apos;s talking about
            </p>
          </div>
          <Link
            href="/candy"
            className="hidden md:flex items-center gap-1 text-sm font-semibold text-sc-pink hover:gap-2 transition-all"
          >
            See all trending →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trendingCandy.map((candy) => (
            <CandyCard key={candy.slug} candy={candy} badge="viral" />
          ))}
        </div>
      </section>

      {/* ═══ WHY SECTION ═══ */}
      <div className="bg-sc-bg-alt">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.2px] text-sc-blue bg-sc-blue/[0.1] px-3.5 py-1.5 rounded-sc-full mb-3">
              🇸🇪 Why Swedish?
            </span>
            <h2 className="font-display text-[32px] sm:text-4xl font-extrabold text-sc-text tracking-[-0.5px]">
              Why Everyone&apos;s Obsessed
            </h2>
            <p className="text-base text-sc-text-muted mt-2">
              What makes Swedish candy different from everything else
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-sc-card border border-sc-border rounded-sc-lg p-8 text-center transition-all hover:-translate-y-[3px] hover:shadow-sc-md">
              <div className="w-[60px] h-[60px] rounded-full bg-sc-pink/[0.08] flex items-center justify-center text-[28px] mx-auto mb-5">
                🧪
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Real Ingredients</h3>
              <p className="text-sm text-sc-text-muted leading-[1.7]">
                No corn syrup, no artificial colors. Swedish candy uses real sugar and plant-derived colorings that taste better and are better for you.
              </p>
            </div>
            <div className="bg-sc-card border border-sc-border rounded-sc-lg p-8 text-center transition-all hover:-translate-y-[3px] hover:shadow-sc-md">
              <div className="w-[60px] h-[60px] rounded-full bg-sc-purple/[0.08] flex items-center justify-center text-[28px] mx-auto mb-5">
                🌍
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Unique Flavors</h3>
              <p className="text-sm text-sc-text-muted leading-[1.7]">
                From salmiak to sour skulls — flavors you simply can&apos;t find in American candy. Every piece is an adventure for your taste buds.
              </p>
            </div>
            <div className="bg-sc-card border border-sc-border rounded-sc-lg p-8 text-center transition-all hover:-translate-y-[3px] hover:shadow-sc-md">
              <div className="w-[60px] h-[60px] rounded-full bg-sc-lime/[0.1] flex items-center justify-center text-[28px] mx-auto mb-5">
                🍬
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Pick &amp; Mix Culture</h3>
              <p className="text-sm text-sc-text-muted leading-[1.7]">
                In Sweden, candy is an experience. Lördagsgodis — &quot;Saturday candy&quot; — is a weekly tradition of hand-picking your perfect mix.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ═══ CTA BANNER ═══ */}
      <div className="relative bg-gradient-to-br from-sc-pink to-sc-purple py-16 text-center overflow-hidden">
        <div className="absolute top-[-20px] left-0 right-0 text-[40px] opacity-10 tracking-[20px] whitespace-nowrap overflow-hidden pointer-events-none" aria-hidden="true">
          🍬🍫🍭🧁🍬🍫🍭🧁🍬🍫🍭🧁
        </div>
        <h2 className="font-display text-[32px] sm:text-4xl font-extrabold text-white mb-3 relative">
          Ready to Find Your New Favorite?
        </h2>
        <p className="text-base text-white/85 mb-7 relative">
          Compare prices across 6 verified stores that ship to the USA
        </p>
        <Link
          href="/where-to-buy"
          className="relative inline-flex items-center gap-2 bg-white text-sc-pink px-9 py-4 rounded-sc-full text-base font-bold shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all"
        >
          Shop Where to Buy →
        </Link>
      </div>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="max-w-[700px] mx-auto px-4 py-14 md:py-16 text-center">
        <h3 className="font-display text-[26px] sm:text-[28px] font-extrabold text-sc-text mb-2">
          Get the Swedish Candy Starter Kit 🇸🇪
        </h3>
        <p className="text-[15px] text-sc-text-muted mb-6">
          Join 500+ candy lovers. We&apos;ll send you our free beginner&apos;s guide + weekly picks.
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 max-w-[480px] mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-5 py-3.5 border-[1.5px] border-sc-border rounded-sc-full text-sm bg-sc-card outline-none focus:border-sc-pink focus:shadow-[0_0_0_3px_rgba(255,45,135,0.08)] transition-all"
          />
          <button className="bg-sc-pink text-white px-6 py-3.5 rounded-sc-full text-sm font-semibold shadow-[0_4px_16px_rgba(255,45,135,0.35)] hover:bg-sc-pink-hover hover:-translate-y-0.5 transition-all">
            Subscribe
          </button>
        </div>
      </section>

      {/* JSON-LD WebSite + Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'SwedishCrave',
            url: 'https://www.swedishcrave.com',
            description: 'Expert reviews, ratings, and where to buy authentic Swedish candy.',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://www.swedishcrave.com/candy?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'SwedishCrave',
            url: 'https://www.swedishcrave.com',
            description: 'The English-language guide to Swedish candy.',
          }),
        }}
      />
    </>
  );
}
