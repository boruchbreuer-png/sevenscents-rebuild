import { existsSync } from 'node:fs';
import { join } from 'node:path';
import Film from '@/components/film/Film';
import { PLATES, plateVariants, type Plate } from '@/lib/plates';

/**
 * RITUAL — the film. One scroll, one morning, 4:12 → 8:04.
 * Prelude (M-00, graded, with the F-01 fold plate) → the First Cut → crumb →
 * window → H-01 Handover → the promise + reservation. The Dawn Engine and
 * chrome live in the shell.
 * `?p=<0..1>` is a deterministic scroll-override for verification only.
 */

// A plate renders only once its file is on disk (webp preferred, raw png
// fallback); until then its beat falls back gracefully — the build stays green.
function resolvePlate(p: Plate): string | null {
  for (const f of plateVariants(p)) {
    if (existsSync(join(process.cwd(), 'public', f))) return f;
  }
  return null;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ p?: string }>;
}) {
  const { p } = await searchParams;
  const staticP = p !== undefined ? Math.min(1, Math.max(0, Number(p))) : null;
  const arrivalSrc = resolvePlate(PLATES['H-01']);
  const foldSrc = resolvePlate(PLATES['F-01']);
  return <Film arrivalSrc={arrivalSrc} foldSrc={foldSrc} staticP={staticP} />;
}
