/**
 * Spike #4 — Integrated First Cut → Handover continuity (pure timing).
 *
 * ONE progress `t` (0..1) drives ONE continuous move:
 *   cut opens → the opening becomes the portal → camera enters the crumb →
 *   the crumb aperture becomes a window → the morning resolves.
 *
 * No separate scenes: the First Cut's opening and the Handover's dive are the
 * same camera travelling forward through the same space. Deterministic.
 */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export type Phase = 'the cut' | 'the threshold' | 'the crumb' | 'the handover';

export interface Continuity {
  /** crust opening 0..1 — grows the aperture in the loaf (the portal). */
  cut: number;
  /** camera Z: outside the loaf (+) → through the aperture → down the crumb (−). */
  camZ: number;
  camY: number;
  /** the morning light ahead, growing as we approach the window. */
  exit: number;
  /** linen wash of arrival, only at the very end. */
  linen: number;
  /** warm interior fog color (honey deep → linen near the room). */
  fog: [number, number, number];
  phase: Phase;
  minutes: number; // Dawn continuity 7:42 → 8:04
}

// Camera dolly keyframes (t → world Z). One forward move, eased, never back.
const CAM: { t: number; z: number; y: number }[] = [
  { t: 0.0, z: 6.4, y: 0.15 },
  { t: 0.42, z: 1.2, y: 0.05 }, // arriving at the opening
  { t: 0.55, z: -0.7, y: 0.0 }, // through the crust — inside now
  { t: 0.86, z: -10.6, y: 0.0 }, // down the crumb, the window filling ahead
  { t: 0.95, z: -12.9, y: 0.0 }, // at the window — the crumb hole is the window
  { t: 1.0, z: -13.9, y: 0.0 }, // through it — the H-01 arrival plate fills the frame
];

function pathAt(t: number): { z: number; y: number } {
  const p = clamp01(t);
  for (let i = 0; i < CAM.length - 1; i++) {
    const a = CAM[i];
    const b = CAM[i + 1];
    if (p <= b.t) {
      const k = smooth(a.t, b.t, p);
      return { z: lerp(a.z, b.z, k), y: lerp(a.y, b.y, k) };
    }
  }
  return { z: CAM[CAM.length - 1].z, y: 0 };
}

const HONEY: [number, number, number] = [0.36, 0.2, 0.07];
const AMBER: [number, number, number] = [0.55, 0.36, 0.15];
const LINEN: [number, number, number] = [0.86, 0.8, 0.68];
const mixC = (a: [number, number, number], b: [number, number, number], t: number): [number, number, number] => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];

export function continuityAt(t: number): Continuity {
  const p = clamp01(t);
  const { z, y } = pathAt(p);
  const cut = smooth(0.0, 0.45, p); // the cut opens as the camera approaches
  const exit = smooth(0.5, 0.96, p);
  // a bloom of morning light at the threshold — peaks as we cross the window,
  // then clears so the room reads. Locks the handoff (not a hard cut).
  const linen = smooth(0.88, 0.95, p) * (1 - smooth(0.95, 1.0, p)) * 0.62;
  const fog = p < 0.6 ? mixC(HONEY, AMBER, smooth(0.2, 0.6, p)) : mixC(AMBER, LINEN, smooth(0.6, 0.98, p));
  const phase: Phase = p < 0.45 ? 'the cut' : p < 0.56 ? 'the threshold' : p < 0.9 ? 'the crumb' : 'the handover';
  return { cut, camZ: z, camY: y, exit, linen, fog, phase, minutes: 462 + 22 * p };
}
