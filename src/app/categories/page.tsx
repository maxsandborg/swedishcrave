import { Metadata } from 'next';
import { categories } from '@/data/categories';
import CategoryCard from '@/components/CategoryCard';

export const metadata: Metadata = {
  title: 'Candy Categories',
  description:
    'Browse Swedish candy by category. From gummies to chocolate, sour to licorice, find your favorite type of Swedish sweets.',
  keywords: 'candy categories, gummies, chocolate, licorice, sour candy, salmiak',
  alternates: {
    canonical: '/categories',
  },
};

export default function CategoriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-14 md:py-16 border-b border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.2px] text-sc-purple bg-sc-purple/[0.08] px-3.5 py-1.5 rounded-sc-full mb-4">
            🎨 Explore
          </span>
          <h1 className="font-display text-[38px] sm:text-[44px] font-extrabold text-sc-text tracking-[-0.5px] mb-3">
            Candy Categories
          </h1>
          <p className="text-lg text-sc-text-muted max-w-2xl">
            Explore Swedish candy organized by type. Whether you prefer soft gummies, creamy chocolate, or adventurous salmiak, find your perfect category.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              candyCount={category.candySlugs.length}
            />
          ))}
        </div>
      </section>

      {/* Why Section */}
      <section className="bg-sc-bg-alt py-14 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-8 text-center">
            Why Swedish Candies Stand Out by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: 'Better Gummies', desc: 'Swedish gummies use natural fruit juices and softer gelatin bases, creating superior texture and more authentic flavors than most American brands.' },
              { title: 'Premium Chocolate', desc: 'Made with Nordic dairy and higher cocoa butter content, Swedish chocolate is creamier and richer than typical mass-market chocolate.' },
              { title: 'Bold Sour Candy', desc: 'Swedish sour candy uses citric acid blends that create a cleaner, more complex sour taste compared to the chemical-tasting American alternatives.' },
              { title: 'Unique Licorice', desc: 'From mild licorice to intense salmiak, Swedish licorice offers a depth of flavor and cultural significance unmatched by other candy traditions.' },
            ].map((item) => (
              <div key={item.title} className="bg-sc-card p-7 rounded-sc-lg border border-sc-border">
                <h4 className="font-display font-bold text-sc-text mb-2">{item.title}</h4>
                <p className="text-sm text-sc-text-muted leading-[1.7]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
