import Link from 'next/link';
import { CandyItem } from '@/types';
import CandyImage from './CandyImage';
import RatingStars from './RatingStars';

interface CandyCardProps {
  candy: CandyItem;
  badge?: 'featured' | 'trending' | 'new' | 'viral';
}

const badgeStyles: Record<string, string> = {
  featured: 'bg-sc-purple text-white shadow-[0_2px_8px_rgba(108,92,231,0.3)]',
  trending: 'bg-sc-pink text-white shadow-[0_2px_8px_rgba(255,45,135,0.3)]',
  new: 'bg-sc-lime text-[#1a5e1a]',
  viral: 'bg-sc-pink text-white shadow-[0_2px_8px_rgba(255,45,135,0.3)]',
};

export default function CandyCard({ candy, badge }: CandyCardProps) {
  // Auto-detect badge if not provided
  const displayBadge = badge || (candy.featured ? 'featured' : candy.trending ? 'trending' : undefined);

  return (
    <Link
      href={`/candy/${candy.slug}`}
      className="group block relative bg-sc-card border border-sc-border rounded-sc-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-sc-hover hover:border-transparent cursor-pointer"
    >
      {/* Badge */}
      {displayBadge && (
        <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-sc-full text-[11px] font-bold uppercase tracking-wide ${badgeStyles[displayBadge]}`}>
          {displayBadge}
        </div>
      )}

      {/* Image */}
      <div className="h-[200px] overflow-hidden">
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.03]">
          <CandyImage
            src={candy.image}
            alt={candy.name}
            category={candy.category[0]}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Body */}
      <div className="p-[18px] pb-4">
        {/* Category Tags */}
        <div className="flex gap-1.5 mb-2.5 flex-wrap">
          {candy.category.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-sc-full cat-tag-${cat}`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Name & Brand */}
        <h3 className="font-display font-bold text-[17px] text-sc-text mb-0.5 line-clamp-1">
          {candy.name}
        </h3>
        <p className="text-[13px] text-sc-text-muted mb-2.5">by {candy.brand}</p>

        {/* Footer: Rating + Price */}
        <div className="flex items-center justify-between">
          <RatingStars rating={candy.rating.overall} size="sm" />
          <span className="text-[13px] font-semibold text-sc-pink">
            {candy.affiliateLinks[0]?.price ? `From ${candy.affiliateLinks[0].price}` : candy.priceRange}
          </span>
        </div>
      </div>
    </Link>
  );
}
