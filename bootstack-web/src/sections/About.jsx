import React from "react";
import useReveal from "../hooks/useReveal";
import "../style/AboutSection.css";

const features = ["Strategy", "Technology", "Execution", "Growth"];

export default function AboutSection() {
  const mediaRef = useReveal({ threshold: 0.15 });
  const contentRef = useReveal({ threshold: 0.15 });

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-media reveal" ref={mediaRef}>
          <div className="media-placeholder">
            <div className="placeholder-icon" aria-hidden="true">
              <span />
            </div>
            <p>Team / studio photo placeholder</p>
          </div>
        </div>

        <div className="about-content reveal" ref={contentRef}>
          <span className="about-eyebrow">ABOUT BOOTSTACK</span>

          <h2>
            We don&apos;t just build brands. We build business growth systems.
          </h2>

          <p>
            Most businesses fail to grow because of scattered services and
            disconnected tools — a brand here, a website there, and marketing
            managed by someone else entirely.
          </p>

          <p>
            Bootstack brings strategy, technology, execution and growth
            together as one connected system, so every part of your business
            works toward the same outcome.
          </p>

          <div className="about-features">
            {features.map((feature, index) => (
              <span
                className="feature-pill"
                key={feature}
                style={{ "--pill-delay": `${index * 0.08}s` }}
              >
                <span className="feature-icon">✦</span>
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
