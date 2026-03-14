'use client';

import { useState } from 'react';
import Image from 'next/image';

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
  /** Priority loading (for above-the-fold images) */
  priority?: boolean;
}

export default function CandyImage({
  src,
  alt,
  category = 'classic',
  className = '',
  priority = false,
}: CandyImageProps) {
  const [imgError, setImgError] = useState(false);
  const emoji = categoryEmojis[category] || categoryEmojis.classic;
  const bgClass = `candy-bg-${category}`;

  return (
    <div className={`relative flex items-center justify-center ${bgClass} ${className}`}>
      {/* Emoji fallback — always rendered behind the image */}
      <div className="text-center p-4">
        <span className="text-[56px] mb-2 block">{emoji}</span>
      </div>

      {/* Optimized image overlay — hidden on error, shows when loaded */}
      {!imgError && src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
          priority={priority}
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
}
