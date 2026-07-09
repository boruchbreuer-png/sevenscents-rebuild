'use client';

import { useEffect, useRef } from 'react';
import { useRaf, type LayerProps } from './kit';

const W = 380;
const H = 300;

/**
 * 6:05 — THE OVEN. The plate's carved "1931" mouth is the warmest source in the
 * film; behind the fogged glass an ember glow rises. Wipe the fog with a finger
 * and the rise shows through — then it breathes back, so the oven is never fully
 * given away (the bite is never shown). Under reduced motion the glass is already
 * mostly clear and the glow simply pulses: the moment reads with hands still.
 */
export default function Oven({ opacity, active, still }: LayerProps) {
  const cv = useRef<HTMLCanvasElement>(null);
  const p = useRef<{ x: number; y: number; down: boolean }>({ x: -1, y: -1, down: false });

  const fogFill = (alpha: number) => {
    const c = cv.current;
    const g = c?.getContext('2d');
    if (!c || !g) return;
    g.globalCompositeOperation = 'source-over';
    g.fillStyle = `rgba(206,196,178,${alpha})`;
    g.fillRect(0, 0, W, H);
  };

  useEffect(() => {
    const c = cv.current;
    if (!c) return;
    const to = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      p.current.x = ((e.clientX - r.left) / r.width) * W;
      p.current.y = ((e.clientY - r.top) / r.height) * H;
    };
    const move = (e: PointerEvent) => {
      to(e);
      p.current.down = true;
    };
    const leave = () => {
      p.current.down = false;
    };
    c.addEventListener('pointermove', move);
    c.addEventListener('pointerleave', leave);
    return () => {
      c.removeEventListener('pointermove', move);
      c.removeEventListener('pointerleave', leave);
    };
  }, []);

  // reduced motion / first paint: leave the glass mostly clear so the rise shows
  useEffect(() => {
    if (!active || still) fogFill(still ? 0.34 : 0.62);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, still]);

  useRaf(active && !still, (dt) => {
    const g = cv.current?.getContext('2d');
    if (!g) return;
    // the glass breathes fog back, slowly
    fogFill(Math.min(1, dt * 0.32));
    // and the finger clears it
    if (p.current.down && p.current.x >= 0) {
      g.globalCompositeOperation = 'destination-out';
      const grd = g.createRadialGradient(p.current.x, p.current.y, 0, p.current.x, p.current.y, 46);
      grd.addColorStop(0, 'rgba(0,0,0,0.9)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = grd;
      g.beginPath();
      g.arc(p.current.x, p.current.y, 46, 0, Math.PI * 2);
      g.fill();
      g.globalCompositeOperation = 'source-over';
    }
  });

  return (
    <div className="moment-oven" style={{ opacity }} data-still={still ? '' : undefined}>
      <div className="moment-oven__ember" />
      <canvas ref={cv} width={W} height={H} className="moment-oven__glass" />
    </div>
  );
}
