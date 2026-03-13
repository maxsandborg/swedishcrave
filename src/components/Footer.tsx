import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerCols = [
    {
      title: 'Explore',
      links: [
        { label: 'All Candy', href: '/candy' },
        { label: 'Brands', href: '/brands' },
        { label: 'Categories', href: '/categories' },
        { label: 'Where to Buy', href: '/where-to-buy' },
      ],
    },
    {
      title: 'Popular',
      links: [
        { label: 'BUBS Sour Skulls', href: '/candy/bubs-sour-skulls' },
        { label: 'Ahlgrens Bilar', href: '/candy/ahlgrens-bilar' },
        { label: 'Marabou', href: '/brands/marabou' },
        { label: 'Daim', href: '/candy/daim' },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
      ],
    },
  ];

  return (
    <footer className="bg-[#1A1A2E] text-white/70 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="font-display text-[22px] font-extrabold text-white mb-3">
              🍬 SwedishCrave
            </div>
            <p className="text-sm leading-relaxed text-white/50 max-w-[300px]">
              Your guide to discovering authentic Swedish candy in the USA. Expert reviews, honest ratings, and the best places to buy.
            </p>
          </div>

          {/* Link Columns */}
          {footerCols.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-[1px] text-white/40 mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-sc-pink transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.08] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <span>&copy; {currentYear} SwedishCrave. All rights reserved.</span>
          <span>Affiliate Disclosure: We may earn commissions from qualifying purchases.</span>
        </div>
      </div>
    </footer>
  );
}
