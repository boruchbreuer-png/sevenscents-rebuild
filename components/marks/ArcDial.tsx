/**
 * The Arc of Hours — the measured dawn dial (approved Stage 3 form).
 * Ring · the 4:12→8:04 span rising in the Score's direction · hour ticks ·
 * the baker's-hour notch at 4:30 · the endpoint at 8:04.
 *
 * `live` renders the corner-chrome variant whose span draws itself from
 * scroll progress (--d-progress) — a sunrise the visitor fills. Slow and
 * needle-less: horological, never a gauge.
 */
export default function ArcDial({
  size = 52,
  live = false,
}: {
  size?: number;
  live?: boolean;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" role="img" aria-hidden="true">
      {/* the dial */}
      <circle cx="48" cy="48" r="36" fill="none" stroke="#DFD2B6" strokeWidth="2.4" opacity={live ? 0.55 : 1} />
      {/* the protected morning, 4:12 → 8:04 */}
      <path
        d="M13.22 38.68 A36 36 0 0 1 80.63 32.78"
        fill="none"
        stroke="rgb(var(--d-inst, 156 106 33))"
        strokeWidth={live ? 3.8 : 3.2}
        strokeLinecap="round"
        pathLength={1}
        style={
          live
            ? { strokeDasharray: 1, strokeDashoffset: 'calc(1 - var(--d-progress, 0))' }
            : undefined
        }
      />
      {!live && (
        // the hours: 5, 6, 7 — full emblem only
        <g stroke="#B0904F" strokeWidth="1.5" strokeLinecap="round">
          <line x1="22.11" y1="22.99" x2="25.71" y2="26.47" />
          <line x1="41.74" y1="12.55" x2="42.61" y2="17.48" />
          <line x1="63.78" y1="15.65" x2="61.58" y2="20.14" />
        </g>
      )}
      {/* the baker's hour, 4:30 — the one notch that matters */}
      <line x1="15.65" y1="32.22" x2="22.83" y2="35.72" stroke="#9C6A21" strokeWidth={live ? 2.6 : 2.2} strokeLinecap="round" />
      {!live && <circle cx="15.65" cy="32.22" r="2.2" fill="#9C6A21" />}
      {/* 8:04, now — full emblem only (the live dial's tip is the drawing arc itself) */}
      {!live && <circle cx="80.63" cy="32.78" r="3.1" fill="#C6892F" />}
    </svg>
  );
}
