import { Metadata } from 'next';
import Link from 'next/link';
import {
  getBrandBySlug,
  getAllBrandSlugs,
  getCandyBySlug,
} from '@/lib/utils';
import CandyCard from '@/components/CandyCard';
import Breadcrumbs from '@/components/Breadcrumbs';

const brandColors: Record<string, string> = {
  marabou: 'from-[#8B2252] to-[#C23878]',
  bubs: 'from-sc-pink to-sc-purple',
  malaco: 'from-[#E63946] to-[#FF6B6B]',
  fazer: 'from-[#003DA5] to-[#4FACFE]',
  cloetta: 'from-sc-purple to-[#4FACFE]',
  daim: 'from-[#B8860B] to-[#FFD23F]',
  ahlgrens: 'from-[#FF8AB8] to-sc-pink',
};

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
        <h1 className="font-display text-4xl font-extrabold text-sc-text mb-4">
          Brand Not Found
        </h1>
        <p className="text-sc-text-muted mb-8">
          We couldn&apos;t find this brand in our database.
        </p>
        <Link
          href="/brands"
          className="inline-flex items-center justify-center bg-sc-pink text-white px-8 py-3 rounded-sc-full font-semibold hover:bg-sc-pink-hover hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(255,45,135,0.3)]"
        >
          Back to All Brands
        </Link>
      </div>
    );
  }

  const brandCandy = brand.candySlugs
    .map((slug) => getCandyBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  const gradient = brandColors[brand.slug] || 'from-sc-pink to-sc-purple';

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Brands', href: '/brands' },
          { label: brand.name },
        ]}
      />

      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br ${gradient} py-16 md:py-20 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* Brand Initial */}
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-sc-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/30">
              <span className="font-display text-[64px] md:text-[80px] font-extrabold text-white">
                {brand.name.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Info */}
            <div className="text-center md:text-left">
              <h1 className="font-display text-[38px] sm:text-[48px] font-extrabold text-white tracking-[-0.5px] mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                {brand.name}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-5">
                <span className="inline-flex items-center gap-1.5 text-sm text-white/90 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-sc-full">
                  🇸🇪 {brand.country}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-white/90 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-sc-full">
                  📅 Founded {brand.founded}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-white/90 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-sc-full">
                  🍬 {brandCandy.length} {brandCandy.length === 1 ? 'candy' : 'candies'}
                </span>
              </div>

              <p className="text-lg text-white/90 max-w-2xl leading-relaxed mb-6">
                {brand.description}
              </p>

              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-sc-text px-7 py-3 rounded-sc-full font-semibold hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
              >
                Visit Official Website →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-14 md:py-16 border-b border-sc-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-6">
            About {brand.name}
          </h2>
          <p className="text-sc-text-muted text-[16px] leading-[1.8] whitespace-pre-wrap">
            {brand.longDescription}
          </p>
        </div>
      </section>

      {/* Brand's Candies */}
      <section className="py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.2px] text-sc-pink bg-sc-pink/[0.08] px-3.5 py-1.5 rounded-sc-full mb-4">
            🍬 Collection
          </span>
          <h2 className="font-display text-[28px] sm:text-[32px] font-extrabold text-sc-text tracking-[-0.3px] mb-2">
            {brand.name} Candies
          </h2>
          <p className="text-sc-text-muted mb-10">
            Explore all {brandCandy.length} candies from {brand.name}
          </p>

          {brandCandy.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {brandCandy.map((candy) => (
                <CandyCard key={candy.slug} candy={candy} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-sc-bg-alt rounded-sc-lg">
              <p className="text-sc-text-muted text-lg">
                No candies found for this brand yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-sc-bg-alt py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-3">
            Explore More Brands
          </h2>
          <p className="text-sc-text-muted mb-8">
            Discover other iconic Swedish candy manufacturers
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/brands"
              className="inline-flex items-center justify-center bg-sc-pink text-white px-7 py-3 rounded-sc-full font-semibold hover:bg-sc-pink-hover hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(255,45,135,0.3)]"
            >
              All Brands
            </Link>
            <Link
              href="/candy"
              className="inline-flex items-center justify-center bg-sc-card border-[1.5px] border-sc-border text-sc-text px-7 py-3 rounded-sc-full font-semibold hover:border-sc-purple hover:text-sc-purple hover:-translate-y-0.5 transition-all"
            >
              Browse All Candy
            </Link>
          </div>
        </div>
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
                name: 'Brands',
                item: 'https://www.swedishcrave.com/brands',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: brand.name,
                item: `https://www.swedishcrave.com/brands/${brand.slug}`,
              },
            ],
          }),
        }}
      />

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
