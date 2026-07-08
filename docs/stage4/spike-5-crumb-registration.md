# Stage 4 · Spike #5 — Crumb fidelity + window registration
**Status: both weak points resolved on the stand-in; awaiting review.** A refinement of the approved Spike #4 continuity — not a rethink, no new concept, no new images. Governed by `00-brand-dna.md`, `project-checkpoint.md`.

## What this spike answers
The two gaps left by Spike #4: (A) the crumb read as foam/spheres, and (B) the window handoff felt like "looking through," not a locked arrival.

## What changed from Spike #4
- **Crumb material → a procedural bread shader.** The 720 instanced spheres are gone. The tunnel wall (and a few torn crumb chunks) now use a **cellular (Worley) shader**: defined **air pockets (alveoli)** carved into pale wheat walls, with vertex displacement so the pockets are real indentations and a bright gluten-wall ridge where pockets meet. Warm, backlit toward the morning.
- **Tunnel funnels to the window.** The tube now tapers (1.2 → 0.9) toward its end, and the **window sits exactly in that end aperture** — the crumb hole *is* the window.
- **Camera passes through.** The dolly no longer stops at the window; it crosses it (a linen bloom peaks at the threshold, then clears) and **arrives at the table** with the loaf. Not looking-through — a handoff.
- **Portal tied to the score.** The P-11 aperture is now a tilted slit along the score direction, so the opening reads as the cut.
- Lab label updated to Spike #5.

## 1 · How the crumb fidelity improved
It reads as **bread**: warm wheat walls with rounded **air pockets** of varying size, tactile and porous, lit warm toward the exit. No foam, no bokeh spheres, no cave, no coral, no sci-fi. The chunks are torn crumb clumps with the same alveoli.

## 2 · How the aperture / portal shape improved
The P-11 score-aperture is a **tilted elongated slit** following the score, with a warm cut-edge rim — the opening reads as *the cut opening*, not a generic circle.

## 3 · How the window registration improved
The tunnel tapers into the window; the **crumb's end hole and the window frame are the same aperture**. The camera flies *through* it, and a morning-light bloom covers the crossing so there's no seam. Arrival is **at the table with the loaf** — the illusion locks.

## 4 · Proof (filmstrip)
`c5-00` canon P-11 loaf (the cut) · `c5-40` diving into the cut · `c5-62` through the porous crumb, window/room registered · `c5-80` approaching the window · `c5-100` at the table, the loaf before you (the handover). `c5-reduced` preserves the story; `c5-mobile` renders the crumb on a 430-px portrait. WebGL2 (SwiftShader), **zero page errors**; `three` still lazy-loaded (main route 103 kB).

## 5 · Motion
Unchanged and constitutional: one forward dolly, heavy lerp, no roll, no acceleration — slow, quiet, inevitable. The linen bloom at the threshold is a gentle swell, not a flash.

## 6 · What still feels weak
- **Alveoli are a little uniform/repetitive** — real crumb has wider size variation; a displaced high-res mesh (or an AO/normal texture baked from a real crumb scan / P-11) would finish it.
- **A couple of chunks still read slightly "clump-like"** at some angles.
- **The room is still a canvas placeholder** — the real Handover-home plate is a later asset gate.
- **Performance:** the per-pixel Worley (2 scales × 27 cells) is fine on a GPU but heavy for software/low-end mobile — production should bake it to a texture for the Balanced tier.

## 7 · Ready for final production, or another spike?
**Ready to move toward final production — as a materials/asset pass, not another conceptual spike.** The continuity, the crumb *language*, and the window registration are all proven; what remains is fidelity and assets, not concept:
1. Real crumb material — a displaced mesh or baked AO/normal from a crumb scan / P-11 (and its Balanced-tier texture bake).
2. The **Handover-home** plate (image asset gate) for the arrival room.
3. Bind to the **Lenis transport** + Dawn grade LUT; volumetric steam at the cut; final mobile/reduced timing.
4. Lock the aperture-to-window registration to the exact score curve.

---

**STOP at the Spike #5 review gate.** No full site, no new images, no reopening M-00/P-11. On approval, the continuity move is ready to enter final production as a materials/asset pass.
