'use client';

import { useEffect, useRef } from 'react';
import { useRaf, type LayerProps } from './kit';
import { CANON, formatCount } from '@/lib/canon';

/**
 * 5:40 — THE TALLY. Pure brand system: the count that never resets, made
 * physical. The M-00 wall already carries strokes fading back toward 1998; this
 * layer adds today's mark — one fresh graphite stroke that draws itself and
 * catches the light — and the Bake № climbing one last notch as it lands. No
 * bread present at all; the mono counter and the wall are the identity.
 */
export default function Tally({ opacity, active, still }: LayerProps) {
  const countRef = useRef<HTMLSpanElement>(null);
  const base = CANON.BAKE_NO_EPOCH.bakeNo;

  // the count climbs the last two marks as the moment settles — then holds
  useRaf(active && !still, (_dt, t) => {
    const k = Math.min(1, t / 1.4);
    const n = base - 2 + Math.round(k * 2);
    if (countRef.current) countRef.current.textContent = formatCount(n);
  });
  useEffect(() => {
    if ((!active || still) && countRef.current) countRef.current.textContent = formatCount(base);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, still]);

  // groups of five, hand-angled, receding into the dark; the last stroke is today's
  const groups = [
    { x: 6, y: 20 },
    { x: 40, y: 16 },
    { x: 74, y: 22 },
    { x: 18, y: 52 },
    { x: 52, y: 48 },
  ];
  const stroke = (gx: number, gy: number, i: number, fresh = false) => {
    const x = gx + i * 5.4;
    const lean = ((i % 2) - 0.5) * 1.4;
    return (
      <line
        key={`${gx}-${i}`}
        x1={x}
        y1={gy}
        x2={x + lean}
        y2={gy + 20}
        stroke={fresh ? 'rgb(var(--d-inst, 243 199 119))' : '#d8c8a0'}
        strokeWidth={fresh ? 2 : 1.5}
        strokeLinecap="round"
        opacity={fresh ? 0.92 : 0.2}
        className={fresh && !still ? 'moment-tally__fresh' : undefined}
        pathLength={fresh ? 1 : undefined}
      />
    );
  };

  return (
    <div className="moment-tally" style={{ opacity }} data-still={still ? '' : undefined}>
      <svg className="moment-tally__wall" viewBox="0 0 120 90" aria-hidden="true">
        {groups.map((g) =>
          [0, 1, 2, 3].map((i) => stroke(g.x, g.y, i)).concat(
            // the diagonal that closes each group of five
            <line
              key={`${g.x}-slash`}
              x1={g.x - 2}
              y1={g.y + 22}
              x2={g.x + 22}
              y2={g.y - 2}
              stroke="#d8c8a0"
              strokeWidth={1.5}
              strokeLinecap="round"
              opacity={0.2}
            />,
          ),
        )}
        {/* today's mark — the fresh stroke, drawn as the moment lands */}
        {stroke(86, 48, 0, true)}
      </svg>
      <p className="moment-tally__count">
        Bake&nbsp;&#8470;&nbsp;<span ref={countRef}>{formatCount(base)}</span>
      </p>
    </div>
  );
}
