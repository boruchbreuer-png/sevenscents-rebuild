/**
 * PlateGrade — the welding pass over a generated plate.
 *
 * Renders a plate (the approved Higgsfield still/loop) under a clock-driven
 * regrade: composited CSS filters push the base film stock toward the hour, a
 * soft-light tint sets white balance, and a single-source vignette (in the
 * world's ground color) keeps one light in frame. All values come from the
 * Dawn Engine's --g-* / --d-ground variables, so a plate obeys the same clock
 * as every DOM scene. No hooks — server-renderable, zero per-frame JS of its
 * own.
 *
 * The Full-tier WebGL LUT is the identical transform in a fragment shader over
 * the plate texture; this CSS-composited path is the Balanced/Reduced grade
 * and the deterministic proof of the pipeline.
 */
export default function PlateGrade({
  children,
  className = '',
}: {
  /** The plate: an <img> in production, or a stand-in in the lab. */
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`plate-grade ${className}`}>
      <div className="plate-grade__media">{children}</div>
      <div className="plate-grade__tint" aria-hidden="true" />
      <div className="plate-grade__vignette" aria-hidden="true" />
    </div>
  );
}
