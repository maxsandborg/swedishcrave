'use client';

import { useState, useEffect, useCallback } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractHeadings(html: string): TocItem[] {
  const headingRegex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    // Strip any inner HTML tags to get plain text
    const text = match[2].replace(/<[^>]*>/g, '').trim();
    if (text) {
      items.push({
        id: slugify(text),
        text,
        level,
      });
    }
  }

  return items;
}

// injectHeadingIds is now in @/lib/heading-utils for server-side use

interface TableOfContentsProps {
  html: string;
}

export default function TableOfContents({ html }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const headings = extractHeadings(html);

  const handleScroll = useCallback(() => {
    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    // Find the heading closest to the top of the viewport
    let currentId = '';
    for (const el of headingElements) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 120) {
        currentId = el.id;
      } else {
        break;
      }
    }
    setActiveId(currentId);
  }, [headings]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (headings.length < 3) {
    return null; // Don't show TOC for short articles
  }

  return (
    <nav
      aria-label="Table of contents"
      className="bg-sc-card border border-sc-border rounded-xl p-6 mb-10"
    >
      <p className="text-xs font-bold uppercase tracking-wide text-sc-text-muted mb-3">
        In This Article
      </p>
      <ol className="space-y-1.5">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? 'pl-4' : ''}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(heading.id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  // Update URL hash without jumping
                  window.history.replaceState(null, '', `#${heading.id}`);
                }
              }}
              className={`block text-[14px] leading-[1.6] py-0.5 transition-colors ${
                activeId === heading.id
                  ? 'text-sc-pink font-semibold'
                  : 'text-sc-text-muted hover:text-sc-text'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
