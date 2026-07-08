'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { continuityAt } from '@/lib/continuity';
import CutView from './CutView';
import { MorningRoomStill } from './ReducedStory';

const ContinuityScene = dynamic(() => import('./ContinuityScene'), { ssr: false });

/**
 * Drives the one continuous move. Scroll/drag forward advances `t`; a heavy
 * lerp keeps the camera slow and forward-only — inevitable, not a ride.
 * Reduced motion swaps the WebGL dive for three still story beats.
 */
export default function ContinuityLab({
  reduced = false,
  staticT = null,
}: {
  reduced?: boolean;
  staticT?: number | null;
}) {
  const tRef = useRef(staticT ?? 0);
  const target = useRef(staticT ?? 0);
  const dragging = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [hud, setHud] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (staticT !== null) {
      tRef.current = staticT;
      target.current = staticT;
      setHud(staticT);
      return;
    }
    let raf = 0;
    const loop = () => {
      tRef.current += (target.current - tRef.current) * 0.06;
      setHud(tRef.current);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [staticT]);

  const push = (dy: number) => {
    if (staticT !== null) return;
    target.current = Math.min(1, Math.max(0, target.current + dy * 0.00035));
  };

  if (reduced) return <ReducedContinuity t={staticT ?? 0.5} />;
  if (!mounted) return <div style={{ position: 'absolute', inset: 0, background: '#171009' }} />;

  const c = continuityAt(hud);
  return (
    <div
      onWheel={(e) => push(e.deltaY)}
      onPointerDown={(e) => {
        dragging.current = e.clientY;
      }}
      onPointerMove={(e) => {
        if (dragging.current == null) return;
        push(e.clientY - dragging.current);
        dragging.current = e.clientY;
      }}
      onPointerUp={() => {
        dragging.current = null;
      }}
      style={{ position: 'absolute', inset: 0, touchAction: 'none', cursor: 'ns-resize' }}
    >
      <ContinuityScene tRef={tRef} />
      <div
        style={{
          position: 'absolute',
          left: 28,
          bottom: 26,
          fontFamily: 'var(--font-instrument), monospace',
          fontSize: 13,
          letterSpacing: '0.06em',
          color: '#c6892f',
        }}
      >
        {String(Math.round(hud * 100)).padStart(3, ' ')}% · {c.phase}
      </div>
    </div>
  );
}

/** Reduced motion: three still beats — the story with no dive. */
function ReducedContinuity({ t }: { t: number }) {
  const cut = Math.min(1, t * 2.2);
  const captions = ['The cut opens.', 'The morning is inside.', 'It was on your table all along.'];
  const cap = t < 0.34 ? captions[0] : t < 0.7 ? captions[1] : captions[2];
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#171009' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: Math.max(0, 1 - t / 0.4) }}>
        <CutView progress={cut} />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: Math.max(0, 1 - Math.abs(t - 0.5) / 0.4),
          background: 'radial-gradient(circle at 50% 42%, #f3c777 0%, #8a5418 55%, #2c160a 100%)',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, opacity: Math.max(0, (t - 0.55) / 0.45) }}>
        <MorningRoomStill />
      </div>
      <p
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '12vh',
          textAlign: 'center',
          fontFamily: 'var(--font-voice), Georgia, serif',
          fontSize: 'clamp(20px, 3vw, 34px)',
          color: '#241b12',
        }}
      >
        {cap}
      </p>
    </div>
  );
}
