# PROJECT: RITUAL — Experience Architecture
**Stage 1.5: moment-to-method map** · Status: awaiting approval · Precedes Visual Direction. No code exists yet.

**The governing principle: the plate is cinema; the layer is life.**
Generated footage and stills (Higgsfield, one production, one lens kit) carry the beauty. Real-time layers (particles, steam, flour, fog, light) carry the life and react to the visitor. Full real-time 3D is reserved for the moments where the visitor's hand controls the camera or the geometry. Nothing is built in 3D that a plate does better; nothing is a plate that must respond to touch.

**Legend:** `3D` real-time WebGL (React Three Fiber) · `VID` generated video plate · `IMG` generated still plate · `SHD` custom shader · `GSAP` GSAP/ScrollTrigger · `CSS` plain CSS · `JS` logic · `API` backend state

---

## Global systems (run across the whole film)

| System | Implementation |
|---|---|
| **Dawn Engine** (scroll = time) | Lenis smooth scroll (weighted "dough" easing) + one GSAP ScrollTrigger master timeline scrubbing a global clock value (4:12→8:04). The clock drives: 3D light rigs (`3D`), shader uniforms (`SHD`), a color-grade LUT crossfade in one full-screen post pass (`SHD`), and CSS custom properties for DOM scenes (`CSS`). One clock, every layer obeys it. |
| **Grade & grain** | Single post-processing pass: film grain, vignette, LUT blend keyed to the clock (`SHD`). This is what welds plates + 3D into "one shot." |
| **The site breathes** | One wrapper transform at ~6 breaths/min (`CSS`). Off under reduced motion. |
| **Proofing** (stillness reward) | Idle detector: scroll velocity ≈ 0 + no pointer/touch for N seconds (`JS`). Triggers per-scene "prove" timeline: steam/light uniforms ramp (`SHD`), hidden text develops via blur/opacity mask (`GSAP`). Cheap tech — the writing is the work. |
| **Touch-trail buffer** (shared) | One render-target buffer the pointer draws into (`SHD`). Read by three features: flour displacement layer, oven-glass fog erase, score-your-loaf capture. Built once, used three times. |
| **Living Bakery** | Client clock → entry hour/grade (`JS`). Weather API → window shader (rain/frost particles) (`SHD`). Visit count → localStorage (`JS`). Bake № → derived from date since launch (`JS`, no backend). Loaves remaining → edge KV, the one piece of true shared state (`API`). |
| **Sound made visible** | Canvas/SVG seismograph + crack lines (`GSAP`); optional real audio behind one "sound on" gesture; `navigator.vibrate` haptics on supported mobile (`JS`). |

## The film, beat by beat

| Time | Moment | Primary method | Balanced/Reduced fallback |
|---|---|---|---|
| 4:12 | Opening dark, ember text under your finger | `CSS` text + small canvas ember particles (`JS`) | Static text |
| 4:30 | The Mother — jar, bubbles drift toward cursor | `3D` glass jar (transmission shader) + instanced bubbles over `IMG` plate | `VID` loop, no attraction |
| 4:45 | Flour falls through the beam | `SHD` GPU particles in a fake-volumetric light cone over `IMG` room plate | `VID` |
| 5:10 | The fold — scroll rhythm kneads | `3D` dough mesh, vertex-noise stretch keyed to scroll velocity (no true soft-body sim — faked, convincingly) | `VID` scrubbed by scroll |
| 5:40 | Tally wall pass (1998 → today) | `IMG` hi-res plate + parallax (`GSAP`); today's mark drawn as SVG stroke | Static plate |
| 6:05 | Oven — fogged glass, wipe to watch the rise | `VID` oven-interior plate behind fog-erase (`SHD`, touch-trail buffer) | Tap-to-clear CSS mask |
| 6:30 | Steam writes across the dark | `SHD` billboarded noise-sprite steam (fake volumetrics, never true volumetrics) | `VID` |
| 6:45→ | Light crosses the room, shadows shorten | Dawn Engine: clock-driven light rig on 3D room shell, or timed plate crossfades + LUT | Plate crossfades |
| 7:15 | Crust-as-planet flyover | `3D` displaced terrain plane from macro-crust heightmap + fog + raking light (a plane, not a planet — looks like a planet) | `VID` pre-rendered flyover |
| 7:15 | The Crackle — hold, and the crust sings | Canvas crack propagation + seismograph (`GSAP`), haptics (`JS`) | Single crack animation |
| 7:42 | **The First Cut** | `3D` hero loaf (textures derived from master asset; pre-fractured crust mesh), scroll-driven knife, crack-reveal shader, steam burst (`SHD`) | `VID` of the cut, scroll-scrubbed |
| 7:43 | **The impossible transition** (crumb → room) | `3D` procedural crumb cavern (displaced mesh, baked-look lighting) flown through, match-cut via chamber opening into the room plate | `VID` pre-rendered transition (still plays for everyone) |
| 7:50 | Butter melts into warm crumb | `VID` macro plate — real-time butter is wasted effort | Same |
| 8:04 | Ending line + "17 of 40 mornings protected" | `CSS` DOM text; live count from edge KV (`API`) | Same |
| 8:04 | Score your loaf | Canvas stroke capture (touch-trail buffer) → smoothed path → displacement decal opens the score on the loaf top (`SHD`); path stored with the order (`API`) | Draw → flat 2D overlay on plate |

## Delivery tiers

- **Full** — desktop / capable GPU: everything above real-time. Detected via device caps + a one-second rAF probe.
- **Balanced** — mid mobile: plates + lightweight particles; the four 3D moments swap to pre-rendered scroll-scrubbed video; touch-trail buffer at quarter resolution.
- **Reduced** — `prefers-reduced-motion` / save-data / low battery: stills + dissolves, zero scroll-hijack, full copy, full commerce. The story survives with no motion at all — this is also the accessibility and SEO spine.

## Performance budget

60fps target on Full and Balanced. ≤ ~1.5 MB critical path before Act I is interactive; each act lazy-loads as its own chunk with next-act preload. KTX2 textures, DRACO meshes, video plates ≤1080p AV1/H.265 with H.264 fallback. LCP is the opening *text* — fast by design. Weather/state fetches off the main thread.

## Risk register — prototype in this order at Build stage

1. **The impossible transition** (crumb cavern → room match-cut). Highest wow, highest risk. Spike #1; the fallback video version is produced regardless, so the moment ships either way.
2. **Dawn Engine grade continuity** across generated plates — the "one shot" illusion dies if grades drift. Spike #2: LUT pipeline over three test plates.
3. **First Cut interaction feel** — the fracture must feel physical, not triggered. Spike #3.
4. **Touch-trail buffer on mid mobile** — measure early; below ~50fps it drops to Balanced automatically.
5. **Shared state** (loaves counter) — the only backend; pick the KV host in the first Build week.

---

**STOP.** Architecture ends here. On approval of Stage 1 v2 + this document, Stage 2 (Visual Direction: moodboard, art direction, typography, color values, storyboard) begins. Still no code.
