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
    file: '/assets/plates/m-00.png',
    note: 'Canon master. Base film stock; every plate is graded to match this.',
  },
  'P-11': {
    id: 'P-11',
    beat: '7:42 macro product',
    canonJob: 'b464f504-4f3c-47bb-8912-be0734b49b07',
    file: '/assets/plates/p-11.png',
    note: 'Canon macro. Texture / material source for the First Cut 3D derivation.',
  },
};
