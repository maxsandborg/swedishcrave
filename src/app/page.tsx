import Link from 'next/link';
import { Search } from 'lucide-react';
import { getFeaturedCandy, getTrendingCandy } from '@/lib/utils';
import { categories } from '@/data/categories';

export default function Home() {
  const featuredCandy = getFeaturedCandy().slice(0, 4);
  const trendingCandy = getTrendingCandy().slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sc-bg via-sc-card to-sc-bg py-20 md:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sc-primary/5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sc-secondary/5 rounded-full -ml-48 -mb-48"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-sc-text mb-6 leading-tight">
              Discover Swedish Candy
            </h1>
            <p className="text-lg md:text-xl text-sc-text-muted mb-8 max-w-2xl mx-auto">
              Expert reviews, detailed ratings, and where to buy authentic Swedish sweets. Your guide to Nordic confectionery.
            </p>

            {/* Search Bar */}
            <div className="flex gap-3 max-w-md mx-auto mb-12">
              <div className="flex-1 flex items-center bg-sc-card border border-sc-border rounded-lg px-4 py-3">
                <Search size={20} className="text-sc-text-muted mr-3" />
                <input
                  type="text"
                  placeholder="Search candy..."
                  className="flex-1 bg-transparent text-sc-text placeholder-sc-text-muted focus:outline-none"
                />
              </div>
              <button className="bg-sc-cta hover:bg-sc-cta/90 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Search
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/brands"
                className="inline-flex items-center justify-center bg-sc-primary hover:bg-sc-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Explore Brands
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center bg-sc-card border border-sc-primary text-sc-primary hover:bg-sc-primary hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Candy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-sc-text mb-4">Featured Candy</h2>
          <p className="text-sc-text-muted text-lg">
            Handpicked Swedish sweets that everyone should try
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCandy.map((candy) => (
            <Link
              key={candy.slug}
              href={`/candy/${candy.slug}`}
              className="group bg-sc-card border border-sc-border rounded-lg overflow-hidden hover:border-sc-primary transition-all hover:shadow-lg"
            >
              <div className="aspect-square bg-sc-bg overflow-hidden">
                <img
                  src={candy.image}
                  alt={candy.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-sc-text group-hover:text-sc-primary transition-colors mb-1">
                  {candy.name}
                </h3>
                <p className="text-sm text-sc-text-muted mb-3">{candy.brand}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-sc-secondary">
                    ★ {candy.rating.overall.toFixed(1)}
                  </span>
                  <span className="text-xs text-sc-text-muted">
                    {candy.category[0]}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="bg-sc-card py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-sc-text mb-4">Trending Now</h2>
            <p className="text-sc-text-muted text-lg">
              The Swedish candies everyone&apos;s talking about
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCandy.map((candy) => (
              <Link
                key={candy.slug}
                href={`/candy/${candy.slug}`}
                className="group bg-sc-bg border border-sc-border rounded-lg overflow-hidden hover:border-sc-primary transition-all hover:shadow-lg"
              >
                <div className="aspect-square bg-white overflow-hidden">
                  <img
                    src={candy.image}
                    alt={candy.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-sc-text group-hover:text-sc-primary transition-colors mb-1">
                    {candy.name}
                  </h3>
                  <p className="text-sm text-sc-text-muted mb-3">{candy.brand}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-sc-secondary">
                      ★ {candy.rating.overall.toFixed(1)}
                    </span>
                    <span className="text-xs text-sc-text-muted">
                      {candy.category[0]}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-sc-text mb-4">Explore by Type</h2>
          <p className="text-sc-text-muted text-lg">
            Find your favorite category of Swedish candy
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-lg aspect-video hover:shadow-xl transition-all"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {category.candySlugs.length} candies
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/categories"
            className="inline-flex items-center justify-center border border-sc-primary text-sc-primary hover:bg-sc-primary hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </section>

      {/* Why Swedish Candy Section */}
      <section className="bg-gradient-to-r from-sc-primary/10 to-sc-secondary/10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-sc-text mb-12 text-center">
            Why Swedish Candy?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-sc-card p-8 rounded-lg border border-sc-border">
              <h3 className="text-xl font-bold text-sc-text mb-4">Premium Quality</h3>
              <p className="text-sc-text-muted">
                Made with Nordic dairy and natural ingredients, Swedish candy offers superior taste and texture compared to most mass-market alternatives.
              </p>
            </div>

            <div className="bg-sc-card p-8 rounded-lg border border-sc-border">
              <h3 className="text-xl font-bold text-sc-text mb-4">Diverse Flavors</h3>
              <p className="text-sc-text-muted">
                From sweet gummies to intensely salty licorice, Swedish candy spans an entire flavor spectrum that goes far beyond American candy traditions.
              </p>
            </div>

            <div className="bg-sc-card p-8 rounded-lg border border-sc-border">
              <h3 className="text-xl font-bold text-sc-text mb-4">Cultural Experience</h3>
              <p className="text-sc-text-muted">
                Trying Swedish candy is more than just tasting sweets—it&apos;s experiencing Scandinavian culture and tradition in every bite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where to Buy CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-sc-primary to-sc-primary/80 rounded-xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Discover trusted retailers that ship authentic Swedish candy directly to your door
          </p>
          <Link
            href="/where-to-buy"
            className="inline-flex items-center justify-center bg-white text-sc-primary hover:bg-sc-card px-8 py-3 rounded-lg font-bold transition-colors"
          >
            View Where to Buy
          </Link>
        </div>
      </section>
    </>
  );
}
