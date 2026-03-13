'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  placeholder = 'Search candies, brands, or categories...',
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-11 rounded-lg border border-sc-border bg-sc-card text-sc-text placeholder-sc-text-muted focus:outline-none focus:ring-2 focus:ring-sc-pink focus:border-transparent transition-all duration-200"
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-sc-text-muted pointer-events-none" />
      </div>
    </form>
  );
}
