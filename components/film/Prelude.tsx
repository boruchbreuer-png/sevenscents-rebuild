'use client';

import { memo, useEffect, useRef, useState } from 'react';
import PlateGrade from '@/components/engine/PlateGrade';
import { PLATES } from '@/lib/plates';
import { MOMENTS, PLATE_ASPECT, focusAt, momentOpacity, project, type Moment, type MomentId } from '@/lib/prelude';
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
  foldSrc = null,
}: {
  p: number;
  opacity: number;
  reduced: boolean;
  /** The canon F-01 fold plate, once its file is on disk; null falls back to the layered placeholder. */
  foldSrc?: string | null;
}) {
  const pointer: PointerRef = useRef({ x: 0.5, y: 0.5 });
  // viewport aspect drives the cover-crop projection; 16:9 default so SSR and
  // desktop are a no-op (never a pan where none is needed).
  const [aspect, setAspect] = useState(PLATE_ASPECT);

  useEffect(() => {
    const onResize = () => setAspect(window.innerWidth / window.innerHeight);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth;
      pointer.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced]);

  // Reduced motion: keep the horizontal framing following the moments (so mobile
  // still frames each prop) but drop the zoom and vertical drift — no push, calm.
  const f = focusAt(p);
  const cam = reduced ? { cx: f.cx, cy: 0.45, scale: 1 } : f;
  const proj = project(aspect, cam.cx);
  const originX = proj.x(cam.cx);
  const originY = proj.y(cam.cy);

  // The fold — the one beat that is its own plate (canon F-01): it cross-
  // dissolves over the room on the fold's envelope, graded by the same welding
  // pass, so the cut to macro reads as the same film. Mounted a little ahead of
  // its fade-in so the image is fetched before it is seen.
  const fold = MOMENTS.find((m) => m.id === 'fold')!;
  const foldOp = foldSrc ? momentOpacity(p, fold) : 0;
  const mountFold = foldSrc !== null && p > fold.in - 0.08 && p < fold.out + 0.05;

  return (
    <div className="prelude" style={{ opacity }}>
      {/* the camera: the canon plate, panned + pushed toward the prop in focus */}
      <div
        className="prelude-cam"
        style={{ transformOrigin: `${originX * 100}% ${originY * 100}%`, transform: `scale(${cam.scale})` }}
      >
        <PlateGrade>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PLATES['M-00'].file} alt="" style={{ objectPosition: `${proj.objX * 100}% 50%` }} />
        </PlateGrade>
      </div>

      {/* 5:10 — the fold: the canon F-01 plate, cross-dissolving over the room */}
      {mountFold && (
        <div className="prelude-fold" style={{ opacity: foldOp }}>
          <PlateGrade>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={foldSrc!} alt="" />
          </PlateGrade>
          {/* the Score arc stays — the fold line and the divider are one gesture */}
          <svg className="prelude-fold__score" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M2 40 C 26 35.5, 66 27.5, 98 18"
              fill="none"
              stroke="rgb(var(--d-inst, 156 106 33))"
              strokeWidth="0.35"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        </div>
      )}

      {/* the single light, pooled on the subject; a field of dark around it */}
      <div
        className="prelude-pool"
        style={{
          background: `radial-gradient(72% 64% at ${originX * 100}% ${originY * 100}%, rgb(var(--d-ground) / 0) 30%, rgb(var(--d-ground) / 0.5) 76%, rgb(var(--d-ground) / 0.8) 100%)`,
        }}
      />

      {/* the moments, each pinned to its prop's on-screen pool of light */}
      {MOMENTS.map((m: Moment) => {
        if (m.id === 'establish') return null;
        // the placeholder fold layer retires once the real F-01 plate renders
        if (m.id === 'fold' && foldSrc) return null;
        const op = momentOpacity(p, m);
        const active = op > 0.015;
        const box = BOX[m.id];
        // project only the visible moment; faded ones keep a stable position so
        // their memoized slot doesn't re-render as the camera glides.
        const sx = active ? proj.x(m.focus.cx) : m.focus.cx;
        const sy = active ? proj.y(m.focus.cy) : m.focus.cy;
        return (
          <MomentSlot
            key={m.id}
            id={m.id}
            cx={sx}
            cy={sy}
            w={box.w}
            h={box.h}
            opacity={op}
            active={active}
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
