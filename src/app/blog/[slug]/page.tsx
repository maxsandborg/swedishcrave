import { Metadata } from 'next';
import Link from 'next/link';
import { getArticleBySlug, getAllArticleSlugs, getRelatedArticles } from '@/data/articles';
import { candyItems } from '@/data/candy';


export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'This article could not be found.',
    };
  }

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    keywords: article.tags,
    openGraph: {
      type: 'article',
      title: article.seoTitle,
      description: article.metaDescription,
      url: `https://www.swedishcrave.com/blog/${article.slug}`,
      images: article.heroImage
        ? [{ url: article.heroImage, width: 1200, height: 630, alt: article.heroImageAlt }]
        : undefined,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seoTitle,
      description: article.metaDescription,
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl font-bold text-sc-text mb-4">Article Not Found</h1>
        <p className="text-sc-text-muted mb-8">We couldn&apos;t find this article.</p>
        <Link
          href="/blog"
          className="inline-flex items-center justify-center bg-sc-primary hover:bg-sc-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(article.slug, 3);
  const relatedCandy = article.relatedCandySlugs
    .map((slug) => candyItems.find((c) => c.slug === slug))
    .filter(Boolean);

  const siloLabels: Record<string, string> = {
    'beginner-guides': 'Beginner Guide',
    'brand-deep-dives': 'Brand Guide',
    'best-of': 'Best Of',
    'vs-comparisons': 'Comparison',
    'where-to-buy': 'Where to Buy',
    'health-ingredients': 'Health & Ingredients',
    'culture-lifestyle': 'Culture & Lifestyle',
    'category-deep-dives': 'Category Guide',
  };

  const hasContent = article.content && article.content.trim().length > 0;

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ol className="flex items-center gap-2 text-sm text-sc-text-muted">
          <li>
            <Link href="/" className="hover:text-sc-primary transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/blog" className="hover:text-sc-primary transition-colors">
              Blog
            </Link>
          </li>
          <li>/</li>
          <li className="text-sc-text font-medium truncate">{article.title}</li>
        </ol>
      </nav>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <span className="inline-block text-xs font-medium text-sc-primary bg-sc-primary/10 px-3 py-1 rounded-full">
            {siloLabels[article.silo] || article.silo}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-sc-text mb-6 leading-tight">
          {article.h1}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-sc-text-muted mb-8">
          <span>By {article.author}</span>
          <span>·</span>
          <span>{article.estimatedReadTime} min read</span>
          <span>·</span>
          <time dateTime={article.updatedAt}>
            Updated{' '}
            {new Date(article.updatedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </div>

        {/* Hero Image Placeholder */}
        <div className="aspect-[2/1] bg-gradient-to-br from-sc-primary/10 via-sc-secondary/10 to-sc-primary/5 rounded-xl overflow-hidden flex items-center justify-center border border-sc-border">
          <div className="text-center">
            <p className="text-6xl mb-2">🍬</p>
            <p className="text-sc-text-muted text-sm font-medium">
              {article.heroImageAlt}
            </p>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Intro */}
        <div className="bg-sc-card border border-sc-border rounded-xl p-8 mb-12">
          <p className="text-lg text-sc-text leading-relaxed font-medium">
            {article.intro}
          </p>
        </div>

        {/* Main Content */}
        {hasContent ? (
          <div
            className="prose prose-lg max-w-none prose-headings:text-sc-text prose-p:text-sc-text prose-a:text-sc-primary prose-strong:text-sc-text"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        ) : (
          <div className="py-12 text-center">
            <p className="text-sc-text-muted text-lg mb-4">
              📝 This article is coming soon!
            </p>
            <p className="text-sc-text-muted">
              We&apos;re working on this guide right now. Check back shortly for the full article.
            </p>
          </div>
        )}

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-sc-border">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block text-xs font-medium bg-sc-bg text-sc-text-muted px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Related Candy */}
      {relatedCandy.length > 0 && (
        <section className="bg-sc-card py-16 border-t border-sc-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-sc-text mb-8">
              🍬 Candy Mentioned in This Article
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedCandy.map((candy) =>
                candy ? (
                  <Link
                    key={candy.slug}
                    href={`/candy/${candy.slug}`}
                    className="group bg-sc-bg border border-sc-border rounded-lg p-4 hover:border-sc-primary hover:shadow-md transition-all"
                  >
                    <div className="aspect-square bg-sc-card rounded-lg overflow-hidden mb-3">
                      <img
                        src={candy.image}
                        alt={candy.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="font-bold text-sc-text group-hover:text-sc-primary transition-colors text-sm">
                      {candy.name}
                    </h3>
                    <p className="text-xs text-sc-text-muted">{candy.brand}</p>
                    <p className="text-xs font-semibold text-sc-secondary mt-1">
                      ★ {candy.rating.overall.toFixed(1)}
                    </p>
                  </Link>
                ) : null
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 border-t border-sc-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-sc-text mb-8">
              📖 Keep Reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group bg-sc-card border border-sc-border rounded-lg p-6 hover:border-sc-primary hover:shadow-md transition-all"
                >
                  <span className="inline-block text-xs font-medium text-sc-primary bg-sc-primary/10 px-2 py-0.5 rounded mb-3">
                    {siloLabels[related.silo]}
                  </span>
                  <h3 className="text-lg font-bold text-sc-text group-hover:text-sc-primary transition-colors mb-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-sc-text-muted line-clamp-2">
                    {related.intro}
                  </p>
                  <p className="text-xs text-sc-text-muted mt-3">
                    {related.estimatedReadTime} min read
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-sc-card py-16 border-t border-sc-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-sc-text mb-4">
            Ready to Try Swedish Candy?
          </h2>
          <p className="text-sc-text-muted mb-8">
            Compare prices across verified stores that ship to the USA
          </p>
          <Link
            href="/where-to-buy"
            className="inline-flex items-center justify-center bg-sc-cta hover:bg-sc-cta/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Shop Where to Buy →
          </Link>
        </div>
      </section>

      {/* JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.h1,
            description: article.metaDescription,
            image: article.heroImage,
            author: {
              '@type': 'Organization',
              name: article.author,
              url: 'https://www.swedishcrave.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'SwedishCrave',
              url: 'https://www.swedishcrave.com',
            },
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://www.swedishcrave.com/blog/${article.slug}`,
            },
          }),
        }}
      />

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
              {
                '@type': 'ListItem',
                position: 3,
                name: article.title,
                item: `https://www.swedishcrave.com/blog/${article.slug}`,
              },
            ],
          }),
        }}
      />
    </>
  );
}
