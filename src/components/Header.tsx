'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import Logo from './Logo';
import SearchBar from './SearchBar';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: 'Candy', href: '/candy' },
    { label: 'Brands', href: '/brands' },
    { label: 'Categories', href: '/categories' },
    { label: 'Blog', href: '/blog' },
    { label: 'Where to Buy', href: '/where-to-buy' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-sc-bg border-b border-sc-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="hover:opacity-90 transition-opacity flex-shrink-0"
          >
            <Logo size="sm" className="block md:hidden" />
            <Logo size="md" className="hidden md:block" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sc-text hover:text-sc-primary font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {/* Desktop Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-sc-text-muted hover:text-sc-pink transition-colors"
              aria-label="Toggle search"
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                setIsOpen(false);
              }}
              className="p-2 text-sc-text hover:text-sc-primary transition-colors"
              aria-label="Toggle search"
            >
              {searchOpen ? <X size={22} /> : <Search size={22} />}
            </button>
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                setSearchOpen(false);
              }}
              className="p-2 text-sc-text hover:text-sc-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar (slides in below nav) */}
        {searchOpen && (
          <div className="pb-4 pt-1">
            <SearchBar compact placeholder="Search candy, brands..." />
          </div>
        )}

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-sc-border">
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sc-text hover:bg-sc-border rounded-lg font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
