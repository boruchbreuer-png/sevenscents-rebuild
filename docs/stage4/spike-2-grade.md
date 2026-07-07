# Stage 4 · Spike #2 — The Welding Pass (grade continuity)
**Status: proven on a stand-in; awaiting canon pixels to finalize.** Implementation of approved direction only — no new creative.

## What this spike answers
*Can one base-grade plate be pushed to read correctly at 4:12, 5:40, 7:42, and 8:04 by a clock-driven grade — so generated plates and DOM scenes feel like one continuous film ("one shot")?* This is Architecture risk #2: the illusion dies if grades drift.

## Result
**Yes — the mechanism is built and verified.** The same synthetic plate, regraded by the Dawn clock, moves from cold near-black (4:12) through ember (5:40) to lifted linen (8:04), holding one light source and one film stock throughout. Screenshots: `grade-0412 / 0540 / 0742 / 0804`.

## How it works
- `lib/grade.ts` — the grade as a keyframe table at the film's load-bearing hours. Every tint is an **approved palette value** (bluehour, ember, amber, cream, linen); the grade is the palette, not a new one. Pure and interpolating; `gradeAt(minutes)` → exposure, contrast, saturation, a warmth unifier, a white-balance tint, and vignette strength.
- The Dawn Engine writes `--g-*` variables on the same `onUpdate` that drives the world — **one clock, plates and DOM both obey it.**
- `PlateGrade` composites the grade over a plate: CSS filters push the base stock toward the hour, a soft-light tint sets white balance, and a single-source vignette in the world's *ground* color keeps one light in frame. No hooks, no per-frame JS of its own.
- `FilmShell` gates the whole film shell (light, grain, Dawn Engine, chrome) off `/lab`, so a plate is judged alone.

## Tier mapping (honest scope)
- **Balanced / Reduced:** this CSS-composited grade **is** the shipping path for those tiers — and it is what verifies deterministically now.
- **Full:** the identical transform as a single fragment-shader LUT over the plate texture, keyed to the same clock. Not built yet; it needs the real plate pixels to tune against and is the first task once assets land. Raw WebGL, not three.js — three enters only at the First Cut / transition.

## The blocker (the real gate)
The canon plates (M-00, P-11) live on the Higgsfield CDN, which this session's egress policy blocks (403 — report, don't route around; MCP resource reads are also unsupported). **They cannot be pulled into the build from here.** To wire real plates:
1. Owner downloads canon jobs `3cff50ce-…` (M-00) and `b464f504-…` (P-11) from the widget and commits them to `public/assets/plates/m-00.png` and `p-11.png` (paths already registered in `lib/plates.ts`), **or** the CDN host is allowlisted for this session.
2. Then: swap the stand-in for `<img>` plates, tune the grade keyframes against real pixels, and build the Full-tier LUT.

Until then the stand-in proves the pipeline and the film runs on the DOM grade — the build is green either way.

## Not canon, not shipped
`components/lab/StandInPlate.tsx` and `app/lab/grade/` are non-production: noindex, unlinked, removed before launch. The stand-in exists only to exercise the grade while canon pixels are unreachable. Final grade values will be tuned on the real plates, not the stand-in.

---

## Next spikes — planned, sequenced, and their asset dependencies

**Spike #3 — First Cut feel** *(depends on P-11 pixels for crust texture)*
- Method: pre-fractured crust mesh, scroll-driven knife, crack-reveal shader; must feel *physical, not triggered* (judged on touch). `three` + R3F enter here.
- Buildable now without pixels: the **interaction mechanic** — scroll/drag progress → crack-reveal parameter with dough-weighted easing and a resistance curve — provable with procedural stand-in geometry in `components/lab/`.
- Blocked until pixels: the crust albedo/roughness/height derived from canon P-11.

**Spike #1 — The impossible transition** *(depends on M-00 + P-11 + the P-12 fallback video)*
- Method: procedural crumb cavern (displaced mesh, baked-look light) flown through, match-cut via a chamber opening into the room plate → the visitor's own morning.
- Buildable now without pixels: the **match-cut mechanic and camera path** on procedural stand-ins; the crumb cavern geometry is procedural by design.
- Blocked until pixels/asset: the landing room plate and the pre-rendered fallback video (P-12), which ships on every tier.

**Recommended order:** finalize the grade LUT the moment plates land (it welds everything), then Spike #3 interaction mechanic (no pixels needed to start), then Spike #1. This keeps unblocked work moving while the asset-delivery blocker is resolved.

---

**STOP at the spike-review gate.** Delivered: the welding pass (built, verified on a stand-in), the plate-integration pipeline, and the asset-delivery blocker with its resolution. Next on direction: resolve plate delivery and/or begin the Spike #3 interaction mechanic (unblocked).
