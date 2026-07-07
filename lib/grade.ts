import { RGB } from './dawn';

/**
 * The welding pass (Architecture spike #2).
 *
 * A plate is generated in ONE base film stock (the ~6:45 warm-neutral look of
 * canon M-00). The grade below pushes that single base toward each hour's
 * approved triad, so one plate reads correctly across the whole film and every
 * plate + DOM scene share one stock. This is the "one shot" welder.
 *
 * Tier note: this table is the grade in composited CSS-filter form — the
 * Balanced / Reduced implementation, and what verifies deterministically now.
 * The Full-tier path is the identical transform as a single fragment-shader
 * LUT over the plate texture (keyed to the same clock); see spike-2 doc.
 *
 * No new colors: every tint below is an approved palette value
 * (Visual Direction §3).
 */

export interface Grade {
  /** CSS filter exposure. */
  brightness: number;
  contrast: number;
  saturate: number;
  /** Warmth unifier — a whisper, never sepia-toned. */
  sepia: number;
  /** White-balance tint toward the hour's light (soft-light overlay). */
  tint: RGB;
  tintAlpha: number;
  /** Single-source vignette strength (uses the world's ground color). */
  vignette: number;
}

const hex = (h: string): RGB =>
  [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)] as const;

interface GKey {
  m: number;
  g: Grade;
}

// Keyframes at the film's load-bearing hours. Approved tints only:
// bluehour · ember · amber · cream · linen.
const GKEYS: GKey[] = [
  { m: 252, g: { brightness: 0.46, contrast: 1.12, saturate: 0.62, sepia: 0.18, tint: hex('#1E2A2E'), tintAlpha: 0.30, vignette: 0.85 } }, // 4:12
  { m: 340, g: { brightness: 0.70, contrast: 1.06, saturate: 0.96, sepia: 0.34, tint: hex('#B4471B'), tintAlpha: 0.32, vignette: 0.64 } }, // 5:40 ember
  { m: 405, g: { brightness: 0.90, contrast: 1.02, saturate: 1.00, sepia: 0.14, tint: hex('#C98A34'), tintAlpha: 0.14, vignette: 0.50 } }, // 6:45 amber
  { m: 462, g: { brightness: 1.00, contrast: 1.00, saturate: 1.00, sepia: 0.05, tint: hex('#DFD2B6'), tintAlpha: 0.07, vignette: 0.40 } }, // 7:42 cream
  { m: 484, g: { brightness: 1.05, contrast: 0.99, saturate: 0.98, sepia: 0.00, tint: hex('#ECE3D0'), tintAlpha: 0.05, vignette: 0.34 } }, // 8:04 linen
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpRGB = (a: RGB, b: RGB, t: number): RGB =>
  [Math.round(lerp(a[0], b[0], t)), Math.round(lerp(a[1], b[1], t)), Math.round(lerp(a[2], b[2], t))] as const;

export function gradeAt(minutes: number): Grade {
  let i = 0;
  while (i < GKEYS.length - 2 && minutes > GKEYS[i + 1].m) i++;
  const a = GKEYS[i].g;
  const b = GKEYS[i + 1].g;
  const t = Math.min(1, Math.max(0, (minutes - GKEYS[i].m) / (GKEYS[i + 1].m - GKEYS[i].m)));
  return {
    brightness: lerp(a.brightness, b.brightness, t),
    contrast: lerp(a.contrast, b.contrast, t),
    saturate: lerp(a.saturate, b.saturate, t),
    sepia: lerp(a.sepia, b.sepia, t),
    tint: lerpRGB(a.tint, b.tint, t),
    tintAlpha: lerp(a.tintAlpha, b.tintAlpha, t),
    vignette: lerp(a.vignette, b.vignette, t),
  };
}

/** Grade → CSS custom properties, consumed by the .plate-grade element. */
export function gradeVars(g: Grade): Record<string, string> {
  return {
    '--g-b': g.brightness.toFixed(3),
    '--g-c': g.contrast.toFixed(3),
    '--g-s': g.saturate.toFixed(3),
    '--g-sep': g.sepia.toFixed(3),
    '--g-tint': g.tint.join(' '),
    '--g-tinta': g.tintAlpha.toFixed(3),
    '--g-vig': g.vignette.toFixed(3),
  };
}
