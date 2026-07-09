'use client';

import type { LayerProps } from './kit';

/**
 * 5:10 — THE FOLD. The one prelude beat with no matching prop in the M-00 plate
 * (the loaf is baked, not raw dough), so this is an honest layered placeholder,
 * flagged in the schedule: the floured bench in warm focus, the Score arc as the
 * compositional divider on its shallow lame sweep, and a slow "knead" breath in
 * the light — the rhythm of the fold without faking the dough. The Full-tier
 * upgrade is a real macro dough plate/loop; until then the arc + the fact carry
 * it (3–4 identity carriers, no bread required).
 *
 * Cheap by design: the breath is a CSS animation (off under reduced motion), no
 * canvas, no rAF.
 */
export default function Fold({ opacity, still }: LayerProps) {
  return (
    <div className="moment-fold" style={{ opacity }} data-still={still ? '' : undefined}>
      <div className="moment-fold__dough" />
      <svg className="moment-fold__score" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M2 40 C 26 35.5, 66 27.5, 98 18"
          fill="none"
          stroke="rgb(var(--d-inst, 156 106 33))"
          strokeWidth="0.7"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
