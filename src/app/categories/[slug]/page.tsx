import { Metadata } from 'next';
import Link from 'next/link';
import {
  getCategoryBySlug,
  getAllCategorySlugs,
  getCandyBySlug,
} from '@/lib/utils';
import CandyImage from '@/components/CandyImage';
import RatingStars from '@/components/RatingStars';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateStaticParams() {
  const slugs = getAllCategorySlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

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
        <h1 className="text-4xl font-bold text-sc-text mb-4">
          Category Not Found
        </h1>
        <p className="text-sc-text-muted mb-8">
          We couldn&apos;t find this category in our database.
        </p>
        <Link
          href="/categories"
          className="inline-flex items-center justify-center bg-sc-primary hover:bg-sc-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
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

      {/* Hero Section — gradient instead of broken image */}
      <section className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-br from-sc-primary/80 to-sc-secondary/80">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Long Description */}
      <section className="py-16 bg-sc-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-sc-text mb-8">
            About {category.name}
          </h2>
          <p className="text-sc-text text-lg leading-relaxed whitespace-pre-wrap">
            {category.longDescription}
          </p>
        </div>
      </section>

      {/* Candy Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-sc-border">
        <h2 className="text-4xl font-bold text-sc-text mb-4">
          {category.name} Candies
        </h2>
        <p className="text-sc-text-muted text-lg mb-12">
          Browse all {categoryCandy.length} {category.name.toLowerCase()} candies in our collection
        </p>

        {categoryCandy.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryCandy.map((candy) => (
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
                    className="w-full h-full"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-sc-text group-hover:text-sc-primary transition-colors mb-1">
                    {candy.name}
                  </h3>
                  <p className="text-sm text-sc-text-muted mb-3">
                    {candy.brand}
                  </p>
                  <div className="flex items-center justify-between">
                    <RatingStars rating={candy.rating.overall} size="sm" />
                    <span className="text-xs text-sc-text-muted">
                      {candy.weight}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sc-text-muted text-lg">
            No candies found in this category yet.
          </p>
        )}
      </section>

      {/* Related Categories */}
      <section className="bg-sc-card py-20 border-t border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-sc-text mb-8">
            Explore Other Categories
          </h2>
          <Link
            href="/categories"
            className="inline-flex items-center justify-center bg-sc-primary hover:bg-sc-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </section>

      {/* JSON-LD Schema */}
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
