import React from "react";
import useReveal from "../hooks/useReveal";
import "../style/CallToAction.css";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.5 3.5h3l1.5 4-2 1.5a13 13 0 0 0 6 6l1.5-2 4 1.5v3c0 1-1 1.5-2.5 1.5C10.5 19 5 13.5 5 6c0-1.5.5-2.5 1.5-2.5Z" />
  </svg>
);

export default function FinalCta() {
  const contentRef = useReveal();

  return (
    <section className="cta" id="cta" aria-labelledby="cta-title">
      <div className="cta-glow cta-glow--one" aria-hidden="true" />
      <div className="cta-glow cta-glow--two" aria-hidden="true" />

      <div className="cta-container reveal" ref={contentRef}>
        <span className="cta-eyebrow">LET&apos;S WORK TOGETHER</span>

        <h2 className="cta-title" id="cta-title">
          Ready to Build Something <span>Extraordinary?</span>
        </h2>

        <p className="cta-description">
          Tell us about your business and we&apos;ll show you how branding,
          technology and automation can help you grow and scale.
        </p>

        <div className="cta-buttons">
          <a href="#services" className="button cta-primary-button">
            Explore Services
            <ArrowIcon />
          </a>

          <a href="tel:+919975499956" className="button cta-secondary-button">
            <PhoneIcon />
            +91 9975499956
          </a>
        </div>
      </div>
    </section>
  );
}
