/**
 * Utility functions for processing article headings.
 * These are pure string manipulation functions safe for server-side use.
 */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Injects id attributes into h2/h3 headings in article HTML content.
 * Must be called before rendering the content.
 */
export function injectHeadingIds(html: string): string {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h[23]>/gi, (fullMatch, level, attrs, inner) => {
    const text = inner.replace(/<[^>]*>/g, '').trim();
    const id = slugify(text);
    // Check if there's already an id attribute
    if (/id\s*=/.test(attrs)) {
      return fullMatch;
    }
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
}
