import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  showNumber?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function RatingStars({
  rating,
  maxRating = 5,
  showNumber = true,
  size = 'md',
}: RatingStarsProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: maxRating }).map((_, i) => {
          const isFilled = i < fullStars;
          const isHalf = i === fullStars && hasHalfStar;

          return (
            <div key={i} className="relative">
              <Star
                size={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
                className={`${sizeClasses[size]} ${
                  isFilled
                    ? 'fill-sc-yellow text-sc-yellow'
                    : isHalf
                      ? 'text-sc-yellow'
                      : 'text-sc-border'
                }`}
              />
              {isHalf && (
                <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                  <Star
                    size={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
                    className={`fill-sc-yellow text-sc-yellow ${sizeClasses[size]}`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showNumber && (
        <span className="text-sm font-medium text-sc-text ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
