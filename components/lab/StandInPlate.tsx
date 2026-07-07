/**
 * A synthetic stand-in plate for the grade spike — NOT canon, NOT shipped.
 * Exists only so the welding pass can be verified in-session while the canon
 * plates (M-00 / P-11) remain unreachable behind the blocked CDN. It gives the
 * regrade what it needs to prove itself: warm midtones, one upper-left light
 * source, and a subject in the lower third. Drawn in the base ~6:45 stock so
 * the clock-driven grade has a neutral start.
 */
export default function StandInPlate() {
  return (
    <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" role="img" aria-label="stand-in plate (not canon)">
      <defs>
        <radialGradient id="sp-window" cx="30%" cy="14%" r="55%">
          <stop offset="0%" stopColor="#e7dcc2" />
          <stop offset="45%" stopColor="#8a7048" />
          <stop offset="100%" stopColor="#2a2114" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sp-base" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#3a2e1f" />
          <stop offset="60%" stopColor="#241b12" />
          <stop offset="100%" stopColor="#171009" />
        </linearGradient>
        <radialGradient id="sp-loaf" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#b98f57" />
          <stop offset="55%" stopColor="#6e5432" />
          <stop offset="100%" stopColor="#2c2114" />
        </radialGradient>
        <filter id="sp-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer><feFuncA type="linear" slope="0.06" /></feComponentTransfer>
          <feComposite operator="over" in2="SourceGraphic" />
        </filter>
      </defs>

      {/* the room ground */}
      <rect width="160" height="90" fill="url(#sp-base)" />
      {/* the beam pooling from the upper-left window */}
      <polygon points="8,-4 60,-4 44,90 -10,90" fill="#d8c79b" opacity="0.10" />
      <rect width="160" height="90" fill="url(#sp-window)" opacity="0.85" />
      {/* the loaf, low and centered, catching the light on its upper edge */}
      <ellipse cx="82" cy="70" rx="30" ry="15" fill="url(#sp-loaf)" />
      <path d="M60 66 Q82 60 104 67" stroke="#d9b877" strokeWidth="1.1" fill="none" opacity="0.5" />
      {/* film grain over everything */}
      <rect width="160" height="90" fill="#000" filter="url(#sp-grain)" opacity="0.5" />
    </svg>
  );
}
