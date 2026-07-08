/**
 * Spike #3 — The First Cut mechanic (pure geometry + resistance).
 *
 * The cut is driven by input, never played. A pull (drag/scroll) is integrated
 * through a resistance curve into `progress` (0..1); the crust opens as a
 * function of that progress, unzipping from the centre of the approved Score
 * arc outward. Procedural stand-in — no production textures required.
 *
 * Nothing here is time-based: same progress → same geometry, so the mechanic
 * is deterministic and screenshot-verifiable at any point.
 */

export const CRUST_BREAK = 0.14; // the crust must be broken before the cut commits
export const PULL_GAIN = 0.0016; // px of drag → progress, before resistance
export const MAX_GAP = 118; // widest crust separation, in viewBox units

/** Resistance felt at a given progress: crust hardest, dough easing, release soft. */
export function resistanceAt(p: number): number {
  if (p < CRUST_BREAK) return 3.4; // the skin — highest
  if (p < 0.8) return 1.35 - 0.5 * ((p - CRUST_BREAK) / (0.8 - CRUST_BREAK)); // dough 1.35→0.85
  return 0.75; // release
}

/** Integrate one input step. `dPull` is downward drag/scroll in px (may be negative). */
export function advance(progress: number, dPull: number): number {
  // Past the crust break the cut is irreversible — a lame does not un-cut.
  if (progress >= CRUST_BREAK && dPull < 0) return progress;
  const next = progress + (dPull * PULL_GAIN) / resistanceAt(progress);
  return Math.min(1, Math.max(0, next));
}

export type Phase = 'Scored' | 'Crust' | 'Crumb' | 'Open';
export function phaseOf(p: number): Phase {
  if (p <= 0.0005) return 'Scored';
  if (p < CRUST_BREAK) return 'Crust';
  if (p < 0.8) return 'Crumb';
  return 'Open';
}

// ————— The Score arc (the approved shallow, right-rising lame sweep) —————
type Pt = { x: number; y: number };
const P0: Pt = { x: 305, y: 300 };
const P1: Pt = { x: 430, y: 250 };
const P2: Pt = { x: 600, y: 250 };
const P3: Pt = { x: 710, y: 292 };

const cubic = (t: number): Pt => {
  const mt = 1 - t;
  const a = mt * mt * mt,
    b = 3 * mt * mt * t,
    c = 3 * mt * t * t,
    d = t * t * t;
  return { x: a * P0.x + b * P1.x + c * P2.x + d * P3.x, y: a * P0.y + b * P1.y + c * P2.y + d * P3.y };
};
const tangent = (t: number): Pt => {
  const mt = 1 - t;
  return {
    x: 3 * mt * mt * (P1.x - P0.x) + 6 * mt * t * (P2.x - P1.x) + 3 * t * t * (P3.x - P2.x),
    y: 3 * mt * mt * (P1.y - P0.y) + 6 * mt * t * (P2.y - P1.y) + 3 * t * t * (P3.y - P2.y),
  };
};
/** Unit normal, oriented up (negative y) — the "open" direction of the crust. */
const normalUp = (t: number): Pt => {
  const g = tangent(t);
  let nx = -g.y,
    ny = g.x;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const L = Math.hypot(nx, ny) || 1;
  return { x: nx / L, y: ny / L };
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Local separation at arc-parameter t for a given progress — opens centre-out. */
function gapAt(t: number, p: number): number {
  const reach = p * 1.15; // the unzip front, spreading from the centre
  const d = Math.abs(t - 0.5) * 2; // 0 at centre, 1 at the ends
  const local = clamp01((reach - d) / 0.5);
  const crown = Math.pow(Math.sin(Math.PI * t), 0.6); // widest over the crown
  return MAX_GAP * p * local * crown;
}

export interface CutGeometry {
  scoreD: string; // the lame incision (always present)
  crumbD: string; // the opened interior polygon
  lipD: string; // the lifted crust lip (the ear)
  steam: number; // 0..1 placeholder intensity, peaks at the crust break
  cameraScale: number; // subtle push toward the cut
  cameraY: number;
}

/** Build the cut geometry for a progress value. Pure. */
export function buildCut(p: number): CutGeometry {
  const N = 56;
  const upper: Pt[] = [];
  const lower: Pt[] = [];
  const arc: Pt[] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const P = cubic(t);
    const n = normalUp(t);
    const gap = gapAt(t, p);
    const curl = gap * 0.5; // the near lip peels up into the ear
    arc.push(P);
    upper.push({ x: P.x - (n.x * gap) / 2, y: P.y - (n.y * gap) / 2 - curl });
    lower.push({ x: P.x + (n.x * gap) / 2, y: P.y + (n.y * gap) / 2 + gap * 0.12 });
  }

  const line = (pts: Pt[]) => pts.map((q, i) => `${i ? 'L' : 'M'}${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(' ');

  const scoreD = `M${P0.x} ${P0.y} C ${P1.x} ${P1.y}, ${P2.x} ${P2.y}, ${P3.x} ${P3.y}`;
  const crumbD = `${line(upper)} ${lower
    .slice()
    .reverse()
    .map((q) => `L${q.x.toFixed(1)} ${q.y.toFixed(1)}`)
    .join(' ')} Z`;
  // the lifted crust piece: from the upper lip back down to the score line
  const lipD = `${line(upper)} ${arc
    .slice()
    .reverse()
    .map((q) => `L${q.x.toFixed(1)} ${q.y.toFixed(1)}`)
    .join(' ')} Z`;

  // steam placeholder: near-zero until the crust breaks, then a burst that
  // fades through the dough — no wisp on the intact loaf.
  const gate = clamp01((p - 0.06) / (CRUST_BREAK - 0.06)); // 0 before the break's approach
  const burst = Math.exp(-Math.pow((p - CRUST_BREAK) / 0.1, 2));
  const steam = clamp01(gate * (burst * 0.9 + (p > CRUST_BREAK ? 0.18 : 0) * (1 - p)));

  const e = p * p * (3 - 2 * p); // smoothstep
  return { scoreD, crumbD, lipD, steam, cameraScale: 1 + 0.07 * e, cameraY: -18 * e };
}
