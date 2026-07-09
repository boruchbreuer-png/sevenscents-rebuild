# PROJECT: RITUAL — Checkpoint
**Read first on any new session.** Governed by `00-brand-dna.md` (the Constitution). Updated at the start of production assembly.

## 1 · Repository state
- **Branch:** `claude/ritual-acts-1-2-production-v7llu9`
- Stack: Next.js 15 + TypeScript + Tailwind v4 + GSAP + Lenis + three@0.171 + @react-three/fiber@9. Clean production build. Routes: `/` (full film) + 4 noindex labs (`/lab/grade`, `/lab/first-cut`, `/lab/transition`, `/lab/continuity`).
- **Production Pass 2 landed (Acts I–II):** the prelude is no longer M-00 + text — it is cinematography over the canon plate. The single light pools on each prop in turn (a slow focus-pull glide) with lightweight live layers carrying the life. R3F stays lazy-loaded; `/` first-load JS unchanged.

## 2 · Canon assets (immutable — never reopen)
| Asset | Winner | Higgsfield job | Local file |
|---|---|---|---|
| **M-00** — master room / continuity | Candidate D | `3cff50ce-c8cb-43f3-8452-7681ea49f028` | `public/assets/plates/m00-canon.png` (2048×1152) |
| **P-11** — macro product / material | P11-B | `b464f504-4f3c-47bb-8912-be0734b49b07` | `public/assets/plates/p11-canon.png` (2048×1152) |
| **H-01** — Handover arrival | H01-C | `bf2c8ec3-c759-4d82-89e2-13a5d7130c2e` | `public/assets/plates/h01-canon.png` (5120×2880, **23.7 MB raw — must be compressed**) |

Rejected-but-preserved alternates: M-00 C (`e7f4c2e0…`), P-11 A (`cd52ec5f…`), H-01 D (`bc4ce1a2…`). Downstream references M-00/P-11/H-01 **only**. Registered in `lib/plates.ts`.

## 3 · Approved systems (all built + verified in labs)
- **Dawn Engine** (`lib/dawn.ts`, `components/engine/DawnEngine.tsx`) — one scroll clock 4:12→8:04, grade as CSS vars, piecewise pacing, reduced-motion native-scroll path, Instrument legibility guard.
- **Grade / welding pass** (`lib/grade.ts`, `components/engine/PlateGrade.tsx`) — clock-driven regrade of a plate to "one film stock." Verified on real M-00/P-11 (`/lab/grade?plate=m00&m=252…`).
- **First Cut mechanic** (`lib/firstcut.ts`, `components/lab/CutView.tsx`, `FirstCutLab.tsx`) — resistance curve, crust-break, re-seal, irreversibility, centre-out opening on the Score (`/lab/first-cut`).
- **Handover continuity** (`lib/continuity.ts`, `components/lab/ContinuityScene.tsx`, `ContinuityLab.tsx`) — ONE R3F move: P-11 loaf → score-aperture portal → crumb tunnel → window match-cut → **H-01 arrival** (`/lab/continuity`). `three` lazy-loaded.
- **Crumb fidelity + window registration** — procedural Worley alveoli crumb shader; tunnel funnels into the window; camera passes through into the arrival (Spike #5).
- **H-01 arrival** — the continuity resolves into the real H-01 plate, filling the 16:9 frame; window panes frame H-01 at the match-cut; linen bloom covers the crossing.
- **Acts I–II prelude** (`lib/prelude.ts`, `components/film/Prelude.tsx`, `components/film/moments/*`) — "the plate is cinema; the layer is life." M-00 is the set (it already holds every prop); a scroll-scheduled camera glides prop→prop while pooled light isolates each, and six live layers carry the life: **Mother** (jar starter bubbles, cursor-aware), **FlourBeam** (motes falling in the window shaft), **Fold** (Score-arc divider + knead breath — the one honest placeholder, no raw-dough asset), **Tally** (today's fresh stroke draws + Bake № climbs — *the count never resets*), **Oven** (ember behind a fog-wipe you clear with a finger), **Crackle** (the cooling loaf's fissures + a butter seismograph, which match-dissolves into the First Cut). Pure schedule in `lib/prelude.ts` (envelopes + focus interpolation). rAF gated on per-moment visibility; slots memoized so faded moments don't re-render. Reduced motion: camera holds still, layers freeze as stills, moments cross-dissolve under native scroll. The `?p=` verification override now also drives the grade + clock so a freeze shows the true hour.

## 4 · Project status
- **All spikes complete and approved:** #2 grade, #3 First Cut, #1 Handover, #4 integrated continuity, #5 crumb+registration, + H-01 asset gate.
- **Production spine approved:** First Cut → crumb → window → H-01 arrival.
- **Production Pass 1:** full `/` route assembled end to end (approved directionally).
- **Production Pass 2 (this pass):** Acts I–II built out — the prelude now carries the full ritual before the climax (six moments above), the emotional build runs dark→ember→wheat with the count climbing, and the cooling loaf hands into the First Cut via a match-dissolve. Out of spike mode; normal coding decisions no longer need per-step approval.
- **Still rough / deferred:** the **Fold** wants a real macro dough plate (currently an honest layered placeholder). On portrait/mobile the two edge props (jar, window) sit outside the cover-crop, so Mother/Flour read via pooled light + label rather than the prop; center props (tally, oven, loaf) frame well. Crackle "hold-to-propagate" Proofing not yet wired (cracks draw on mount). Not yet touched (correctly, per brief): live loaves counter, Balanced-tier video fallback, final polish.

## 5 · Forbidden (hard rules)
- ❌ No new creative direction; no new concepts.
- ❌ No reopening M-00 / P-11 / H-01.
- ❌ No new generated images without explicit approval.
- ❌ No redesign of the story, palette, typography, the Score, the Dawn Engine, or the Handover.
- ❌ No generic website; nothing louder, faster, more commercial, or more UI-heavy. Motion stays slow, calm, constitutional.
- ❌ Crumb stays bread architecture (never cave/foam/sci-fi).

## 6 · Next task — Production Pass 3 (candidates, pick on approval)
The first half now has the full ritual. Remaining production work, roughly in order of value:
1. **Mobile framing for edge props** — pan the M-00 plate per moment (object-position, not just transform-origin) so the jar (Mother) and window (Flour) survive the portrait cover-crop. Landscape is already tuned.
2. **The Fold asset** — replace the placeholder with a real macro dough plate/loop (needs an approved asset; do not generate without sign-off).
3. **Proofing on the Crackle** — hold-still detector so the fissures propagate on stillness (the storyboard's stillness reward), not on mount.
4. **Balanced-tier video fallback** for the four 3D moments; **live loaves counter** (edge KV) — both deferred by the Pass-2 brief.
5. **Final polish** — Director's Cut critique pass (`docs/04-directors-cut.md`), tighten the ~0.96 crossing seam and window→plate gap in the climax.

## 7 · Continuation summary (paste into a fresh chat)
> RITUAL: a cinematic scroll film for an artisan sourdough brand ("we protect mornings"). Branch `claude/plan-approve-build-workflow-9jl8eh`. Next.js 15 + R3F + GSAP + Lenis. The brand/story/visual system is locked (see `docs/00-brand-dna.md`, `01-creative-strategy.md`, `03-visual-direction.md`, `02-experience-architecture.md`). Three canon Higgsfield plates are committed under `public/assets/plates/` (M-00 room, P-11 macro loaf, H-01 home arrival) — never reopen them. All spikes are done and approved; each proven in a noindex `/lab/*` route: Dawn Engine (scroll=time 4:12→8:04, grade as CSS vars), the welding grade pass, the First Cut resistance mechanic, and the integrated R3F Handover (First Cut → procedural crumb tunnel → window match-cut → H-01 arrival). The `/` film route is assembled end to end (Pass 1) and Acts I–II are now built out (Pass 2): the prelude is cinematography over the M-00 plate — a scroll-scheduled camera glides prop→prop (`lib/prelude.ts`, `components/film/Prelude.tsx`, `components/film/moments/*`) with six live layers (Mother, FlourBeam, Fold, Tally, Oven, Crackle) carrying the life over the canon plate, ending on the approved Frame 12 promise+reservation. Guardrails held: no new images, no reopening canon, no redesign, slow/calm/quiet, reduced-motion + mobile paths present. Next candidates in §6 (mobile edge-prop panning, the Fold asset, Crackle Proofing, Balanced video + loaves counter, final polish). Work on the designated branch; commit + push. Stop after a production pass runs, on a creative blocker, or when context is high (update this checkpoint first).

---
*Checkpoint committed at the start of production assembly.*
