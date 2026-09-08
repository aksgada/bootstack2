import React from "react";
import "../style/Hero.css";

function Hero() {
  return (
    <div className="app">
      <section
        className="hero"
        id="home"
        aria-labelledby="hero-title"
      >

        <div
          className="hero-overlay"
          aria-hidden="true"
        />

        <div className="hero-content">

          {/* Eyebrow */}

          <span className="hero-eyebrow">
            DIGITAL INNOVATION &amp; TECHNOLOGY
          </span>


          {/* Heading */}

          <h1 id="hero-title">
            Technology That Builds{" "}
            <span>Tomorrow&apos;s Brands.</span>
          </h1>


          {/* Description */}

          <p className="hero-description">
            We build brands, websites, software, AI automation and
            marketing systems that help ambitious businesses grow,
            scale and lead with confidence.
          </p>


          {/* Buttons */}

          <div className="hero-buttons">

            <a
              href="#cta"
              className="button primary-button"
            >
              Book Consultation Call
            </a>

            <a
              href="#services"
              className="button secondary-button"
            >
              Explore Services
            </a>

          </div>


          {/* Features */}

          <div className="features">

            <div className="feature">
              <span aria-hidden="true">✓</span>

              <span className="feature-text">
                Innovation First
              </span>
            </div>

            <div className="feature">
              <span aria-hidden="true">✓</span>

              <span className="feature-text">
                Results Focused
              </span>
            </div>

            <div className="feature">
              <span aria-hidden="true">✓</span>

              <span className="feature-text">
                Business Growth
              </span>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Hero;
