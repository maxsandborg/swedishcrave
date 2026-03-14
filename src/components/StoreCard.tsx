import Link from 'next/link';
import { Store } from '@/types';
import RatingStars from './RatingStars';
import { Globe, Truck, Award } from 'lucide-react';

interface StoreCardProps {
  store: Store;
}

export default function StoreCard({ store }: StoreCardProps) {
  return (
    <div className="h-full bg-sc-card rounded-sc-lg border border-sc-border overflow-hidden hover:shadow-sc-hover hover:-translate-y-0.5 transition-all duration-300">
      {/* Header with Name and Rating */}
      <div className="bg-gradient-to-r from-sc-pink to-sc-purple p-5">
        <h3 className="font-display font-bold text-xl text-white mb-2">{store.name}</h3>
        <RatingStars rating={store.rating} maxRating={5} />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col h-full">
        {/* Description */}
        <p className="text-sm text-sc-text-muted mb-4 line-clamp-2 flex-grow">
          {store.description}
        </p>

        {/* Features */}
        <div className="space-y-3 mb-5">
          {/* Ships To */}
          <div className="flex items-start gap-2">
            <Truck className="w-5 h-5 text-sc-pink flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-sc-text-muted uppercase tracking-wide">
                Ships To
              </p>
              <p className="text-sm text-sc-text">
                {store.shipsTo.join(', ')}
              </p>
            </div>
          </div>

          {/* Commission Badge */}
          {store.commission && (
            <div className="flex items-start gap-2">
              <Award className="w-5 h-5 text-sc-lime flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-sc-text-muted uppercase tracking-wide">
                  Commission
                </p>
                <p className="text-sm text-sc-text">{store.commission}</p>
              </div>
            </div>
          )}

          {/* Features List */}
          {store.features.length > 0 && (
            <div className="pt-2 border-t border-sc-border">
              <p className="text-xs font-medium text-sc-text-muted uppercase tracking-wide mb-2">
                Features
              </p>
              <ul className="space-y-1">
                {store.features.slice(0, 2).map((feature, idx) => (
                  <li key={idx} className="text-sm text-sc-text flex items-center gap-2">
                    <span className="text-sc-lime">✓</span>
                    {feature}
                  </li>
                ))}
                {store.features.length > 2 && (
                  <li className="text-sm text-sc-text-muted italic">
                    +{store.features.length - 2} more
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Link
          href={store.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full bg-sc-pink hover:bg-sc-pink-hover text-white font-semibold py-3 rounded-sc-full transition-all duration-200"
        >
          <Globe className="w-4 h-4" />
          Visit Store
        </Link>

        {/* Website Link */}
        <p className="text-center text-xs text-sc-text-muted mt-3">
          <Link
            href={store.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sc-pink transition-colors"
          >
            Official website
          </Link>
        </p>
      </div>
    </div>
  );
}
