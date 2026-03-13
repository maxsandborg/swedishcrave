import Link from 'next/link';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  candyCount?: number;
  colorAccent?: string;
}

const accentColors = [
  'from-blue-400 to-blue-600',
  'from-pink-400 to-pink-600',
  'from-purple-400 to-purple-600',
  'from-amber-400 to-amber-600',
  'from-green-400 to-green-600',
  'from-red-400 to-red-600',
  'from-indigo-400 to-indigo-600',
  'from-rose-400 to-rose-600',
];

export default function CategoryCard({
  category,
  candyCount = 0,
  colorAccent,
}: CategoryCardProps) {
  const accentColor =
    colorAccent ||
    accentColors[
      category.slug.charCodeAt(0) % accentColors.length
    ];

  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="h-full bg-sc-card rounded-xl border border-sc-border overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        {/* Color Accent Bar */}
        <div className={`w-full h-32 bg-gradient-to-br ${accentColor}`} />

        {/* Content */}
        <div className="p-5">
          {/* Category Name */}
          <h3 className="font-bold text-lg text-sc-text mb-2 line-clamp-2">
            {category.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-sc-text-muted line-clamp-3 mb-4">
            {category.description}
          </p>

          {/* Candy Count */}
          <div className="pt-3 border-t border-sc-border">
            <p className="text-sm font-medium text-sc-primary">
              {candyCount} {candyCount === 1 ? 'candy' : 'candies'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
