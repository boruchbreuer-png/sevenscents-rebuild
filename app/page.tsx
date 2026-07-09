import { existsSync } from 'node:fs';
import { join } from 'node:path';
import Film from '@/components/film/Film';
import { PLATES } from '@/lib/plates';

/**
 * RITUAL — the film. One scroll, one morning, 4:12 → 8:04.
 * Prelude (M-00, graded) → the First Cut → crumb → window → H-01 Handover →
 * the promise + reservation. The Dawn Engine and chrome live in the shell.
 * `?p=<0..1>` is a deterministic scroll-override for verification only.
 */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ p?: string }>;
}) {
  const { p } = await searchParams;
  const staticP = p !== undefined ? Math.min(1, Math.max(0, Number(p))) : null;
  const h01 = PLATES['H-01'];
  const arrivalSrc = existsSync(join(process.cwd(), 'public', h01.file)) ? h01.file : null;
  return <Film arrivalSrc={arrivalSrc} staticP={staticP} />;
}
