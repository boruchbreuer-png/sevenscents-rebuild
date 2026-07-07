/**
 * RITUAL with the Score — the approved cradle-and-lift form (Stage 3):
 * the lame enters below the baseline, cradles the word from beneath, and
 * lifts off past the final letter. Never crosses a letter core.
 */
export default function ScoreWordmark() {
  return (
    <h2 className="wordmark">
      RITUAL
      <svg viewBox="0 0 340 100" fill="none" aria-hidden="true" preserveAspectRatio="none">
        <path
          d="M18 74 C 110 79.5, 205 79.5, 250 74 C 292 68, 320 46, 337 29"
          stroke="rgb(var(--d-inst, 156 106 33))"
          strokeWidth="4.6"
          strokeLinecap="round"
        />
      </svg>
    </h2>
  );
}
