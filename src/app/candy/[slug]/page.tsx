import { Metadata } from 'next';
import Link from 'next/link';
import {
  getCandyBySlug,
  getAllCandySlugs,
  getRelatedCandy,
  getCategoryName,
} from '@/lib/utils';
import RatingBar from '@/components/RatingBar';
import RatingStars from '@/components/RatingStars';
import CandyImage from '@/components/CandyImage';
import CandyCard from '@/components/CandyCard';
import Breadcrumbs from '@/components/Breadcrumbs';

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
    title: `${candy.name} Review — Swedish Candy`,
    description: candy.description,
    alternates: {
      canonical: `/candy/${candy.slug}`,
    },
    keywords: [
      candy.name,
      candy.brand,
      'Swedish candy review',
      ...candy.category.map((c) => getCategoryName(c)),
      ...candy.flavorProfile,
      ...candy.tags,
    ],
    openGraph: {
      type: 'website',
      title: `${candy.name} — Swedish Candy Review | SwedishCrave`,
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
        <h1 className="font-display text-4xl font-extrabold text-sc-text mb-4">
          Candy Not Found
        </h1>
        <p className="text-sc-text-muted mb-8">
          We couldn&apos;t find this candy in our database.
        </p>
        <Link
          href="/candy"
          className="inline-flex items-center bg-sc-pink text-white px-8 py-3 rounded-sc-full font-semibold hover:bg-sc-pink-hover transition-colors"
        >
          Back to All Candy
        </Link>
      </div>
    );
  }

  const relatedCandy = getRelatedCandy(candy.slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Candy', href: '/candy' },
          { label: candy.name },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-sc-card py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-md aspect-square rounded-sc-lg overflow-hidden border border-sc-border">
                <CandyImage
                  src={candy.image}
                  alt={candy.name}
                  category={candy.category[0]}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="mb-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {candy.category.map((cat) => (
                    <Link
                      key={cat}
                      href={`/categories/${cat}`}
                      className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-sc-full cat-tag-${cat} hover:opacity-80 transition-opacity`}
                    >
                      {getCategoryName(cat)}
                    </Link>
                  ))}
                </div>
                <h1 className="font-display text-[38px] sm:text-[44px] font-extrabold text-sc-text tracking-[-0.5px] mb-2">
                  {candy.name}
                </h1>
                <Link
                  href={`/brands/${candy.brandSlug}`}
                  className="text-xl text-sc-pink hover:text-sc-pink-hover font-semibold transition-colors"
                >
                  {candy.brand}
                </Link>
              </div>

              {/* Rating */}
              <div className="mb-8 pb-8 border-b border-sc-border">
                <p className="text-sm font-medium text-sc-text-muted mb-2">
                  Overall Rating
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-5xl font-display font-extrabold text-sc-yellow">
                      {candy.rating.overall.toFixed(1)}
                    </span>
                    <span className="text-2xl text-sc-text-muted">/5</span>
                  </div>
                  <RatingStars
                    rating={candy.rating.overall}
                    size="lg"
                    showNumber={false}
                  />
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-sm font-medium text-sc-text-muted">Origin</p>
                  <p className="text-lg font-semibold text-sc-text">{candy.origin}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-sc-text-muted">Weight</p>
                  <p className="text-lg font-semibold text-sc-text">{candy.weight}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sc-text text-base leading-relaxed">
                {candy.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rating Breakdown */}
      <section className="py-12 md:py-16 border-b border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-8">
            Rating Breakdown
          </h2>
          <div className="space-y-6">
            <RatingBar label="Sweetness" value={candy.rating.sweetness} maxValue={5} />
            <RatingBar label="Saltiness" value={candy.rating.saltiness} maxValue={5} />
            <RatingBar label="Texture" value={candy.rating.texture} maxValue={5} />
            <RatingBar label="Uniqueness" value={candy.rating.uniqueness} maxValue={5} />
          </div>
        </div>
      </section>

      {/* Long Description */}
      <section className="py-12 md:py-16 bg-sc-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-6">
            About This Candy
          </h2>
          <p className="text-sc-text text-base leading-relaxed whitespace-pre-wrap">
            {candy.longDescription}
          </p>
        </div>
      </section>

      {/* Flavor Profile & Tags */}
      <section className="py-12 md:py-16 border-b border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-display text-xl font-bold text-sc-text mb-5">
                Flavor Profile
              </h3>
              <div className="flex flex-wrap gap-2">
                {candy.flavorProfile.map((flavor) => (
                  <span
                    key={flavor}
                    className="inline-flex items-center px-4 py-2 rounded-sc-full bg-sc-yellow-soft text-[#8B6914] text-sm font-medium"
                  >
                    {flavor}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-sc-text mb-5">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {candy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-4 py-2 rounded-sc-full bg-sc-pink/[0.08] text-sc-pink text-sm font-medium"
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
      <section className="py-12 md:py-16 bg-sc-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-6">
            Where to Buy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {candy.affiliateLinks.map((link) => (
              <a
                key={link.storeSlug}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between bg-sc-bg border border-sc-border rounded-sc-lg p-5 hover:border-sc-pink hover:shadow-sc-md transition-all"
              >
                <div>
                  <h4 className="text-base font-bold text-sc-text group-hover:text-sc-pink transition-colors">
                    {link.store}
                  </h4>
                  {link.price && (
                    <p className="text-sm text-sc-pink font-semibold mt-1">
                      {link.price}
                    </p>
                  )}
                </div>
                <span className="text-sc-pink font-semibold text-lg group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            ))}
          </div>

          <p className="text-xs text-sc-text-muted mt-6">
            As an affiliate, we may earn a commission from purchases made through these links. This helps support our candy reviews and recommendations.
          </p>
        </div>
      </section>

      {/* Related Candy */}
      {relatedCandy.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-extrabold text-sc-text mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedCandy.map((relatedItem) => (
                <CandyCard key={relatedItem.slug} candy={relatedItem} />
              ))}
            </div>
          </div>
        </section>
      )}

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
                name: 'Candy',
                item: 'https://www.swedishcrave.com/candy',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: candy.name,
                item: `https://www.swedishcrave.com/candy/${candy.slug}`,
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
            '@type': 'Product',
            name: candy.name,
            brand: { '@type': 'Brand', name: candy.brand },
            image: `https://www.swedishcrave.com${candy.image}`,
            description: candy.description,
            category: candy.category.map((c) => getCategoryName(c)).join(', '),
            countryOfOrigin: { '@type': 'Country', name: candy.origin },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: candy.rating.overall,
              bestRating: 5,
              worstRating: 1,
              ratingCount: 1,
              reviewCount: 1,
            },
            review: {
              '@type': 'Review',
              author: { '@type': 'Organization', name: 'SwedishCrave' },
              reviewRating: {
                '@type': 'Rating',
                ratingValue: candy.rating.overall,
                bestRating: 5,
                worstRating: 1,
              },
              reviewBody: candy.description,
            },
            offers: candy.affiliateLinks.length > 0
              ? {
                  '@type': 'AggregateOffer',
                  availability: 'https://schema.org/InStock',
                  priceCurrency: 'USD',
                  offerCount: candy.affiliateLinks.length,
                }
              : undefined,
          }),
        }}
      />
    </>
  );
}
