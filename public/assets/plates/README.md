# Canon plates — drop zone

Approved Higgsfield plates go here, committed to the repo. The Higgsfield CDN
is blocked by this session's egress policy, so files must be placed by hand.

| File | Asset | Canon job | Source |
|---|---|---|---|
| `m00-canon.png` | M-00 master (room / continuity) | `3cff50ce-c8cb-43f3-8452-7681ea49f028` | Candidate D |
| `p11-canon.png` | P-11 macro product | `b464f504-4f3c-47bb-8912-be0734b49b07` | P11-B |

Paths are registered in `lib/plates.ts`. The grade lab (`/lab/grade?plate=m00`)
renders the real file automatically once present, and falls back to the
stand-in with an explicit "not delivered" note until then.

Verify after dropping the files:
`node scratch/verify-plates.js` (see docs/stage4/spike-2-grade.md).
