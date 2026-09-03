import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';
import SectionMarker from '../components/SectionMarker.jsx';
import { stack } from '../data/approach';
import './TechStack.css';

/**
 * Section 08 — Technology Stack
 * Clean engineering-style technology ecosystem.
 */

export default function TechStack() {
  const rootRef = useRef(null);

  // Remove duplicates while keeping original order
  const technologies = [
    ...new Map(stack.map((item) => [item.label, item])).values(),
  ];

  // Split technologies into two rows
  const middle = Math.ceil(technologies.length / 2);

  const rowOne = technologies.slice(0, middle);
  const rowTwo = technologies.slice(middle);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(
          [
            '.tech__eyebrow',
            '.tech__title',
            '.tech__description',
            '.tech__meta',
            '.tech__marquee',
            '.tech__pill',
            '.tech__orb',
          ],
          {
            opacity: 1,
            y: 0,
            scale: 1,
          },
        );

        return;
      }

      /* -----------------------------------------
         INTRO
      ----------------------------------------- */

      gsap.fromTo(
        '.tech__eyebrow',
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.tech__hero',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(
        '.tech__title',
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.tech__hero',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(
        '.tech__description',
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.tech__hero',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(
        '.tech__meta',
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.tech__hero',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      /* -----------------------------------------
         MARQUEE
      ----------------------------------------- */

      gsap.fromTo(
        '.tech__marquee',
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.tech__stack',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      /* -----------------------------------------
         PILLS
      ----------------------------------------- */

      gsap.fromTo(
        '.tech__pill',
        {
          opacity: 0,
          scale: 0.85,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.55,
          stagger: 0.035,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.tech__stack',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      /* -----------------------------------------
         FLOATING ORB
      ----------------------------------------- */

      gsap.to('.tech__orb', {
        y: -18,
        x: 8,
        duration: 2.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to('.tech__orb-dot', {
        scale: 1.45,
        opacity: 0.45,
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="tech band"
      data-bg="cyan"
      id="technology"
    >
      <div className="shell">

        {/* ---------------------------------------
            SECTION MARKER
        ---------------------------------------- */}

        <SectionMarker
          index="08"
          title="Technology Stack"
          note="The engineering core"
        />

        {/* ---------------------------------------
            HERO
        ---------------------------------------- */}

        <div className="tech__hero">

          <div className="tech__content">

            <span className="tech__eyebrow mono">
              ENGINEERING CORE
            </span>

            <h2 className="tech__title display display--xl">
              Our Technology Stack.
              <br />

              <span>
                Modern Frameworks.
              </span>

              <br />

              <span className="tech__muted">
                Infinite Scale.
              </span>
            </h2>


          </div>

          {/* Decorative orb */}

          <div
            className="tech__orb"
            aria-hidden="true"
          >
            <span className="tech__orb-ring" />
            <span className="tech__orb-dot" />
          </div>

        </div>

        {/* ---------------------------------------
            TECHNOLOGY STACK
        ---------------------------------------- */}

        <div className="tech__stack">

          <div className="tech__stack-label">
            <span className="mono">
              CORE TECHNOLOGIES
            </span>

            <span className="tech__line" />

            <span className="mono">
              01 — 08
            </span>
          </div>

          {/* ROW 1 */}

          <div className="tech__marquee">
            <div className="tech__track tech__track--one">

              {[...rowOne, ...rowOne].map((item, index) => (
                <span
                  className="tech__pill"
                  key={`one-${item.label}-${index}`}
                >
                  <i />
                  {item.label}
                </span>
              ))}

            </div>
          </div>

          {/* ROW 2 */}

          <div className="tech__marquee tech__marquee--second">
            <div className="tech__track tech__track--two">

              {[...rowTwo, ...rowTwo].map((item, index) => (
                <span
                  className="tech__pill"
                  key={`two-${item.label}-${index}`}
                >
                  <i />
                  {item.label}
                </span>
              ))}

            </div>
          </div>

        </div>

      </div>

      {/* ---------------------------------------
          BOTTOM SEAM
      ---------------------------------------- */}

      <div className="tech__bottom">

        <span className="mono">
          BUILT FOR PERFORMANCE
        </span>

        <span className="tech__bottom-dot" />

        <span className="mono">
          BUILT FOR SCALE
        </span>

        <span className="tech__bottom-dot" />

        <span className="mono">
          BUILT FOR THE FUTURE
        </span>

      </div>

    </section>
  );
}