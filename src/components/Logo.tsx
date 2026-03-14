interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

function CandyIcon({ iconSize }: { iconSize: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-45 -22 90 44"
      width={iconSize}
      height={iconSize * 0.5}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="swe-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#006AA7" />
          <stop offset="100%" stopColor="#FECC02" />
        </linearGradient>
      </defs>
      {/* Candy wrapper twist left */}
      <path d="M-25,-12 Q-35,-12 -40,-5 Q-45,2 -40,8 Q-35,14 -25,12" fill="none" stroke="#FECC02" strokeWidth="3" strokeLinecap="round"/>
      <path d="M-28,-8 Q-38,-8 -42,-2 Q-46,4 -42,9 Q-38,14 -28,10" fill="none" stroke="#006AA7" strokeWidth="2" strokeLinecap="round"/>
      {/* Candy body */}
      <rect x="-22" y="-18" width="44" height="36" rx="8" fill="url(#swe-grad)"/>
      {/* Cross pattern (Swedish flag) */}
      <rect x="-22" y="-3" width="44" height="6" fill="#FECC02"/>
      <rect x="-6" y="-18" width="6" height="36" fill="#FECC02"/>
      <rect x="-22" y="-1" width="44" height="2" fill="white" opacity="0.5"/>
      <rect x="-4" y="-18" width="2" height="36" fill="white" opacity="0.5"/>
      {/* Candy wrapper twist right */}
      <path d="M25,-12 Q35,-12 40,-5 Q45,2 40,8 Q35,14 25,12" fill="none" stroke="#FECC02" strokeWidth="3" strokeLinecap="round"/>
      <path d="M28,-8 Q38,-8 42,-2 Q46,4 42,9 Q38,14 28,10" fill="none" stroke="#006AA7" strokeWidth="2" strokeLinecap="round"/>
      {/* Shine */}
      <ellipse cx="-10" cy="-10" rx="6" ry="4" fill="white" opacity="0.4" transform="rotate(-20,-10,-10)"/>
    </svg>
  );
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const config = {
    sm: { iconSize: 36, textSize: 'text-lg', gap: 'gap-1.5' },
    md: { iconSize: 44, textSize: 'text-2xl', gap: 'gap-2' },
    lg: { iconSize: 60, textSize: 'text-4xl', gap: 'gap-3' },
  };

  const { iconSize, textSize, gap } = config[size];

  return (
    <div className={`flex items-center ${gap} ${className}`} aria-label="SwedishCrave" role="img">
      <CandyIcon iconSize={iconSize} />
      <span className={`${textSize} font-extrabold leading-none select-none`}>
        <span className="bg-gradient-to-r from-[#FF3E8A] via-[#FF6B9D] to-[#7B2FBE] bg-clip-text text-transparent">Swedish</span>
        <span className="text-[#7B2FBE]">Crave</span>
      </span>
    </div>
  );
}
