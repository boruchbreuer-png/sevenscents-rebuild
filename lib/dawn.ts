import { CANON } from './canon';

/**
 * The Dawn Engine clock — pure and testable.
 * One clock, every layer obeys it (docs/02-experience-architecture.md).
 *
 * Scroll progress (0..1) → film minutes (4:12 → 8:04) → the grade.
 * The keyframes below ARE the approved time-of-day palette
 * (docs/03-visual-direction.md §3). No colors exist outside that table.
 */

export type RGB = readonly [number, number, number];

const hex = (h: string): RGB =>
  [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)] as const;

export interface DawnState {
  /** Film minutes since midnight (252 → 484). */
  minutes: number;
  /** The clock face, e.g. "5:40". */
  clock: string;
  /** Act title for the Instrument chrome. */
  act: string;
  /** The world's ground (page background). */
  ground: RGB;
  /** The single light source's color — the beam. */
  air: RGB;
  /** Ink: linen on the dark world, cocoa on the light one. */
  ink: RGB;
  /** The Instrument's metal: butter glow at night, honey-deep brass by morning. */
  instrument: RGB;
  /** Beam opacity — light is the event; darkness is the default. */
  beam: number;
}

interface Key {
  m: number;
  ground: RGB;
  air: RGB;
  ink: RGB;
  instrument: RGB;
  beam: number;
}

/** Approved triads at their hours. char/bluehour → soot/ember/spark → umber/amber → wheat → linen/cream. */
const KEYS: Key[] = [
  { m: 252, ground: hex('#131009'), air: hex('#1E2A2E'), ink: hex('#ECE3D0'), instrument: hex('#F3C777'), beam: 0.10 }, // 4:12 char + bluehour
  { m: 300, ground: hex('#1C1710'), air: hex('#6E2A10'), ink: hex('#ECE3D0'), instrument: hex('#F3C777'), beam: 0.18 }, // 5:00 soot + coal
  { m: 340, ground: hex('#1C1710'), air: hex('#B4471B'), ink: hex('#ECE3D0'), instrument: hex('#F3C777'), beam: 0.30 }, // 5:40 the oven — ember
  { m: 365, ground: hex('#2B2318'), air: hex('#B4471B'), ink: hex('#ECE3D0'), instrument: hex('#F3C777'), beam: 0.32 }, // 6:05 ash + ember
  { m: 405, ground: hex('#3A2E1F'), air: hex('#C98A34'), ink: hex('#ECE3D0'), instrument: hex('#F3C777'), beam: 0.38 }, // 6:45 umber + amber (sunrise)
  // 7:00–7:10 — the ink crosses linen→cocoa fast and narrow; grounds here are
  // pinned interpolants of the same ramp (no new colors), so the low-contrast
  // window is a blink of scroll and carries no beats.
  { m: 418, ground: hex('#6F5F43'), air: hex('#CF973F'), ink: hex('#ECE3D0'), instrument: hex('#F3C777'), beam: 0.35 },
  { m: 428, ground: hex('#97855F'), air: hex('#D3A248'), ink: hex('#241B12'), instrument: hex('#9C6A21'), beam: 0.32 },
  { m: 435, ground: hex('#B49F73'), air: hex('#D6A94E'), ink: hex('#241B12'), instrument: hex('#9C6A21'), beam: 0.30 }, // 7:15 wheat
  { m: 462, ground: hex('#DFD2B6'), air: hex('#ECE3D0'), ink: hex('#241B12'), instrument: hex('#9C6A21'), beam: 0.24 }, // 7:42 cream — the cut
  { m: 484, ground: hex('#ECE3D0'), air: hex('#F4EEE0'), ink: hex('#241B12'), instrument: hex('#9C6A21'), beam: 0.22 }, // 8:04 linen + mist
];

/**
 * Pacing map: scroll fraction ↔ film minutes, piecewise per act so each
 * act's screen-share can be tuned without touching any consumer.
 *   Act I  (4:12–5:00) → 25% of the scroll
 *   Act II (5:00–6:45) → 40%
 *   Act III(6:45–8:04) → 35%
 */
const SEGMENTS = [
  { p0: 0.0, p1: 0.25, m0: 252, m1: 300 },
  { p0: 0.25, p1: 0.65, m0: 300, m1: 405 },
  { p0: 0.65, p1: 1.0, m0: 405, m1: 484 },
] as const;

export function minutesAt(progress: number): number {
  const p = Math.min(1, Math.max(0, progress));
  const s = SEGMENTS.find((s) => p <= s.p1) ?? SEGMENTS[SEGMENTS.length - 1];
  const t = (p - s.p0) / (s.p1 - s.p0);
  return s.m0 + t * (s.m1 - s.m0);
}

/** Inverse map — used to place beats in the scroll at their exact hour. */
export function progressAtMinutes(minutes: number): number {
  const m = Math.min(CANON.FILM_END, Math.max(CANON.FILM_START, minutes));
  const s = SEGMENTS.find((s) => m <= s.m1) ?? SEGMENTS[SEGMENTS.length - 1];
  const t = (m - s.m0) / (s.m1 - s.m0);
  return s.p0 + t * (s.p1 - s.p0);
}

export function actAt(minutes: number): string {
  if (minutes < 300) return 'The hour no one sees';
  if (minutes < 405) return 'The keeping';
  return 'The handover';
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpRGB = (a: RGB, b: RGB, t: number): RGB =>
  [Math.round(lerp(a[0], b[0], t)), Math.round(lerp(a[1], b[1], t)), Math.round(lerp(a[2], b[2], t))] as const;

const relLum = ([r, g, b]: RGB): number => {
  const f = (v: number) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

const contrast = (a: RGB, b: RGB): number => {
  const la = relLum(a);
  const lb = relLum(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

/**
 * Legibility guard: the Instrument is permanent chrome and must survive every
 * hour, including the dawn zone where ground and brass share a luminance.
 * If the interpolated instrument falls under 3:1 against the ground, blend it
 * toward the ink (already contrast-managed) until it clears. Approved colors
 * only — the guard mixes, it never invents.
 */
const INSTRUMENT_MIN_CONTRAST = 3;
function legibleInstrument(instrument: RGB, ink: RGB, ground: RGB): RGB {
  let out = instrument;
  for (let t = 0.1; contrast(out, ground) < INSTRUMENT_MIN_CONTRAST && t <= 1; t += 0.1) {
    out = lerpRGB(instrument, ink, t);
  }
  return out;
}

export function dawnAt(progress: number): DawnState {
  const minutes = minutesAt(progress);
  let i = 0;
  while (i < KEYS.length - 2 && minutes > KEYS[i + 1].m) i++;
  const a = KEYS[i];
  const b = KEYS[i + 1];
  const t = Math.min(1, Math.max(0, (minutes - a.m) / (b.m - a.m)));
  const ground = lerpRGB(a.ground, b.ground, t);
  const ink = lerpRGB(a.ink, b.ink, t);
  return {
    minutes,
    clock: formatClockFromMinutes(minutes),
    act: actAt(minutes),
    ground,
    air: lerpRGB(a.air, b.air, t),
    ink,
    instrument: legibleInstrument(lerpRGB(a.instrument, b.instrument, t), ink, ground),
    beam: lerp(a.beam, b.beam, t),
  };
}

function formatClockFromMinutes(minutes: number): string {
  const m = Math.floor(minutes);
  return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
}
