# RITUAL — Asset Brief: THE FOLD (Frame 04 · 5:10)

**Status: BRIEF ONLY — awaiting approval. No generation yet.**
Governed by `00-brand-dna.md` (Constitution) and `03-visual-direction.md` (Frame 04). This brief plans the one remaining Acts I–II asset; it introduces **no new creative direction** — it fills a gap the storyboard already specifies.

---

## 1 · Why this asset exists
The Fold is the only Act I–II beat with no matching prop in the M-00 plate — M-00 holds the finished, baked loaf, not raw dough. Production Pass 2 shipped it as an **honest layered placeholder**: the Score-arc divider + a slow "knead" breath in the pooled light + the fact `THIRTY-SIX HOURS`. That reads (3–4 identity carriers, no bread needed), but it is the weakest moment because the making itself — dough under tension — is implied, not seen. This asset replaces the placeholder with the real thing.

## 2 · The moment (from the approved storyboard, Frame 04)
> *Macro. Dough stretches under hands; scroll rhythm kneads it. Light warming toward `amber`. Deep `umber` shadows. Score arc faintly divides the composition on its 7° sweep. No numeral emphasis; the fact label reads THIRTY-SIX HOURS.*

The subject is **fermented dough at the fold** — the moment of stretch-and-fold during a long bulk ferment: a living, slack, silky mass caught mid-tension, one edge lifted and folded over itself, flour on the surface, the gluten sheen catching the single light.

## 3 · Hard requirements (continuity — this must weld to canon)
Generated through the **Higgsfield connector**, **referencing the existing canon assets** so it is unmistakably the same film:
- **Same production, one lens kit, one film stock** as `M-00` (`3cff50ce…`) and `P-11` (`b464f504…`). The P-11 macro is the closest reference for scale, depth of field, crust/flour material, and grade — **reference it directly** for lens character and the flour/wheat surface, then pull back from "finished crust" to "raw dough."
- **One light, with a temperature.** A single directional source (the same window as M-00, ~2200–2700K at 5:10 — warming from `ember` toward `amber`), raking low across the dough so the fold's ridge throws a long soft shadow. Darkness is the default; the lit fold is the event. **Never** flat, top, or two-source lighting.
- **Palette = the 5:10 clock.** Grounds `soot`/`umber` (#1C1710 / #3A2E1F); light `ember`→`amber` (#B4471B → #C98A34); flour reads as `cream`/`linen` highlights only where the beam strikes. No pure black, no pure white. It must sit inside the welding-pass grade (`lib/grade.ts`) with **no new colors**.
- **Finish:** lifted warm blacks (floor no lower than `char`), fine 35mm grain, gentle highlight halation, single-source vignette — the same film stock as every other plate.

## 4 · Composition & framing
- **Quiet macro / near-macro.** The dough fills the lower two-thirds; the upper third is the dark, beam-lit fall-off (silence margin ≥14% on every edge). Subject in the lower third, light from an upper corner — the RITUAL composition law.
- The **fold line follows the Score's 7° left-low→right-high sweep**, so the compositional divider is the brand's own gesture. (The site overlays the Score arc on this beat; the plate's fold should echo, not fight, that angle.)
- Framed **16:9, delivered 2048×1152** to match M-00 / P-11 exactly (drops straight into `lib/plates.ts` + the focus-pull system).

## 5 · What to avoid (explicit)
- **Not hands-heavy.** Prefer the dough and the fold as the hero with **no hands**, or at most a single out-of-focus hand *edge* entering low-frame, never a face, never two hands "presenting." If hands add nothing, omit them.
- **Not food-commercial.** No bright even kitchen light, no glossy "delicious" styling, no shallow-trick beauty gloss, no props competing for attention, no steam theatrics. Wabi-sabi restraint (Aesop/tea-room register), warmer and darker.
- No new geometry as subject (circle · arc · beam only). No text baked into the plate. No motion blur implying haste — Article III forbids communicating hurry.
- The bite is never shown; this is the *making*, not the eating.

## 6 · Deliverable & integration
1. **One master still first** (per the asset rule "generate one master, everything references prior assets"): the hero fold plate, 2048×1152, graded to the M-00 base stock. This is the minimum that retires the placeholder.
2. *(Optional, later)* a **short seamless loop** (≤1080p, AV1/H.265 + H.264) of the slow stretch, for the Balanced/Full "scroll rhythm kneads" behavior. Not required for the still to ship; noted so the Frame-04 architecture stays deliverable.
- Registered as a new plate (working id **`F-01` — the Fold**, name pending approval) in `lib/plates.ts`, framed at the existing fold focus (`cx 0.31, cy 0.72`) in `lib/prelude.ts`. The current placeholder layer (`components/film/moments/Fold.tsx`) is retired once the plate lands; the Score-arc divider + `THIRTY-SIX HOURS` label stay.

## 7 · Acceptance test (before it ships)
**REMOVE THE LOAF →** with the dough deleted, the frame must still read RITUAL on the single warm beam + the Score-arc fold line + the film-stock grade + the Record-caps fact. Frame 04 is specified at 3–4 carriers; the plate must clear that. And the **continuity check:** placed beside M-00 and P-11 in sequence, it must read as the same room, same morning, same lens, same stock — if the grade drifts, it is wrong.

---

## Round 1 — generated, holding at the F-01 review gate (NOT integrated)
Approved and generated 2026-07-10 through the Higgsfield connector. Both candidates reference **P-11** (`b464f504…`, primary — macro material/lens) + **M-00** (`3cff50ce…`, room/light/grade) as `image_references`, matching the canon production. Neither is in `lib/plates.ts` or wired into the site — awaiting selection at the gate.

| Candidate | Direction | Higgsfield job ID | Seed |
|---|---|---|---|
| **F01-A** | the fold — restrained floured fingertips enter lower-right, lifting one edge of the slack dough over itself; translucent membrane where the beam grazes the lift | `c87ac7c0-ec8c-459d-a630-b127038d178f` | `574731` |
| **F01-B** | the stretch — a soft drape of extensible dough at the windowpane, beam glowing amber through the thinned membrane; a single partial hand barely present at the left edge | `3911d6b5-1350-4130-9d25-26fdd2b9b2e5` | `321460` |

- **Model:** `seedream_v4_5` (same as M-00 / P-11) · **quality:** high · **aspect:** 16:9 · **dimensions:** 5120×2880.
- **Cost:** 1 credit each, 2 total (balance 33 → 31).
- **Review:** rendered in the Higgsfield widget (job IDs above). The session's egress proxy blocks the Higgsfield CDN by org policy (403), so the owner reviews/downloads from the widget — same flow as the canon plates.

*Awaiting the gate: pick A or B (or request a Round 2). On selection, the winner is upscaled/compressed like the canon plates, committed to `public/assets/plates/`, registered in `lib/plates.ts` as `F-01`, and the placeholder `Fold.tsx` retires — that step is the integration, not this one.*
