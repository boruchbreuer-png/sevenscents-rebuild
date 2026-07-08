# Stage 4 · Spike #4 — Integrated First Cut → Handover continuity
**Status: the seam is proven on a stand-in; awaiting review.** First R3F/Three.js spike — `three` enters exactly where the architecture reserves it. Procedural stand-ins + canon P-11 as the loaf; no new images; no final textures. Governed by `00-brand-dna.md`, `project-checkpoint.md`.

## What this spike answers
*Do the First Cut and the Handover work as ONE continuous move — the cut opening becomes the portal the camera enters — without the crumb becoming a cave, sci-fi tunnel, or fantasy world?*

## What was built
- `lib/continuity.ts` — one progress `t` (0..1) → the whole move: crust opening, a single forward camera dolly (5 keyframes), the exit light, linen wash, warm fog (honey→linen), and Dawn minutes (7:42→8:04). Pure, deterministic.
- `components/lab/ContinuityScene.tsx` — R3F scene: **canon P-11 as the loaf** on a plane whose **score-aperture grows** (a shader) and lets the camera through; a **crumb tunnel** (a warm tube + 720 porous cells); a **window hinge** (the match-cut); and the **morning room** (placeholder home) beyond. One warm source ahead, approved palette, warm fog.
- `components/lab/ContinuityLab.tsx` — scroll/drag drives `t` with a heavy lerp (slow, forward-only); reduced motion swaps the dive for three CSS story stills. `three` is `dynamic(ssr:false)` so the main route never loads it.
- `app/lab/continuity/` — noindex lab; `?t=` static, `?reduced=1`.

## 1 · How the First Cut connects to the Handover
They are **one move on one clock**. The First Cut's opening (the score region of canon P-11) is literally the portal: as `t` grows, the aperture opens in the P-11 loaf and the camera passes *through it* into the crumb. There is no cut between scenes — the cut *is* the entrance.

## 2 · How the camera enters the crumb
A single forward **dolly** (Z: +6.4 outside → through the aperture at ~t0.5 → down the tunnel → the window). Never handheld, no roll, heavy lerp — slow and inevitable. At t0.3 the camera is diving into the P-11 crust toward the opening; it enters, it does not teleport.

## 3 · How the crumb avoids cave / fantasy
Warm honey **porous cells** (720 rounded instances) packed on a faintly-emissive tube wall — it reads as the air pockets of crumb, lit warm toward the exit. No rock, no crystal, no blue, no glow-portal, no spikes. It stays warm, organic, forward, quiet.

## 4 · How the exit / window handoff works
At the tunnel's end a **window hinge** (mullioned) frames the morning; through it, the **room with the same loaf on the table**, a cup, a fold of linen. The crumb aperture becomes the window; the window frames your morning. Scale has inverted — the morning was inside the loaf.

## 5 · Proof (filmstrip)
`cont-00` canon P-11 loaf (the cut) · `cont-30` diving into the opening · `cont-50` through into the crumb, window ahead · `cont-70` down the porous crumb, the loaf visible through the window · `cont-100` at the window, the morning room with the loaf beyond. Reduced: `cont-reduced` — the room + *"It was on your table all along."* WebGL 2 via SwiftShader; **zero page errors**; `three` lazy-loaded (main route stays 103 kB).

## 6 · What still feels weak
- **The cells still read a little "foam/spheres,"** not yet unmistakable crumb — they're uniform instanced spheres, not a connected porous surface with subsurface glow. Closest risk to the "no cave/no bubbles" guardrail; it stays warm and organic, but fidelity isn't there.
- **The match-cut is "arrive at the window looking through,"** not a true pass-through registration; the hinge window and the room aren't yet locked to the same rectangle.
- **The aperture shader is a soft lens,** not shaped to the real score curve; the entry works but isn't yet a precise "through the cut."
- **The room is a canvas placeholder,** not the generated Handover home.

## 7 · Is this ready for final production, or another spike?
**The seam is proven; the fidelity is not — one more spike is warranted before final.** The continuity *language* is right and inevitable: one move, cut→portal→crumb→window→morning, slow and quiet, canon P-11 carrying the loaf. What remains is a **materials/fidelity pass**, not a rethink:
1. Replace the instanced cells with a **displaced-mesh crumb** (real honeycomb depth + subsurface honey) derived from P-11.
2. Shape the aperture to the **actual score curve**; lock the **window↔room match-cut** registration.
3. Generate the **Handover home** plate (a later asset gate) for the arrival.
4. Bind to the **Lenis transport** + Dawn grade LUT; volumetric steam at the cut; on-device mobile + reduced-motion timing.

---

**STOP at the Spike #4 review gate.** No full site, no final textures, no new images. On approval: the fidelity pass (displaced-mesh crumb + match-cut lock), which needs the Handover-home asset gate first.
