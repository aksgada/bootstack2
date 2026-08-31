import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';
import './ScrollBadge.css';

const TEXT = 'BOOTSTACK — BRANDING — MARKETING — TECHNOLOGY — AUTOMATION — ';

/**
 * A circular mark parked in the corner. It turns with the scroll — forwards on
 * the way down, backwards on the way up — and jumps back to the top on click.
 */
export default function ScrollBadge() {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.to('.badge__ring', {
        rotate: 360,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 1.1 },
      });

      // Only present once the hero has been left behind.
      gsap.set(el, { autoAlpha: 0, scale: 0.6 });
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const show = self.scroll() > window.innerHeight * 0.9;
          gsap.to(el, {
            autoAlpha: show ? 1 : 0,
            scale: show ? 1 : 0.6,
            duration: 0.5,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <a ref={rootRef} className="badge" href="#top" aria-label="Back to top" data-cursor="top">
      <span className="badge__ring" aria-hidden="true">
        <svg viewBox="0 0 100 100">
          <defs>
            <path
              id="badge-path"
              d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0"
            />
          </defs>
          <text>
            <textPath href="#badge-path" startOffset="0">
              {TEXT}
            </textPath>
          </text>
        </svg>
      </span>
      <span className="badge__arrow" aria-hidden="true">
        &uarr;
      </span>
    </a>
  );
}
