import type { Metadata } from 'next';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import PlateGrade from '@/components/engine/PlateGrade';
import StandInPlate from '@/components/lab/StandInPlate';
import { dawnAt, progressAtMinutes } from '@/lib/dawn';
import { gradeAt, gradeVars } from '@/lib/grade';
import { CANON } from '@/lib/canon';
import { PLATES } from '@/lib/plates';

/**
 * Spike #2 lab — the welding pass over a plate.
 * NON-PRODUCTION: noindex, unlinked, removed before launch.
 *   ?m=<minutes>       set the clock (default 462 = 7:42)
 *   ?plate=m00|p11     render that canon plate if its file is present in
 *                      public/; otherwise fall back to the stand-in and say so.
 * Deterministic: same plate can be shot at every hour.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function GradeLab({
  searchParams,
}: {
  searchParams: Promise<{ m?: string; plate?: string }>;
}) {
  const { m, plate } = await searchParams;
  const minutes = m ? Math.max(CANON.FILM_START, Math.min(CANON.FILM_END, Number(m))) : 462;
  const progress = progressAtMinutes(minutes);
  const d = dawnAt(progress);
  const g = gradeAt(minutes);

  // Resolve the requested canon plate and check whether its bytes exist yet.
  const key = plate === 'p11' ? 'P-11' : plate === 'm00' ? 'M-00' : null;
  const spec = key ? PLATES[key] : null;
  const present = spec ? existsSync(join(process.cwd(), 'public', spec.file)) : false;

  const vars = {
    '--d-ground': d.ground.join(' '),
    '--d-inst': d.instrument.join(' '),
    ...gradeVars(g),
  } as React.CSSProperties;

  const label = spec
    ? present
      ? `${spec.id} canon · welding pass`
      : `${spec.id} canon NOT DELIVERED — stand-in`
    : 'stand-in plate';

  return (
    <main style={{ ...vars, minHeight: '100vh', background: `rgb(${d.ground.join(' ')})` }}>
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <PlateGrade>
          {present && spec ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={spec.file} alt={`${spec.id} canon plate`} />
          ) : (
            <StandInPlate />
          )}
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
          Spike&nbsp;#2 · {label}
        </div>

        {spec && !present && (
          <div
            style={{
              position: 'absolute',
              top: 28,
              left: 28,
              maxWidth: '22rem',
              fontFamily: 'var(--font-record), sans-serif',
              fontSize: 10,
              lineHeight: 1.7,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: `rgb(${d.ink.join(' ')} / 0.5)`,
            }}
          >
            Awaiting {spec.file.split('/').pop()} — canon job {spec.canonJob?.slice(0, 8)}. Pipeline armed;
            drop the file to verify.
          </div>
        )}
      </div>
    </main>
  );
}
