import { useEffect, useRef } from 'react';

/**
 * Shared moment kit. Live layers cost nothing when they're off-screen: the rAF
 * loop only runs while the moment is `active` (its opacity > 0), so the six
 * Acts I–II layers never all animate at once — at most the one or two mid-cross-
 * dissolve do. dt is clamped so a background tab can't fling a layer forward.
 */
export function useRaf(active: boolean, cb: (dt: number, t: number) => void): void {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let prev = performance.now();
    const t0 = prev;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      cbRef.current(dt, (now - t0) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active]);
}

/** Deterministic RNG (mulberry32) so a layer's particles are stable per render. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The pointer, as viewport fractions — shared so cursor-aware layers can read it. */
export type PointerRef = React.MutableRefObject<{ x: number; y: number }>;

/** Props every moment layer takes. */
export interface LayerProps {
  /** 0..1 from the moment's scroll envelope (the layer fades with it). */
  opacity: number;
  /** True while opacity > 0 — gates the rAF loop. */
  active: boolean;
  /** Reduced motion: draw one still frame, no animation, no scroll-hijack. */
  still: boolean;
  pointer: PointerRef;
}
