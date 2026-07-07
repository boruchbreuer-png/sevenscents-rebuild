import ArcDial from '@/components/marks/ArcDial';
import { CANON, formatCount } from '@/lib/canon';

/**
 * The Instrument chrome — the watch face at the frame's edge.
 * Clock and act text are driven by the Dawn Engine (ids), the dial's span
 * draws itself from --d-progress. Everything else is still.
 */
export default function Chrome() {
  return (
    <>
      <nav className="chrome chrome--menu">Menu</nav>

      <div className="chrome chrome--arc" aria-label="The Arc of Hours — the morning, drawing itself as you move through it">
        <ArcDial size={52} live />
      </div>

      <div className="chrome chrome--clock">
        <small id="dawn-act">The hour no one sees</small>
        <span id="dawn-clock">4:12</span>
      </div>

      <div className="chrome chrome--bake">
        Bake&nbsp;&#8470;&nbsp;{formatCount(CANON.BAKE_NO_EPOCH.bakeNo)}
      </div>
    </>
  );
}
