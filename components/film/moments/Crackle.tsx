'use client';

import type { LayerProps } from './kit';

/**
 * 7:15 — THE COOLING LOAF / THE CRACKLE. The last prelude beat and the bridge
 * into the climax: the just-baked loaf on the board settles, hairline fissures
 * propagate out from the crown, and the crust's song draws itself across the
 * frame as a seismograph line in butter. The cracks converge on the score — the
 * exact place the First Cut then opens — so the cooling loaf dissolves straight
 * into the R3F loaf being cut. The instrument recording a landscape: brand DNA
 * even with the loaf removed.
 *
 * Cheap: stroke-dashoffset draws on mount (CSS), no canvas. Drawn flat under
 * reduced motion.
 */
export default function Crackle({ opacity, still }: LayerProps) {
  const cracks = [
    'M100 10 q -7 22 -19 37 q -8 10 -21 15',
    'M100 10 q 5 23 15 36 q 8 10 22 13',
    'M100 10 q -1 28 -3 48',
    'M84 46 q -11 6 -24 5',
    'M116 44 q 11 7 25 4',
  ];
  return (
    <div className="moment-crackle" style={{ opacity }} data-still={still ? '' : undefined}>
      <svg className="moment-crackle__svg" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {/* the fissures, radiating from the score */}
        {cracks.map((d, i) => (
          <path
            key={i}
            d={d}
            className="moment-crackle__crack"
            fill="none"
            stroke="rgba(58,34,22,0.7)"
            strokeWidth="0.9"
            strokeLinecap="round"
            pathLength={1}
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
        {/* the crust's song — the seismograph trace, drawn in butter */}
        <path
          d="M6 100 L58 100 L64 86 L70 108 L75 80 L81 104 L87 92 L93 100 L138 100 L149 95 L194 100"
          className="moment-crackle__seis"
          fill="none"
          stroke="rgb(var(--d-inst, 243 199 119))"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
        />
      </svg>
    </div>
  );
}
