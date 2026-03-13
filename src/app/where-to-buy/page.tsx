import { Metadata } from 'next';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { stores } from '@/data/stores';

export const metadata: Metadata = {
  title: 'Where to Buy Swedish Candy',
  description:
    'Discover the best places to buy authentic Swedish candy online. Find trusted retailers that ship to the US with fast delivery and authentic products.',
  keywords: 'where to buy Swedish candy, online candy stores, Mums Swedish Candy, BonBon NYC, Amazon',
};

export default function WhereToBuyPage() {
  // Sort stores by rating
  const sortedStores = [...stores].sort((a, b) => b.rating - a.rating);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sc-primary/10 to-sc-secondary/10 py-16 border-b border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-sc-text mb-4">
            Where to Buy Swedish Candy
          </h1>
          <p className="text-xl text-sc-text-muted max-w-2xl">
            Discover trusted retailers that ship authentic Swedish candy directly to your door. We&apos;ve vetted each store for quality, authenticity, and customer service.
          </p>
        </div>
      </section>

      {/* Stores Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sortedStores.map((store) => (
            <div
              key={store.slug}
              className="bg-sc-card border border-sc-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-8"
            >
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-sc-text mb-2">
                  {store.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(store.rating)
                            ? 'fill-sc-secondary text-sc-secondary'
                            : 'text-sc-border'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-sc-text">
                    {store.rating.toFixed(1)}
                  </span>
                </div>

                <p className="text-sc-text-muted">
                  {store.description}
                </p>
              </div>

              {/* Ships To */}
              <div className="mb-6 pb-6 border-b border-sc-border">
                <p className="text-sm font-medium text-sc-text-muted mb-2">
                  Ships To
                </p>
                <div className="flex flex-wrap gap-2">
                  {store.shipsTo.map((country) => (
                    <span
                      key={country}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-sc-primary/20 text-sc-primary text-sm font-medium"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <p className="text-sm font-medium text-sc-text-muted mb-3">
                  Features
                </p>
                <ul className="space-y-2">
                  {store.features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-sm text-sc-text flex items-start gap-3"
                    >
                      <span className="text-sc-secondary mt-1">✓</span>
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
                className="block w-full bg-sc-primary hover:bg-sc-primary/90 text-white text-center font-medium py-3 rounded-lg transition-colors"
              >
                Visit {store.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Guide Section */}
      <section className="bg-sc-card py-20 border-t border-sc-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-sc-text mb-12 text-center">
            Guide to Buying Swedish Candy Online
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-sc-text mb-3">
                1. Choose a Trusted Retailer
              </h3>
              <p className="text-sc-text-muted">
                The stores listed above have been vetted for authenticity and customer service. Avoid unknown sellers on third-party marketplaces, as counterfeit Swedish candy is sometimes sold online.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-sc-text mb-3">
                2. Start with Iconic Flavors
              </h3>
              <p className="text-sc-text-muted">
                If you&apos;re new to Swedish candy, begin with familiar favorites like Ahlgrens Bilar, Marabou Milk Chocolate, or BUBS Sour Skulls. These classics are widely available and beloved for good reason.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-sc-text mb-3">
                3. Explore by Category
              </h3>
              <p className="text-sc-text-muted">
                Once you&apos;ve found your baseline, explore different categories. Try gummies, then chocolate, then venture into licorice and salmiak. Each category has distinct flavor profiles and textures.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-sc-text mb-3">
                4. Check Shipping & Storage
              </h3>
              <p className="text-sc-text-muted">
                Most online retailers ship quickly and package carefully to prevent melting. Swedish candy is shelf-stable and stores well. Keep chocolate in a cool place and consume sour candy within a few months of opening for best flavor.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-sc-text mb-3">
                5. Join Subscription Services
              </h3>
              <p className="text-sc-text-muted">
                Several retailers offer subscription boxes with curated candy selections. This is a great way to discover new products and get regular shipments at a discounted rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-sc-text mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-sc-card border border-sc-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-sc-text mb-3">
                Is Swedish candy available on Amazon?
              </h3>
              <p className="text-sc-text-muted">
                Yes, Amazon carries a wide selection of Swedish candy, often with Prime shipping. However, prices vary significantly and some sellers may not be authentic. We recommend checking reviews and comparing prices with specialized Swedish candy retailers.
              </p>
            </div>

            <div className="bg-sc-card border border-sc-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-sc-text mb-3">
                How long does shipping typically take?
              </h3>
              <p className="text-sc-text-muted">
                Most specialty retailers ship within 3-5 business days domestically. International shipping can take 1-3 weeks depending on location. Expedited options are often available for an additional fee.
              </p>
            </div>

            <div className="bg-sc-card border border-sc-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-sc-text mb-3">
                Can chocolate melt during shipping?
              </h3>
              <p className="text-sc-text-muted">
                Quality retailers use insulated packaging and coolant to prevent melting, even in warm months. However, if ordering during summer, consider upgrading to expedited shipping for guaranteed freshness.
              </p>
            </div>

            <div className="bg-sc-card border border-sc-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-sc-text mb-3">
                What&apos;s the best way to store Swedish candy?
              </h3>
              <p className="text-sc-text-muted">
                Keep chocolate and filled candies in a cool, dry place (ideally 60-70°F). Gummies and hard candies are more shelf-stable. Avoid direct sunlight. Most candies can be stored for several months in proper conditions.
              </p>
            </div>

            <div className="bg-sc-card border border-sc-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-sc-text mb-3">
                Are there bulk ordering options?
              </h3>
              <p className="text-sc-text-muted">
                Yes, several retailers offer bulk pricing and custom gift boxes. Mums Swedish Candy and Swedish Sweets both offer bulk options, which can reduce per-unit costs for large orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-sc-primary to-sc-primary/80 rounded-xl p-12 text-center text-white mx-4 my-20">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Order?
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Pick a retailer above and start exploring authentic Swedish candy today
        </p>
        <Link
          href="/brands"
          className="inline-flex items-center justify-center bg-white text-sc-primary hover:bg-sc-card px-8 py-3 rounded-lg font-bold transition-colors"
        >
          Explore More Candy First
        </Link>
      </section>
    </>
  );
}
