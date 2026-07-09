'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Prelude from './Prelude';
import Ending from './Ending';
import { PLATES } from '@/lib/plates';
import { BEATS } from '@/lib/prelude';
import { dawnAt } from '@/lib/dawn';
import { gradeAt, gradeVars } from '@/lib/grade';

const ContinuityScene = dynamic(() => import('@/components/lab/ContinuityScene'), { ssr: false });

/**
 * The RITUAL film — one scroll, one morning (4:12 → 8:04).
 *   Prelude (Acts I–II): the M-00 room lit as a set — the single light pools on
 *     each prop in turn (the Mother, flour in the beam, the fold, the tally, the
 *     oven, the cooling loaf), with lightweight live layers carrying the life.
 *   Climax (Act III): the integrated First Cut → crumb → window → H-01 Handover
 *     (R3F). The prelude's cooling, cracking loaf dissolves straight into the cut.
 *   Ending: the promise + reservation, the approved Frame 12 language.
 * The Dawn Engine (in the shell) drives the clock, grade, and chrome from the
 * same scroll. Motion stays slow — Lenis carries it.
 */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

// Scroll ranges (fractions of the whole film). The prelude now owns the first
// ~two-thirds so Acts I–II can breathe; it hands off to the climax right as the
// cooling loaf cracks.
const PRELUDE_FADE = [0.66, 0.74] as const; // Acts I–II hand off to the cut
const CLIMAX_MOUNT = 0.5;
const CLIMAX_FADE_IN = [0.62, 0.7] as const;
const CLIMAX_T = [0.66, 0.95] as const; // maps to continuity t 0..1 (First Cut → arrival)
const ENDING_FADE = [0.93, 0.985] as const;

// Reduced motion: the story as graded stills. The prelude cross-dissolves the
// Acts I–II moments; then the loaf and the arrival, then the promise.
const RM_LOAF_IN = [0.6, 0.7] as const;
const RM_LOAF_OUT = [0.82, 0.9] as const;
const RM_ARRIVAL_IN = [0.84, 0.92] as const;

// Beats sit in the tall scroll at their scroll fraction; with a 900vh reel and a
// 100vh viewport this maps a fraction to the container %-offset that centres it.
const beatTop = (at: number) => at * 88.9 + 5.6;

export default function Film({ arrivalSrc, staticP = null }: { arrivalSrc: string | null; staticP?: number | null }) {
  const tRef = useRef(staticP ?? 0);
  const [p, setP] = useState(staticP ?? 0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (staticP !== null) {
      setP(staticP);
      tRef.current = smooth(CLIMAX_T[0], CLIMAX_T[1], staticP);
      // faithful verification: drive the grade to this scroll point too, so a
      // `?p=` freeze shows the correct hour (no scroll to update the Dawn Engine).
      // Re-asserted a few times to win any late ScrollTrigger.refresh on load.
      const root = document.documentElement;
      const d = dawnAt(staticP);
      const gv = gradeVars(gradeAt(d.minutes));
      const clockEl = document.getElementById('dawn-clock');
      const actEl = document.getElementById('dawn-act');
      const applyGrade = () => {
        root.style.setProperty('--d-ground', d.ground.join(' '));
        root.style.setProperty('--d-air', d.air.join(' '));
        root.style.setProperty('--d-ink', d.ink.join(' '));
        root.style.setProperty('--d-inst', d.instrument.join(' '));
        root.style.setProperty('--d-beam', String(d.beam));
        root.style.setProperty('--d-progress', String(staticP));
        for (const k in gv) root.style.setProperty(k, gv[k]);
        if (clockEl) clockEl.textContent = d.clock;
        if (actEl) actEl.textContent = d.act;
      };
      const timers = [0, 150, 400, 800].map((ms) => window.setTimeout(applyGrade, ms));
      return () => timers.forEach(clearTimeout);
    }
    let raf = 0;
    const loop = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const prog = max > 0 ? window.scrollY / max : 0;
      setP(prog);
      tRef.current = smooth(CLIMAX_T[0], CLIMAX_T[1], prog);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [staticP]);

  const preludeOpacity = 1 - smooth(PRELUDE_FADE[0], PRELUDE_FADE[1], p);
  const endingOpacity = smooth(ENDING_FADE[0], ENDING_FADE[1], p);

  return (
    <main>
      {/* the length of the morning; the Voice drifts up the beam along it */}
      <div className="film-scroll">
        {BEATS.map((b) => (
          <section key={b.at} className="film-beat" style={{ top: `${beatTop(b.at)}%`, opacity: preludeOpacity }}>
            <p className="beat__voice">{b.voice}</p>
          </section>
        ))}
      </div>

      {/* Acts I–II — the prelude (handles its own reduced-motion stills) */}
      <Prelude p={p} opacity={preludeOpacity} reduced={reduced} />

      {/* Act III */}
      {reduced ? (
        <ReducedActThree arrivalSrc={arrivalSrc} p={p} />
      ) : (
        p > CLIMAX_MOUNT && (
          <div className="film-stage" style={{ opacity: smooth(CLIMAX_FADE_IN[0], CLIMAX_FADE_IN[1], p) }}>
            <ContinuityScene tRef={tRef} arrivalSrc={arrivalSrc} />
          </div>
        )
      )}

      {/* the promise + reservation */}
      <div
        className="film-stage film-stage--ending"
        style={{ opacity: endingOpacity, pointerEvents: endingOpacity > 0.5 ? 'auto' : 'none' }}
      >
        <Ending />
      </div>
    </main>
  );
}

/** Reduced motion, Act III: the loaf (P-11), then the real H-01 arrival — stills. */
function ReducedActThree({ arrivalSrc, p }: { arrivalSrc: string | null; p: number }) {
  const loaf = smooth(RM_LOAF_IN[0], RM_LOAF_IN[1], p) * (1 - smooth(RM_LOAF_OUT[0], RM_LOAF_OUT[1], p));
  const arrival = smooth(RM_ARRIVAL_IN[0], RM_ARRIVAL_IN[1], p);
  return (
    <>
      <div className="film-stage" style={{ opacity: loaf, background: '#171009' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={PLATES['P-11'].file} alt="" />
      </div>
      <div className="film-stage" style={{ opacity: arrival, background: '#171009' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={arrivalSrc ?? PLATES['H-01'].file} alt="" />
      </div>
    </>
  );
}
