import ScoreWordmark from '@/components/marks/ScoreWordmark';
import ArcDial from '@/components/marks/ArcDial';
import { CANON } from '@/lib/canon';

/**
 * The ending — the approved Frame 12 language: the promise and the reservation,
 * on the settled linen morning. The film's final state (8:04).
 */
export default function Ending() {
  return (
    <div className="handover">
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
    </div>
  );
}
