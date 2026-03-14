'use client';

import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { candyItems } from '@/data/candy';
import { brands } from '@/data/brands';

interface SearchResult {
  type: 'candy' | 'brand';
  slug: string;
  name: string;
  subtitle: string;
  href: string;
}

function fuzzyMatch(text: string, query: string): boolean {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  // Direct substring match
  if (lowerText.includes(lowerQuery)) return true;

  // Token match — every query word must appear somewhere
  const queryTokens = lowerQuery.split(/\s+/).filter(Boolean);
  return queryTokens.every((token) => lowerText.includes(token));
}

function scoreResult(result: SearchResult, query: string): number {
  const lowerName = result.name.toLowerCase();
  const lowerQuery = query.toLowerCase();

  // Exact match = highest
  if (lowerName === lowerQuery) return 100;
  // Starts with query
  if (lowerName.startsWith(lowerQuery)) return 80;
  // Name contains query as substring
  if (lowerName.includes(lowerQuery)) return 60;
  // Candy type gets a small boost
  if (result.type === 'candy') return 40;
  return 30;
}

function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const candy of candyItems) {
    results.push({
      type: 'candy',
      slug: candy.slug,
      name: candy.name,
      subtitle: `${candy.brand} · ${candy.category[0]}`,
      href: `/candy/${candy.slug}`,
    });
  }

  for (const brand of brands) {
    results.push({
      type: 'brand',
      slug: brand.slug,
      name: brand.name,
      subtitle: `Brand · ${brand.country}`,
      href: `/brands/${brand.slug}`,
    });
  }

  return results;
}

interface SearchBarProps {
  /** Placeholder text */
  placeholder?: string;
  /** Called on every keystroke (for inline filtering on /candy page) */
  onSearch?: (query: string) => void;
  /** Show dropdown results with navigation links */
  showDropdown?: boolean;
  /** Compact mode for header */
  compact?: boolean;
}

export default function SearchBar({
  placeholder = 'Search candies, brands...',
  onSearch,
  showDropdown = true,
  compact = false,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchIndex = useMemo(() => buildSearchIndex(), []);

  const results = useMemo(() => {
    if (query.length < 2) return [];

    const searchableText = (r: SearchResult) =>
      `${r.name} ${r.subtitle}`;

    // Also search candy tags/description for deeper matching
    const candyMatchExtras = new Set<string>();
    for (const candy of candyItems) {
      const extras = `${candy.tags.join(' ')} ${candy.description} ${candy.flavorProfile.join(' ')}`;
      if (fuzzyMatch(extras, query)) {
        candyMatchExtras.add(candy.slug);
      }
    }

    const matched = searchIndex.filter(
      (r) =>
        fuzzyMatch(searchableText(r), query) ||
        (r.type === 'candy' && candyMatchExtras.has(r.slug))
    );

    matched.sort((a, b) => scoreResult(b, query) - scoreResult(a, query));

    return matched.slice(0, 8);
  }, [query, searchIndex]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(-1);
    setIsOpen(value.length >= 2);
    onSearch?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || !isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      // Navigate programmatically
      window.location.href = results[activeIndex].href;
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    setActiveIndex(-1);
    onSearch?.('');
    inputRef.current?.focus();
  };

  const inputClasses = compact
    ? 'w-full px-3 py-2 pl-9 pr-8 rounded-lg border border-sc-border bg-sc-bg text-sc-text placeholder-sc-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-sc-pink focus:border-transparent transition-all duration-200'
    : 'w-full px-4 py-3 pl-11 pr-10 rounded-lg border border-sc-border bg-sc-card text-sc-text placeholder-sc-text-muted focus:outline-none focus:ring-2 focus:ring-sc-pink focus:border-transparent transition-all duration-200';

  const iconClasses = compact
    ? 'absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sc-text-muted pointer-events-none'
    : 'absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-sc-text-muted pointer-events-none';

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder={placeholder}
          aria-label="Search candies and brands"
          aria-expanded={isOpen && results.length > 0}
          aria-haspopup="listbox"
          role="combobox"
          aria-autocomplete="list"
          className={inputClasses}
        />
        <Search className={iconClasses} />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sc-text-muted hover:text-sc-text transition-colors"
            aria-label="Clear search"
          >
            <X className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {showDropdown && isOpen && results.length > 0 && (
        <div
          role="listbox"
          className="absolute top-full left-0 right-0 mt-1 bg-sc-card border border-sc-border rounded-lg shadow-lg overflow-hidden z-50 max-h-[360px] overflow-y-auto"
        >
          {results.map((result, i) => (
            <Link
              key={`${result.type}-${result.slug}`}
              href={result.href}
              role="option"
              aria-selected={i === activeIndex}
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                i === activeIndex
                  ? 'bg-sc-pink/10 text-sc-pink'
                  : 'text-sc-text hover:bg-sc-border/50'
              }`}
            >
              <span className="text-lg flex-shrink-0">
                {result.type === 'candy' ? '🍬' : '🏭'}
              </span>
              <div className="min-w-0">
                <div className="font-medium truncate">{result.name}</div>
                <div className="text-xs text-sc-text-muted truncate">
                  {result.subtitle}
                </div>
              </div>
            </Link>
          ))}
          <Link
            href={`/candy?q=${encodeURIComponent(query)}`}
            onClick={() => {
              setIsOpen(false);
              setQuery('');
            }}
            className="flex items-center gap-3 px-4 py-3 text-sm border-t border-sc-border text-sc-pink hover:bg-sc-pink/5 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>
              View all results for &quot;{query}&quot;
            </span>
          </Link>
        </div>
      )}

      {/* No results */}
      {showDropdown && isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-sc-card border border-sc-border rounded-lg shadow-lg z-50 px-4 py-6 text-center">
          <p className="text-sm text-sc-text-muted">
            No results for &quot;{query}&quot;
          </p>
          <Link
            href="/candy"
            onClick={() => setIsOpen(false)}
            className="text-sm text-sc-pink hover:underline mt-1 inline-block"
          >
            Browse all candy
          </Link>
        </div>
      )}
    </div>
  );
}
