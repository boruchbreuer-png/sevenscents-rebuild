'use client';

import { useEffect, useRef, useState } from 'react';
import CutView from './CutView';
import { advance, resistanceAt, phaseOf, CRUST_BREAK } from '@/lib/firstcut';

/**
 * Interactive First Cut mechanic. Drag down (or scroll) to pull the blade
 * through the crust: the pull is integrated through resistance into progress.
 * The crust must be broken before the cut commits; release before the break
 * and the crust re-seals. Displayed progress lerps heavily toward the target
 * (dough weight). No time-based playback — nothing moves unless you pull.
 */
export default function FirstCutLab({ reduced = false }: { reduced?: boolean }) {
  const [display, setDisplay] = useState(0);
  const target = useRef(0);
  const dragging = useRef(false);
  const lastY = useRef(0);
  const broke = useRef(false);
  const releasing = useRef(false);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      // dough-weighted smoothing toward the target
      setDisplay((d) => d + (target.current - d) * 0.14);
      // if released before the crust broke, the crust re-seals
      if (releasing.current && !broke.current) {
        target.current = Math.max(0, target.current - 0.02);
        if (target.current <= 0.001) releasing.current = false;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pull = (dy: number) => {
    const before = target.current;
    target.current = advance(target.current, dy);
    if (!broke.current && before < CRUST_BREAK && target.current >= CRUST_BREAK) {
      broke.current = true;
      target.current = Math.min(1, target.current + 0.04); // the crust gives
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    releasing.current = false;
    lastY.current = e.clientY;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dy = e.clientY - lastY.current;
    lastY.current = e.clientY;
    if (dy !== 0) pull(dy);
  };
  const endDrag = () => {
    dragging.current = false;
    releasing.current = true;
  };
  const onWheel = (e: React.WheelEvent) => pull(e.deltaY * 0.6);

  const resistance = resistanceAt(display);
  const phase = phaseOf(display);

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onWheel={onWheel}
      style={{ position: 'absolute', inset: 0, touchAction: 'none', cursor: 'ns-resize' }}
    >
      <CutView progress={display} reduced={reduced} />
      <Hud progress={display} phase={phase} resistance={resistance} broke={broke.current} />
    </div>
  );
}

export function Hud({
  progress,
  phase,
  resistance,
  broke,
}: {
  progress: number;
  phase: string;
  resistance: number;
  broke: boolean;
}) {
  const pct = Math.round(progress * 100);
  return (
    <div
      style={{
        position: 'absolute',
        left: 28,
        bottom: 26,
        fontFamily: 'var(--font-instrument), monospace',
        fontSize: 13,
        letterSpacing: '0.06em',
        color: '#9c6a21',
        lineHeight: 1.9,
      }}
    >
      <div>
        {String(pct).padStart(3, ' ')}% · {phase}
      </div>
      <div style={{ width: 160, height: 3, background: 'rgb(60 48 34 / 0.6)', marginTop: 4, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, width: `${progress * 100}%`, background: '#c6892f' }} />
        {/* the crust-break threshold, marked on the resistance track */}
        <div style={{ position: 'absolute', left: `${CRUST_BREAK * 100}%`, top: -3, width: 1, height: 9, background: broke ? '#f3c777' : '#6e4a22' }} />
      </div>
      <div style={{ fontSize: 9, opacity: 0.7, marginTop: 5, fontFamily: 'var(--font-record), sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        resistance ×{resistance.toFixed(2)}
      </div>
    </div>
  );
}
