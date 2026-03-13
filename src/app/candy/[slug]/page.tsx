import { Metadata } from 'next';
import Link from 'next/link';
import {
  getCandyBySlug,
  getAllCandySlugs,
  getRelatedCandy,
} from '@/lib/utils';
import RatingBar from '@/components/RatingBar';
import RatingStars from '@/components/RatingStars';

export async function generateStaticParams() {
  const slugs = getAllCandySlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const candy = getCandyBySlug(params.slug);

  if (!candy) {
    return {
      title: 'Candy Not Found',
      description: 'This candy review could not be found.',
    };
  }

  return {
    title: `${candy.name} Review`,
    description: candy.description,
    keywords: [
      candy.name,
      candy.brand,
      ...candy.category,
      ...candy.flavorProfile,
      ...candy.tags,
    ],
    openGraph: {
      type: 'website',
      title: `${candy.name} — Swedish Candy Review`,
      description: candy.description,
      images: [
        {
          url: candy.image,
          width: 1200,
          height: 630,
          alt: candy.name,
        },
      ],
    },
  };
}

export default function CandyPage({ params }: { params: { slug: string } }) {
  const candy = getCandyBySlug(params.slug);

  if (!candy) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl font-bold text-sc-text mb-4">
          Candy Not Found
        </h1>
        <p className="text-sc-text-muted mb-8">
          We couldn&apos;t find this candy in our database.
        </p>
        <Link
          href="/candy"
          className="inline-flex items-center justify-center bg-sc-primary hover:bg-sc-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Back to All Candy
        </Link>
      </div>
    );
  }

  const relatedCandy = getRelatedCandy(candy.slug);

  return (
    <>
      {/* Hero Section with Image and Basic Info */}
      <section className="bg-sc-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-md aspect-square bg-sc-bg rounded-lg overflow-hidden flex items-center justify-center border border-sc-border">
                <img
                  src={candy.image}
                  alt={candy.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="mb-6">
                <div className="text-sm font-medium text-sc-text-muted mb-2">
                  {candy.category.map((cat) => (
                    <Link
                      key={cat}
                      href={`/categories/${cat}`}
                      className="text-sc-primary hover:underline mr-2"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
                <h1 className="text-5xl font-bold text-sc-text mb-3">
                  {candy.name}
                </h1>
                <Link
                  href={`/brands/${candy.brandSlug}`}
                  className="text-2xl text-sc-primary hover:underline font-semibold"
                >
                  {candy.brand}
                </Link>
              </div>

              {/* Rating */}
              <div className="mb-8 pb-8 border-b border-sc-border">
                <div className="mb-4">
                  <p className="text-sm font-medium text-sc-text-muted mb-2">
                    Overall Rating
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="text-5xl font-bold text-sc-secondary">
                        {candy.rating.overall.toFixed(1)}
                      </div>
                      <div className="text-3xl">/5</div>
                    </div>
                    <RatingStars
                      rating={candy.rating.overall}
                      size="lg"
                      showNumber={false}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-sm font-medium text-sc-text-muted">
                    Origin
                  </p>
                  <p className="text-lg font-semibold text-sc-text">
                    {candy.origin}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-sc-text-muted">
                    Weight
                  </p>
                  <p className="text-lg font-semibold text-sc-text">
                    {candy.weight}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sc-text text-lg leading-relaxed">
                {candy.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rating Breakdown */}
      <section className="py-16 border-b border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-sc-text mb-10">
            Rating Breakdown
          </h2>

          <div className="space-y-6">
            <RatingBar
              label="Sweetness"
              value={candy.rating.sweetness}
              maxValue={5}
            />
            <RatingBar
              label="Saltiness"
              value={candy.rating.saltiness}
              maxValue={5}
            />
            <RatingBar
              label="Texture"
              value={candy.rating.texture}
              maxValue={5}
            />
            <RatingBar
              label="Uniqueness"
              value={candy.rating.uniqueness}
              maxValue={5}
            />
          </div>
        </div>
      </section>

      {/* Long Description */}
      <section className="py-16 bg-sc-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-sc-text mb-8">
            About This Candy
          </h2>
          <p className="text-sc-text text-lg leading-relaxed whitespace-pre-wrap">
            {candy.longDescription}
          </p>
        </div>
      </section>

      {/* Flavor Profile & Tags */}
      <section className="py-16 border-b border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Flavor Profile */}
            <div>
              <h3 className="text-2xl font-bold text-sc-text mb-6">
                Flavor Profile
              </h3>
              <div className="flex flex-wrap gap-3">
                {candy.flavorProfile.map((flavor) => (
                  <span
                    key={flavor}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-sc-secondary/20 text-sc-secondary font-medium"
                  >
                    {flavor}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-2xl font-bold text-sc-text mb-6">
                Tags
              </h3>
              <div className="flex flex-wrap gap-3">
                {candy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-sc-primary/20 text-sc-primary font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Where to Buy */}
      <section className="py-16 bg-sc-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-sc-text mb-8">
            Where to Buy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {candy.affiliateLinks.map((link) => (
              <a
                key={link.storeSlug}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between bg-sc-bg border border-sc-border rounded-lg p-6 hover:border-sc-primary hover:shadow-lg transition-all"
              >
                <div>
                  <h4 className="text-lg font-bold text-sc-text group-hover:text-sc-primary transition-colors">
                    {link.store}
                  </h4>
                  {link.price && (
                    <p className="text-sm text-sc-text-muted mt-1">
                      {link.price}
                    </p>
                  )}
                </div>
                <span className="text-sc-primary font-semibold">
                  →
                </span>
              </a>
            ))}
          </div>

          <p className="text-sm text-sc-text-muted mt-8">
            As an affiliate, we may earn a commission from purchases made through these links. This helps support our candy reviews and recommendations.
          </p>
        </div>
      </section>

      {/* Related Candy */}
      {relatedCandy.length > 0 && (
        <section className="py-16 border-b border-sc-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-sc-text mb-10">
              You Might Also Like
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCandy.map((relatedItem) => (
                <Link
                  key={relatedItem.slug}
                  href={`/candy/${relatedItem.slug}`}
                  className="group bg-sc-card border border-sc-border rounded-lg overflow-hidden hover:border-sc-primary transition-all hover:shadow-lg"
                >
                  <div className="aspect-square bg-sc-bg overflow-hidden">
                    <img
                      src={relatedItem.image}
                      alt={relatedItem.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-sc-text group-hover:text-sc-primary transition-colors mb-1">
                      {relatedItem.name}
                    </h3>
                    <p className="text-sm text-sc-text-muted mb-3">
                      {relatedItem.brand}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-sc-secondary">
                        ★ {relatedItem.rating.overall.toFixed(1)}
                      </span>
                      <span className="text-xs text-sc-text-muted">
                        {relatedItem.category[0]}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: candy.name,
            brand: {
              '@type': 'Brand',
              name: candy.brand,
            },
            image: candy.image,
            description: candy.description,
            review: {
              '@type': 'Review',
              ratingValue: candy.rating.overall,
              bestRating: 5,
              worstRating: 0,
            },
          }),
        }}
      />
    </>
  );
}
