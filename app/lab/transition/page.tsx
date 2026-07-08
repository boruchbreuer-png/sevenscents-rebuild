import type { Metadata } from 'next';
import TransitionView from '@/components/lab/TransitionView';
import TransitionLab from '@/components/lab/TransitionLab';

/**
 * Spike #1 lab — the impossible transition (The Handover).
 * NON-PRODUCTION: noindex, unlinked, removed before launch.
 *   (no query)   interactive: scroll/drag forward to fall through the crumb
 *   ?d=<0..1>    static frame at that dive progress (deterministic proof)
 *   ?reduced=1   reduced-motion story stills (no dive)
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function TransitionPage({
  searchParams,
}: {
  searchParams: Promise<{ d?: string; reduced?: string }>;
}) {
  const { d, reduced } = await searchParams;
  const isReduced = reduced === '1';
  const staticD = d !== undefined ? Math.min(1, Math.max(0, Number(d))) : null;

  return (
    <main style={{ position: 'relative', width: '100%', height: '100vh', background: '#171009', overflow: 'hidden' }}>
      {staticD === null ? <TransitionLab reduced={isReduced} /> : <TransitionView d={staticD} reduced={isReduced} />}
      <div
        style={{
          position: 'absolute',
          right: 28,
          bottom: 26,
          fontFamily: 'var(--font-record), sans-serif',
          fontSize: 9,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'rgb(60 43 22 / 0.7)',
        }}
      >
        Spike&nbsp;#1 · the handover · stand-in
      </div>
    </main>
  );
}
