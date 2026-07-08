import { buildCut } from '@/lib/firstcut';

/**
 * The First Cut scene — procedural stand-in loaf, opened by `progress`.
 * Pure: same progress → same frame. Single light from the upper-left, approved
 * palette only. Not final art — a mechanics stand-in.
 */
export default function CutView({ progress, reduced = false }: { progress: number; reduced?: boolean }) {
  const cut = buildCut(progress);
  const steam = reduced ? 0 : cut.steam;
  // reduced motion also freezes the camera push
  const camScale = reduced ? 1 : cut.cameraScale;
  const camY = reduced ? 0 : cut.cameraY;

  return (
    <svg viewBox="0 0 1000 640" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="First Cut mechanic">
      <defs>
        <radialGradient id="fc-crust" cx="38%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#efe4cd" />
          <stop offset="52%" stopColor="#d9b877" />
          <stop offset="100%" stopColor="#6e4a22" />
        </radialGradient>
        <radialGradient id="fc-crumb" cx="50%" cy="26%" r="80%">
          <stop offset="0%" stopColor="#f3c777" />
          <stop offset="46%" stopColor="#c6892f" />
          <stop offset="100%" stopColor="#3a1f0d" />
        </radialGradient>
        <linearGradient id="fc-lip" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#f4eee0" />
          <stop offset="55%" stopColor="#d9b877" />
          <stop offset="100%" stopColor="#8a5c2c" />
        </linearGradient>
        <radialGradient id="fc-table" cx="34%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#3a2e1f" />
          <stop offset="100%" stopColor="#171009" />
        </radialGradient>
        <filter id="fc-flour"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /><feComponentTransfer><feFuncA type="linear" slope="0.05" /></feComponentTransfer><feComposite operator="over" in2="SourceGraphic" /></filter>
        <filter id="fc-soft"><feGaussianBlur stdDeviation="9" /></filter>
        <radialGradient id="fc-glow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#f3c777" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f3c777" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* the world ground */}
      <rect width="1000" height="640" fill="url(#fc-table)" />
      <ellipse cx="500" cy="548" rx="360" ry="40" fill="#0e0a05" opacity="0.6" filter="url(#fc-soft)" />

      <g transform={`translate(0 ${camY}) scale(${camScale})`} style={{ transformOrigin: '500px 360px' }}>
        {/* warm interior glow escaping the cut */}
        {progress > 0.02 && <ellipse cx="500" cy="300" rx="230" ry="120" fill="url(#fc-glow)" opacity={Math.min(1, progress * 1.4)} />}

        {/* the loaf */}
        <ellipse cx="500" cy="380" rx="320" ry="172" fill="url(#fc-crust)" />
        <ellipse cx="500" cy="380" rx="320" ry="172" fill="#000" filter="url(#fc-flour)" opacity="0.5" />
        {/* flour dusting, catching the upper-left light */}
        <ellipse cx="430" cy="300" rx="200" ry="80" fill="#f4eee0" opacity="0.10" filter="url(#fc-soft)" />

        {/* the opened interior */}
        <path d={cut.crumbD} fill="url(#fc-crumb)" />
        <path d={cut.crumbD} fill="none" stroke="#2c160a" strokeWidth="2" opacity="0.5" />

        {/* the lifted crust lip — the ear */}
        <path d={cut.lipD} fill="url(#fc-lip)" stroke="#5c3a18" strokeWidth="1.5" />
        {/* rim light along the lifted edge (single source, upper-left) */}
        {progress > CRUST_BREAK_VIS && <path d={cut.lipD} fill="none" stroke="#f4eee0" strokeWidth="2" opacity={Math.min(0.7, progress)} />}

        {/* the lame incision — always present, a bakeable score, not a UI stroke */}
        <path d={cut.scoreD} fill="none" stroke="#3a2216" strokeWidth={3.2} strokeLinecap="round" opacity={0.9 - progress * 0.7} />
        <path d={cut.scoreD} fill="none" stroke="#f4eee0" strokeWidth={1} strokeLinecap="round" opacity={(0.5 - progress) * 0.6} />

        {/* steam burst placeholder */}
        {steam > 0.01 && (
          <g opacity={steam} filter="url(#fc-soft)">
            <ellipse cx="470" cy="210" rx="26" ry="54" fill="#f4eee0" opacity="0.5" />
            <ellipse cx="520" cy="175" rx="20" ry="46" fill="#ece3d0" opacity="0.4" />
            <ellipse cx="498" cy="150" rx="16" ry="40" fill="#f4eee0" opacity="0.3" />
          </g>
        )}
      </g>
    </svg>
  );
}

// visibility threshold mirrors CRUST_BREAK without importing runtime constant into JSX guard
const CRUST_BREAK_VIS = 0.14;
