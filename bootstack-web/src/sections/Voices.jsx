import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import SectionMarker from '../components/SectionMarker.jsx';
import { testimonials } from '../data/approach';
import './Voices.css';

export default function Voices() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const autoplayRef = useRef(null);

  const [active, setActive] = useState(0);

  const total = testimonials.length;

  const goToSlide = (index) => {
    if (!total) return;

    const nextIndex = (index + total) % total;
    setActive(nextIndex);

    if (!trackRef.current) return;

    const slides = trackRef.current.children;
    const target = slides[nextIndex];

    if (!target) return;

    gsap.to(trackRef.current, {
      x: -target.offsetLeft,
      duration: 0.8,
      ease: 'power3.inOut',
    });
  };

  const nextSlide = () => {
    goToSlide(active + 1);
  };

  const prevSlide = () => {
    goToSlide(active - 1);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('.voices__header > *', {
          opacity: 1,
          y: 0,
        });

        gsap.set('.voices__slider', {
          opacity: 1,
          y: 0,
        });

        return;
      }

      gsap.fromTo(
        '.voices__header > *',
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.voices__header',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.voices__slider',
        {
          opacity: 0,
          y: 45,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.voices__slider',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Autoplay
  useEffect(() => {
    if (total <= 1) return;

    autoplayRef.current = setInterval(() => {
      setActive((current) => {
        const next = (current + 1) % total;

        if (trackRef.current) {
          const target = trackRef.current.children[next];

          if (target) {
            gsap.to(trackRef.current, {
              x: -target.offsetLeft,
              duration: 0.8,
              ease: 'power3.inOut',
            });
          }
        }

        return next;
      });
    }, 5000);

    return () => clearInterval(autoplayRef.current);
  }, [total]);

  // Resize correction
  useEffect(() => {
    const handleResize = () => {
      if (!trackRef.current) return;

      const target = trackRef.current.children[active];

      if (!target) return;

      gsap.set(trackRef.current, {
        x: -target.offsetLeft,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!testimonials.length) return null;

  return (
    <section
      ref={rootRef}
      className="voices band"
      data-bg="mist"
      id="testimonials"
    >
      <div className="shell">

        {/* Section Marker */}
        <SectionMarker
          index="10"
          title="In their words"
          note="Clients, unedited"
        />

        {/* Header */}
        <div className="voices__header">

          <div>
            <span className="voices__eyebrow mono">
              CLIENT TESTIMONIALS
            </span>

            <h2 className="display display--xl">
              Good work is
              <span className="voices__highlight">
                better when clients feel it.
              </span>
            </h2>
          </div>

          <p className="voices__intro">
            Real feedback from the people we've worked with.
            No polished agency language — just what the experience
            actually felt like.
          </p>

        </div>

        {/* Slider */}
        <div className="voices__slider">

          <div
            className="voices__viewport"
            onMouseEnter={() => clearInterval(autoplayRef.current)}
            onMouseLeave={() => {
              if (total <= 1) return;

              autoplayRef.current = setInterval(() => {
                nextSlide();
              }, 5000);
            }}
          >

            <div
              ref={trackRef}
              className="voices__track"
            >

              {testimonials.map((item, index) => (

                <article
                  className={`voices__card ${
                    index === active ? 'is-active' : ''
                  }`}
                  key={item.id}
                >

                  {/* Card top */}
                  <div className="voices__card-top">

                    <span className="voices__card-number mono">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="voices__quote-symbol">
                      "
                    </span>

                    <span className="voices__card-label mono">
                      CLIENT VOICE
                    </span>

                  </div>

                  {/* Quote */}
                  <blockquote className="voices__quote">
                    {item.quote}
                  </blockquote>

                  {/* Author */}
                  <footer className="voices__author">

                    <div className="voices__avatar">
                      {item.name?.charAt(0)}
                    </div>

                    <div className="voices__author-info">

                      <strong>
                        {item.name}
                      </strong>

                      <span className="mono">
                        {item.role}, {item.company}
                      </span>

                      <small className="mono">
                        {item.industry}
                      </small>

                    </div>

                    <span className="voices__arrow">
                      ↗
                    </span>

                  </footer>

                  {/* Accent */}
                  <span
                    className="voices__card-accent"
                    aria-hidden="true"
                  />

                </article>

              ))}

            </div>

          </div>

          {/* Controls */}
          {total > 1 && (
            <div className="voices__controls">

              <div className="voices__counter mono">
                <span>
                  {String(active + 1).padStart(2, '0')}
                </span>

                <i />

                <span>
                  {String(total).padStart(2, '0')}
                </span>
              </div>

              <div className="voices__progress">
                <span
                  style={{
                    width: `${((active + 1) / total) * 100}%`,
                  }}
                />
              </div>

              <div className="voices__buttons">

                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous testimonial"
                  className="voices__button"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next testimonial"
                  className="voices__button"
                >
                  →
                </button>

              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}