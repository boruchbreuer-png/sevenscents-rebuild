'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import PlateGrade from '@/components/engine/PlateGrade';
import Ending from './Ending';
import { PLATES } from '@/lib/plates';
import { progressAtMinutes } from '@/lib/dawn';

const ContinuityScene = dynamic(() => import('@/components/lab/ContinuityScene'), { ssr: false });

/**
 * The RITUAL film — one scroll, one morning (4:12 → 8:04).
 *   Prelude (Acts I–II): the M-00 room under the welding grade, moving through
 *     the dark hours, with the whispered copy beats.
 *   Climax (Act III): the integrated First Cut → crumb → window → H-01 Handover
 *     (R3F), its move mapped to this stretch of scroll.
 *   Ending: the promise + reservation, the approved Frame 12 language.
 * The Dawn Engine (in the shell) drives the clock, grade, and chrome from the
 * same scroll. Motion stays slow — Lenis carries it.
 */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

// Scroll ranges (fractions of the whole film).
const PRELUDE_FADE = [0.52, 0.62] as const; // M-00 hands off to the climax
const CLIMAX_MOUNT = 0.42;
const CLIMAX_FADE_IN = [0.5, 0.6] as const;
const CLIMAX_T = [0.58, 0.95] as const; // maps to continuity t 0..1
const ENDING_FADE = [0.93, 0.985] as const;

const BEATS: { min: number; voice: string; record?: string }[] = [
  { min: 252, voice: 'The world will wake soon. Not yet.' },
  { min: 285, voice: 'We have been awake since 4:30. You didn’t have to be. That’s the arrangement.' },
  { min: 340, voice: 'Forty loaves. Then the oven rests.' },
  { min: 380, voice: 'The Mother is fed at six. She eats before we do.', record: 'Fed since 1998' },
];

export default function Film({ arrivalSrc, staticP = null }: { arrivalSrc: string | null; staticP?: number | null }) {
  const tRef = useRef(staticP ?? 0);
  const [p, setP] = useState(staticP ?? 0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (staticP !== null) {
      setP(staticP);
      tRef.current = smooth(CLIMAX_T[0], CLIMAX_T[1], staticP);
      return;
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

  if (reduced) return <ReducedFilm arrivalSrc={arrivalSrc} p={p} />;

  const preludeOpacity = 1 - smooth(PRELUDE_FADE[0], PRELUDE_FADE[1], p);
  const climaxOpacity = smooth(CLIMAX_FADE_IN[0], CLIMAX_FADE_IN[1], p);
  const endingOpacity = smooth(ENDING_FADE[0], ENDING_FADE[1], p);
  const mountClimax = p > CLIMAX_MOUNT;

  return (
    <main>
      {/* the length of the morning; copy beats live along it */}
      <div className="film-scroll">
        {BEATS.map((b) => (
          <section key={b.min} className="film-beat" style={{ top: `${progressAtMinutes(b.min) * 78 + 8}%`, opacity: preludeOpacity }}>
            <p className="beat__voice">{b.voice}</p>
            {b.record && <p className="beat__record">{b.record}</p>}
          </section>
        ))}
      </div>

      {/* prelude: the M-00 room, graded to the hour */}
      <div className="film-stage" style={{ opacity: preludeOpacity }}>
        <PlateGrade>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PLATES['M-00'].file} alt="" />
        </PlateGrade>
      </div>

      {/* climax: the integrated Handover */}
      {mountClimax && (
        <div className="film-stage" style={{ opacity: climaxOpacity }}>
          <ContinuityScene tRef={tRef} arrivalSrc={arrivalSrc} />
        </div>
      )}

      {/* ending: the promise + reservation */}
      <div className="film-stage film-stage--ending" style={{ opacity: endingOpacity, pointerEvents: endingOpacity > 0.5 ? 'auto' : 'none' }}>
        <Ending />
      </div>
    </main>
  );
}

/** Reduced motion: the story as three graded stills + the ending. Real H-01. */
function ReducedFilm({ arrivalSrc, p }: { arrivalSrc: string | null; p: number }) {
  const a = 1 - smooth(0.28, 0.4, p); // M-00 room
  const b = smooth(0.34, 0.46, p) * (1 - smooth(0.62, 0.72, p)); // P-11 loaf
  const c = smooth(0.66, 0.8, p); // H-01 arrival
  const endingOpacity = smooth(0.9, 0.98, p);
  return (
    <main>
      <div className="film-scroll">
        {BEATS.map((b2) => (
          <section key={b2.min} className="film-beat" style={{ top: `${progressAtMinutes(b2.min) * 40 + 8}%`, opacity: a }}>
            <p className="beat__voice">{b2.voice}</p>
            {b2.record && <p className="beat__record">{b2.record}</p>}
          </section>
        ))}
      </div>
      <div className="film-stage" style={{ opacity: a }}>
        <PlateGrade>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PLATES['M-00'].file} alt="" />
        </PlateGrade>
      </div>
      <div className="film-stage" style={{ opacity: b, background: '#171009' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={PLATES['P-11'].file} alt="" />
      </div>
      <div className="film-stage" style={{ opacity: c, background: '#171009' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={(arrivalSrc ?? PLATES['H-01'].file)} alt="" />
      </div>
      <div className="film-stage film-stage--ending" style={{ opacity: endingOpacity, pointerEvents: endingOpacity > 0.5 ? 'auto' : 'none' }}>
        <Ending />
      </div>
    </main>
  );
}
