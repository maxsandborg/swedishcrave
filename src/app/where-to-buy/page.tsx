import { Metadata } from 'next';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { stores } from '@/data/stores';

export const metadata: Metadata = {
  title: 'Where to Buy Swedish Candy',
  description:
    'Discover the best places to buy authentic Swedish candy online. Find trusted retailers that ship to the US with fast delivery and authentic products.',
  keywords: 'where to buy Swedish candy, online candy stores, Mums Swedish Candy, BonBon NYC, Amazon, Swedish candy delivery USA',
  alternates: {
    canonical: '/where-to-buy',
  },
};

const faqItems = [
  {
    q: 'Is Swedish candy available on Amazon?',
    a: "Yes, Amazon carries a wide selection of Swedish candy, often with Prime shipping. However, prices vary significantly and some sellers may not be authentic. We recommend checking reviews and comparing prices with specialized Swedish candy retailers.",
  },
  {
    q: 'How long does shipping typically take?',
    a: 'Most specialty retailers ship within 3-5 business days domestically. International shipping can take 1-3 weeks depending on location. Expedited options are often available for an additional fee.',
  },
  {
    q: 'Can chocolate melt during shipping?',
    a: 'Quality retailers use insulated packaging and coolant to prevent melting, even in warm months. However, if ordering during summer, consider upgrading to expedited shipping for guaranteed freshness.',
  },
  {
    q: "What's the best way to store Swedish candy?",
    a: 'Keep chocolate and filled candies in a cool, dry place (ideally 60-70°F). Gummies and hard candies are more shelf-stable. Avoid direct sunlight. Most candies can be stored for several months in proper conditions.',
  },
  {
    q: 'Are there bulk ordering options?',
    a: 'Yes, several retailers offer bulk pricing and custom gift boxes. Mums Swedish Candy and Swedish Sweets both offer bulk options, which can reduce per-unit costs for large orders.',
  },
];

export default function WhereToBuyPage() {
  const sortedStores = [...stores].sort((a, b) => b.rating - a.rating);

  return (
    <>
      {/* Hero Section */}
      <section className="py-14 md:py-16 border-b border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.2px] text-sc-purple bg-sc-purple/[0.08] px-3.5 py-1.5 rounded-sc-full mb-4">
            🛒 Shop
          </span>
          <h1 className="font-display text-[38px] sm:text-[44px] font-extrabold text-sc-text tracking-[-0.5px] mb-3">
            Where to Buy Swedish Candy
          </h1>
          <p className="text-lg text-sc-text-muted max-w-2xl">
            Discover trusted retailers that ship authentic Swedish candy directly to your door. We&apos;ve vetted each store for quality, authenticity, and customer service.
          </p>
        </div>
      </section>

      {/* Stores Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sortedStores.map((store) => (
            <div
              key={store.slug}
              className="bg-sc-card border border-sc-border rounded-sc-lg overflow-hidden hover:shadow-sc-hover hover:-translate-y-0.5 transition-all p-7"
            >
              {/* Header */}
              <div className="mb-5">
                <h3 className="font-display text-xl font-bold text-sc-text mb-2">
                  {store.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(store.rating)
                            ? 'fill-sc-yellow text-sc-yellow'
                            : 'text-sc-border'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-sc-text">
                    {store.rating.toFixed(1)}
                  </span>
                </div>

                <p className="text-[14px] text-sc-text-muted leading-[1.7]">
                  {store.description}
                </p>
              </div>

              {/* Ships To */}
              <div className="mb-5 pb-5 border-b border-sc-border">
                <p className="text-xs font-bold uppercase tracking-wide text-sc-text-muted mb-2">
                  Ships To
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {store.shipsTo.map((country) => (
                    <span
                      key={country}
                      className="inline-flex items-center px-3 py-1 rounded-sc-full bg-sc-pink/[0.08] text-sc-pink text-[12px] font-semibold"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wide text-sc-text-muted mb-2">
                  Features
                </p>
                <ul className="space-y-1.5">
                  {store.features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-[13px] text-sc-text-muted flex items-start gap-2"
                    >
                      <span className="text-sc-lime mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <a
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-sc-pink hover:bg-sc-pink-hover text-white text-center font-semibold py-3 rounded-sc-full transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(255,45,135,0.3)]"
              >
                Visit {store.name} →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Internal Linking: Explore by Category */}
      <section className="bg-sc-bg-alt py-12 md:py-14 border-t border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-3 text-center">
            Not Sure What to Order?
          </h2>
          <p className="text-sc-text-muted text-center mb-8 max-w-2xl mx-auto">
            Explore our candy guides by category to find your perfect match before you buy.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { slug: 'gummies', name: 'Gummies', emoji: '🍬' },
              { slug: 'chocolate', name: 'Chocolate', emoji: '🍫' },
              { slug: 'sour', name: 'Sour Candy', emoji: '🤪' },
              { slug: 'licorice', name: 'Licorice', emoji: '🖤' },
              { slug: 'salmiak', name: 'Salmiak', emoji: '🧂' },
              { slug: 'classic', name: 'Classics', emoji: '⭐' },
            ].map((cat) => (
              <Link
                key={cat.slug}
                href={`/candy?category=${cat.slug}`}
                className="flex flex-col items-center gap-2 bg-sc-card border border-sc-border rounded-sc-lg p-4 hover:border-sc-pink hover:shadow-sc-hover hover:-translate-y-0.5 transition-all text-center"
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-sm font-semibold text-sc-text">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Linking: Popular Brands */}
      <section className="py-12 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-3 text-center">
            Popular Swedish Candy Brands
          </h2>
          <p className="text-sc-text-muted text-center mb-8 max-w-2xl mx-auto">
            Learn about the brands behind Sweden&apos;s most loved candy before placing your order.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { slug: 'bubs', name: 'BUBS' },
              { slug: 'malaco', name: 'Malaco' },
              { slug: 'marabou', name: 'Marabou' },
              { slug: 'cloetta', name: 'Cloetta' },
              { slug: 'fazer', name: 'Fazer' },
              { slug: 'ahlgrens', name: 'Ahlgrens' },
              { slug: 'kolsvart', name: 'Kolsvart' },
              { slug: 'lakerol', name: 'Läkerol' },
            ].map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="inline-flex items-center px-5 py-2.5 rounded-sc-full bg-sc-card border border-sc-border text-sm font-semibold text-sc-text hover:border-sc-pink hover:text-sc-pink transition-all"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Linking: Related Blog Articles */}
      <section className="bg-sc-bg-alt py-12 md:py-14 border-t border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-8 text-center">
            Helpful Guides Before You Buy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                slug: 'swedish-candy-beginners-guide',
                title: "Beginner's Guide to Swedish Candy",
                desc: 'Everything you need to know before your first order — flavors, brands, and what to expect.',
              },
              {
                slug: 'best-swedish-candy',
                title: 'Best Swedish Candy to Try in 2025',
                desc: 'Our hand-picked top 15 Swedish candies, ranked and reviewed for American candy lovers.',
              },
              {
                slug: 'swedish-candy-vs-american-candy',
                title: 'Swedish vs American Candy: Key Differences',
                desc: 'What makes Swedish candy different? Ingredients, texture, flavor profiles, and more.',
              },
            ].map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-sc-card border border-sc-border rounded-sc-lg p-6 hover:border-sc-pink hover:shadow-sc-hover hover:-translate-y-0.5 transition-all"
              >
                <h3 className="font-display font-bold text-sc-text group-hover:text-sc-pink transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-[14px] text-sc-text-muted leading-[1.7]">
                  {post.desc}
                </p>
                <span className="inline-block mt-3 text-sm font-semibold text-sc-pink">
                  Read guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section className="py-14 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-10 text-center">
            Guide to Buying Swedish Candy Online
          </h2>

          <div className="space-y-6">
            {[
              { title: '1. Choose a Trusted Retailer', desc: "The stores listed above have been vetted for authenticity and customer service. Avoid unknown sellers on third-party marketplaces, as counterfeit Swedish candy is sometimes sold online." },
              { title: '2. Start with Iconic Flavors', desc: "If you're new to Swedish candy, begin with familiar favorites like Ahlgrens Bilar, Marabou Milk Chocolate, or BUBS Sour Skulls. These classics are widely available and beloved for good reason." },
              { title: '3. Explore by Category', desc: "Once you've found your baseline, explore different categories. Try gummies, then chocolate, then venture into licorice and salmiak. Each category has distinct flavor profiles and textures." },
              { title: '4. Check Shipping & Storage', desc: 'Most online retailers ship quickly and package carefully to prevent melting. Swedish candy is shelf-stable and stores well. Keep chocolate in a cool place and consume sour candy within a few months of opening for best flavor.' },
              { title: '5. Join Subscription Services', desc: 'Several retailers offer subscription boxes with curated candy selections. This is a great way to discover new products and get regular shipments at a discounted rate.' },
            ].map((item) => (
              <div key={item.title} className="bg-sc-card p-7 rounded-sc-lg border border-sc-border">
                <h3 className="font-display font-bold text-sc-text mb-2">{item.title}</h3>
                <p className="text-[14px] text-sc-text-muted leading-[1.7]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-sc-bg-alt py-14 md:py-16 border-t border-sc-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqItems.map((faq) => (
              <div key={faq.q} className="bg-sc-card border border-sc-border rounded-sc-lg p-6">
                <h3 className="font-display font-bold text-sc-text mb-2">{faq.q}</h3>
                <p className="text-[14px] text-sc-text-muted leading-[1.7]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-sc-pink to-sc-purple py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-extrabold text-white mb-3">
            Ready to Order?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Pick a retailer above and start exploring authentic Swedish candy today
          </p>
          <Link
            href="/candy"
            className="inline-flex items-center justify-center bg-white text-sc-text px-7 py-3 rounded-sc-full font-semibold hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
          >
            Explore All Candy First
          </Link>
        </div>
      </section>

      {/* FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />

      {/* BreadcrumbList JSON-LD Schema */}
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
                name: 'Where to Buy Swedish Candy',
                item: 'https://www.swedishcrave.com/where-to-buy',
              },
            ],
          }),
        }}
      />

      {/* LocalBusiness Schema — Physical stores */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: 'BonBon NYC',
              description: 'Trendy Scandinavian candy store based in New York with both online and physical locations.',
              url: 'https://bonbonnyc.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'New York',
                addressRegion: 'NY',
                addressCountry: 'US',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: 4.7,
                bestRating: 5,
                ratingCount: 150,
              },
              priceRange: '$$',
              servesCuisine: 'Swedish Candy',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Swedish Candy',
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: 'Sockerbit',
              description: 'Premium Scandinavian candy boutique with stores in NYC and LA. Beautiful pick-and-mix experience.',
              url: 'https://sockerbit.com',
              address: [
                {
                  '@type': 'PostalAddress',
                  addressLocality: 'New York',
                  addressRegion: 'NY',
                  addressCountry: 'US',
                },
                {
                  '@type': 'PostalAddress',
                  addressLocality: 'Los Angeles',
                  addressRegion: 'CA',
                  addressCountry: 'US',
                },
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: 4.5,
                bestRating: 5,
                ratingCount: 200,
              },
              priceRange: '$$$',
              servesCuisine: 'Swedish Candy',
            },
          ]),
        }}
      />
    </>
  );
}
