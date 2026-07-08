import {
  CHAMBERS,
  ROOM_Z,
  PERSPECTIVE,
  TRAVEL,
  apparentZ,
  layerOpacity,
  beamAlpha,
  linenWash,
  fogAlpha,
  diveMinutes,
} from '@/lib/transition';
import { dawnAt, progressAtMinutes } from '@/lib/dawn';

/**
 * The transition scene, rendered from dive progress `d`. Pure — no hooks, no
 * time. Single warm source ahead, approved palette. Stand-in geometry.
 */
export default function TransitionView({ d, reduced = false }: { d: number; reduced?: boolean }) {
  const grade = dawnAt(progressAtMinutes(diveMinutes(d)));
  const camZ = d * TRAVEL;

  if (reduced) return <ReducedStills d={d} ground={grade.ground.join(' ')} />;

  return (
    <div
      className="t-stage"
      style={{ ['--d-ground' as string]: grade.ground.join(' '), background: `rgb(${grade.ground.join(' ')})` }}
    >
      <div className="t-space" style={{ perspective: `${PERSPECTIVE}px`, perspectiveOrigin: '50% 44%' }}>
        {/* the morning room, deepest — the Handover destination */}
        <div className="t-layer" style={{ transform: `translateZ(${ROOM_Z + camZ}px)`, opacity: layerOpacity(ROOM_Z, d) }}>
          <MorningRoom />
        </div>

        {/* the crumb chambers, then the window hinge */}
        {CHAMBERS.map((c, i) => {
          const az = apparentZ(c.z, d);
          if (az > 150) return null; // flown past
          return (
            <div
              key={i}
              className="t-layer"
              style={{ transform: `translate(${c.ox}%, ${c.oy}%) translateZ(${c.z + camZ}px)`, opacity: layerOpacity(c.z, d) }}
            >
              {c.kind === 'window' ? <WindowHinge id={i} /> : <CrumbWall id={i} aperture={c.aperture} />}
            </div>
          );
        })}
      </div>

      {/* the warm light ahead — the morning */}
      <div className="t-beam" style={{ opacity: beamAlpha(d) }} />
      {/* interior fog, thinning toward the room */}
      <div className="t-fog" style={{ opacity: fogAlpha(d) }} />
      {/* linen wash of emergence */}
      <div className="t-linen" style={{ opacity: linenWash(d) }} />
    </div>
  );
}

/** A crumb chamber: a warm wall with a clear central passage deeper in. */
function CrumbWall({ id, aperture }: { id: number; aperture: number }) {
  const r = Math.round(aperture * 100);
  return (
    <svg viewBox="0 0 100 56" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <radialGradient id={`cw-${id}`} cx="50%" cy="46%" r="60%">
          <stop offset="0%" stopColor="#f3c777" stopOpacity="0" />
          <stop offset={`${r}%`} stopColor="#f3c777" stopOpacity="0" />
          <stop offset={`${r + 10}%`} stopColor="#c6892f" stopOpacity="0.85" />
          <stop offset="72%" stopColor="#8a5418" stopOpacity="0.97" />
          <stop offset="100%" stopColor="#2c160a" stopOpacity="1" />
        </radialGradient>
        <filter id={`cwf-${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.10 0.16" numOctaves="2" seed={id * 7} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="6" />
        </filter>
      </defs>
      <rect width="100" height="56" fill={`url(#cw-${id})`} filter={`url(#cwf-${id})`} />
      {/* irregular honeycomb cells in the crumb wall (never a regular grid) */}
      <g fill="#f3c777" opacity="0.10" filter={`url(#cwf-${id})`}>
        <circle cx="14" cy="12" r="4.2" /><circle cx="26" cy="8" r="2.6" /><circle cx="38" cy="13" r="3.4" />
        <circle cx="84" cy="12" r="4.6" /><circle cx="90" cy="26" r="3" /><circle cx="79" cy="20" r="2.4" />
        <circle cx="10" cy="30" r="3.6" /><circle cx="16" cy="44" r="4" /><circle cx="30" cy="49" r="2.8" />
        <circle cx="86" cy="44" r="3.8" /><circle cx="72" cy="48" r="3" /><circle cx="60" cy="9" r="2.5" />
      </g>
      <g fill="#5c3410" opacity="0.16" filter={`url(#cwf-${id})`}>
        <circle cx="20" cy="18" r="2.6" /><circle cx="80" cy="30" r="2.4" /><circle cx="24" cy="40" r="2.2" />
        <circle cx="76" cy="40" r="2.6" /><circle cx="34" cy="20" r="1.9" />
      </g>
    </svg>
  );
}

/** The match-cut hinge: the last crumb opening is window-shaped. */
function WindowHinge({ id }: { id: number }) {
  return (
    <svg viewBox="0 0 100 56" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <radialGradient id={`wh-${id}`} cx="50%" cy="46%" r="62%">
          <stop offset="0%" stopColor="#8a5418" stopOpacity="0" />
          <stop offset="34%" stopColor="#8a5418" stopOpacity="0.2" />
          <stop offset="52%" stopColor="#8a5418" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#2c160a" stopOpacity="1" />
        </radialGradient>
      </defs>
      {/* crumb wall */}
      <rect width="100" height="56" fill={`url(#wh-${id})`} />
      {/* the window aperture — linen light beyond (the morning), transparent to the room */}
      <rect x="38" y="16" width="24" height="26" rx="1.5" fill="#f4eee0" opacity="0.0" />
      <g stroke="#3a2216" strokeWidth="0.7" opacity="0.85">
        <rect x="38" y="16" width="24" height="26" rx="1.5" fill="none" />
        <line x1="50" y1="16" x2="50" y2="42" />
        <line x1="38" y1="29" x2="62" y2="29" />
      </g>
    </svg>
  );
}

/** The Handover room — implied and universal, dissolved in light. Not decorated. */
function MorningRoom() {
  return (
    <svg viewBox="0 0 100 56" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <linearGradient id="mr-bg" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#ece3d0" />
          <stop offset="100%" stopColor="#c9b98f" />
        </linearGradient>
        <radialGradient id="mr-win" cx="24%" cy="26%" r="40%">
          <stop offset="0%" stopColor="#f8f3e6" />
          <stop offset="100%" stopColor="#f8f3e6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mr-loaf" cx="45%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#e7c98f" />
          <stop offset="60%" stopColor="#b98f57" />
          <stop offset="100%" stopColor="#6e4a22" />
        </radialGradient>
      </defs>
      <rect width="100" height="56" fill="url(#mr-bg)" />
      {/* the window — the room's own single light source, upper-left */}
      <rect x="8" y="6" width="20" height="24" fill="#f8f3e6" />
      <g stroke="#b7a274" strokeWidth="0.5"><line x1="18" y1="6" x2="18" y2="30" /><line x1="8" y1="18" x2="28" y2="18" /></g>
      <rect width="100" height="56" fill="url(#mr-win)" />
      {/* the table, lower third */}
      <rect x="0" y="40" width="100" height="16" fill="#5c4326" />
      <rect x="0" y="40" width="100" height="2.5" fill="#6e4f2c" />
      {/* the same cut loaf, a cooling cup, a fold of linen — the morning */}
      <ellipse cx="52" cy="43.5" rx="12" ry="5.5" fill="url(#mr-loaf)" />
      <path d="M44 42.5 Q52 40.4 60 42.8" stroke="#f3c777" strokeWidth="0.7" fill="none" opacity="0.7" />
      <ellipse cx="72" cy="44" rx="4.2" ry="2.1" fill="#e7ddc6" />
      <ellipse cx="72" cy="43.2" rx="3" ry="1.3" fill="#2c1c10" opacity="0.5" />
      <rect x="26" y="44" width="14" height="4" rx="2" fill="#e7ddc6" opacity="0.85" />
    </svg>
  );
}

/** Reduced motion: three story stills crossfading — the narrative with no dive. */
function ReducedStills({ d, ground }: { d: number; ground: string }) {
  const a = Math.min(1, Math.max(0, 1 - d / 0.5));
  const b = Math.min(1, Math.max(0, 1 - Math.abs(d - 0.5) / 0.5));
  const c = Math.min(1, Math.max(0, (d - 0.5) / 0.5));
  const captions = ['The cut opens.', 'Inside, the morning is quiet.', 'It was on your table all along.'];
  const cap = d < 0.34 ? captions[0] : d < 0.7 ? captions[1] : captions[2];
  return (
    <div className="t-stage" style={{ background: `rgb(${ground})` }}>
      <div className="t-still" style={{ opacity: a, background: 'radial-gradient(circle at 50% 46%, #f3c777 0%, #c6892f 30%, #2c160a 78%)' }} />
      <div className="t-still" style={{ opacity: b, background: 'radial-gradient(circle at 50% 40%, #f3c777 0%, #8a5418 55%, #2c160a 100%)' }} />
      <div className="t-still" style={{ opacity: c }}><MorningRoom /></div>
      <p className="t-caption">{cap}</p>
    </div>
  );
}
