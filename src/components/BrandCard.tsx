import Link from 'next/link';
import { Brand } from '@/types';

interface BrandCardProps {
  brand: Brand;
  candyCount?: number;
}

export default function BrandCard({ brand, candyCount = 0 }: BrandCardProps) {
  return (
    <Link href={`/brands/${brand.slug}`}>
      <div className="h-full bg-sc-card rounded-xl border border-sc-border overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        {/* Logo/Image Placeholder */}
        <div className="w-full h-40 bg-gradient-to-br from-sc-primary to-sc-secondary flex items-center justify-center">
          <div className="text-center">
            <div className="text-white font-bold text-3xl opacity-90">
              {brand.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Brand Name */}
          <h3 className="font-bold text-lg text-sc-text mb-1 line-clamp-2">
            {brand.name}
          </h3>

          {/* Country */}
          <p className="text-sm text-sc-text-muted mb-3">
            {brand.country}
          </p>

          {/* Description */}
          <p className="text-sm text-sc-text-muted line-clamp-3 mb-4">
            {brand.description}
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
