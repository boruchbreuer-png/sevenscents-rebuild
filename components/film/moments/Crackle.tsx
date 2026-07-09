'use client';

import { useEffect, useRef } from 'react';
import { useRaf, type LayerProps } from './kit';

/**
 * 7:15 — THE COOLING LOAF / THE CRACKLE. The last prelude beat and the bridge
 * into the climax, and the film's one Proofing moment: stillness is rewarded.
 * The just-baked loaf settles, and the longer the visitor slows or holds still,
 * the further the hairline fissures propagate out from the crown and the more
 * the crust's song develops on the seismograph. Movement only slows the
 * development — a cooling crust never un-cracks, so `--proof` ratchets and holds
 * (Article IV, made physical again). The cracks converge on the score — the
 * exact place the First Cut then opens — so the cooling loaf dissolves straight
 * into the R3F loaf being cut.
 *
 * Reduced motion: fully developed, no rAF, no idle detection.
 */
export default function Crackle({ opacity, active, still }: LayerProps) {
  const root = useRef<HTMLDivElement>(null);
  const proof = useRef(0);
  const lastActivity = useRef(0);

  // any scroll or pointer movement resets the idle clock
  useEffect(() => {
    if (still || !active) return;
    const bump = () => {
      lastActivity.current = performance.now();
    };
    bump();
    window.addEventListener('scroll', bump, { passive: true });
    window.addEventListener('pointermove', bump, { passive: true });
    return () => {
      window.removeEventListener('scroll', bump);
      window.removeEventListener('pointermove', bump);
    };
  }, [still, active]);

  useRaf(active && !still, (dt) => {
    const idle = (performance.now() - lastActivity.current) / 1000;
    // stillness develops the crust ~4× faster; motion only slows it, never
    // reverses — the reward for holding still, never a game, never loud.
    const rate = idle > 0.35 ? 0.42 : 0.1;
    proof.current = Math.min(1, proof.current + rate * dt);
    root.current?.style.setProperty('--proof', proof.current.toFixed(3));
  });

  useEffect(() => {
    root.current?.style.setProperty('--proof', still ? '1' : proof.current.toFixed(3));
  }, [still, active]);

  const cracks = [
    'M100 10 q -7 22 -19 37 q -8 10 -21 15',
    'M100 10 q 5 23 15 36 q 8 10 22 13',
    'M100 10 q -1 28 -3 48',
    'M84 46 q -11 6 -24 5',
    'M116 44 q 11 7 25 4',
  ];
  return (
    <div ref={root} className="moment-crackle" style={{ opacity }} data-still={still ? '' : undefined}>
      <svg className="moment-crackle__svg" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {/* the fissures, radiating from the score — later ones lag as it proofs */}
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
            style={{ ['--k' as string]: (1.36 - i * 0.09).toFixed(2) }}
          />
        ))}
        {/* the crust's song — the seismograph trace, brightening as it develops */}
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
