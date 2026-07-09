# PROJECT: RITUAL — Checkpoint
**Read first on any new session.** Governed by `00-brand-dna.md` (the Constitution). Updated at the start of production assembly.

## 1 · Repository state
- **Branch:** `claude/plan-approve-build-workflow-9jl8eh`
- **Latest commit at checkpoint:** `427af76` (H-01 canon plate landed; real Handover arrival renders).
- Stack: Next.js 15 + TypeScript + Tailwind v4 + GSAP + Lenis + three@0.171 + @react-three/fiber@9. Clean production build. Routes: `/` (film) + 4 noindex labs (`/lab/grade`, `/lab/first-cut`, `/lab/transition`, `/lab/continuity`).

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

## 4 · Project status
- **All spikes complete and approved:** #2 grade, #3 First Cut, #1 Handover, #4 integrated continuity, #5 crumb+registration, + H-01 asset gate.
- **Production spine approved:** First Cut → crumb → window → H-01 arrival.
- **Now:** production assembly of the full `/` film route. Out of spike mode; normal coding decisions no longer need per-step approval.

## 5 · Forbidden (hard rules)
- ❌ No new creative direction; no new concepts.
- ❌ No reopening M-00 / P-11 / H-01.
- ❌ No new generated images without explicit approval.
- ❌ No redesign of the story, palette, typography, the Score, the Dawn Engine, or the Handover.
- ❌ No generic website; nothing louder, faster, more commercial, or more UI-heavy. Motion stays slow, calm, constitutional.
- ❌ Crumb stays bread architecture (never cave/foam/sci-fi).

## 6 · Next task — full production route assembly
Assemble `/` as the real cinematic film end-to-end: Dawn Engine timeline 4:12→8:04 · M-00 graded backdrop + copy beats (Acts I–II) · the integrated First Cut → crumb → window → H-01 Handover (Act III climax, R3F) · Frame 12 ending (promise + reservation). Reduced-motion path using real H-01; mobile-balanced tier; compress `h01-canon.png`; tighten the ~0.96 crossing seam and the window→plate gap.

## 7 · Continuation summary (paste into a fresh chat)
> RITUAL: a cinematic scroll film for an artisan sourdough brand ("we protect mornings"). Branch `claude/plan-approve-build-workflow-9jl8eh`. Next.js 15 + R3F + GSAP + Lenis. The brand/story/visual system is locked (see `docs/00-brand-dna.md`, `01-creative-strategy.md`, `03-visual-direction.md`, `02-experience-architecture.md`). Three canon Higgsfield plates are committed under `public/assets/plates/` (M-00 room, P-11 macro loaf, H-01 home arrival) — never reopen them. All spikes are done and approved; each proven in a noindex `/lab/*` route: Dawn Engine (scroll=time 4:12→8:04, grade as CSS vars), the welding grade pass, the First Cut resistance mechanic, and the integrated R3F Handover (First Cut → procedural crumb tunnel → window match-cut → H-01 arrival). The approved job now is to ASSEMBLE the real `/` film route from these proven pieces, end to end, ending on the approved "Frame 12" promise+reservation (`mockup/index.html` is the Frame 12 reference). Guardrails: no new images, no reopening canon, no redesign, keep it slow/calm/quiet, mobile + reduced-motion required. Known fixes: compress the 23.7 MB `h01-canon.png`; reduced-motion arrival must use H-01; tighten the crossing seam. Work on the designated branch; commit + push. Stop when the first full route runs end to end, on a creative blocker, or when context is high (update this checkpoint first).

---
*Checkpoint committed at the start of production assembly.*
