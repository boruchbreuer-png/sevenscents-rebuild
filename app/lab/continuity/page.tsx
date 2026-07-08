import type { Metadata } from 'next';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import ContinuityLab from '@/components/lab/ContinuityLab';
import { PLATES } from '@/lib/plates';

/**
 * Spike #4/#5 lab — integrated First Cut → Handover continuity (R3F).
 * NON-PRODUCTION: noindex, unlinked, removed before launch.
 *   (no query)   interactive: scroll/drag forward through the one move
 *   ?t=<0..1>    static frame at that progress (deterministic proof)
 *   ?reduced=1   reduced-motion story stills (no dive)
 * The arrival resolves into the H-01 canon plate when present, else a
 * clearly-marked placeholder.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ContinuityPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string; reduced?: string }>;
}) {
  const { t, reduced } = await searchParams;
  const staticT = t !== undefined ? Math.min(1, Math.max(0, Number(t))) : null;

  const h01 = PLATES['H-01'];
  const arrivalSrc = existsSync(join(process.cwd(), 'public', h01.file)) ? h01.file : null;

  return (
    <main style={{ position: 'relative', width: '100%', height: '100vh', background: '#171009', overflow: 'hidden' }}>
      <ContinuityLab reduced={reduced === '1'} staticT={staticT} arrivalSrc={arrivalSrc} />
      <div
        style={{
          position: 'absolute',
          right: 28,
          bottom: 26,
          fontFamily: 'var(--font-record), sans-serif',
          fontSize: 9,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'rgb(198 137 47 / 0.7)',
        }}
      >
        Spike&nbsp;#5 · handover → {arrivalSrc ? 'H-01 canon' : 'H-01 not delivered · placeholder'}
      </div>
    </main>
  );
}
