'use client';

const categoryColors: Record<string, { bg: string; text: string; emoji: string }> = {
  gummies: { bg: 'bg-pink-100', text: 'text-pink-600', emoji: '🍬' },
  chocolate: { bg: 'bg-amber-100', text: 'text-amber-700', emoji: '🍫' },
  sour: { bg: 'bg-lime-100', text: 'text-lime-600', emoji: '🍋' },
  licorice: { bg: 'bg-gray-200', text: 'text-gray-700', emoji: '⬛' },
  salmiak: { bg: 'bg-slate-200', text: 'text-slate-700', emoji: '🧂' },
  classic: { bg: 'bg-blue-100', text: 'text-blue-600', emoji: '⭐' },
};

interface CandyImageProps {
  src: string;
  alt: string;
  category?: string;
  className?: string;
}

export default function CandyImage({ src, alt, category = 'classic', className = '' }: CandyImageProps) {
  const style = categoryColors[category] || categoryColors.classic;

  return (
    <div className={`relative ${style.bg} flex items-center justify-center ${className}`}>
      <div className="text-center p-6">
        <span className="text-5xl mb-3 block">{style.emoji}</span>
        <p className={`text-sm font-semibold ${style.text}`}>{alt}</p>
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
