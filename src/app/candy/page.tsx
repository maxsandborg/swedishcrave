import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { candyItems } from '@/data/candy';
import { categories } from '@/data/categories';
import CandyPageClient from '@/components/CandyPageClient';

export const metadata: Metadata = {
  title: 'All Swedish Candy Reviews',
  description:
    'Browse all Swedish candy reviews with ratings, flavor profiles, and where to buy. From sour gummies to creamy chocolate — find your next favorite Swedish treat.',
  keywords:
    'Swedish candy reviews, all Swedish candy, candy ratings, Nordic sweets, Swedish sweets list',
};

export default function AllCandyPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-14 md:py-16 border-b border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.2px] text-sc-pink bg-sc-pink/[0.08] px-3.5 py-1.5 rounded-sc-full mb-4">
            🍬 Full Collection
          </span>
          <h1 className="font-display text-[38px] sm:text-[44px] font-extrabold text-sc-text tracking-[-0.5px] mb-3">
            All Swedish Candy Reviews
          </h1>
          <p className="text-lg text-sc-text-muted max-w-2xl">
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
                className={`px-4 py-1.5 rounded-sc-full bg-sc-bg border border-sc-border text-sm font-medium text-sc-text hover:border-sc-pink hover:text-sc-pink transition-colors cat-tag-${cat.slug}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Candy Grid with Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Suspense fallback={<div className="text-sc-text-muted">Loading...</div>}>
          <CandyPageClient candyItems={candyItems} />
        </Suspense>
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
            itemListElement: [...candyItems]
              .sort((a, b) => b.rating.overall - a.rating.overall)
              .map((candy, i) => ({
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
