# PROJECT: RITUAL — Visual Direction
**Stage 2 of 5: DESIGN** · Status: **APPROVED 2026-07-07**, with one mandated amendment: the Constitution appendix below. Renders the Constitution (`00-brand-dna.md`); does not revise it.

**The standard this document is built to meet:**
> *Every frame must be identifiable as RITUAL even if the loaf were removed.*

That is the acceptance test for this stage. The brand identity is carried by **light, geometry, type, marks, and composition** — the bread is what those things happen to be pointed at. Every storyboard frame below ends with a **REMOVE THE LOAF** line proving the frame still reads as RITUAL with the bread deleted. If a frame fails that line, the frame is wrong, not the test.

---

## 1 · THE FIVE IDENTITY CARRIERS (what makes a frame RITUAL without bread)

A frame is RITUAL if it carries **at least three** of these five. Most carry four or five.

1. **One light, with a temperature.** Every RITUAL frame has a single directional source at a specific Kelvin mapped to the hour (§4). Never flat, never top-lit, never two competing sources. The low, raking, single-source light with motes suspended in it is the brand's most recognizable non-bread signature.
2. **Circle · arc · beam.** The only permitted forms (Constitution §IV). Compositions are built on an implied circle, a sweeping arc, and one vertical light-beam. No rectangles-as-heroes, no grids-as-subject.
3. **The Score.** The single curved cut-arc — as divider, as sunrise, as underline, as transition wipe, as the mark on the box and the door. One confident curve, always the same gesture.
4. **The Instrument.** A glowing monospace readout — the clock (4:12→8:04), the Bake №, the "17 of 40" — present in almost every frame like a watch face. A count that only climbs.
5. **Warm dark, lifted, grained.** The filmic grade: warm near-black grounds (never #000), warm off-white lights (never #FFF), lifted blacks, fine grain, one-source vignette. The *material* of the image is always the same film stock.

---

## 2 · THE MOODBOARD (written registers)

No stock, no placeholders (Constitution §IX). The moodboard is described in registers so Stage 4 generation has an exact target.

- **Light register.** Caravaggio's single-source chiaroscuro; Vermeer's window; Roger Deakins' one-source interiors (*1917*'s flare-lit rooms). Darkness is the default; light is the event. Never the bright, even, shadowless light of every other food site.
- **Material register.** A Japanese tea room's wabi-sabi restraint; honed stone and waxed oak; the matte, mineral material palette of an Aesop interior — but warmer and darker. Beautiful imperfection held in total control.
- **Graphic register.** The instrument panel of a mechanical watch; a letterpress ledger; an apothecary label. Numbers treated as sacred. Wide-tracked small caps. Enormous quiet around a single mark.
- **Texture register.** Flour like silk; linen weave; stone tooth; brass gone bright at the wear points; 35mm grain over everything; a faint halation on the highlights.
- **Composition register.** One subject in a field of dark. Low horizon, subject in the lower third, light from an upper corner, three-quarters of the frame given to silence. Stillness as the dominant compositional value.

**Explicitly not:** bright/airy/minimal-white bakery; hand-lettered "artisan" chalkboard warmth; French patisserie pastel; Scandinavian flat-lay; anything trendy, anything a competitor could also use.

---

## 3 · COLOR — The Time-of-Day System

Color is not decoration; it **is the clock** (Constitution §V, "time as the medium"). The whole palette is one warm filmic grade sliding from night to honey. **No pure black (#000). No pure white (#FFF).** Blacks are lifted and warm; whites are linen.

### 3.1 Grounds (the darks — the default state of the world)
| Token | Hex | Use |
|---|---|---|
| `char` | **#131009** | Deepest ground; the 4:12 open |
| `soot` | **#1C1710** | Primary dark ground |
| `ash` | **#2B2318** | Raised surfaces, stone in shadow |
| `umber` | **#3A2E1F** | Shadow midtone, oak |

### 3.2 The one cool note (pre-dawn only, 4:12–4:45)
| Token | Hex | Use |
|---|---|---|
| `bluehour` | **#1E2A2E** | The only cool color in the system. Pre-dawn air, the cold before the oven. Used sparingly; it makes the first ember feel warm by contrast. |

### 3.3 Ember (the oven, 5:00–6:45)
| Token | Hex | Use |
|---|---|---|
| `coal` | **#6E2A10** | Oven shadow, deep glow |
| `ember` | **#B4471B** | Primary oven light, the brand's signature warm |
| `flame` | **#E06A2C** | Direct flame, hottest edges |
| `spark` | **#F1954A** | Highlight sparks, rim light |

### 3.4 Wheat & amber (the turn to morning, 6:45–7:30)
| Token | Hex | Use |
|---|---|---|
| `amber` | **#C98A34** | Early sun on stone |
| `wheat` | **#D6A94E** | Grain, crust in daylight |

### 3.5 Linen & cream (full morning, 7:30–8:04 — the "whites")
| Token | Hex | Use |
|---|---|---|
| `cream` | **#DFD2B6** | Warm mid-light |
| `linen` | **#ECE3D0** | Primary light surface / paper / the brand's "white" |
| `mist` | **#F4EEE0** | Highest highlight, still warm |

### 3.6 Butter & honey (the payoff accents)
| Token | Hex | Use |
|---|---|---|
| `butter` | **#F3C777** | The one glowing accent — clock, active states, the reserve line |
| `honey` | **#C6892F** | Deep accent, the Score mark, hover |
| `honey-deep` | **#9C6A21** | Pressed states, fine rules |

### 3.7 Ink (type on light)
| Token | Hex | Use |
|---|---|---|
| `bistre` | **#3A2E22** | Body text on linen (never #000) |
| `cocoa` | **#241B12** | Max-contrast headings on linen |

### 3.8 Rules
- **60 / 30 / 10:** ~60% dark ground, ~30% warm midtone (ember/wheat by hour), ~10% glow accent (butter/honey). The accent is rationed — it is precious because it is rare.
- **The clock drives the mix.** Each hour has a ground + light + accent triad; scrolling crossfades one triad into the next (Dawn Engine, one LUT). At 4:12 the world is `char`+`bluehour`; at 5:40 `soot`+`ember`+`spark`; at 8:04 `linen`+`cream`+`butter`.
- **Accessibility:** body copy runs `bistre`/`cocoa` on `linen`/`cream` (≥ 7:1) or `linen` on `soot`/`char` (≥ 12:1). The ember/butter glows are never load-bearing for text contrast — they are light, not ink.

---

## 4 · LIGHT — the signature discipline

Light is the second protagonist and the strongest brand carrier. Rules, not suggestions:

- **One source per frame.** A window (cool→warm across the film) or the oven (ember). If a second light exists it is a faint bounce, never a key.
- **Kelvin by hour:** 4:12 ≈ 3200K reading cold against `bluehour` · oven ≈ 1800–2200K (`ember`) · 6:45 sunrise ≈ 2700K · 8:04 ≈ 3800–4200K clean morning. Temperature *is* the timestamp.
- **The beam.** Light enters as a defined volumetric shaft — the compositional axis of most frames. Motes (flour/dust) suspended in it. The beam is a vertical/near-vertical, honoring the geometry law's "one permitted straight."
- **Shadows as a clock.** Long at dawn, shortening as time scrolls forward. Shadow length is a readable time signal even with no numeral.
- **Finish:** lifted blacks (crush floor no lower than `char`), fine 35mm grain, gentle highlight halation, single-source vignette. This finish is applied globally so every frame — and every generated asset — is visibly the same film stock.

---

## 5 · TYPOGRAPHY — three voices

Timeless, not trendy; not French/Italian/Scandinavian. Three roles, each doing one job.

### 5.1 THE VOICE — display serif (emotional copy, the manifesto, the promise)
- **Face:** **Fraunces** (open-source), tuned: high optical size, low *wonk*, moderate *soft* — a warm, high-craft old-style serif with a calligraphic soul and true character. *(Licensed alternative if preferred: Lyon Display or Freight Display Pro.)*
- **Use:** the whispered lines, act titles, the promise. Large, generously leaded, never more than a line or two in the dark. Ligatures and oldstyle figures on.
- **Feel:** a letterpress book left open in candlelight. Distinctive enough that a single line of it, set in `linen` on `soot`, reads as RITUAL with no other cue.

### 5.2 THE RECORD — humanist grotesque (labels, nav, reverent facts)
- **Face:** a quiet humanist grotesque — **Söhne** or **Founders Grotesk** (licensed) / **Archivo** or **Instrument Sans** (open-source fallback).
- **Use:** **wide-tracked UPPERCASE small caps** (tracking +0.18–0.24em) for labels, nav, captions, the reverent facts ("THE MOTHER · FED SINCE 1998"). Sentence case, tight, for functional microcopy only.
- **Feel:** the apothecary label. Restraint. Never shouts.

### 5.3 THE INSTRUMENT — monospace numerals (the clock and every count)
- **Face:** a refined monospace — **Fragment Mono** (open-source) / **GT America Mono** (licensed). Tabular figures, always.
- **Use:** the ever-present clock (`4:12`→`8:04`), Bake № (`№ 9,741`), the reservation count (`17 / 40`), the tally. Rendered in `butter` glow on dark. This is the mechanical-counter identity — *the count that never resets* — made visible.
- **Feel:** a watch face; an instrument readout. **This is the single most recognizable non-bread element in the system.** A glowing mono `4:47` lower-left is unmistakably RITUAL and contains no bread at all.

### 5.4 Type rules
- Max two type sizes visible in any quiet frame; the film breathes, the type does too.
- The Voice never sets small; the Record never sets large; the Instrument never sets anything but numbers and unit glyphs.
- **Never:** exclamation marks, all-caps sentences (labels only), letter-spacing on the serif, more than one Voice line per dark field.

---

## 6 · THE MARKS — construction specs

*(Final vector artwork is produced at Stage 4; these are the construction rules so the mockup and assets are exact.)*

- **The Score / wordmark.** `RITUAL` set in The Voice, small-tracked. A single confident curved cut — the **Score arc** — passes through the wordmark at the same angle every time (a shallow left-low → right-high arc, ~7°, the lame's natural sweep). The arc may also live alone as the brand bug. Constructed from a single circle's edge; never freehand twice the same.
- **The Arc of Hours.** A true circle; the span 4:12→8:04 marked as an arc along its upper-left quadrant. Doubles as the **scroll progress indicator** — the arc draws itself as the visitor moves through the morning, a sunrise you fill by scrolling. Favicon, wax seal, stamp.
- **The Tally.** Groups-of-five strokes in The Record's line weight. Section counters, packaging interior, the reservation confirmation. Hand-angled, never mechanical-perfect.
- **The Crumb.** Irregular honeycomb from a real crumb scan (generated Stage 4). Blind-emboss / low-opacity section texture only. **Never a regular hex grid.**
- **The Object Lexicon.** Jar · Lame · Peel · Linen fold · Knife — one fixed line weight (matching The Record), circle+arc+beam geometry. The only icons in the system. No carts, hearts, hamburgers, chevrons.

---

## 7 · COMPOSITION & LAYOUT LAW

- **Silence margin.** A minimum ~14% of every edge is empty. Stillness is a compositional value; crowding is off-brand.
- **Subject in the lower third**, light from an upper corner, three-quarters of the frame given to dark quiet. Off-center, never dead-center except at the two climax frames (the Cut, the promise) — centering is rationed so it lands.
- **The beam is the axis.** Content aligns to the light shaft, not to a rigid column grid. Where a grid is needed (reservation, standing morning), it is a quiet 12-column with wide gutters, everything left- or optically-aligned to the beam.
- **One idea per viewport.** No section stacks two subjects. The film advances by replacing, not accumulating.
- **UI chrome (persistent):** the Instrument clock lower-left; the Arc of Hours progress upper-right; the menu is a single Record label that, on open, dusts in as if flour were blown across it and wiped (Stage 4 interaction). No visible nav bar, no logo lockup pinned top-left, no cart icon.

---

## 8 · MOTION GRAMMAR (specified now, built Stage 4)

- **Easing = dough.** Everything moves on a heavy, slow ease (a custom cubic close to `cubic-bezier(0.22, 0.61, 0.20, 1)`), with weight and follow-through. Nothing snaps. Nothing bounces.
- **The Score wipe.** Transitions between beats use the Score arc as a curved wipe — the world is "cut" from one moment to the next along the lame's sweep.
- **Breath.** The global ~6/min inflate-deflate (Constitution: the site breathes).
- **Stillness reward (Proofing).** Motion *decreases* to reveal; the more still the visitor, the more the frame develops. The one interface that rewards not-moving.
- **Reduced motion.** All of the above degrade to slow opacity dissolves; the grade, type, and composition alone still carry the brand (they must — that is the whole point of §1).

---

## 9 · STORYBOARD — the film, frame by frame

Each frame: **composition · light · palette · on-screen type · geometry**, then the acceptance line **REMOVE THE LOAF →** proving RITUAL survives without bread.

### Frame 01 · 4:12 — THE HOUR NO ONE SEES
Near-black `char` field. A single cold shaft (`bluehour`, ~3200K) falls from upper right across empty stone. Flour-mote drifts. One Voice line embers up in `ember` where the cursor rests: *"4:12. The world will wake soon. Not yet."* Instrument clock `4:12` glows `butter`, lower-left. Arc of Hours empty, upper-right.
**REMOVE THE LOAF →** There is no loaf. A cold single beam on warm-black stone, a glowing mono `4:12`, one serif line surfacing under the reader's touch — already unmistakably RITUAL. *(Passes on all five carriers.)*

### Frame 02 · 4:30 — THE MOTHER
The jar, lit by the single beam, on `ash` stone. Bubbles rise slowly and drift toward the cursor. Behind, the tally wall dissolves into dark. Record label, wide caps: *THE MOTHER · FED SINCE 1998*. Clock `4:30`.
**REMOVE THE LOAF →** A glass vessel in one shaft of light, a reverent small-caps date, the instrument clock — reads as RITUAL (the Mother is starter, not bread; but even removing the jar, the beam + label + clock + grade hold it). *4 carriers.*

### Frame 03 · 4:45 — FLOUR IN THE BEAM
The frame is almost entirely dark. The beam is the subject: a defined volumetric column, flour falling through it like slow snow, motes catching light. Hands enter from below, half-seen. No type but the clock `4:45`.
**REMOVE THE LOAF →** This frame is *only* light and flour — no bread at all by design. The volumetric single beam is the purest statement of the brand's light signature. *3 carriers, and the strongest proof of the standard.*

### Frame 04 · 5:10 — THE FOLD
Macro. Dough stretches under hands; scroll rhythm kneads it. Light warming toward `amber`. Deep `umber` shadows. Score arc faintly divides the composition on its 7° sweep. No numeral emphasis; the fact label reads *THIRTY-SIX HOURS*.
**REMOVE THE LOAF →** The Score arc as compositional divider, the warm single-source macro grade, the reverent fact in Record caps — RITUAL without needing the dough to be identifiable. *3–4 carriers.*

### Frame 05 · 5:40 — THE TALLY WALL
Wide. The oven wall, thousands of tally strokes fading back toward 1998 in the dark; today's fresh graphite stroke catches the light. Lintel reads carved *1931*, comet-scorch beside it. Clock `5:40`, Bake № `9,741` in the Instrument.
**REMOVE THE LOAF →** No bread present at all — a wall of tally marks, a carved date, a mono counter. This frame is *pure* brand system: the count that never resets, made physical. *4 carriers.*

### Frame 06 · 6:05 — THE OVEN
The oven mouth, fogged glass. `ember`/`coal` glow behind. The visitor wipes the fog (touch) to see the rise. The single warmest source in the film; everything else falls to `soot`. Arc of Hours now a third full, upper-right.
**REMOVE THE LOAF →** An ember-glowing aperture in warm dark, fog clearing under the hand, the progress arc filling — the light and interaction are the identity; what's inside is almost silhouette. *4 carriers.*

### Frame 07 · 6:30 — STEAM WRITES THE DARK
Near-black again. Steam rises as drawn noise-sprite forms against `char`, catching a low `spark` rim. A Proofing still-moment lives here: hold still and a hidden Voice line develops — *"We have been awake since 4:30. You didn't have to be."*
**REMOVE THE LOAF →** Steam and rim-light on warm-black, a serif line developing out of stillness — no bread, unmistakable mood. The Proofing behavior itself is a brand signature. *3 carriers + the signature interaction.*

### Frame 08 · 7:15 — THE COOLING LOAF (crust-as-planet + Crackle)
The macro flyover: crust as raking-lit terrain, canyon-cracks in `wheat`/`ember`, a low sun grazing the ridges. Hold, and hairline fissures propagate while a seismograph line draws the crust's song across the frame in `butter`. Clock `7:15`.
**REMOVE THE LOAF →** The seismograph trace + raking single-source terrain + the mono readout read as an *instrument recording a landscape* — the brand's watchmaker/instrument DNA, independent of the terrain being crust. *4 carriers.*

### Frame 09 · 7:42 — THE FIRST CUT *(climax, centered)*
Dead-center — centering rationed for exactly this. The lame's arc poised over the loaf in the table's worn valley. The visitor drags; the crust fractures along a living crack; steam escapes; a single `spark` rim on the fracture. Full morning light now, `wheat`→`linen`. The Score, performed.
**REMOVE THE LOAF →** The Score arc — the brand's master mark — is literally being *drawn* by the visitor's hand, dead-center, in one confident curve. The identity mark is the action. *5 carriers.*

### Frame 10 · 7:43 — THE HANDOVER *(the impossible transition)*
Camera falls into the crumb; golden chambers rush past in `honey`/`butter`; the light ahead warms and widens; you emerge into a *different*, lived-in, sunlit morning room. The same cut loaf on a home table beside a cooling cup and a fold of linen. Room dissolved in `linen` light (guardrail: implied, universal, never a styled set).
**REMOVE THE LOAF →** One continuous shaft of morning light, a cooling cup, a fold of linen, the honey-to-linen grade — the frame reads as *your quiet morning* with or without the loaf on the table. That is the whole point of the moment. *4 carriers.*

### Frame 11 · 7:50 — THE BUTTER
Macro. Cold butter meets warm crumb; a gloss goes liquid; `butter`/`honey` at its most literal. Shallow DoF, everything else linen-soft. No type. The bite is never shown.
**REMOVE THE LOAF →** Weakest by design (this is the one nakedly product-sensory beat) — yet the grade, the shallow single-source macro, and the withheld-payoff restraint still frame it as RITUAL. *3 carriers.* (Noted: this frame leans hardest on the loaf; acceptable as the single sensory indulgence at the desire peak.)

### Frame 12 · 8:04 — THE PROMISE / RESERVATION *(centered)*
The room settles to quiet `linen`. Centered, alone: the Voice line *"Tomorrow is already proving."* Below, one Record line and the Instrument count: **PROTECT TOMORROW MORNING · `17 / 40`**. The Arc of Hours, now full, sits as the reserve control — a sunrise completed. Tally wall glimpsed in daylight, today's mark fresh.
**REMOVE THE LOAF →** A full sunrise-arc, a single serif promise centered in linen light, a glowing mono `17 / 40` — a complete, unmistakable RITUAL frame containing no bread whatsoever. The reservation *is* the brand marks. *5 carriers.*

### Storyboard scorecard
12 frames · average 3.9 / 5 identity carriers · **every frame passes** (≥3). Four frames (03, 05, 12, and the transition's landing) contain **no bread at all** and still read as RITUAL — the standard is not just met, it's demonstrated in frames that are literally breadless.

---

## 10 · WHAT STAGE 3 (mockup) WILL RENDER
One static HTML frame — **Frame 12 (8:04, the promise/reservation)** — because it exercises the full system at rest: the linen grade, all three type voices, the Instrument count, the Arc of Hours, the Score, the composition law, no motion required. It is the truest single-frame test of the visual language. *(Built only on approval of this document.)*

---

**Stage 2 approved.** Stage 3 authorization: exactly one static HTML mockup of Frame 12 — no interactions, animations, or functionality — pending its own approval.

---

## Appendix — The Constitution of RITUAL

*One page. Immutable. Technologies expire; frameworks die; screens change shape and will someday stop being screens. If this experience is rebuilt in 2036 — on whatever medium exists then — it obeys this page. Everything else, in every other document, is implementation. This is law.*

**Article I — The purpose.** RITUAL protects mornings. It has never sold bread. Any decision that steals from the hour — that makes a person faster, busier, or more anxious — is unconstitutional, whatever it earns.

**Article II — The Creed.** Six tenets, immutable: the day is decided in its first hour; that hour belongs to no one but you; slowness is the presence of attention; what cannot be rushed is what is worth waking for; a morning without ritual is just an alarm; bread is how we practice.

**Article III — Time is the only luxury ingredient.** Thirty-six hours is non-negotiable. Nothing in the brand may communicate haste: no urgency, no countdown pressure, no "hurry."

**Article IV — The count never resets.** Bake №, the tally, the mornings kept, your mornings here — every number only climbs. The brand is allowed to age. It is never allowed to start over.

**Article V — Honest scarcity.** Forty loaves; then the oven rests. Scarcity is a fact of the oven, never a tactic of the marketing.

**Article VI — History is history.** 1931. 1952. 1974. 1998. The Mother is *she*; she eats before we do. The hour is 4:12–8:04; the bake begins at 4:30. Canon may deepen. It may never be edited.

**Article VII — One light, with a temperature.** Darkness is the default; light is the event. Every frame has a single source, and its warmth tells the time.

**Article VIII — Circle, arc, beam.** No other geometry is ever the subject.

**Article IX — The mark must remain bakeable.** The Score is the master mark, and whatever form it takes, it must always be something a lame can cut into a loaf. A logo that cannot be baked is not our logo.

**Article X — Warm dark, linen light.** Pure black and pure white never appear. The grade is one film stock, forever.

**Article XI — Facts, not adjectives.** Numbers with reverence. Never "premium," "luxury," "artisanal." Never an exclamation mark.

**Article XII — Stillness is rewarded.** Attention is honored above engagement, on every medium, forever. Nothing gates what could invite; the whole experience must work with hands still.

**Article XIII — The bite is never shown.** The payoff stays one step ahead. Craving is the engine; resolution belongs to the customer's table, not the screen.

**The 2036 Test.** Before any rebuild ships: remove the loaf from every frame, and remove the medium from every plan. What remains must still, unmistakably, be RITUAL. If it isn't, it does not ship.

**Amendment.** This page changes only by explicit, dated amendment — and never to make the brand faster, louder, or easier to copy.
