import { Metadata } from 'next';
import Link from 'next/link';
import {
  getBrandBySlug,
  getAllBrandSlugs,
  getCandyBySlug,
} from '@/lib/utils';
import CandyImage from '@/components/CandyImage';
import RatingStars from '@/components/RatingStars';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateStaticParams() {
  const slugs = getAllBrandSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const brand = getBrandBySlug(params.slug);

  if (!brand) {
    return {
      title: 'Brand Not Found',
    };
  }

  return {
    title: `${brand.name} — Swedish Candy Brand`,
    description: brand.description,
    keywords: [brand.name, 'Swedish candy', 'Swedish candy brand', brand.country],
    openGraph: {
      type: 'website',
      title: `${brand.name} — Swedish Candy Brand | SwedishCrave`,
      description: brand.description,
    },
  };
}

export default function BrandPage({ params }: { params: { slug: string } }) {
  const brand = getBrandBySlug(params.slug);

  if (!brand) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl font-bold text-sc-text mb-4">
          Brand Not Found
        </h1>
        <p className="text-sc-text-muted mb-8">
          We couldn&apos;t find this brand in our database.
        </p>
        <Link
          href="/brands"
          className="inline-flex items-center justify-center bg-sc-primary hover:bg-sc-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Back to All Brands
        </Link>
      </div>
    );
  }

  const brandCandy = brand.candySlugs
    .map((slug) => getCandyBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Brands', href: '/brands' },
          { label: brand.name },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-sc-card py-16 border-b border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            {/* Logo placeholder */}
            <div className="flex justify-center items-center">
              <div className="w-full max-w-xs aspect-square bg-sc-bg rounded-lg border border-sc-border flex items-center justify-center">
                <div className="text-center p-6">
                  <span className="text-6xl block mb-3">🏭</span>
                  <p className="text-lg font-bold text-sc-text">{brand.name}</p>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2">
              <h1 className="text-5xl font-bold text-sc-text mb-4">
                {brand.name}
              </h1>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-sm font-medium text-sc-text-muted">Country</p>
                  <p className="text-lg font-semibold text-sc-text">{brand.country}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-sc-text-muted">Founded</p>
                  <p className="text-lg font-semibold text-sc-text">{brand.founded}</p>
                </div>
              </div>

              <p className="text-lg text-sc-text leading-relaxed mb-8">
                {brand.description}
              </p>

              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-sc-primary hover:bg-sc-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Visit Official Website
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Long Description */}
      <section className="py-16 bg-sc-card border-b border-sc-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-sc-text mb-8">
            About {brand.name}
          </h2>
          <p className="text-sc-text text-lg leading-relaxed whitespace-pre-wrap">
            {brand.longDescription}
          </p>
        </div>
      </section>

      {/* Brand's Candies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-sc-text mb-4">
            {brand.name} Candies
          </h2>
          <p className="text-sc-text-muted text-lg mb-12">
            Explore all {brandCandy.length} candies from {brand.name}
          </p>

          {brandCandy.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandCandy.map((candy) => (
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
                      {candy.category[0]}
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
              No candies found for this brand yet.
            </p>
          )}
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Brand',
            name: brand.name,
            url: brand.website,
            description: brand.longDescription,
            foundingDate: String(brand.founded),
          }),
        }}
      />
    </>
  );
}
