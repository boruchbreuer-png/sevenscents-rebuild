# PROJECT: RITUAL — Checkpoint
**Read first on any new session.** Governed by `00-brand-dna.md` (the Constitution). Updated at the start of production assembly.

## 1 · Repository state
- **Branch:** `claude/ritual-acts-1-2-production-v7llu9`
- Stack: Next.js 15 + TypeScript + Tailwind v4 + GSAP + Lenis + three@0.171 + @react-three/fiber@9. Clean production build. Routes: `/` (full film) + 4 noindex labs (`/lab/grade`, `/lab/first-cut`, `/lab/transition`, `/lab/continuity`).
- **Production Pass 2 landed (Acts I–II):** the prelude is no longer M-00 + text — it is cinematography over the canon plate. The single light pools on each prop in turn (a slow focus-pull glide) with lightweight live layers carrying the life. R3F stays lazy-loaded; `/` first-load JS unchanged.
- **Production Pass 3 landed:** mobile framing (cover-crop projection pans the plate per moment so the jar/window survive portrait — desktop 16:9 is a no-op), Crackle **Proofing** (stillness develops the fissures; motion only slows it, ratchets), and the **Fold asset brief** (`docs/fold-asset-brief.md`, planning only — no generation).

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
- **Acts I–II prelude** (`lib/prelude.ts`, `components/film/Prelude.tsx`, `components/film/moments/*`) — "the plate is cinema; the layer is life." M-00 is the set (it already holds every prop); a scroll-scheduled camera glides prop→prop while pooled light isolates each, and six live layers carry the life: **Mother** (jar starter bubbles, cursor-aware), **FlourBeam** (motes falling in the window shaft), **Fold** (Score-arc divider + knead breath — the one honest placeholder, no raw-dough asset), **Tally** (today's fresh stroke draws + Bake № climbs — *the count never resets*), **Oven** (ember behind a fog-wipe you clear with a finger), **Crackle** (the cooling loaf's fissures + a butter seismograph, which match-dissolves into the First Cut). Pure schedule in `lib/prelude.ts` (envelopes + focus interpolation). rAF gated on per-moment visibility; slots memoized so faded moments don't re-render. Reduced motion: no zoom, layers freeze as stills, moments cross-dissolve under native scroll (horizontal framing still follows the moments so mobile keeps each prop in frame). **Mobile:** `project()` in `lib/prelude.ts` computes a cover-crop pan (object-position + matched transform-origin, pool, and live-layer positions) so portrait keeps the focused prop centred; ≥16:9 is a no-op (desktop untouched). **Crackle Proofing:** `--proof` (0..1) ratchets up faster while the visitor is still, slower while moving, never reverses; the fissures + seismograph develop with it. The `?p=` verification override also drives the grade + clock so a freeze shows the true hour.

## 4 · Project status
- **All spikes complete and approved:** #2 grade, #3 First Cut, #1 Handover, #4 integrated continuity, #5 crumb+registration, + H-01 asset gate.
- **Production spine approved:** First Cut → crumb → window → H-01 arrival.
- **Production Pass 1:** full `/` route assembled end to end (approved directionally).
- **Production Pass 2:** Acts I–II built out — the prelude now carries the full ritual before the climax (six moments above), the emotional build runs dark→ember→wheat with the count climbing, and the cooling loaf hands into the First Cut via a match-dissolve.
- **Production Pass 3 (this pass):** mobile framing fixed (all six moments frame on portrait now — verified 390×844), Crackle Proofing wired (still → `--proof` 0.18→0.87 over ~2.6s; moving → 0.10), Fold asset brief written for review. Out of spike mode; normal coding decisions no longer need per-step approval.
- **Still rough / deferred:** the **Fold** is still the honest placeholder — its asset brief is ready (`docs/fold-asset-brief.md`); needs sign-off before generation. Not yet touched (correctly, per brief): live loaves counter, Balanced-tier video fallback, final polish.

## 5 · Forbidden (hard rules)
- ❌ No new creative direction; no new concepts.
- ❌ No reopening M-00 / P-11 / H-01.
- ❌ No new generated images without explicit approval.
- ❌ No redesign of the story, palette, typography, the Score, the Dawn Engine, or the Handover.
- ❌ No generic website; nothing louder, faster, more commercial, or more UI-heavy. Motion stays slow, calm, constitutional.
- ❌ Crumb stays bread architecture (never cave/foam/sci-fi).

## 6 · Next task — Production Pass 4 (candidates, pick on approval)
The first half now has the full ritual, frames on mobile, and rewards stillness. Remaining production work, roughly in order of value:
1. **Generate the Fold asset** — on approval of `docs/fold-asset-brief.md`, one master still via the Higgsfield connector referencing M-00 + P-11, held at the review gate (same process as the canon plates), then retire the Fold placeholder.
2. **Balanced-tier video fallback** for the four 3D climax moments (pre-rendered scroll-scrubbed), plus device-caps tier detection.
3. **Live loaves counter** (edge KV) — the one piece of true shared state.
4. **Final polish** — Director's Cut critique pass (`docs/04-directors-cut.md`), tighten the ~0.96 crossing seam and window→plate gap in the climax.

## 7 · Continuation summary (paste into a fresh chat)
> RITUAL: a cinematic scroll film for an artisan sourdough brand ("we protect mornings"). Branch `claude/plan-approve-build-workflow-9jl8eh`. Next.js 15 + R3F + GSAP + Lenis. The brand/story/visual system is locked (see `docs/00-brand-dna.md`, `01-creative-strategy.md`, `03-visual-direction.md`, `02-experience-architecture.md`). Three canon Higgsfield plates are committed under `public/assets/plates/` (M-00 room, P-11 macro loaf, H-01 home arrival) — never reopen them. All spikes are done and approved; each proven in a noindex `/lab/*` route: Dawn Engine (scroll=time 4:12→8:04, grade as CSS vars), the welding grade pass, the First Cut resistance mechanic, and the integrated R3F Handover (First Cut → procedural crumb tunnel → window match-cut → H-01 arrival). The `/` film route is assembled end to end (Pass 1) and Acts I–II are now built out (Pass 2): the prelude is cinematography over the M-00 plate — a scroll-scheduled camera glides prop→prop (`lib/prelude.ts`, `components/film/Prelude.tsx`, `components/film/moments/*`) with six live layers (Mother, FlourBeam, Fold, Tally, Oven, Crackle) carrying the life over the canon plate, ending on the approved Frame 12 promise+reservation. Pass 3 then fixed mobile framing (cover-crop `project()` pans the plate per moment; desktop 16:9 untouched), wired Crackle Proofing (stillness develops the fissures), and wrote the Fold asset brief (`docs/fold-asset-brief.md`, planning only). Guardrails held: no new images, no reopening canon, no redesign, slow/calm/quiet, reduced-motion + mobile paths present. Next candidates in §6 (generate the Fold asset on approval, Balanced video, loaves counter, final polish). Work on the designated branch; commit + push. Stop after a production pass runs, on a creative blocker, or when context is high (update this checkpoint first).

---
*Checkpoint committed at the start of production assembly.*
