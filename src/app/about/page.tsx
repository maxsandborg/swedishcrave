import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About SwedishCrave',
  description:
    'SwedishCrave is the English-language guide to Swedish candy. Expert reviews, ratings, and where to buy authentic Scandinavian sweets in the US.',
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'About' }]} />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold text-sc-text mb-8">
          About SwedishCrave
        </h1>

        <div className="prose prose-lg max-w-none text-sc-text space-y-6">
          <p className="text-xl text-sc-text-muted leading-relaxed">
            SwedishCrave is the internet&apos;s most comprehensive English-language
            guide to Swedish candy. We review, rate, and help you buy authentic
            Scandinavian sweets — whether you&apos;re a complete beginner or a
            seasoned salmiak veteran.
          </p>

          <h2 className="text-3xl font-bold text-sc-text mt-12 mb-4">
            What We Do
          </h2>
          <p>
            We taste, review, and rate Swedish candy with detailed breakdowns
            covering sweetness, saltiness, texture, and uniqueness. Every review
            includes flavor profiles, where to buy, and honest opinions — no
            sponsored content, no fake ratings.
          </p>

          <h2 className="text-3xl font-bold text-sc-text mt-12 mb-4">
            How We Review
          </h2>
          <p>
            Each candy gets rated across four dimensions on a scale of 1-5:
            sweetness, saltiness, texture, and uniqueness. We calculate an overall
            score that weighs all four equally. Reviews include a long-form
            description covering history, flavor notes, texture analysis, and
            comparison to similar products.
          </p>

          <h2 className="text-3xl font-bold text-sc-text mt-12 mb-4">
            Affiliate Disclosure
          </h2>
          <p>
            SwedishCrave earns a small commission when you purchase candy through
            our affiliate links. This helps fund our reviews and keeps the site
            running. Our reviews and ratings are always independent — affiliate
            relationships never influence our scores or recommendations.
          </p>
        </div>

        <div className="mt-16 flex gap-4">
          <Link
            href="/candy"
            className="inline-flex items-center justify-center bg-sc-primary hover:bg-sc-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Browse All Candy
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-sc-card border border-sc-border text-sc-text hover:border-sc-primary hover:text-sc-primary px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
