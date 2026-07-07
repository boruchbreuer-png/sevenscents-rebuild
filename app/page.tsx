import ArcDial from '@/components/marks/ArcDial';
import ScoreWordmark from '@/components/marks/ScoreWordmark';
import { CANON } from '@/lib/canon';
import { progressAtMinutes } from '@/lib/dawn';

/**
 * Stage 4 · Slice 0 — the Dawn Engine proof reel.
 * The film's scroll spine with zero imagery: approved copy beats placed at
 * their exact hour, the grade moving 4:12 → 8:04 around them. P-xx / SPIKE
 * labels mark where cinema and the risk prototypes land next.
 */

const REEL_VH = 800;

interface Beat {
  min: number;
  voice?: string;
  record?: string;
}

const BEATS: Beat[] = [
  { min: 252, voice: 'The world will wake soon. Not yet.' },
  { min: 270, voice: 'We have been awake since 4:30. You didn’t have to be. That’s the arrangement.' },
  { min: 340, voice: 'Forty loaves. Then the oven rests.', record: 'P-06 · The tally wall' },
  { min: 360, voice: 'The Mother is fed at six. She eats before we do.', record: 'Fed since 1998' },
  { min: 435, record: 'P-10 · The crust, cooling — the flyover' },
  { min: 462, record: 'Spike #3 · The First Cut → Spike #1 · The impossible transition' },
];

/** A beat's center sits exactly where the clock reads its hour. */
function beatTop(min: number): string {
  const f = progressAtMinutes(min);
  return `calc(${f} * ${REEL_VH - 100}vh + 50vh)`;
}

export default function Film() {
  return (
    <main className="reel">
      {BEATS.map((b) => (
        <section key={b.min} className="beat" style={{ top: beatTop(b.min) }}>
          {b.voice && <p className="beat__voice">{b.voice}</p>}
          {b.record && <p className="beat__record">{b.record}</p>}
        </section>
      ))}

      {/* 8:04 — the handover: the film ends on the approved Frame 12 */}
      <section className="beat handover" style={{ top: beatTop(CANON.FILM_END) }}>
        <ScoreWordmark />
        <h1 className="promise">Tomorrow is already&nbsp;proving.</h1>
        <div className="reserve">
          <div className="reserve__emblem">
            <ArcDial size={96} />
          </div>
          <p className="reserve__label">Protect tomorrow morning</p>
          <p className="reserve__count">17&thinsp;/&thinsp;{CANON.LOAVES_PER_BAKE}</p>
          <p className="reserve__caption">Mornings protected</p>
        </div>
      </section>
    </main>
  );
}
