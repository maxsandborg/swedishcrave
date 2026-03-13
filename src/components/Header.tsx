'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Candy', href: '/candy' },
    { label: 'Brands', href: '/brands' },
    { label: 'Categories', href: '/categories' },
    { label: 'Blog', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-sc-bg/[0.92] backdrop-blur-xl border-b border-sc-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-[28px]" aria-hidden="true">🍬</span>
            <span className="font-display text-[26px] font-extrabold text-sc-text">
              Swedish<span className="text-gradient-pink">Crave</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-sc-text-muted hover:text-sc-pink transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-sc-pink after:rounded-full after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/where-to-buy"
              className="bg-sc-pink text-white px-5 py-2 rounded-sc-full text-[13px] font-semibold shadow-[0_2px_10px_rgba(255,45,135,0.3)] hover:bg-sc-pink-hover hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(255,45,135,0.4)] transition-all"
            >
              Where to Buy →
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-sc-text hover:text-sc-pink transition-colors"
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
                  className="px-4 py-2.5 text-sc-text hover:bg-sc-bg-alt rounded-sc-sm font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/where-to-buy"
                className="mx-4 mt-2 text-center bg-sc-pink text-white py-2.5 rounded-sc-full text-sm font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Where to Buy →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
