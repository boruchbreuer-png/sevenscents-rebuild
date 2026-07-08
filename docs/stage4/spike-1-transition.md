# Stage 4 · Spike #1 — The impossible transition (The Handover)
**Status: language proven on a stand-in; awaiting review.** Story/camera/match-cut mechanics spike — 2.5D stand-in geometry, no P-11 materials, no WebGL. Governed by `00-brand-dna.md` and strategy §5.2.

## What this spike answers
*Can the transition feel emotionally inevitable and physically connected to the cut — entering the quiet interior of the morning and emerging into the visitor's own — without becoming sci-fi, fantasy, a cave, or a rollercoaster?*

## What was built
- `lib/transition.ts` — pure model: chamber depths, the camera dolly, per-layer opacity, the beam/fog/linen curves, Dawn continuity (`diveMinutes`: 7:42→8:04), reduced-motion still weights. Deterministic (dive `d` → the scene).
- `components/lab/TransitionView.tsx` — a real **CSS-3D** scene: crumb chambers on a perspective stage at increasing depth, a **window hinge**, and the **morning room** deepest. Single warm source ahead, approved palette.
- `components/lab/TransitionLab.tsx` — scroll/drag drives the dive; heavy lerp (0.06) so the camera only moves slowly and **forward**. Reduced motion → three crossfading story stills with the Voice caption.
- `app/lab/transition/` — non-production lab (noindex). `?d=` static, `?reduced=1`.

## 1 · How the transition begins from the cut
The dive continues from the First Cut's fully-open state: the crust opening **becomes the portal**. At `d=0` the frame is the warm crumb interior with a window-shaped light ahead — the morning, foreshadowed. (Final: the cut's opening geometry hands directly to `d=0`.)

## 2 · How the camera moves
A forward **dolly** (`translateZ` increasing by `d·TRAVEL` on a 1100px-perspective stage), never handheld — no roll, no shake, no acceleration. The heavy lerp makes it **inevitable and slow**; you cannot rush it. It only ever moves forward, toward the light.

## 3 · How the crumb interior is represented
Procedural **chambers** — warm honey walls (honey→coal radial), each with a clear central **passage** deeper in, so the camera flies **through the holes of the crumb**. Irregular honeycomb cells in the walls (never a regular grid), slight per-chamber offset + turbulence displacement so it reads organic. A 2.5D stand-in for the real crumb.

## 4 · How it exits / match-cuts
The chamber nearest the room is a **window hinge**: its aperture is window-shaped (mullioned), linen light beyond. As the camera passes through it, the **morning room resolves through the frame** — the same cut loaf on a table, a cooling cup, a fold of linen. The crumb aperture *becomes* the window; passing through it *is* the arrival. Scale has silently inverted — the whole morning was inside the loaf.

## 5 · Proof
- Filmstrip: `trans-00` (crumb, window ahead) · `trans-30` · `trans-60` (window growing, room glimpsed through it) · `trans-85` (window fills centre, room resolving — the match-cut) · `trans-100` (emerged: linen room, single window, the loaf + cup + linen).
- Reduced motion: `trans-reduced` — the room still + *"It was on your table all along."* The story survives with zero dive.
- Interactive dive advances forward and settles calmly; zero page errors.

## 6 · Does it feel emotionally inevitable, or still gimmicky?
**Inevitable in concept, and the match-cut lands.** Forward-only, slow, toward the light, ending on *your* table with the loaf — it reads as *entering the quiet interior of the morning*, not a stunt. It is **not** sci-fi, not a cave-flythrough ride, not fast. Honest weakness: the crumb still reads somewhat **abstract/warm-cavern** rather than unmistakably bread — the stand-in's smooth gradients can't carry true crumb architecture. That is a fidelity gap, not a language gap: the *move* is right; the *material* needs the real crumb.

## 7 · What remains before the final transition
1. Real crumb: an **R3F displaced-mesh crumb** derived from **P-11** (subsurface honey glow, true honeycomb depth) replacing the CSS chambers — this is what turns "warm cavern" into "inside the loaf." `three` enters here.
2. Literal continuity: the **First Cut's opening geometry hands directly into `d=0`** (the gap becomes the portal), and the **room arrives from a Higgsfield plate** (the actual Handover home, generated to canon — a later asset gate), not the shape stand-in.
3. Volumetric steam/fog and the real camera fall on the **Lenis transport**; the Dawn grade LUT over the whole move.
4. Tune the match-cut alignment so the hinge window and the room window register exactly; reduced-motion timing; mobile.

---

**STOP at the Spike #1 review gate.** No full site, no finalized 3D First Cut, no new images. With the transition language proven, the First Cut's final form can now be designed to hand into it — on your direction.
