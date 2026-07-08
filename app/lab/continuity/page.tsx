import type { Metadata } from 'next';
import ContinuityLab from '@/components/lab/ContinuityLab';

/**
 * Spike #4 lab — integrated First Cut → Handover continuity (R3F).
 * NON-PRODUCTION: noindex, unlinked, removed before launch.
 *   (no query)   interactive: scroll/drag forward through the one move
 *   ?t=<0..1>    static frame at that progress (deterministic proof)
 *   ?reduced=1   reduced-motion story stills (no dive)
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ContinuityPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string; reduced?: string }>;
}) {
  const { t, reduced } = await searchParams;
  const staticT = t !== undefined ? Math.min(1, Math.max(0, Number(t))) : null;

  return (
    <main style={{ position: 'relative', width: '100%', height: '100vh', background: '#171009', overflow: 'hidden' }}>
      <ContinuityLab reduced={reduced === '1'} staticT={staticT} />
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
        Spike&nbsp;#5 · crumb + registration · stand-in
      </div>
    </main>
  );
}
