import type { Metadata } from 'next';
import PlateGrade from '@/components/engine/PlateGrade';
import StandInPlate from '@/components/lab/StandInPlate';
import { dawnAt, progressAtMinutes } from '@/lib/dawn';
import { gradeAt, gradeVars } from '@/lib/grade';
import { CANON } from '@/lib/canon';

/**
 * Spike #2 lab — the welding pass over a stand-in plate.
 * NON-PRODUCTION: noindex, unlinked, removed before launch. Deterministic:
 * `?m=<minutes>` sets the clock so the same plate can be shot at every hour.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function GradeLab({
  searchParams,
}: {
  searchParams: Promise<{ m?: string }>;
}) {
  const { m } = await searchParams;
  const minutes = m ? Math.max(CANON.FILM_START, Math.min(CANON.FILM_END, Number(m))) : 462;
  const progress = progressAtMinutes(minutes);
  const d = dawnAt(progress);
  const g = gradeAt(minutes);

  // Set the same clock variables the Dawn Engine would, but statically.
  const vars = {
    '--d-ground': d.ground.join(' '),
    '--d-inst': d.instrument.join(' '),
    ...gradeVars(g),
  } as React.CSSProperties;

  return (
    <main style={{ ...vars, minHeight: '100vh', background: `rgb(${d.ground.join(' ')})` }}>
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <PlateGrade>
          <StandInPlate />
        </PlateGrade>

        <div
          style={{
            position: 'absolute',
            left: 28,
            bottom: 26,
            fontFamily: 'var(--font-instrument), monospace',
            fontSize: 15,
            letterSpacing: '0.08em',
            color: `rgb(${d.instrument.join(' ')})`,
          }}
        >
          {d.clock}
        </div>
        <div
          style={{
            position: 'absolute',
            right: 28,
            bottom: 26,
            fontFamily: 'var(--font-record), sans-serif',
            fontSize: 9,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: `rgb(${d.ink.join(' ')} / 0.6)`,
          }}
        >
          Spike&nbsp;#2 · welding pass · stand-in plate
        </div>
      </div>
    </main>
  );
}
