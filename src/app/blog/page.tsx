import { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/data/articles';
import { ArticleSilo } from '@/types';

export const metadata: Metadata = {
  title: 'Blog — Swedish Candy Guides, Reviews & Culture',
  description:
    'Expert guides on Swedish candy — from beginner introductions to deep-dives on brands, health comparisons, and where to buy. Updated weekly.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog — Swedish Candy Guides, Reviews & Culture | SwedishCrave',
    description:
      'Expert guides on Swedish candy — from beginner introductions to deep-dives on brands, health comparisons, and where to buy.',
  },
};

const siloLabels: Record<ArticleSilo, { name: string; emoji: string }> = {
  'beginner-guides': { name: 'Beginner Guides', emoji: '📚' },
  'brand-deep-dives': { name: 'Brand Guides', emoji: '🏷️' },
  'best-of': { name: 'Best Of', emoji: '🏆' },
  'vs-comparisons': { name: 'Comparisons', emoji: '⚔️' },
  'where-to-buy': { name: 'Where to Buy', emoji: '🛒' },
  'health-ingredients': { name: 'Health & Ingredients', emoji: '🔬' },
  'culture-lifestyle': { name: 'Culture & Lifestyle', emoji: '🇸🇪' },
  'category-deep-dives': { name: 'Category Guides', emoji: '🍬' },
};

const siloOrder: ArticleSilo[] = [
  'beginner-guides',
  'best-of',
  'brand-deep-dives',
  'health-ingredients',
  'where-to-buy',
  'vs-comparisons',
  'culture-lifestyle',
  'category-deep-dives',
];

export default function BlogPage() {
  // Only show published articles, fallback to all if none published yet
  const publishedArticles = articles.filter((a) => a.status === 'published');
  const displayArticles = publishedArticles.length > 0 ? publishedArticles : articles;

  // Featured: first 3 P1 articles
  const featured = displayArticles
    .filter((a) => a.priority === 'P1')
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-sc-card py-16 border-b border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sc-primary font-medium mb-3">📖 The Blog</p>
          <h1 className="text-5xl font-bold text-sc-text mb-4">
            Swedish Candy Guides & Articles
          </h1>
          <p className="text-xl text-sc-text-muted max-w-2xl">
            Expert guides on Swedish candy — from beginner introductions to
            deep-dives on brands, health topics, and where to buy in the US.
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      {featured.length > 0 && (
        <section className="py-16 border-b border-sc-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sc-secondary font-semibold mb-2">
              🔥 Featured
            </p>
            <h2 className="text-3xl font-bold text-sc-text mb-10">
              Must-Read Guides
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featured.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group bg-sc-card border border-sc-border rounded-lg overflow-hidden hover:border-sc-primary hover:shadow-lg transition-all"
                >
                  <div className="aspect-[16/9] bg-sc-bg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-sc-primary/20 to-sc-secondary/20 flex items-center justify-center">
                      <span className="text-4xl">
                        {siloLabels[article.silo]?.emoji || '📖'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block text-xs font-medium text-sc-primary bg-sc-primary/10 px-2 py-1 rounded mb-3">
                      {siloLabels[article.silo]?.name}
                    </span>
                    <h3 className="text-xl font-bold text-sc-text group-hover:text-sc-primary transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sc-text-muted text-sm line-clamp-2">
                      {article.intro}
                    </p>
                    <p className="text-xs text-sc-text-muted mt-4">
                      {article.estimatedReadTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles by Silo */}
      {siloOrder.map((silo) => {
        const siloArticles = displayArticles.filter((a) => a.silo === silo);
        if (siloArticles.length === 0) return null;

        const { name, emoji } = siloLabels[silo];

        return (
          <section
            key={silo}
            className="py-12 border-b border-sc-border last:border-b-0"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-sc-text mb-8">
                {emoji} {name}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {siloArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group flex flex-col bg-sc-card border border-sc-border rounded-lg p-6 hover:border-sc-primary hover:shadow-md transition-all"
                  >
                    <h3 className="text-lg font-bold text-sc-text group-hover:text-sc-primary transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-sc-text-muted line-clamp-2 mb-4 flex-grow">
                      {article.intro}
                    </p>
                    <div className="flex items-center justify-between text-xs text-sc-text-muted">
                      <span>{article.estimatedReadTime} min read</span>
                      <div className="flex gap-1">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="bg-sc-bg px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

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
                name: 'Blog',
                item: 'https://www.swedishcrave.com/blog',
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
            '@type': 'Blog',
            name: 'SwedishCrave Blog',
            description:
              'Expert guides on Swedish candy — from beginner introductions to deep-dives on brands, health comparisons, and where to buy.',
            url: 'https://www.swedishcrave.com/blog',
            publisher: {
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
