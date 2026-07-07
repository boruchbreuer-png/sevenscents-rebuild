/**
 * Canon facts — Constitution Article VI (docs/00-brand-dna.md).
 * History is history: these values may deepen, never be edited.
 */
export const CANON = {
  /** The film and the protected hour: 4:12 → 8:04, in minutes since midnight. */
  FILM_START: 4 * 60 + 12,
  FILM_END: 8 * 60 + 4,
  /** The baker's hour. The bake begins. */
  BAKERS_HOUR: 4 * 60 + 30,
  /** Forty loaves; then the oven rests. Scarcity is a fact of the oven. */
  LOAVES_PER_BAKE: 40,
  /** The Mother, born 1998. She eats before we do. */
  MOTHER_SINCE: 1998,
  /** The oven, first lit. */
  OVEN_LIT: 1931,
  /** The count never resets. Bake № is derived from the date — one mark per day. */
  BAKE_NO_EPOCH: { iso: '2026-07-07', bakeNo: 9741 },
} as const;

/** Bake № for a given date: the epoch count plus one mark per day since. */
export function bakeNo(date: Date): number {
  const epoch = new Date(`${CANON.BAKE_NO_EPOCH.iso}T00:00:00Z`);
  const days = Math.floor((date.getTime() - epoch.getTime()) / 86_400_000);
  return CANON.BAKE_NO_EPOCH.bakeNo + Math.max(0, days);
}

/** 4:12-style clock face for minutes since midnight. */
export function formatClock(minutes: number): string {
  const m = Math.round(minutes);
  return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
}

/** Reverent thousands: 9,741. */
export function formatCount(n: number): string {
  return n.toLocaleString('en-US');
}
