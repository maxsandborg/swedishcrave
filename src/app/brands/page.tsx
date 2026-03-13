import { Metadata } from 'next';
import Link from 'next/link';
import { brands } from '@/data/brands';

export const metadata: Metadata = {
  title: 'Swedish Candy Brands',
  description:
    'Explore all Swedish candy brands. From iconic Marabou to viral BUBS, discover the brands behind your favorite Swedish sweets.',
  keywords: 'Swedish brands, candy brands, Marabou, BUBS, Malaco, Cloetta, Fazer',
};

export default function BrandsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sc-primary/10 to-sc-secondary/10 py-16 border-b border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-sc-text mb-4">
            Swedish Candy Brands
          </h1>
          <p className="text-xl text-sc-text-muted max-w-2xl">
            Meet the iconic manufacturers behind Sweden&apos;s most beloved candies. From century-old heritage brands to modern viral sensations, explore the stories and products that define Swedish confectionery.
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="group bg-sc-card border border-sc-border rounded-lg overflow-hidden hover:shadow-lg hover:border-sc-primary transition-all"
            >
              {/* Brand Logo Area */}
              <div className="h-48 bg-sc-bg flex items-center justify-center border-b border-sc-border">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-24 w-auto group-hover:scale-110 transition-transform"
                />
              </div>

              {/* Brand Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-sc-text mb-2 group-hover:text-sc-primary transition-colors">
                  {brand.name}
                </h3>

                <p className="text-sm text-sc-text-muted mb-4">
                  {brand.country} • Founded {brand.founded}
                </p>

                <p className="text-sc-text mb-4 line-clamp-2">
                  {brand.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-sc-border">
                  <span className="text-sm font-medium text-sc-secondary">
                    {brand.candySlugs.length} candies
                  </span>
                  <span className="text-sc-primary font-semibold group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-sc-card py-16 border-t border-sc-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-sc-text mb-4">
            Looking for something specific?
          </h2>
          <p className="text-sc-text-muted text-lg mb-8">
            Explore candy by category, find where to buy, or search by flavor profile
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/categories"
              className="inline-flex items-center justify-center bg-sc-primary hover:bg-sc-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Explore Categories
            </Link>
            <Link
              href="/where-to-buy"
              className="inline-flex items-center justify-center bg-sc-card border border-sc-primary text-sc-primary hover:bg-sc-primary hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Where to Buy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
