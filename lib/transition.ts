/**
 * Spike #1 — The impossible transition ("The Handover").
 *
 * Continues from the First Cut: the crust opening becomes a portal, the camera
 * falls slowly through the crumb's chambers, and a window-shaped chamber
 * match-cuts into the visitor's own morning room. Scale silently inverts — the
 * whole morning was inside the loaf.
 *
 * A 2.5D stand-in: real CSS-3D depth (perspective + translateZ), procedural
 * crumb chambers, no P-11 materials, no WebGL. Pure and deterministic:
 * dive progress `d` (0..1) → the whole scene. Nothing is time-based.
 */

export const PERSPECTIVE = 1100;
export const TRAVEL = 2780; // Z the camera covers across the dive

export type ChamberKind = 'crumb' | 'window';
export interface Chamber {
  z: number; // base depth (negative = far)
  kind: ChamberKind;
  /** clear-aperture radius as a fraction of the plane (the passage deeper). */
  aperture: number;
  /** small organic offset so the crumb never reads as a regular grid. */
  ox: number;
  oy: number;
}

// Crumb chambers receding into depth, then a window hinge just before the room.
export const CHAMBERS: Chamber[] = [
  { z: -420, kind: 'crumb', aperture: 0.30, ox: 2, oy: -1 },
  { z: -780, kind: 'crumb', aperture: 0.28, ox: -3, oy: 2 },
  { z: -1150, kind: 'crumb', aperture: 0.26, ox: 3, oy: 1 },
  { z: -1520, kind: 'crumb', aperture: 0.25, ox: -2, oy: -2 },
  { z: -1900, kind: 'crumb', aperture: 0.24, ox: 1, oy: 2 },
  { z: -2300, kind: 'crumb', aperture: 0.23, ox: -1, oy: -1 },
  { z: -2560, kind: 'window', aperture: 0.26, ox: 0, oy: 0 }, // the match-cut hinge
];
export const ROOM_Z = -2900;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Dawn continuity: the dive runs 7:42 → 8:04 so the grade rides the same clock. */
export function diveMinutes(d: number): number {
  return 462 + 22 * clamp01(d);
}

export function apparentZ(baseZ: number, d: number): number {
  return baseZ + clamp01(d) * TRAVEL;
}

/** A layer fades out only as it passes the camera — never a hard cut. */
export function layerOpacity(baseZ: number, d: number): number {
  const az = apparentZ(baseZ, d);
  return clamp01((140 - az) / 170);
}

/** The warm light ahead — the morning — growing as we approach. */
export function beamAlpha(d: number): number {
  return 0.12 + 0.5 * clamp01(d);
}

/** The linen wash of emergence — only near the end, easing the arrival. */
export function linenWash(d: number): number {
  return clamp01((d - 0.82) / 0.18) * 0.36;
}

/** Warm interior fog, thinning as we near the room. */
export function fogAlpha(d: number): number {
  return 0.28 * (1 - clamp01(d)) + 0.05;
}

/** Reduced-motion: which of the three story stills is foremost at progress d. */
export function reducedStill(d: number): { a: number; b: number; c: number } {
  // A: the cut opens · B: the quiet interior · C: your morning
  return {
    a: clamp01(1 - d / 0.5),
    b: clamp01(1 - Math.abs(d - 0.5) / 0.5),
    c: clamp01((d - 0.5) / 0.5),
  };
}
