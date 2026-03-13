import Link from 'next/link';
import { CandyItem } from '@/types';
import RatingStars from './RatingStars';

interface CandyCardProps {
  candy: CandyItem;
}

const getCategoryColor = (index: number) => {
  const colors = [
    'bg-blue-100 text-blue-800',
    'bg-pink-100 text-pink-800',
    'bg-purple-100 text-purple-800',
    'bg-amber-100 text-amber-800',
    'bg-green-100 text-green-800',
    'bg-red-100 text-red-800',
  ];
  return colors[index % colors.length];
};

export default function CandyCard({ candy }: CandyCardProps) {
  return (
    <Link href={`/candy/${candy.slug}`}>
      <div className="h-full bg-sc-card rounded-xl border border-sc-border overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        {/* Image Placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-sc-secondary to-sc-primary flex items-center justify-center relative overflow-hidden">
          {/* Color gradient based on brand */}
          <div className="text-center text-white font-semibold text-lg opacity-90">
            {candy.name}
          </div>

          {/* Featured Badge */}
          {candy.featured && (
            <div className="absolute top-3 right-3 bg-sc-cta text-white text-xs font-bold px-2 py-1 rounded">
              Featured
            </div>
          )}

          {/* Trending Badge */}
          {candy.trending && (
            <div className="absolute top-3 left-3 bg-sc-success text-white text-xs font-bold px-2 py-1 rounded">
              Trending
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col h-full">
          {/* Name and Brand */}
          <div className="mb-3">
            <h3 className="font-bold text-sc-text text-lg line-clamp-2 mb-1">
              {candy.name}
            </h3>
            <p className="text-sm text-sc-text-muted">{candy.brand}</p>
          </div>

          {/* Rating */}
          <div className="mb-3">
            <RatingStars rating={candy.rating.overall} size="sm" />
          </div>

          {/* Description */}
          <p className="text-sm text-sc-text-muted line-clamp-2 mb-3 flex-grow">
            {candy.description}
          </p>

          {/* Price and Categories */}
          <div className="space-y-3 mt-auto">
            <div>
              <p className="text-sm font-medium text-sc-primary mb-1">
                {candy.priceRange}
              </p>
            </div>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-2">
              {candy.category.slice(0, 2).map((cat, idx) => (
                <span
                  key={cat}
                  className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(
                    idx
                  )}`}
                >
                  {cat}
                </span>
              ))}
              {candy.category.length > 2 && (
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-sc-border text-sc-text-muted">
                  +{candy.category.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
