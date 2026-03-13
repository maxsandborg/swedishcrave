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

      {/* Guide Section */}
      <section className="bg-sc-bg-alt py-14 md:py-16">
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
      <section className="py-14 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-sc-text mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              { q: 'Is Swedish candy available on Amazon?', a: "Yes, Amazon carries a wide selection of Swedish candy, often with Prime shipping. However, prices vary significantly and some sellers may not be authentic. We recommend checking reviews and comparing prices with specialized Swedish candy retailers." },
              { q: 'How long does shipping typically take?', a: 'Most specialty retailers ship within 3-5 business days domestically. International shipping can take 1-3 weeks depending on location. Expedited options are often available for an additional fee.' },
              { q: 'Can chocolate melt during shipping?', a: 'Quality retailers use insulated packaging and coolant to prevent melting, even in warm months. However, if ordering during summer, consider upgrading to expedited shipping for guaranteed freshness.' },
              { q: "What's the best way to store Swedish candy?", a: 'Keep chocolate and filled candies in a cool, dry place (ideally 60-70°F). Gummies and hard candies are more shelf-stable. Avoid direct sunlight. Most candies can be stored for several months in proper conditions.' },
              { q: 'Are there bulk ordering options?', a: 'Yes, several retailers offer bulk pricing and custom gift boxes. Mums Swedish Candy and Swedish Sweets both offer bulk options, which can reduce per-unit costs for large orders.' },
            ].map((faq) => (
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
    </>
  );
}
