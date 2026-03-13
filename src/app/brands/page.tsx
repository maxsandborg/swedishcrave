import { Metadata } from 'next';
import Link from 'next/link';
import { brands } from '@/data/brands';
import BrandCard from '@/components/BrandCard';

export const metadata: Metadata = {
  title: 'Swedish Candy Brands',
  description:
    'Explore all Swedish candy brands. From iconic Marabou to viral BUBS, discover the brands behind your favorite Swedish sweets.',
  keywords: 'Swedish brands, candy brands, Marabou, BUBS, Malaco, Cloetta, Fazer',
};

export default function BrandsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-14 md:py-16 border-b border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.2px] text-sc-blue bg-sc-blue/[0.1] px-3.5 py-1.5 rounded-sc-full mb-4">
            🇸🇪 Brands
          </span>
          <h1 className="font-display text-[38px] sm:text-[44px] font-extrabold text-sc-text tracking-[-0.5px] mb-3">
            Swedish Candy Brands
          </h1>
          <p className="text-lg text-sc-text-muted max-w-2xl">
            Meet the iconic manufacturers behind Sweden&apos;s most beloved candies. From century-old heritage brands to modern viral sensations.
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {brands.map((brand) => (
            <BrandCard
              key={brand.slug}
              brand={brand}
              candyCount={brand.candySlugs.length}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-sc-bg-alt py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-3">
            Looking for something specific?
          </h2>
          <p className="text-sc-text-muted mb-8">
            Explore candy by category, find where to buy, or search by flavor profile
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/categories"
              className="inline-flex items-center justify-center bg-sc-pink text-white px-7 py-3 rounded-sc-full font-semibold hover:bg-sc-pink-hover hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(255,45,135,0.3)]"
            >
              Explore Categories
            </Link>
            <Link
              href="/where-to-buy"
              className="inline-flex items-center justify-center bg-sc-card border-[1.5px] border-sc-border text-sc-text px-7 py-3 rounded-sc-full font-semibold hover:border-sc-purple hover:text-sc-purple hover:-translate-y-0.5 transition-all"
            >
              Where to Buy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
