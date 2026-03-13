import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'About',
      links: [
        { label: 'About SwedishCrave', href: '/about' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
      ],
    },
    {
      title: 'Explore',
      links: [
        { label: 'All Candy', href: '/candy' },
        { label: 'Categories', href: '/categories' },
        { label: 'Brands', href: '/brands' },
        { label: 'Where to Buy', href: '/where-to-buy' },
      ],
    },
    {
      title: 'Popular',
      links: [
        { label: 'Gummies', href: '/categories/gummies' },
        { label: 'Chocolate', href: '/categories/chocolate' },
        { label: 'Sour Candy', href: '/categories/sour' },
        { label: 'Salmiak', href: '/categories/salmiak' },
      ],
    },
    {
      title: 'Brands',
      links: [
        { label: 'BUBS', href: '/brands/bubs' },
        { label: 'Marabou', href: '/brands/marabou' },
        { label: 'Malaco', href: '/brands/malaco' },
        { label: 'Fazer', href: '/brands/fazer' },
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

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sc-text-muted">
          <p>&copy; {currentYear} SwedishCrave. All rights reserved.</p>
          <p>
            Affiliate disclosure: We earn commissions from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  );
}
