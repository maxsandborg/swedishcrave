import { Metadata } from 'next';
import Link from 'next/link';
import { candyItems } from '@/data/candy';
import { categories } from '@/data/categories';
import CandyImage from '@/components/CandyImage';
import RatingStars from '@/components/RatingStars';

export const metadata: Metadata = {
  title: 'All Swedish Candy Reviews',
  description:
    'Browse all Swedish candy reviews with ratings, flavor profiles, and where to buy. From sour gummies to creamy chocolate — find your next favorite Swedish treat.',
  keywords:
    'Swedish candy reviews, all Swedish candy, candy ratings, Nordic sweets, Swedish sweets list',
};

export default function AllCandyPage() {
  const sortedCandy = [...candyItems].sort(
    (a, b) => b.rating.overall - a.rating.overall
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-sc-primary/10 to-sc-secondary/10 py-16 border-b border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-sc-text mb-4">
            All Swedish Candy Reviews
          </h1>
          <p className="text-xl text-sc-text-muted max-w-2xl">
            Browse our complete collection of {candyItems.length} Swedish candy
            reviews. Sorted by rating — the best candy comes first.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-sc-card border-b border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-sc-text-muted mr-2 self-center">
              Filter:
            </span>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="px-4 py-1.5 rounded-full bg-sc-bg border border-sc-border text-sm font-medium text-sc-text hover:border-sc-primary hover:text-sc-primary transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Candy Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedCandy.map((candy) => (
            <Link
              key={candy.slug}
              href={`/candy/${candy.slug}`}
              className="group bg-sc-card border border-sc-border rounded-lg overflow-hidden hover:border-sc-primary transition-all hover:shadow-lg"
            >
              <div className="aspect-square bg-sc-bg overflow-hidden">
                <CandyImage
                  src={candy.image}
                  alt={candy.name}
                  category={candy.category[0]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-5">
                <h2 className="font-bold text-sc-text group-hover:text-sc-primary transition-colors mb-1 text-base">
                  {candy.name}
                </h2>
                <p className="text-sm text-sc-text-muted mb-3">{candy.brand}</p>
                <div className="flex items-center justify-between">
                  <RatingStars rating={candy.rating.overall} size="sm" />
                  <span className="text-xs text-sc-text-muted">
                    {candy.weight}
                  </span>
                </div>
                <p className="text-xs text-sc-text-muted mt-2 line-clamp-2">
                  {candy.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Swedish Candy Reviews',
            description: 'Complete collection of Swedish candy reviews with ratings',
            numberOfItems: candyItems.length,
            itemListElement: sortedCandy.map((candy, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `https://www.swedishcrave.com/candy/${candy.slug}`,
              name: candy.name,
            })),
          }),
        }}
      />
    </>
  );
}
