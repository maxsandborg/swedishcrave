import Link from 'next/link';
import { Author } from '@/data/authors';

interface AuthorBioProps {
  author: Author;
}

export default function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="mt-12 pt-8 border-t border-sc-border">
      <div className="flex items-start gap-5 bg-sc-card border border-sc-border rounded-xl p-6">
        {/* Author avatar */}
        <div className="flex-shrink-0">
          {author.image ? (
            <img
              src={author.image}
              alt={author.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-sc-border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-sc-primary/10 border-2 border-sc-border flex items-center justify-center">
              <span className="text-xl font-bold text-sc-primary">
                {author.name.split(' ').map((n) => n[0]).join('')}
              </span>
            </div>
          )}
        </div>

        {/* Author info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/about"
              className="text-lg font-bold text-sc-text hover:text-sc-primary transition-colors"
            >
              {author.name}
            </Link>
            {author.socials.linkedin && (
              <a
                href={author.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sc-text-muted hover:text-sc-primary transition-colors"
                aria-label={`${author.name} on LinkedIn`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}
          </div>
          <p className="text-sm font-medium text-sc-primary mb-2">{author.role}</p>
          <p className="text-sm text-sc-text-muted leading-relaxed">{author.shortBio}</p>
          {author.credentials.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {author.credentials.map((cred) => (
                <span
                  key={cred}
                  className="inline-block text-xs bg-sc-bg text-sc-text-muted px-2.5 py-1 rounded-full border border-sc-border"
                >
                  {cred}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
