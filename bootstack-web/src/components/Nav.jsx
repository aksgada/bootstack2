import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/motion';
import { nav as navLinks, brand, contact, socials } from '../data/site';
import Wordmark from './Wordmark.jsx';
import './Nav.css';

/**
 * The bar reads the ground it is sitting on (via the same `data-bg` contract the
 * BackgroundStage uses) and inverts itself over light sections. It retracts on
 * the way down and returns on the way up, so the page keeps the full viewport
 * while you are reading.
 */
export default function Nav({ ready }) {
  const rootRef = useRef(null);
  const progressRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ready) return undefined;

    // The bar's entrance is a CSS transition on [data-state], not a GSAP `from`
    // tween: a from-tween writes opacity:0 inline the moment it is created, and
    // anything that interrupts it before it plays strands the nav invisible.
    //
    // There is no colour inversion to manage any more — every ground on the page
    // is light, so the bar stays ink throughout.

    const ctx = gsap.context(() => {
      // Scroll-length progress hairline.
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      });

      // Retract while scrolling down past the first screen.
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const hidden = self.direction === 1 && self.scroll() > 240;
          rootRef.current?.classList.toggle('is-hidden', hidden);
          rootRef.current?.classList.toggle('is-stuck', self.scroll() > 120);
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
  }, [open]);

  return (
    <>
      <header ref={rootRef} className="nav" data-state={ready ? 'in' : 'out'}>
        <div className="nav__bar">
          <a className="nav__brand" href="#top" aria-label={`${brand.name} — home`}>
            <Wordmark />
          </a>

          <nav className="nav__links" aria-label="Primary">
            {navLinks.map((link) => (
              <a key={link.href} className="nav__link mono" href={link.href}>
                <span>{link.label}</span>
                <span aria-hidden="true">{link.label}</span>
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a className="nav__cta mono" href="#contact">
              Start a Project
            </a>
            <button
              type="button"
              className={`nav__toggle${open ? ' is-open' : ''}`}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="nav-panel"
            >
              <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
              <i aria-hidden="true" />
              <i aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="nav__progress" aria-hidden="true">
          <span ref={progressRef} />
        </div>
      </header>

      <div id="nav-panel" className={`menu${open ? ' is-open' : ''}`} hidden={!open}>
        <div className="menu__inner shell">
          <nav className="menu__links" aria-label="Mobile">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ '--i': i }}
                className="display display--xl"
              >
                <span className="menu__index mono">0{i + 1}</span>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="menu__foot">
            <a className="menu__mail" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <ul className="menu__social mono">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer noopener">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
