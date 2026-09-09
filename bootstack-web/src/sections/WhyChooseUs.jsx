import React from "react";
import useReveal from "../hooks/useReveal";
import "./WhyChooseUs.css";

const benefits = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4M8.5 11h5M11 8.5v5" />
      </svg>
    ),
    title: "Deep Dive & Diagnosis",
    description:
      "We audit your brand, funnels, and current performance to identify gaps, leaks, and growth opportunities.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="12" r="2" />
        <circle cx="8" cy="19" r="2" />
        <path d="M8 7.2 16 11M17 13.5l-7 4" />
      </svg>
    ),
    title: "Strategy Architecture",
    description:
      "We design a custom growth blueprint, covering positioning, content, paid ads, and systems aligned with your business goals.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M5 19V9M12 19V5M19 19v-7M3 19h18M4 7l5-3 5 3 6-4" />
      </svg>
    ),
    title: "Build & Execute",
    description:
      "From content creation to funnel setup, CRM and campaigns, we implement everything with precision and speed.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M5 20V10M10 20V6M15 20v-8M20 20V3" />
      </svg>
    ),
    title: "Optimise & Scale",
    description:
      "Continuous tracking, testing and optimisation to improve ROI and scale what works consistently.",
  },
];

export default function WhyChooseUs() {
  const headerRef = useReveal();
  const gridRef = useReveal({ threshold: 0.1 });

  return (
    <section className="why-choose-section" id="why-choose-us">
      <div className="why-bg-shape why-bg-shape--one" aria-hidden="true" />
      <div className="why-bg-shape why-bg-shape--two" aria-hidden="true" />

      <div className="why-choose-card">
        <div className="why-choose-header reveal" ref={headerRef}>
          <span className="why-choose-eyebrow">WHY CHOOSE US</span>
          <h2>
            Why Businesses Choose
            <br />
            <span>Bootstack.</span>
          </h2>
          <div className="why-header-line" />
        </div>

        <div className="benefits-grid" ref={gridRef}>
          {benefits.map((benefit, index) => (
            <article
              className="benefit-item"
              key={benefit.title}
              style={{ "--reveal-index": index }}
            >
              <span className="benefit-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="benefit-icon">{benefit.icon}</div>

              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>

              <span className="benefit-arrow" aria-hidden="true">↗</span>
              <span className="benefit-border" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
