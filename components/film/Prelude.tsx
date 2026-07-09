'use client';

import { memo, useEffect, useRef } from 'react';
import PlateGrade from '@/components/engine/PlateGrade';
import { PLATES } from '@/lib/plates';
import { MOMENTS, focusAt, momentOpacity, type Moment, type MomentId } from '@/lib/prelude';
import type { LayerProps, PointerRef } from './moments/kit';
import Mother from './moments/Mother';
import FlourBeam from './moments/FlourBeam';
import Fold from './moments/Fold';
import Tally from './moments/Tally';
import Oven from './moments/Oven';
import Crackle from './moments/Crackle';

/**
 * Acts I–II — the prelude. One canon plate (M-00), lit as a set: the single
 * light pools on each prop in turn as the camera glides prop→prop across the
 * morning, and a live layer carries the life inside each pool — starter bubbles,
 * falling flour, a fresh tally stroke, the ember behind the fog, the cooling
 * loaf's fissures. The last beat's cracks converge on the score and dissolve
 * straight into the First Cut. No new imagery; the plate is cinema, the layer
 * is life.
 *
 * Reduced motion: the camera holds still, the pointer layers freeze, and the
 * moments cross-dissolve as stills under the visitor's own native scroll — the
 * new structure survives with no motion at all.
 */

// display size of each moment's pool, in vmin so it scales with the smaller edge
const BOX: Record<MomentId, { w: string; h: string }> = {
  establish: { w: '0', h: '0' },
  mother: { w: '26vmin', h: '40vmin' },
  flour: { w: '40vmin', h: '62vmin' },
  fold: { w: '54vmin', h: '34vmin' },
  tally: { w: '40vmin', h: '30vmin' },
  oven: { w: '46vmin', h: '36vmin' },
  crackle: { w: '54vmin', h: '32vmin' },
};

function Layer({ id, props }: { id: MomentId; props: LayerProps }) {
  switch (id) {
    case 'mother':
      return <Mother {...props} />;
    case 'flour':
      return <FlourBeam {...props} />;
    case 'fold':
      return <Fold {...props} />;
    case 'tally':
      return <Tally {...props} />;
    case 'oven':
      return <Oven {...props} />;
    case 'crackle':
      return <Crackle {...props} />;
    default:
      return null;
  }
}

/**
 * One moment's pool, memoized on its primitives. `p` changes every frame, but a
 * faded moment's opacity stays pinned at 0 (the envelope is flat outside its
 * window), so memo skips its re-render entirely — only the one or two moments
 * mid-cross-dissolve actually re-render per frame.
 */
const MomentSlot = memo(function MomentSlot({
  id,
  cx,
  cy,
  w,
  h,
  opacity,
  active,
  still,
  pointer,
}: {
  id: MomentId;
  cx: number;
  cy: number;
  w: string;
  h: string;
  opacity: number;
  active: boolean;
  still: boolean;
  pointer: PointerRef;
}) {
  return (
    <div className="prelude-moment" style={{ left: `${cx * 100}%`, top: `${cy * 100}%`, width: w, height: h }}>
      <Layer id={id} props={{ opacity, active, still, pointer }} />
    </div>
  );
});

export default function Prelude({
  p,
  opacity,
  reduced,
}: {
  p: number;
  opacity: number;
  reduced: boolean;
}) {
  const pointer: PointerRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth;
      pointer.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced]);

  const cam = reduced ? { cx: 0.5, cy: 0.45, scale: 1 } : focusAt(p);

  return (
    <div className="prelude" style={{ opacity }}>
      {/* the camera: the canon plate, pushed toward the prop in focus */}
      <div
        className="prelude-cam"
        style={{ transformOrigin: `${cam.cx * 100}% ${cam.cy * 100}%`, transform: `scale(${cam.scale})` }}
      >
        <PlateGrade>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PLATES['M-00'].file} alt="" />
        </PlateGrade>
      </div>

      {/* the single light, pooled on the subject; a field of dark around it */}
      <div
        className="prelude-pool"
        style={{
          background: `radial-gradient(72% 64% at ${cam.cx * 100}% ${cam.cy * 100}%, rgb(var(--d-ground) / 0) 30%, rgb(var(--d-ground) / 0.5) 76%, rgb(var(--d-ground) / 0.8) 100%)`,
        }}
      />

      {/* the moments, each pinned to its prop's pool of light */}
      {MOMENTS.map((m: Moment) => {
        if (m.id === 'establish') return null;
        const op = momentOpacity(p, m);
        const box = BOX[m.id];
        return (
          <MomentSlot
            key={m.id}
            id={m.id}
            cx={m.focus.cx}
            cy={m.focus.cy}
            w={box.w}
            h={box.h}
            opacity={op}
            active={op > 0.015}
            still={reduced}
            pointer={pointer}
          />
        );
      })}

      {/* the reverent facts — one Record line at a time, in the silence margin */}
      <div className="prelude-labels" aria-hidden="true">
        {MOMENTS.map((m) =>
          m.label ? (
            <p key={m.id} className="prelude-label" style={{ opacity: momentOpacity(p, m) }}>
              {m.label}
            </p>
          ) : null,
        )}
      </div>
    </div>
  );
}
