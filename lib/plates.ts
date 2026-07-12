/**
 * The plate manifest — how approved Higgsfield assets enter the build.
 *
 * Canon lives on the Higgsfield CDN, which is blocked by this session's egress
 * policy (403). Approved plates must be placed by hand into
 * `public/assets/plates/` (owner downloads the canon job from the widget and
 * commits it, or the CDN host is allowlisted). Until a file is present its
 * beat renders on the DOM grade alone — the build stays green either way.
 *
 * `canonJob` is the immutable provenance link back to the generation record.
 */
export interface Plate {
  id: string;
  beat: string;
  /** Higgsfield job ID of the canonized generation. */
  canonJob?: string;
  /** Local path once the file is committed to public/. */
  file: string;
  note?: string;
}

export const PLATES: Record<string, Plate> = {
  'M-00': {
    id: 'M-00',
    beat: 'master / room continuity',
    canonJob: '3cff50ce-c8cb-43f3-8452-7681ea49f028',
    file: '/assets/plates/m00-canon.webp',
    note: 'Canon master. Base film stock; every plate is graded to match this.',
  },
  'P-11': {
    id: 'P-11',
    beat: '7:42 macro product',
    canonJob: 'b464f504-4f3c-47bb-8912-be0734b49b07',
    file: '/assets/plates/p11-canon.webp',
    note: 'Canon macro. Texture / material source for the First Cut 3D derivation.',
  },
  'H-01': {
    id: 'H-01',
    beat: '8:04 handover arrival',
    canonJob: 'bf2c8ec3-c759-4d82-89e2-13a5d7130c2e',
    file: '/assets/plates/h01-canon.webp',
    note: 'Canon arrival. The room the impossible transition resolves into (the Handover).',
  },
  'F-01': {
    id: 'F-01',
    beat: '5:10 the fold',
    canonJob: '7c1dc376-c53b-4960-8277-671b9a63ccad',
    file: '/assets/plates/f01-canon.webp',
    note: 'Canon fold (F01-R2A, seed 923138). One deliberate fold, fingertips lower-right, 5:10 ember-to-wheat. Until the webp is produced, the raw widget download lands as f01-canon.png — the route falls back to it automatically.',
  },
};

/**
 * The formats a plate may be present in, preferred first: the optimized webp,
 * then the raw canon png as uploaded from the Higgsfield widget (H-01 and F-01
 * both land this way while the CDN is egress-blocked).
 */
export function plateVariants(p: Plate): string[] {
  return [p.file, p.file.replace(/\.webp$/, '.png')];
}
