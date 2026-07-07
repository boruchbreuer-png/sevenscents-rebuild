# PROJECT: RITUAL — Working Agreement

This file is binding for every session in this repository. Read it before doing anything.

## The Workflow

**Think → Approve → Design → Approve → Mockup → Approve → Build → Approve → Polish**

## The Rules

1. **Never begin coding immediately.**
2. Before any HTML, images, or code, complete the **Creative Strategy**:
   - Brand
   - Story
   - Emotional direction
   - World-building
   - Signature interactions
   - Three different creative concepts with pros/cons and a recommendation
3. **STOP and wait for explicit approval.**
4. After approval, create only the **Visual Direction** (moodboard, art direction, typography, colors, storyboard). No code yet.
5. **STOP and wait for explicit approval.**
6. After approval, build **one static HTML mockup only**. No functionality or animations.
7. **STOP and wait for explicit approval.**
8. Only after the mockup is approved may you generate assets, build the website, add 3D, animations, and interactions.
9. **Commit every approved stage separately in Git.**
10. **Never continue to the next stage without explicit approval.** Silence is not approval. "Looks interesting" is not approval. Only an explicit go-ahead is approval.

## Stage Artifacts

Each stage produces a document or deliverable committed only after approval:

| Stage | Deliverable | Location |
|-------|------------|----------|
| 1. Think | Creative Strategy | `docs/01-creative-strategy.md` |
| 2. Design | Visual Direction | `docs/02-visual-direction.md` |
| 3. Mockup | One static HTML page | `mockup/` |
| 4. Build | The real site | `/` (app) |
| 5. Polish | Director's Cut critique + fixes | `docs/03-directors-cut.md` |

## Asset Rules (apply only in Stage 4+)

- All generated imagery/video goes through the **Higgsfield connector**.
- Generate **one master hero image first**; every later asset must reference prior assets to preserve: same loaf, crust, flour, lighting, lens, color grading, atmosphere, and art direction.
- No stock assets. No placeholders.

## Build Standards (apply only in Stage 4+)

- Next.js, TypeScript, Tailwind, GSAP + ScrollTrigger, Lenis, React Three Fiber / Three.js, Framer Motion.
- GPU-accelerated, lazy-loaded, excellent mobile experience, reduced-motion support, high Lighthouse scores.
- Every animation must exist because it strengthens emotion. Never animate for decoration.
