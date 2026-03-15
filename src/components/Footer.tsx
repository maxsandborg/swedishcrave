import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Browse',
      links: [
        { label: 'All Candy', href: '/candy' },
        { label: 'Stores', href: '/where-to-buy' },
        { label: 'Categories', href: '/categories' },
        { label: 'Best Sellers', href: '/best/swedish-candy' },
      ],
    },
    {
      title: 'Learn',
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Candy Guide', href: '/guides/swedish-candy-guide' },
        { label: 'Lördagsgodis', href: '/blog/lordagsgodis-swedish-saturday-candy' },
        { label: 'About Us', href: '/about' },
      ],
    },
    {
      title: 'Brands',
      links: [
        { label: 'All Brands', href: '/brands' },
        { label: 'BUBS', href: '/brands/bubs' },
        { label: 'Marabou', href: '/brands/marabou' },
        { label: 'Malaco', href: '/brands/malaco' },
      ],
    },
    {
      title: 'Follow',
      links: [
        { label: 'Newsletter', href: '/newsletter' },
        { label: 'TikTok', href: 'https://tiktok.com/@swedishcrave' },
        { label: 'Instagram', href: 'https://instagram.com/swedishcrave' },
        { label: 'Privacy Policy', href: '/privacy' },
      ],
    },
  ];

  return (
    <footer className="bg-sc-dark text-white/60">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
              <span>🍬</span> SwedishCrave
            </div>
            <p className="text-sm leading-relaxed">
              Your guide to the best Swedish candy in the US. Reviews, comparisons, and sweet discoveries.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold text-white mb-4 uppercase tracking-widest">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-sc-yellow text-sm transition-colors"
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
        <div className="border-t border-white/10 mb-6" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-white/40 gap-2">
          <p>&copy; {currentYear} SwedishCrave. All rights reserved.</p>
          <p>Made with 🇸🇪 in the USA</p>
        </div>
      </div>
    </footer>
  );
}
