import { useState } from 'react';
import SectionMarker from '../components/SectionMarker.jsx';
import { capabilities } from '../data/capabilities';
import './Capabilities.css';

/** Small glyph per territory — keeps the row scannable at a glance. */
const ICON = {
  brand: '✦',
  create: '✎',
  grow: '↗',
  build: '⌘',
  automate: '⚡',
  strategy: '◎',
};

/**
 * Section 03 — six territories as a simple click-to-expand list.
 * No motion, no scroll reveal — just an accordion.
 */
export default function Capabilities() {
  const [active, setActive] = useState(0);

  const toggle = (i) => setActive((current) => (current === i ? -1 : i));

  return (
    <section id="capabilities" className="cap band" data-bg="white">
      <div className="shell">
        <SectionMarker index="03" title="What Bootstack does" note="Six territories, one team" />

        <div className="cap__head">
          <h2 className="display display--xl">Everything a business needs, kept under one roof.</h2>
          <p className="body">Open a territory to see what sits inside it.</p>
        </div>

        <div className="cap__list">
          {capabilities.map((item, i) => {
            const isOpen = active === i;
            return (
              <article
                key={item.id}
                className={`cap__row cap__row--${item.tone}${isOpen ? ' is-open' : ''}`}
              >
                <button
                  type="button"
                  className="cap__trigger"
                  aria-expanded={isOpen}
                  aria-controls={`cap-panel-${item.id}`}
                  onClick={() => toggle(i)}
                >
                  <span className="cap__icon" aria-hidden="true">{ICON[item.id]}</span>
                  <span className="cap__index mono">{item.index}</span>
                  <span className="cap__title display">{item.title}</span>
                  <span className="cap__verb">{item.verb}</span>
                  <span className="cap__sign" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <div className="cap__panel" id={`cap-panel-${item.id}`} role="region">
                    <p className="cap__blurb">{item.blurb}</p>
                    <ul className="cap__items">
                      {item.items.map((sub) => (
                        <li key={sub}>
                          <span className="mono">{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}