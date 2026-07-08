/**
 * The Handover room as a flat still — for reduced-motion paths (no WebGL, no
 * dive). Implied, universal, dissolved in light. Placeholder home.
 */
export function MorningRoomStill() {
  return (
    <svg viewBox="0 0 100 56" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="rs-bg" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#ece3d0" />
          <stop offset="100%" stopColor="#c9b98f" />
        </linearGradient>
        <radialGradient id="rs-win" cx="24%" cy="26%" r="40%">
          <stop offset="0%" stopColor="#f8f3e6" />
          <stop offset="100%" stopColor="#f8f3e6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rs-loaf" cx="45%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#e7c98f" />
          <stop offset="60%" stopColor="#b98f57" />
          <stop offset="100%" stopColor="#6e4a22" />
        </radialGradient>
      </defs>
      <rect width="100" height="56" fill="url(#rs-bg)" />
      <rect x="8" y="6" width="20" height="24" fill="#f8f3e6" />
      <g stroke="#b7a274" strokeWidth="0.5"><line x1="18" y1="6" x2="18" y2="30" /><line x1="8" y1="18" x2="28" y2="18" /></g>
      <rect width="100" height="56" fill="url(#rs-win)" />
      <rect x="0" y="40" width="100" height="16" fill="#5c4326" />
      <rect x="0" y="40" width="100" height="2.5" fill="#6e4f2c" />
      <ellipse cx="52" cy="43.5" rx="12" ry="5.5" fill="url(#rs-loaf)" />
      <path d="M44 42.5 Q52 40.4 60 42.8" stroke="#f3c777" strokeWidth="0.7" fill="none" opacity="0.7" />
      <ellipse cx="72" cy="44" rx="4.2" ry="2.1" fill="#e7ddc6" />
      <ellipse cx="72" cy="43.2" rx="3" ry="1.3" fill="#2c1c10" opacity="0.5" />
      <rect x="26" y="44" width="14" height="4" rx="2" fill="#e7ddc6" opacity="0.85" />
    </svg>
  );
}
