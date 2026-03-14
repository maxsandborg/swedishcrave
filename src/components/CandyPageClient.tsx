'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CandyItem } from '@/types';
import CandyCard from './CandyCard';
import SearchBar from './SearchBar';

interface CandyPageClientProps {
  candyItems: CandyItem[];
}

function fuzzyFilter(candy: CandyItem, query: string): boolean {
  if (!query || query.length < 2) return true;

  const lowerQuery = query.toLowerCase();
  const tokens = lowerQuery.split(/\s+/).filter(Boolean);

  const searchable = [
    candy.name,
    candy.brand,
    candy.description,
    ...candy.category,
    ...candy.tags,
    ...candy.flavorProfile,
  ]
    .join(' ')
    .toLowerCase();

  return tokens.every((token) => searchable.includes(token));
}

export default function CandyPageClient({ candyItems }: CandyPageClientProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  // Update query if URL ?q= changes
  useEffect(() => {
    const q = searchParams.get('q') || '';
    if (q !== query) setQuery(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filteredCandy = useMemo(() => {
    const filtered = candyItems.filter((c) => fuzzyFilter(c, query));
    return filtered.sort((a, b) => b.rating.overall - a.rating.overall);
  }, [candyItems, query]);

  return (
    <>
      {/* Search + Filter Bar */}
      <div className="max-w-xl mb-8">
        <SearchBar
          placeholder="Filter candy by name, brand, flavor..."
          onSearch={setQuery}
          showDropdown={false}
        />
      </div>

      {/* Results count */}
      {query.length >= 2 && (
        <p className="text-sm text-sc-text-muted mb-6">
          {filteredCandy.length === 0
            ? `No candy matches "${query}"`
            : `Showing ${filteredCandy.length} result${filteredCandy.length !== 1 ? 's' : ''} for "${query}"`}
        </p>
      )}

      {/* Candy Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredCandy.map((candy) => (
          <CandyCard key={candy.slug} candy={candy} />
        ))}
      </div>

      {/* Empty state */}
      {filteredCandy.length === 0 && query.length >= 2 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-sc-text-muted">
            No candy found matching &quot;{query}&quot;. Try a different search
            term.
          </p>
        </div>
      )}
    </>
  );
}
