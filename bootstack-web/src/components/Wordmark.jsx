import './Wordmark.css';

/**
 * Placeholder logotype: a three-bar "stack" glyph that steps upward, set against
 * the wordmark. Swap the glyph for the final supplied logo asset when it exists.
 */
export default function Wordmark({ size = 'sm' }) {
  return (
    <span className={`wordmark wordmark--${size}`}>
      <svg className="wordmark__glyph" viewBox="0 0 40 34" aria-hidden="true">
        <rect x="0" y="26" width="40" height="8" />
        <rect x="0" y="13" width="30" height="8" className="wordmark__mid" />
        <rect x="0" y="0" width="18" height="8" className="wordmark__top" />
      </svg>
      <span className="wordmark__text">BOOTSTACK</span>
    </span>
  );
}
