# Stage 4 · Spike #3 — The First Cut mechanic
**Status: mechanic proven on a stand-in; awaiting review.** Feel/mechanics spike only — procedural stand-in geometry, no production textures, not the final scene. Governed by `00-brand-dna.md`.

## What this spike answers
*Does the cut feel physical, weighted, and ceremonial — pulled through resistance like a lame through crust — rather than a triggered animation?*

## What was built
- `lib/firstcut.ts` — the pure mechanic: a resistance curve, an input integrator, and the crust-opening geometry along the **approved Score arc**. Deterministic (same progress → same frame), so it is screenshot-verifiable.
- `components/lab/CutView.tsx` — the procedural loaf, opened by a `progress` value. Single upper-left light, approved palette only.
- `components/lab/FirstCutLab.tsx` — the interactive driver: drag down / scroll to pull the blade; dough-weighted smoothing; crust-break and re-seal logic; a small Instrument HUD (progress · phase · resistance).
- `app/lab/first-cut/` — non-production lab (noindex, unlinked). `?p=` forces a static progress; `?reduced=1` is the reduced-motion variant.

## How the interaction works
1. A downward **drag or scroll** is the pull. Raw pull (px) is integrated into `progress` (0..1) through a **resistance curve** — it is never played on a timeline. Stop pulling and it holds; nothing is time-based.
2. The **crust must be broken** (progress ≥ 0.14) before the cut commits. Cross it and the crust *gives* — a small forward nudge plus a steam burst.
3. **Release before the break** and the crust **re-seals** toward closed. This is the core "physical, not triggered" proof — a canned animation cannot do this.
4. Past the break the cut is **irreversible** — a lame does not un-cut; reverse drags are ignored.
5. Displayed progress **lerps heavily** toward the target (≈0.14/frame) — dough weight, no snap, no bounce.

## How resistance / progress / crack reveal are calculated
- **Resistance** `resistanceAt(p)`: crust skin ×3.4 (hardest) → dough easing ×1.35→0.85 → release ×0.75. Each input step: `progress += pull·GAIN / resistance(progress)`. A full cut takes ≈850 px of deliberate pull — weighted, not a flick.
- **Crack reveal** `buildCut(p)`: the Score arc is sampled; separation `gapAt(t,p)` opens **centre-out** (an unzip front spreading from the middle) and is **widest over the crown** (`sin(πt)^0.6`). The upper lip peels up into the **ear**; the interior is a warm crumb gradient; the lame incision is always drawn, so at rest it reads as a **bakeable score, not a UI stroke**.
- **Steam** is gated to ~0 until the break, then bursts and fades through the dough. **Camera** pushes in subtly with progress (frozen under reduced motion).

## Proof
- Static filmstrip: `cut-000` (scored) · `cut-018` (break + steam) · `cut-040` (opening, centre-out) · `cut-070` · `cut-100` (ear peeled, crumb revealed).
- **Interactive drag** logged the model live: `0% Scored ×3.40 → 6% Crust ×3.40 → 19% Crumb ×1.31 → 41% ×1.14 → 68% ×0.94 → 100% Open ×0.75`.
- **Re-seal test**: a small pull to 1% released before the break returned to `0% Scored`. Physical, not triggered.
- **Mobile**: touch-drag reached 38% on a 430-px portrait viewport. Zero page errors.

## Does it feel physical enough yet?
**Yes for a mechanics spike** — the resistance ramp, the crust-break give, the re-seal, and the dough-weighted smoothing land the "pulling a blade through resistance" feel, and the opening is progressive and centre-out, not a triggered clip. It is not yet *beautiful* (correct for this stage): the loaf is an SVG stand-in, the crumb is a gradient, the ear is 2D.

## What remains before it becomes the final First Cut scene
1. Real geometry/material: swap the SVG stand-in for the **P-11-derived** crust (albedo/roughness/height) on a pre-fractured mesh — this is where `three` / R3F enter.
2. 3D crack-reveal shader (displacement + subsurface crumb glow) replacing the 2D gap.
3. Volumetric steam and a real camera fall (feeding directly into Spike #1, the impossible transition).
4. Bind into the Dawn Engine at 7:42 and the welding grade; tune haptics + the "sound made visible" seismograph.
5. Final resistance tuning against the real scroll/Lenis transport, and mobile drag ergonomics on device.

---

**STOP at the Spike #3 review gate.** No full site, no impossible transition, no new images. Next on approval: the 3D First Cut scene (P-11 material + R3F) or the impossible-transition spike it feeds.
