'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Candy', href: '/candy' },
    { label: 'Categories', href: '/categories' },
    { label: 'Stores', href: '/where-to-buy' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-sc-bg/90 backdrop-blur-xl border-b border-sc-border">
      <nav className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-[68px]">
          {/* Logo — text only, user handles custom logo later */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span className="text-xl" aria-hidden="true">🇸🇪</span>
            <span className="font-display font-bold text-[22px] text-sc-text">
              SwedishCrave
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sc-text-muted hover:text-sc-primary font-medium text-[15px] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Search + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/where-to-buy"
              className="inline-flex items-center gap-1.5 bg-sc-primary text-white font-semibold text-[13px] px-5 py-2.5 rounded-sc-full hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Shop Mums →
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-sc-text hover:text-sc-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-sc-border">
            <div className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sc-text hover:bg-sc-cream rounded-sc-sm font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/where-to-buy"
                className="mx-4 mt-2 text-center bg-sc-primary text-white font-semibold text-sm px-5 py-3 rounded-sc-full"
                onClick={() => setIsOpen(false)}
              >
                Shop Mums →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
