interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const dimensions = {
    sm: { width: 160, height: 40 },
    md: { width: 220, height: 52 },
    lg: { width: 320, height: 76 },
  };

  const { width, height } = dimensions[size];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 440 100"
      width={width}
      height={height}
      className={className}
      aria-label="SwedishCrave"
      role="img"
    >
      <defs>
        <linearGradient id="logo-candy-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF3E8A" />
          <stop offset="50%" stopColor="#FF6B9D" />
          <stop offset="100%" stopColor="#7B2FBE" />
        </linearGradient>
        <linearGradient id="logo-swe-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#006AA7" />
          <stop offset="100%" stopColor="#FECC02" />
        </linearGradient>
      </defs>

      {/* Swedish flag candy icon */}
      <g transform="translate(28, 48) scale(0.72)">
        {/* Candy wrapper twist left */}
        <path d="M-25,-12 Q-35,-12 -40,-5 Q-45,2 -40,8 Q-35,14 -25,12" fill="none" stroke="#FECC02" strokeWidth="3" strokeLinecap="round"/>
        <path d="M-28,-8 Q-38,-8 -42,-2 Q-46,4 -42,9 Q-38,14 -28,10" fill="none" stroke="#006AA7" strokeWidth="2" strokeLinecap="round"/>
        {/* Candy body */}
        <rect x="-22" y="-18" width="44" height="36" rx="8" fill="url(#logo-swe-grad)"/>
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
      </g>

      {/* "SwedishCrave" text */}
      <text x="68" y="60" fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif" fontSize="38" fontWeight="800" fill="url(#logo-candy-grad)" letterSpacing="-0.5">
        Swedish
        <tspan fill="#7B2FBE">Crave</tspan>
      </text>

      {/* Classic wrapped candy (right accent) */}
      <g transform="translate(418, 38) scale(0.38) rotate(-20)">
        {/* Wrapper twist left */}
        <path d="M-22,-10 Q-30,-12 -34,-6 Q-38,0 -34,6 Q-30,10 -22,10" fill="none" stroke="#FF6B9D" strokeWidth="3" strokeLinecap="round"/>
        {/* Candy body */}
        <ellipse cx="0" cy="0" rx="18" ry="14" fill="#FF3E8A"/>
        {/* Candy stripe */}
        <ellipse cx="0" cy="0" rx="18" ry="14" fill="none" stroke="white" strokeWidth="3" strokeDasharray="6 8" opacity="0.4"/>
        {/* Wrapper twist right */}
        <path d="M22,-10 Q30,-12 34,-6 Q38,0 34,6 Q30,10 22,10" fill="none" stroke="#FF6B9D" strokeWidth="3" strokeLinecap="round"/>
        {/* Shine */}
        <ellipse cx="-6" cy="-5" rx="5" ry="3" fill="white" opacity="0.35" transform="rotate(-15,-6,-5)"/>
      </g>
    </svg>
  );
}
