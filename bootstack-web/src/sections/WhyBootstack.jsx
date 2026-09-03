import { useEffect, useRef } from 'react';
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
} from '../lib/motion';

import SectionMarker from '../components/SectionMarker.jsx';
import Marquee from '../components/Marquee.jsx';

import { differences } from '../data/approach';

import './WhyBootstack.css';

const WHY_META = [
  {
    number: '01',
    label: 'STRATEGY',
    icon: '⌘',
    note: 'Start with the right direction',
  },
  {
    number: '02',
    label: 'EXECUTION',
    icon: '↗',
    note: 'Turn ideas into working systems',
  },
  {
    number: '03',
    label: 'CLARITY',
    icon: '◌',
    note: 'Make every decision measurable',
  },
  {
    number: '04',
    label: 'PARTNERSHIP',
    icon: '⚙',
    note: 'Build something that keeps moving',
  },
];

/**
 * Section 07 — Why Bootstack
 * Premium ecosystem-style reasons section.
 */
export default function WhyBootstack() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('.why__lede > *', {
          opacity: 1,
          y: 0,
        });

        gsap.set('.why__module', {
          opacity: 1,
          y: 0,
          scale: 1,
        });

        gsap.set('.why__item', {
          opacity: 1,
          x: 0,
        });

        return;
      }

      /* --------------------------------
         LEFT CONTENT
      -------------------------------- */

      gsap.fromTo(
        '.why__lede > *',
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why__lede',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* --------------------------------
         MODULE CARDS
      -------------------------------- */

      gsap.fromTo(
        '.why__module',
        {
          opacity: 0,
          y: 45,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why__board',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* --------------------------------
         CARD CONTENT
      -------------------------------- */

      gsap.fromTo(
        '.why__item',
        {
          opacity: 0,
          x: -12,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.why__board',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="why band"
      data-bg="white"
      id="why-bootstack"
    >
      <div className="shell">

        {/* =========================================
            SECTION MARKER
        ========================================= */}

        <SectionMarker
          index="07"
          title="Why Bootstack"
          note="The difference behind the outcome"
        />

        {/* =========================================
            MAIN GRID
        ========================================= */}

        <div className="why__grid">

          {/* =======================================
              LEFT CONTENT
          ======================================= */}

          <div className="why__lede">

            <span className="why__eyebrow mono">
              WHY BOOTSTACK
            </span>

            <h2 className="display display--xl">

              Four things that

              <span className="why__highlight">
                change the outcome.
              </span>

            </h2>

            <p className="body">
              None of these are unusual claims. Very few agencies
              are actually set up to deliver all four at once.
            </p>

            <p className="why__small-copy">
              Strategy, execution, clarity and partnership working
              together as one connected digital system.
            </p>

            {/* STATS */}

            <div className="why__stats">

              <div className="why__stat">

                <strong>04</strong>

                <span className="mono">
                  CORE DIFFERENCES
                </span>

              </div>

              <div className="why__stat">

                <strong>∞</strong>

                <span className="mono">
                  POSSIBILITIES
                </span>

              </div>

            </div>

          </div>

          {/* =======================================
              RIGHT BOARD
          ======================================= */}

          <div className="why__board">

            {differences.map((item, index) => {

              const meta = WHY_META[index] || {
                number: item.index,
                label: 'SYSTEM',
                icon: '↗',
                note: 'Built around your outcome',
              };

              return (
                <article
                  className="why__module"
                  key={item.index}
                  style={{
                    '--module-index': index,
                  }}
                >

                  {/* Background accent */}

                  <span
                    className="why__module-accent"
                    aria-hidden="true"
                  />

                  {/* =================================
                      CARD HEADER
                  ================================= */}

                  <div className="why__module-head">

                    <div className="why__module-number">

                      <span className="mono">
                        {meta.number}
                      </span>

                    </div>

                    <div className="why__module-info">

                      <div className="why__module-title-row">

                        <span className="why__module-name mono">
                          {meta.label}
                        </span>

                        <span className="why__module-icon">
                          {meta.icon}
                        </span>

                      </div>

                      <span className="why__module-note">
                        {meta.note}
                      </span>

                    </div>

                  </div>

                  {/* =================================
                      REASON
                  ================================= */}

                  <div className="why__items">

                    <div className="why__item">

                      <span
                        className="why__pip"
                        aria-hidden="true"
                      />

                      <div className="why__body">

                        <h3 className="why__title display">
                          {item.title}
                        </h3>

                        <p className="why__text">
                          {item.body}
                        </p>

                      </div>

                      <span
                        className="why__item-arrow"
                        aria-hidden="true"
                      >
                        ↗
                      </span>

                    </div>

                  </div>

                  {/* =================================
                      CARD FOOTER
                  ================================= */}

                  <div className="why__module-footer">

                    <span className="mono">
                      SYSTEM {meta.number}
                    </span>

                    <span className="why__status">

                      <i />

                      ACTIVE

                    </span>

                  </div>

                </article>
              );
            })}

          </div>

        </div>
      </div>

      {/* =========================================
          BOTTOM MARQUEE
      ========================================= */}

      <div className="why__seam">

        <Marquee
          items={[
            'Strategy',
            'Execution',
            'Clarity',
            'Partnership',
            'Results',
            'Growth',
          ]}
          size="md"
          speed={44}
          reverse
        />

      </div>

    </section>
  );
}