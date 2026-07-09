'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useRaf, rng, type LayerProps } from './kit';

const W = 360;
const H = 540;

/**
 * 4:45 — FLOUR IN THE BEAM. The storyboard's purest statement of the light
 * signature: the frame is almost entirely dark, the beam is the subject, flour
 * falls through it like slow snow. The M-00 window shaft already carries static
 * motes; this layer is the falling ones, catching the cold pre-dawn light. No
 * bread at all, by design.
 */
export default function FlourBeam({ opacity, active, still }: LayerProps) {
  const cv = useRef<HTMLCanvasElement>(null);
  const motes = useMemo(() => {
    const r = rng(445_0445);
    return Array.from({ length: 74 }, () => ({
      x: r(),
      y: r(),
      rad: 0.5 + r() * 1.7,
      v: 0.03 + r() * 0.06, // slow fall (fraction/s)
      sway: r() * Math.PI * 2,
      swaySpeed: 0.3 + r() * 0.6,
      tw: r() * Math.PI * 2, // twinkle phase
    }));
  }, []);

  const draw = (t: number) => {
    const c = cv.current;
    if (!c) return;
    const g = c.getContext('2d');
    if (!g) return;
    g.clearRect(0, 0, W, H);
    // the beam: a soft diagonal column, brightest near the window (upper-left)
    const beam = g.createLinearGradient(0, 0, W, H);
    beam.addColorStop(0, 'rgba(214,214,206,0.16)');
    beam.addColorStop(0.5, 'rgba(200,196,180,0.06)');
    beam.addColorStop(1, 'rgba(200,196,180,0)');
    g.fillStyle = beam;
    g.fillRect(0, 0, W, H);
    g.globalCompositeOperation = 'lighter';
    for (const m of motes) {
      const sx = (m.x + Math.sin(m.sway) * 0.02) * W;
      const sy = m.y * H;
      // motes only glow where the beam is (the upper-left band); fade out lower-right
      const inBeam = Math.max(0, 1 - (m.x * 0.6 + m.y * 0.6));
      const twinkle = 0.55 + 0.45 * Math.sin(m.tw + (t || 0) * 1.6);
      g.fillStyle = `rgba(244,238,222,${0.5 * inBeam * twinkle})`;
      g.beginPath();
      g.arc(sx, sy, m.rad, 0, Math.PI * 2);
      g.fill();
    }
    g.globalCompositeOperation = 'source-over';
  };

  useRaf(active && !still, (dt, t) => {
    for (const m of motes) {
      m.y += m.v * dt;
      m.sway += m.swaySpeed * dt;
      if (m.y > 1) {
        m.y = -0.02;
        m.x = rng((m.tw * 1e6) | 0)();
      }
    }
    draw(t);
  });

  useEffect(() => {
    if (!active || still) draw(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, still]);

  return <canvas ref={cv} width={W} height={H} className="moment-canvas moment-canvas--beam" style={{ opacity }} />;
}
