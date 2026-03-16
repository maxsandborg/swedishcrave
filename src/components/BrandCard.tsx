import Link from 'next/link';
import Image from 'next/image';
import { Brand } from '@/types';

const brandColors: Record<string, string> = {
  marabou: 'from-[#8B2252] to-[#C23878]',
  bubs: 'from-sc-pink to-sc-purple',
  malaco: 'from-[#E63946] to-[#FF6B6B]',
  fazer: 'from-[#003DA5] to-[#4FACFE]',
  cloetta: 'from-sc-purple to-[#4FACFE]',
  daim: 'from-[#B8860B] to-[#FFD23F]',
  ahlgrens: 'from-[#FF8AB8] to-sc-pink',
  'candy-people': 'from-[#FF3CAC] to-[#784BA0]',
  konfekta: 'from-[#7B2FF7] to-[#C471F5]',
  kolsvart: 'from-[#1A1A2E] to-[#16213E]',
  'haupt-lakrits': 'from-[#2D2D2D] to-[#4A4A4A]',
  lakerol: 'from-[#006B3F] to-[#2ECC71]',
  orkla: 'from-[#003366] to-[#336699]',
  freia: 'from-[#8B4513] to-[#D2691E]',
  lakritsfabriken: 'from-[#1C1C1C] to-[#3D3D3D]',
};

interface BrandCardProps {
  brand: Brand;
  candyCount?: number;
}

export default function BrandCard({ brand, candyCount = 0 }: BrandCardProps) {
  const gradient = brandColors[brand.slug] || 'from-sc-pink to-sc-purple';

  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="group block bg-sc-card border border-sc-border rounded-sc-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-sc-hover hover:border-transparent cursor-pointer"
    >
      {/* Brand Header */}
      <div className={`h-[120px] bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
        {brand.logo ? (
          <div className="relative z-10 w-[80px] h-[80px] bg-white/95 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Image
              src={brand.logo}
              alt={brand.name}
              width={60}
              height={60}
              className="object-contain"
              unoptimized
            />
          </div>
        ) : (
          <span className="text-white font-display text-[42px] font-extrabold opacity-90 group-hover:scale-110 transition-transform duration-300">
            {brand.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-[18px] pb-4">
        <h3 className="font-display font-bold text-[17px] text-sc-text mb-0.5 line-clamp-1">
          {brand.name}
        </h3>
        <p className="text-[12px] text-sc-text-muted mb-2">
          {brand.country} • Est. {brand.founded}
        </p>
        <p className="text-[13px] text-sc-text-muted line-clamp-2 mb-3">
          {brand.description}
        </p>
        <div className="pt-3 border-t border-sc-border">
          <p className="text-[13px] font-semibold text-sc-pink">
            {candyCount} {candyCount === 1 ? 'candy' : 'candies'}
          </p>
        </div>
      </div>
    </Link>
  );
}
