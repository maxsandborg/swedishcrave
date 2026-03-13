'use client';

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

interface CandyImageProps {
  src: string;
  alt: string;
  category?: string;
  className?: string;
}

export default function CandyImage({ src, alt, category = 'classic', className = '' }: CandyImageProps) {
  const emoji = categoryEmojis[category] || categoryEmojis.classic;
  const bgClass = `candy-bg-${category}`;

  return (
    <div className={`relative flex items-center justify-center ${bgClass} ${className}`}>
      <div className="text-center p-4">
        <span className="text-[56px] mb-2 block">{emoji}</span>
      </div>
      {/* Real image overlay — will show when actual images are added */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
        loading="lazy"
      />
    </div>
  );
}
