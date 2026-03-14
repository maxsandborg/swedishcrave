import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'About',
      links: [
        { label: 'About SwedishCrave', href: '/about' },
        { label: 'How We Review', href: '/methodology' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Press Kit', href: '/press' },
      ],
    },
    {
      title: 'Explore',
      links: [
        { label: 'All Candy', href: '/candy' },
        { label: 'Categories', href: '/categories' },
        { label: 'Blog', href: '/blog' },
        { label: 'Where to Buy', href: '/where-to-buy' },
      ],
    },
    {
      title: 'Brands',
      links: [
        { label: 'All Brands', href: '/brands' },
        { label: 'Swedish Brands', href: '/brands?country=sweden' },
        { label: 'International', href: '/brands?country=international' },
        { label: 'Brand Directory', href: '/brands' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Newsletter', href: '/newsletter' },
        { label: 'Twitter', href: 'https://twitter.com' },
        { label: 'Instagram', href: 'https://instagram.com' },
        { label: 'Privacy Policy', href: '/privacy' },
      ],
    },
  ];

  return (
    <footer className="bg-sc-card border-t border-sc-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-sc-text mb-4 uppercase tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sc-text-muted hover:text-sc-primary text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-sc-border mb-6" />

        {/* Copyright */}
        <div className="text-center text-sm text-sc-text-muted">
          <p>&copy; {currentYear} SwedishCrave. All rights reserved.</p>
          <p className="mt-2">Exploring the world of Swedish candy, one review at a time.</p>
        </div>
      </div>
    </footer>
  );
}
