/**
 * Acts I–II — the prelude schedule (pure, testable; mirrors dawn.ts / grade.ts).
 *
 * The M-00 room is the set, and it already holds every prop: the window and its
 * beam (upper-left, motes already suspended in the shaft), the tally strokes and
 * the comet-scorch on the wall, the carved "1931" oven mouth, the Mother's jar on
 * the stone shelf, and the cooling loaf on the board. So the prelude is
 * cinematography over that one canon plate — the single light pools on each prop
 * in turn (a slow focus-pull) while lightweight live layers carry the life.
 * No new imagery: the plate is cinema; the layer is life.
 *
 * Everything below is scroll-fraction (0..1 of the whole film) so the moment
 * envelopes, the camera glide, and the beats stay in one place and out of the
 * per-frame render path's way.
 */

export type MomentId = 'establish' | 'mother' | 'flour' | 'fold' | 'tally' | 'oven' | 'crackle';

export interface Focus {
  /** Where the single light pools and the plate pushes — viewport fractions. */
  cx: number;
  cy: number;
  /** Plate push: 1 ≈ the whole room; >1 leans closer on the prop. */
  scale: number;
}

export interface Moment {
  id: MomentId;
  /** The canonical clock minute — placement and the reverent fact. */
  min: number;
  /** Scroll-fraction envelope: rise (in→hold0) · hold · fall (hold1→out). */
  in: number;
  hold0: number;
  hold1: number;
  out: number;
  /** Where the camera settles for this moment's prop. */
  focus: Focus;
  /** The Record-caps fact this frame carries, if any. */
  label?: string;
  /** True where the beat wants no new asset flagged (honest placeholder). */
  placeholder?: boolean;
}

/**
 * The seven prelude beats, in order, timed to cross-dissolve. The last two
 * (oven, crackle) run right up to the climax so the cooling, cracking loaf
 * hands directly into the First Cut. Focus points are tuned to where each prop
 * actually sits in the M-00 plate on a landscape frame; they degrade gracefully
 * on portrait (the pooled light and the label still carry the frame).
 */
export const MOMENTS: Moment[] = [
  { id: 'establish', min: 252, in: 0.0, hold0: 0.0, hold1: 0.045, out: 0.1, focus: { cx: 0.44, cy: 0.46, scale: 1.02 } },
  { id: 'mother', min: 270, in: 0.045, hold0: 0.085, hold1: 0.13, out: 0.175, focus: { cx: 0.84, cy: 0.42, scale: 1.22 }, label: 'The Mother · Fed since 1998' },
  { id: 'flour', min: 288, in: 0.16, hold0: 0.2, hold1: 0.26, out: 0.3, focus: { cx: 0.2, cy: 0.31, scale: 1.16 }, label: '4:45 · Flour in the beam' },
  { id: 'fold', min: 310, in: 0.29, hold0: 0.33, hold1: 0.39, out: 0.43, focus: { cx: 0.31, cy: 0.72, scale: 1.26 }, label: 'Thirty-six hours', placeholder: true },
  { id: 'tally', min: 340, in: 0.41, hold0: 0.45, hold1: 0.5, out: 0.545, focus: { cx: 0.42, cy: 0.37, scale: 1.34 }, label: 'The count never resets' },
  { id: 'oven', min: 365, in: 0.52, hold0: 0.56, hold1: 0.6, out: 0.645, focus: { cx: 0.585, cy: 0.44, scale: 1.28 }, label: 'The oven · since 1931' },
  { id: 'crackle', min: 435, in: 0.6, hold0: 0.635, hold1: 0.675, out: 0.72, focus: { cx: 0.46, cy: 0.7, scale: 1.36 }, label: 'The crust settles' },
];

/** The Voice — the baker's whispered lines, drifting up the beam as the world turns. */
export interface Beat {
  /** Scroll fraction where the line sits at its warmest. */
  at: number;
  voice: string;
}
export const BEATS: Beat[] = [
  { at: 0.02, voice: 'The world will wake soon. Not yet.' },
  { at: 0.235, voice: 'We have been awake since 4:30. You didn’t have to be. That’s the arrangement.' },
  { at: 0.475, voice: 'Forty loaves. Then the oven rests.' },
  { at: 0.575, voice: 'The Mother is fed at six. She eats before we do.' },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a || 1e-6));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** A moment's opacity at scroll `p` — its rise-hold-fall envelope. */
export function momentOpacity(p: number, m: Moment): number {
  return smooth(m.in, m.hold0, p) * (1 - smooth(m.hold1, m.out, p));
}

/** The middle of a moment's hold — where the camera comes to rest on its prop. */
export function momentCenter(m: Moment): number {
  return (m.hold0 + m.hold1) / 2;
}

/**
 * The interpolated camera focus at scroll `p`: a single continuous glide from
 * prop to prop across the room, easing between each moment's resting focus.
 * Before the first / after the last moment it holds that end's framing.
 */
export function focusAt(p: number): Focus {
  const anchors = MOMENTS.map((m) => ({ c: momentCenter(m), f: m.focus }));
  if (p <= anchors[0].c) return anchors[0].f;
  const last = anchors[anchors.length - 1];
  if (p >= last.c) return last.f;
  let i = 0;
  while (i < anchors.length - 1 && p > anchors[i + 1].c) i++;
  const a = anchors[i];
  const b = anchors[i + 1];
  const t = smooth(a.c, b.c, p);
  return {
    cx: lerp(a.f.cx, b.f.cx, t),
    cy: lerp(a.f.cy, b.f.cy, t),
    scale: lerp(a.f.scale, b.f.scale, t),
  };
}
