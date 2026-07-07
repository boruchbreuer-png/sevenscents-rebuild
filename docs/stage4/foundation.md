# Stage 4 — Foundation Pass
**Status: awaiting review before the build expands.** Translates approved Stages 1–3 into the build; introduces no new creative. Governed by `00-brand-dna.md`; implements `02-experience-architecture.md`; renders `03-visual-direction.md`.

---

## 1 · Project structure

```
/
├── app/
│   ├── layout.tsx          # fonts (self-hosted next/font/local), chrome, grain, light
│   ├── page.tsx            # the film (currently: Dawn Engine proof reel)
│   ├── globals.css         # design tokens (time-of-day system), base styles
│   ├── fonts/              # Fraunces / Instrument Sans / Fragment Mono (woff2, latin)
│   └── api/loaves/         # (planned) the one backend: mornings-protected counter
├── components/
│   ├── engine/             # DawnEngine (Lenis + ScrollTrigger master clock)
│   ├── chrome/             # Instrument clock, Arc of Hours, menu, Bake №
│   ├── film/               # one folder per act; beats as components
│   ├── marks/              # Score, Arc dial, tally, object lexicon (SVG)
│   └── lab/                # (planned) risk spikes — never shipped, never linked
├── lib/
│   ├── canon.ts            # Constitution facts as constants — single source of truth
│   ├── dawn.ts             # the clock: keyframes, triads, interpolation (pure, testable)
│   └── tier.ts             # (planned) Full / Balanced / Reduced detection
├── public/assets/          # Higgsfield plates, named by beat (see §2)
├── docs/                   # stages 0–4
└── mockup/                 # approved Stage 3 frame (frozen reference)
```

**Dependencies now:** `next` `react` `gsap` `lenis` `tailwindcss` `typescript`.
**Added only when their spike begins:** `three` `@react-three/fiber` `@react-three/drei` (First Cut / crumb cavern / jar), `framer-motion` (DOM micro-transitions if GSAP alone isn't cleaner). Nothing installed before it earns its place — no engineering flex.

## 2 · Higgsfield asset plan — one production, one morning

**The rule from the Constitution:** master first, everything references backward. No stock, no placeholders, no cheerful café, no rustic cliché.

**Grading strategy (critical decision):** all plates are generated in ONE base grade — the warm-dark/linen-light film stock at their scene's hour, matched to the master — and the Dawn Engine's LUT pass does the *moment-to-moment* time shifting. Plates carry the look; the LUT welds continuity. This is what spike #2 proves before mass generation.

**The reference chain:** `M-00` is generated first and approved as its own gate (it defines the loaf, the room, the light, the lens, the stock — the canon made visible). Every subsequent generation passes `M-00` (and its nearest sibling) as image reference. Any asset that drifts from the chain is regenerated, never "fixed in post."

### Shot list (production order)

| ID | Beat | Type | Shot |
|---|---|---|---|
| **M-00** | — | IMG | **Master hero:** the loaf on the worn oak table, deep-set window light, 100mm macro-adjacent, linen + stone + steam. The single source of truth. **Approval gate.** |
| P-01 | 4:12 | IMG | The dark room, one cold beam (bluehour), empty stone — near-black |
| P-02 | 4:30 | IMG | The Mother's jar in half-light, label strata visible |
| P-03 | 4:30 | VID | Jar loop: bubbles rising slowly (Balanced-tier fallback for the 3D jar) |
| P-04 | 4:45 | IMG | The room plate behind the flour-beam particle layer |
| P-05 | 5:10 | VID | Hands folding dough, macro, ember-warming light (Balanced fallback for 3D fold) |
| P-06 | 5:40 | IMG | Tally wall, raking light, marks fading toward 1998, lintel "1931" |
| P-07 | 6:05 | VID | Oven interior through glass: the rise, ember light (sits behind fog-erase) |
| P-08 | 6:30 | IMG | Dark frame for the steam shader to write across |
| P-09 | 6:45 | IMG ×3 | The room as light crosses it — three plates for clock-driven crossfade |
| P-10 | 7:15 | IMG | Macro crust orthographic top — **doubles as heightmap source** for the flyover terrain |
| P-11 | 7:42 | IMG ×N | Loaf hero angles for the First Cut 3D textures (albedo/roughness derivation) |
| P-12 | 7:43 | VID | **Impossible-transition fallback:** pre-rendered crumb-cavern → room match-cut (produced regardless — the moment ships on every tier) |
| P-13 | 7:50 | VID | Butter melting into warm crumb, macro (plate only — real-time butter is wasted effort) |
| P-14 | 8:04 | IMG | The settled morning room, full linen light, the handover table |

Sequencing: **M-00 → approval → P-10/P-11/P-12 (spike feeders) → the rest.** Assets for spikes come before assets for polish.

## 3 · Dawn Engine implementation plan

Per architecture: **one clock, every layer obeys it.**

1. **The clock.** `lib/dawn.ts` maps scroll progress → film minutes (4:12 → 8:04, piecewise by act so pacing can be tuned per beat without touching consumers). Pure function: `dawnAt(progress)` → `{ clock, act, ground, air, ink, instrument, beamAlpha }`.
2. **Keyframes are the approved triads** from Visual Direction §3 — char/bluehour at 4:12, soot/ember/spark at 5:40, umber/amber at 6:45, wheat at 7:15, linen/cream/butter at 8:04. No new colors; the keyframe table IS the palette table.
3. **Transport:** Lenis (weighted dough easing) feeds one GSAP ScrollTrigger spanning the film; its `onUpdate` writes CSS custom properties (`--d-ground-rgb`, `--d-air-rgb`, `--d-ink-rgb`, `--d-inst-rgb`, `--d-beam`, `--d-progress`) directly on `<html>` — no React re-render per frame. DOM scenes read the vars; future 3D scenes read the same clock as uniforms; the future LUT pass blends by the same value. **This slice builds the CSS-variable pass; shader/LUT consumers plug into the identical clock later.**
4. **Chrome as consumers:** the Instrument clock renders the minutes; the Arc of Hours corner dial *is* the scroll progress (the 4:12→8:04 span draws itself — a sunrise you fill, drawn slow and tick-less in motion so it stays horological, never a gauge needle).
5. **Reduced motion:** Lenis is never constructed; native scroll drives the same ScrollTrigger; grade changes become the only motion (user-driven, allowed). The story, copy, and commerce survive untouched.
6. **Contrast guard:** the ink crosses from linen to cocoa between 6:45 and 7:15; copy beats are pinned near keyframes where contrast is ≥7:1. The dead zone carries no text. (Verified in the slice.)

## 4 · Risk-spike plan (architecture order, asset-aware)

| # | Spike | Prereq | Method | Kill-switch fallback |
|---|---|---|---|---|
| 0 | **Dawn Engine spine** *(this slice)* | none | scroll→clock→grade continuity, chrome consumers, reduced-motion path | n/a — foundation |
| 1 | **Impossible transition** | M-00, P-12, P-14 | procedural crumb cavern (displaced mesh, baked-look light) → match-cut into room plate; measured on mid mobile | P-12 video, scroll-scrubbed — produced first, ships on every tier regardless |
| 2 | **Grade continuity / LUT** | M-00 + 2 plates | one post pass (grain+vignette+LUT crossfade) over three test plates keyed to the clock | plate-level grading only, CSS filter fallback |
| 3 | **First Cut feel** | P-11 | pre-fractured crust mesh, scroll-driven knife, crack-reveal shader; "physical, not triggered" judged on touch | P-11-derived VID scrubbed by scroll |
| 4 | **Touch-trail buffer on mid mobile** | none | one shared render-target (flour / fog-erase / score capture); auto-drop to Balanced below ~50fps | quarter-res buffer → Balanced tier interactions |
| 5 | **Loaves counter** | none | Upstash Redis (edge KV) behind `/api/loaves`; count resets at the bakery's 4:30; Bake № derived from date — no backend needed for it | static canon count until KV lands |

Spikes live in `components/lab/`, are never routed in production, and clay-material engineering studies there are *studies*, not placeholders — nothing unapproved ever ships into the film.

## 5 · This slice: Dawn Engine proof reel

**What it is:** the full scroll spine of the film with zero imagery — the world's grade moving 4:12→8:04 under approved copy beats, the Instrument clock and Arc-of-Hours dial live, the beam and grain constant, Frame 12 waiting at the end as the film's final state. The breadless brand test, in motion.

**Why it's first:** every spike keys to this clock; it needs no assets; and it proves the riskiest *global* claim — that scroll-as-time feels like one continuous morning, not a themed page — before any expensive moment is built.

**Verified by:** production build, screenshots at five scroll positions (grade continuity + contrast), reduced-motion pass, mobile viewport pass.

---

**STOP after this slice.** Next on approval: M-00 master hero generation (its own gate), then spikes #1–#3 with their feeder assets.
