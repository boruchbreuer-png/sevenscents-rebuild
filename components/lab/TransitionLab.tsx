'use client';

import { useEffect, useRef, useState } from 'react';
import TransitionView from './TransitionView';
import { diveMinutes } from '@/lib/transition';

/**
 * Interactive transition. Scroll/drag forward drives the dive; displayed
 * progress lerps heavily so the camera can only move slowly and forward —
 * inevitable, never a rollercoaster. Continues from the First Cut (which ended
 * at fully open), so this begins at the crumb opening.
 */
export default function TransitionLab({ reduced = false }: { reduced?: boolean }) {
  const [display, setDisplay] = useState(0);
  const target = useRef(0);
  const dragging = useRef(false);
  const lastY = useRef(0);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      setDisplay((v) => v + (target.current - v) * 0.06); // slow, calm, inevitable
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const push = (dy: number) => {
    target.current = Math.min(1, Math.max(0, target.current + dy * 0.00035));
  };
  const onWheel = (e: React.WheelEvent) => push(e.deltaY);
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastY.current = e.clientY;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    push(e.clientY - lastY.current);
    lastY.current = e.clientY;
  };
  const end = () => (dragging.current = false);

  return (
    <div
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      style={{ position: 'absolute', inset: 0, touchAction: 'none', cursor: 'ns-resize' }}
    >
      <TransitionView d={display} reduced={reduced} />
      <div
        style={{
          position: 'absolute',
          left: 28,
          bottom: 26,
          fontFamily: 'var(--font-instrument), monospace',
          fontSize: 13,
          letterSpacing: '0.06em',
          color: '#9c6a21',
        }}
      >
        {String(Math.round(display * 100)).padStart(3, ' ')}% · {diveMinutes(display).toFixed(0) === '484' ? '8:04' : ''} dive
      </div>
    </div>
  );
}
