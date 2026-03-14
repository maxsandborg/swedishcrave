interface JsonLdProps {
  type: 'Product' | 'Review' | 'WebSite' | 'BreadcrumbList' | 'Organization';
  data: Record<string, unknown>;
}

export default function JsonLd({ type, data }: JsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
