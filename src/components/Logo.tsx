interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

function CandyIcon({ iconSize }: { iconSize: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-50 -26 100 52"
      width={iconSize}
      height={iconSize * 0.52}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="swe-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#006AA7" />
          <stop offset="100%" stopColor="#FECC02" />
        </linearGradient>
        <filter id="candy-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* Wrapper twist left */}
      <path d="M-25,-12 Q-35,-12 -40,-5 Q-45,2 -40,8 Q-35,14 -25,12" fill="none" stroke="#FECC02" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M-28,-8 Q-38,-8 -42,-2 Q-46,4 -42,9 Q-38,14 -28,10" fill="none" stroke="#006AA7" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Candy body */}
      <rect x="-22" y="-18" width="44" height="36" rx="9" fill="url(#swe-grad)" filter="url(#candy-glow)"/>
      {/* Swedish cross */}
      <rect x="-22" y="-4" width="44" height="8" fill="#FECC02"/>
      <rect x="-7" y="-18" width="7" height="36" fill="#FECC02"/>
      {/* Highlight lines */}
      <rect x="-22" y="-1" width="44" height="2" fill="white" opacity="0.4"/>
      <rect x="-4.5" y="-18" width="2" height="36" fill="white" opacity="0.4"/>
      {/* Wrapper twist right */}
      <path d="M25,-12 Q35,-12 40,-5 Q45,2 40,8 Q35,14 25,12" fill="none" stroke="#FECC02" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M28,-8 Q38,-8 42,-2 Q46,4 42,9 Q38,14 28,10" fill="none" stroke="#006AA7" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Shine */}
      <ellipse cx="-10" cy="-9" rx="7" ry="4.5" fill="white" opacity="0.45" transform="rotate(-20,-10,-9)"/>
    </svg>
  );
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const config = {
    sm: { iconSize: 42,  fontSize: '1.75rem',  gap: '8px'  },
    md: { iconSize: 60,  fontSize: '2.6rem',   gap: '12px' },
    lg: { iconSize: 90,  fontSize: '4rem',     gap: '18px' },
  };

  const { iconSize, fontSize, gap } = config[size];

  const swedishStyle: React.CSSProperties = {
    fontFamily: "var(--font-fredoka), 'Fredoka One', 'Nunito', sans-serif",
    fontSize,
    lineHeight: 1,
    letterSpacing: '-0.5px',
    color: '#FECC02',
    filter: [
      'drop-shadow(0px 1px 0px rgba(160,120,0,0.7))',
      'drop-shadow(0px 2px 0px rgba(130,100,0,0.5))',
      'drop-shadow(0px 3px 0px rgba(100,80,0,0.3))',
      'drop-shadow(0px 6px 16px rgba(254,204,2,0.45))',
      'drop-shadow(0px 0px 24px rgba(254,204,2,0.2))',
    ].join(' '),
  };

  const craveStyle: React.CSSProperties = {
    fontFamily: "var(--font-fredoka), 'Fredoka One', 'Nunito', sans-serif",
    fontSize,
    lineHeight: 1,
    letterSpacing: '-0.5px',
    color: '#006AA7',
    filter: [
      'drop-shadow(0px 1px 0px rgba(0,60,100,0.8))',
      'drop-shadow(0px 2px 0px rgba(0,50,90,0.6))',
      'drop-shadow(0px 3px 0px rgba(0,40,80,0.35))',
      'drop-shadow(0px 6px 16px rgba(0,106,167,0.45))',
      'drop-shadow(0px 0px 24px rgba(0,106,167,0.2))',
    ].join(' '),
  };

  return (
    <div
      className={`flex items-center select-none ${className}`}
      style={{ gap }}
      aria-label="SwedishCrave"
      role="img"
    >
      <CandyIcon iconSize={iconSize} />
      <span style={{ display: 'flex', alignItems: 'baseline' }}>
        <span style={swedishStyle}>Swedish</span>
        <span style={craveStyle}>Crave</span>
      </span>
    </div>
  );
}
