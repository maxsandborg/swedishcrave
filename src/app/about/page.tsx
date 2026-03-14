import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About SwedishCrave',
  description:
    'SwedishCrave is the English-language guide to Swedish candy. Expert reviews, ratings, and where to buy authentic Scandinavian sweets in the US.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'About' }]} />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <h1 className="font-display text-[38px] sm:text-[44px] font-extrabold text-sc-text tracking-[-0.5px] mb-6">
          About SwedishCrave
        </h1>

        <div className="space-y-8 text-sc-text">
          <p className="text-lg text-sc-text-muted leading-relaxed">
            SwedishCrave is the internet&apos;s most comprehensive English-language
            guide to Swedish candy. We review, rate, and help you buy authentic
            Scandinavian sweets — whether you&apos;re a complete beginner or a
            seasoned salmiak veteran.
          </p>

          <div>
            <h2 className="font-display text-2xl font-extrabold text-sc-text mb-3">
              What We Do
            </h2>
            <p className="text-sc-text-muted leading-[1.7]">
              We taste, review, and rate Swedish candy with detailed breakdowns
              covering sweetness, saltiness, texture, and uniqueness. Every review
              includes flavor profiles, where to buy, and honest opinions — no
              sponsored content, no fake ratings.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-extrabold text-sc-text mb-3">
              How We Review
            </h2>
            <p className="text-sc-text-muted leading-[1.7]">
              Each candy gets rated across four dimensions on a scale of 1-5:
              sweetness, saltiness, texture, and uniqueness. We calculate an overall
              score that weighs all four equally. Reviews include a long-form
              description covering history, flavor notes, texture analysis, and
              comparison to similar products.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-extrabold text-sc-text mb-3">
              Affiliate Disclosure
            </h2>
            <p className="text-sc-text-muted leading-[1.7]">
              SwedishCrave earns a small commission when you purchase candy through
              our affiliate links. This helps fund our reviews and keeps the site
              running. Our reviews and ratings are always independent — affiliate
              relationships never influence our scores or recommendations.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <Link
            href="/candy"
            className="inline-flex items-center justify-center bg-sc-pink text-white px-7 py-3 rounded-sc-full font-semibold hover:bg-sc-pink-hover hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(255,45,135,0.3)]"
          >
            Browse All Candy
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-sc-card border-[1.5px] border-sc-border text-sc-text px-7 py-3 rounded-sc-full font-semibold hover:border-sc-purple hover:text-sc-purple hover:-translate-y-0.5 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
