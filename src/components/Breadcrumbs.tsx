import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items];

  return (
    <>
      <nav aria-label="Breadcrumb" className="bg-sc-card border-b border-sc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-sc-text-muted">
            {allItems.map((item, i) => (
              <li key={i} className="flex items-center gap-1">
                {i > 0 && <span className="mx-1">/</span>}
                {item.href && i < allItems.length - 1 ? (
                  <Link
                    href={item.href}
                    className="hover:text-sc-pink transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-sc-text font-medium">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: allItems.map((item, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: item.label,
              ...(item.href
                ? { item: `https://www.swedishcrave.com${item.href}` }
                : {}),
            })),
          }),
        }}
      />
    </>
  );
}
