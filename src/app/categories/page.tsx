import { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '@/data/categories';

export const metadata: Metadata = {
  title: 'Candy Categories',
  description:
    'Browse Swedish candy by category. From gummies to chocolate, sour to licorice, find your favorite type of Swedish sweets.',
  keywords: 'candy categories, gummies, chocolate, licorice, sour candy, salmiak',
};

export default function CategoriesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sc-primary/10 to-sc-secondary/10 py-16 border-b border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-sc-text mb-4">
            Candy Categories
          </h1>
          <p className="text-xl text-sc-text-muted max-w-2xl">
            Explore Swedish candy organized by type. Whether you prefer soft gummies, creamy chocolate, or adventurous salmiak, find your perfect category.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-lg aspect-video hover:shadow-2xl transition-all"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 group-hover:from-black/30 group-hover:to-black/70 transition-colors" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-4xl font-bold text-white mb-3">
                  {category.name}
                </h3>
                <p className="text-white/90 text-lg mb-4 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white/80 font-medium">
                    {category.candySlugs.length} candies
                  </span>
                  <span className="text-white text-2xl group-hover:translate-x-2 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-sc-card py-20 border-t border-sc-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-sc-text mb-12 text-center">
            Why Swedish Candies Stand Out by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-sc-bg p-8 rounded-lg border border-sc-border">
              <h4 className="text-xl font-bold text-sc-text mb-3">
                Better Gummies
              </h4>
              <p className="text-sc-text-muted">
                Swedish gummies use natural fruit juices and softer gelatin bases, creating superior texture and more authentic flavors than most American brands.
              </p>
            </div>

            <div className="bg-sc-bg p-8 rounded-lg border border-sc-border">
              <h4 className="text-xl font-bold text-sc-text mb-3">
                Premium Chocolate
              </h4>
              <p className="text-sc-text-muted">
                Made with Nordic dairy and higher cocoa butter content, Swedish chocolate is creamier and richer than typical mass-market chocolate.
              </p>
            </div>

            <div className="bg-sc-bg p-8 rounded-lg border border-sc-border">
              <h4 className="text-xl font-bold text-sc-text mb-3">
                Bold Sour Candy
              </h4>
              <p className="text-sc-text-muted">
                Swedish sour candy uses citric acid blends that create a cleaner, more complex sour taste compared to the chemical-tasting American alternatives.
              </p>
            </div>

            <div className="bg-sc-bg p-8 rounded-lg border border-sc-border">
              <h4 className="text-xl font-bold text-sc-text mb-3">
                Unique Licorice
              </h4>
              <p className="text-sc-text-muted">
                From mild licorice to intense salmiak, Swedish licorice offers a depth of flavor and cultural significance unmatched by other candy traditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-sc-text mb-8">
          Quick Navigation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="block p-4 bg-sc-card border border-sc-border rounded-lg hover:border-sc-primary hover:shadow-md transition-all"
            >
              <h4 className="font-semibold text-sc-text hover:text-sc-primary transition-colors">
                {category.name}
              </h4>
              <p className="text-sm text-sc-text-muted mt-1">
                {category.candySlugs.length} items
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
