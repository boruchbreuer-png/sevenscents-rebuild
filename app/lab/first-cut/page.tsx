import type { Metadata } from 'next';
import CutView from '@/components/lab/CutView';
import FirstCutLab, { Hud } from '@/components/lab/FirstCutLab';
import { resistanceAt, phaseOf } from '@/lib/firstcut';

/**
 * Spike #3 lab — the First Cut mechanic.
 * NON-PRODUCTION: noindex, unlinked, removed before launch.
 *   (no query)        interactive: drag down / scroll to pull the blade
 *   ?p=<0..1>         static frame at that progress (deterministic proof)
 *   ?reduced=1        reduced-motion variant (no steam / camera drift)
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function FirstCutPage({
  searchParams,
}: {
  searchParams: Promise<{ p?: string; reduced?: string }>;
}) {
  const { p, reduced } = await searchParams;
  const isReduced = reduced === '1';
  const staticP = p !== undefined ? Math.min(1, Math.max(0, Number(p))) : null;

  return (
    <main style={{ position: 'relative', width: '100%', height: '100vh', background: '#171009', overflow: 'hidden' }}>
      {staticP === null ? (
        <FirstCutLab reduced={isReduced} />
      ) : (
        <>
          <div style={{ position: 'absolute', inset: 0 }}>
            <CutView progress={staticP} reduced={isReduced} />
          </div>
          <Hud progress={staticP} phase={phaseOf(staticP)} resistance={resistanceAt(staticP)} broke={staticP >= 0.14} />
        </>
      )}
      <div
        style={{
          position: 'absolute',
          right: 28,
          bottom: 26,
          fontFamily: 'var(--font-record), sans-serif',
          fontSize: 9,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'rgb(236 227 208 / 0.5)',
        }}
      >
        Spike&nbsp;#3 · First Cut mechanic · stand-in
      </div>
    </main>
  );
}
