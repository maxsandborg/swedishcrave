import { Metadata } from 'next';
import Link from 'next/link';
import {
  getCategoryBySlug,
  getAllCategorySlugs,
  getCandyBySlug,
} from '@/lib/utils';
import CandyCard from '@/components/CandyCard';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateStaticParams() {
  const slugs = getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.name} Swedish Candy — Reviews & Ratings`,
    description: category.description,
    keywords: [category.name, 'Swedish candy', `Swedish ${category.name.toLowerCase()}`, 'candy reviews'],
    openGraph: {
      type: 'website',
      title: `${category.name} Swedish Candy | SwedishCrave`,
      description: category.description,
    },
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-display text-4xl font-extrabold text-sc-text mb-4">Category Not Found</h1>
        <p className="text-sc-text-muted mb-8">We couldn&apos;t find this category in our database.</p>
        <Link href="/categories" className="inline-flex items-center bg-sc-pink text-white px-8 py-3 rounded-sc-full font-semibold hover:bg-sc-pink-hover transition-colors">
          Back to All Categories
        </Link>
      </div>
    );
  }

  const categoryCandy = category.candySlugs
    .map((slug) => getCandyBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Categories', href: '/categories' },
          { label: category.name },
        ]}
      />

      {/* Hero — colorful category background */}
      <section className={`relative h-56 md:h-72 overflow-hidden cat-bg-${category.slug}`}>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="font-display text-[42px] md:text-[52px] font-extrabold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] mb-3">
              {category.name}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Long Description */}
      <section className="py-12 md:py-14 bg-sc-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-5">About {category.name}</h2>
          <p className="text-sc-text text-base leading-relaxed whitespace-pre-wrap">
            {category.longDescription}
          </p>
        </div>
      </section>

      {/* Candy Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-t border-sc-border">
        <h2 className="font-display text-2xl font-extrabold text-sc-text mb-2">
          {category.name} Candies
        </h2>
        <p className="text-sc-text-muted mb-8">
          Browse all {categoryCandy.length} {category.name.toLowerCase()} candies in our collection
        </p>

        {categoryCandy.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categoryCandy.map((candy) => (
              <CandyCard key={candy.slug} candy={candy} />
            ))}
          </div>
        ) : (
          <p className="text-sc-text-muted">No candies found in this category yet.</p>
        )}
      </section>

      {/* Back link */}
      <section className="bg-sc-bg-alt py-12 text-center">
        <Link
          href="/categories"
          className="inline-flex items-center bg-sc-pink text-white px-8 py-3 rounded-sc-full font-semibold hover:bg-sc-pink-hover hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(255,45,135,0.3)]"
        >
          View All Categories
        </Link>
      </section>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.swedishcrave.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Categories',
                item: 'https://www.swedishcrave.com/categories',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: category.name,
                item: `https://www.swedishcrave.com/categories/${category.slug}`,
              },
            ],
          }),
        }}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${category.name} Swedish Candy`,
            description: category.longDescription,
            numberOfItems: categoryCandy.length,
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: categoryCandy.map((candy, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `https://www.swedishcrave.com/candy/${candy.slug}`,
                name: candy.name,
              })),
            },
          }),
        }}
      />
    </>
  );
}
