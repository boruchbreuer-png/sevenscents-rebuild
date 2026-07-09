'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useRaf, rng, type LayerProps } from './kit';

const W = 300;
const H = 440;

/**
 * 4:30 — THE MOTHER. The jar sits lit on the shelf in the plate; the live layer
 * is what's alive inside it: starter bubbles rising slowly through the glass and
 * leaning, just barely, toward the reader's cursor — she notices you. She is
 * starter, not bread: the frame reads RITUAL on the beam, the label, the clock.
 */
export default function Mother({ opacity, active, still, pointer }: LayerProps) {
  const cv = useRef<HTMLCanvasElement>(null);
  const bubbles = useMemo(() => {
    const r = rng(19_98_0430);
    return Array.from({ length: 15 }, () => ({
      x: 0.18 + r() * 0.64, // fraction of jar width
      y: r(), // fraction of jar height (1 = base)
      rad: 2 + r() * 4.5,
      v: 0.02 + r() * 0.05, // rise speed (fraction/s)
      sway: r() * Math.PI * 2,
      swaySpeed: 0.4 + r() * 0.7,
    }));
  }, []);

  const draw = (lean: number) => {
    const c = cv.current;
    if (!c) return;
    const g = c.getContext('2d');
    if (!g) return;
    g.clearRect(0, 0, W, H);
    // the warm life at the base of the jar — fed, breathing
    const glow = g.createRadialGradient(W * 0.5, H * 0.82, 6, W * 0.5, H * 0.82, W * 0.62);
    glow.addColorStop(0, 'rgba(243,199,119,0.22)');
    glow.addColorStop(1, 'rgba(243,199,119,0)');
    g.fillStyle = glow;
    g.fillRect(0, 0, W, H);
    for (const b of bubbles) {
      const sx = (b.x + Math.sin(b.sway) * 0.04 + lean * (b.x - 0.5) * 0.5) * W;
      const sy = (0.16 + b.y * 0.72) * H;
      const rr = b.rad;
      const grad = g.createRadialGradient(sx - rr * 0.3, sy - rr * 0.3, 0, sx, sy, rr);
      grad.addColorStop(0, 'rgba(255,246,224,0.85)');
      grad.addColorStop(0.6, 'rgba(230,206,158,0.5)');
      grad.addColorStop(1, 'rgba(180,150,96,0)');
      g.fillStyle = grad;
      g.beginPath();
      g.arc(sx, sy, rr, 0, Math.PI * 2);
      g.fill();
    }
  };

  useRaf(active && !still, (dt) => {
    // where the cursor is, relative to the jar — bubbles drift toward it
    const lean = Math.max(-1, Math.min(1, (pointer.current.x - 0.84) * 2.2));
    for (const b of bubbles) {
      b.y -= b.v * dt;
      b.sway += b.swaySpeed * dt;
      if (b.y < 0) {
        b.y = 1;
        b.x = 0.18 + Math.abs(Math.sin(b.sway * 13.1)) * 0.64;
      }
    }
    draw(lean);
  });

  // a still frame for reduced motion and first paint: bubbles suspended
  useEffect(() => {
    if (!active || still) draw(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, still]);

  return <canvas ref={cv} width={W} height={H} className="moment-canvas moment-canvas--jar" style={{ opacity }} />;
}
