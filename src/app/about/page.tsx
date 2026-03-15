import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { authors } from '@/data/authors';

export const metadata: Metadata = {
  title: 'About SwedishCrave — Our Team & Editorial Standards',
  description:
    'Meet the team behind SwedishCrave. Learn about our editorial standards, review methodology, and commitment to honest, expert Swedish candy coverage.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const max = authors['max-sandborg'];
  const kelci = authors['kelci-napier'];

  return (
    <>
      <Breadcrumbs items={[{ label: 'About' }]} />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <h1 className="font-display text-[38px] sm:text-[44px] font-extrabold text-sc-text tracking-[-0.5px] mb-6">
          About SwedishCrave
        </h1>

        <div className="space-y-10 text-sc-text">
          <p className="text-lg text-sc-text-muted leading-relaxed">
            SwedishCrave is the internet&apos;s most comprehensive English-language
            guide to Swedish candy. We review, rate, and help you buy authentic
            Scandinavian sweets — whether you&apos;re a complete beginner or a
            seasoned salmiak veteran.
          </p>

          {/* Meet the Team */}
          <div>
            <h2 className="font-display text-2xl font-extrabold text-sc-text mb-6">
              Meet the Team
            </h2>

            {/* Max */}
            <div className="bg-sc-card border border-sc-border rounded-xl p-6 mb-6">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  {max.image ? (
                    <img
                      src={max.image}
                      alt={max.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-sc-border"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-sc-primary/10 border-2 border-sc-border flex items-center justify-center">
                      <span className="text-2xl font-bold text-sc-primary">MS</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-sc-text">{max.name}</h3>
                    {max.socials.linkedin && (
                      <a
                        href={max.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sc-text-muted hover:text-sc-primary transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                  <p className="text-sm font-medium text-sc-primary mb-3">{max.role}</p>
                  <p className="text-sc-text-muted leading-relaxed">{max.bio}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {max.credentials.map((cred) => (
                      <span
                        key={cred}
                        className="inline-block text-xs bg-sc-bg text-sc-text-muted px-2.5 py-1 rounded-full border border-sc-border"
                      >
                        {cred}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Kelci */}
            <div className="bg-sc-card border border-sc-border rounded-xl p-6">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-sc-primary/10 border-2 border-sc-border flex items-center justify-center">
                    <span className="text-2xl font-bold text-sc-primary">KN</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-sc-text mb-1">{kelci.name}</h3>
                  <p className="text-sm font-medium text-sc-primary mb-3">{kelci.role}</p>
                  <p className="text-sc-text-muted leading-relaxed">{kelci.bio}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {kelci.credentials.map((cred) => (
                      <span
                        key={cred}
                        className="inline-block text-xs bg-sc-bg text-sc-text-muted px-2.5 py-1 rounded-full border border-sc-border"
                      >
                        {cred}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Standards */}
          <div>
            <h2 className="font-display text-2xl font-extrabold text-sc-text mb-3">
              Editorial Standards
            </h2>
            <p className="text-sc-text-muted leading-[1.7] mb-4">
              Every article on SwedishCrave goes through a structured editorial process
              designed to ensure accuracy, fairness, and genuine usefulness to readers.
            </p>
            <ul className="space-y-3 text-sc-text-muted leading-[1.7]">
              <li className="flex gap-3">
                <span className="text-sc-primary font-bold">1.</span>
                <span><strong className="text-sc-text">Firsthand experience.</strong> Product reviews are based on candies we&apos;ve personally purchased and tasted. We don&apos;t review products we haven&apos;t tried.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-sc-primary font-bold">2.</span>
                <span><strong className="text-sc-text">No pay-for-play.</strong> We never accept payment in exchange for favorable reviews or ratings. Affiliate relationships do not influence our editorial content.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-sc-primary font-bold">3.</span>
                <span><strong className="text-sc-text">Expert contributors.</strong> Health and ingredient content is written by Kelci Napier, a registered nurse, ensuring our health-related articles are grounded in professional knowledge.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-sc-primary font-bold">4.</span>
                <span><strong className="text-sc-text">Source verification.</strong> Claims about ingredients, regulations, and health effects are verified against official sources including the EU Food Safety Authority, FDA, and peer-reviewed research.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-sc-primary font-bold">5.</span>
                <span><strong className="text-sc-text">Regular updates.</strong> Articles are reviewed and updated when product formulations change, new research emerges, or regulations are amended.</span>
              </li>
            </ul>
          </div>

          {/* Review Methodology */}
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

          {/* Affiliate Disclosure */}
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

      {/* Person Schema — Max */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: max.name,
            jobTitle: max.role,
            url: 'https://www.swedishcrave.com/about',
            sameAs: max.socials.linkedin ? [max.socials.linkedin] : [],
            worksFor: {
              '@type': 'Organization',
              name: 'SwedishCrave',
              url: 'https://www.swedishcrave.com',
            },
          }),
        }}
      />

      {/* Person Schema — Kelci */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: kelci.name,
            jobTitle: kelci.role,
            url: 'https://www.swedishcrave.com/about',
            worksFor: {
              '@type': 'Organization',
              name: 'SwedishCrave',
              url: 'https://www.swedishcrave.com',
            },
          }),
        }}
      />
    </>
  );
}
