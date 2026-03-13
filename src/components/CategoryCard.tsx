import Link from 'next/link';
import { Category } from '@/types';

const categoryEmojis: Record<string, string> = {
  gummies: '🍬',
  chocolate: '🍫',
  sour: '🍋',
  licorice: '⬛',
  salmiak: '🧂',
  classic: '⭐',
  mix: '🎨',
  wafer: '🍫',
  toffee: '🍫',
  'hard-candy': '🍬',
  pastille: '💊',
};

interface CategoryCardProps {
  category: Category;
  candyCount?: number;
}

export default function CategoryCard({
  category,
  candyCount = 0,
}: CategoryCardProps) {
  const emoji = categoryEmojis[category.slug] || '🍬';

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block relative rounded-sc-lg overflow-hidden h-[180px] cursor-pointer transition-all duration-300 hover:-translate-y-[3px] hover:shadow-sc-lg"
    >
      {/* Colorful Background with Emoji */}
      <div className={`cat-bg-${category.slug} w-full h-full flex items-center justify-center text-[64px]`}>
        {emoji}
      </div>

      {/* Dark Overlay with Text */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center transition-opacity duration-300 group-hover:bg-black/[0.85]">
        <h3 className="font-display text-[22px] font-extrabold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
          {category.name}
        </h3>
        <p className="text-[13px] text-white/80 mt-1">
          {candyCount} {candyCount === 1 ? 'candy' : 'candies'}
        </p>
      </div>
    </Link>
  );
}
