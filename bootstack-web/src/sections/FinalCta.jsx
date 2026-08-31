import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/motion';
import MagneticButton from '../components/MagneticButton.jsx';
import { contact } from '../data/site';
import './FinalCta.css';

const HEADING = ['Ready to build', "what's next?"];

export default function FinalCta() {
  const rootRef = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirement: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.cta__line > span', {
          yPercent: 112,
          duration: 1.15,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.cta__heading',
            start: 'top 82%',
          },
        });

        gsap.to('.cta__ghost', {
          xPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/+$/, '');

    fetch(`${apiUrl}/api/contact/project-enquiry/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          let errMsg = 'Something went wrong. Please try again.';
          if (errData && typeof errData === 'object') {
            const messages = [];
            for (const key in errData) {
              if (Array.isArray(errData[key])) {
                messages.push(`${key}: ${errData[key].join(', ')}`);
              } else if (typeof errData[key] === 'string') {
                messages.push(`${key}: ${errData[key]}`);
              }
            }
            if (messages.length > 0) {
              errMsg = messages.join('\n');
            }
          }
          throw new Error(errMsg);
        }
        return res.json();
      })
      .then((data) => {
        alert('Thank you! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          requirement: '',
        });
        setIsFormOpen(false);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        alert(error.message || 'Something went wrong. Please try again.');
      });
  };

  return (
    <>
      <section
        ref={rootRef}
        id="contact"
        className="cta band"
        data-bg="yellow"
      >
        <span className="cta__ghost display" aria-hidden="true">
          BOOTSTACK BOOTSTACK
        </span>

        <div className="shell cta__inner">
          <p className="cta__eyebrow mono" data-reveal>
            Let&rsquo;s begin
          </p>

          <h2 className="cta__heading display display--mega">
            {HEADING.map((line, i) => (
              <span
                className={`cta__line cta__line--${i + 1}`}
                key={line}
              >
                <span>{line}</span>
              </span>
            ))}
          </h2>

          <div className="cta__body">
            <p className="cta__support lead" data-reveal>
              Tell us what you&rsquo;re building, where you want to go, and
              what needs to grow. We&rsquo;ll come back with a straight answer
              about whether we&rsquo;re the right people for it.
            </p>

            <div
              className="cta__actions"
              data-reveal
              style={{ '--reveal-delay': '80ms' }}
            >
              {/* START A PROJECT */}
              <MagneticButton
                type="button"
                variant="solid"
                onClick={() => setIsFormOpen(true)}
              >
                Start a Project
              </MagneticButton>

              {/* TALK TO BOOTSTACK */}
              <MagneticButton
                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                variant="ghost"
              >
                Talk to Bootstack
              </MagneticButton>
            </div>
          </div>

          <ul className="cta__details">
            <li data-reveal>
              <span className="mono">Email</span>
              <a href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </li>

            <li
              data-reveal
              style={{ '--reveal-delay': '60ms' }}
            >
              <span className="mono">Phone</span>
              <a href={`tel:${contact.phone.replace(/\s+/g, '')}`}>
                {contact.phone}
              </a>
            </li>

            <li
              data-reveal
              style={{ '--reveal-delay': '120ms' }}
            >
              <span className="mono">Studio</span>
              <span>{contact.location}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* PROJECT FORM MODAL */}
      {isFormOpen && (
        <div
          className="project-modal"
          onClick={() => setIsFormOpen(false)}
        >
          <div
            className="project-modal__box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="project-modal__close"
              onClick={() => setIsFormOpen(false)}
              aria-label="Close form"
            >
              ×
            </button>

            <div className="project-modal__header">
              <span className="mono">START A PROJECT</span>

              <h3>
                Tell us what
                <br />
                you&rsquo;re building.
              </h3>

              <p>
                Share a few details about your project and we&rsquo;ll get
                back to you shortly.
              </p>
            </div>

            <form
              className="project-form"
              onSubmit={handleSubmit}
            >
              {/* NAME */}
              <div className="project-form__field">
                <label htmlFor="project-name">
                  Name <span>*</span>
                </label>

                <input
                  id="project-name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="project-form__field">
                <label htmlFor="project-email">
                  Email <span>*</span>
                </label>

                <input
                  id="project-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* PHONE */}
              <div className="project-form__field">
                <label htmlFor="project-phone">
                  Phone <span>*</span>
                </label>

                <input
                  id="project-phone"
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* REQUIREMENT */}
              <div className="project-form__field">
                <label htmlFor="project-requirement">
                  Project Requirement <span>*</span>
                </label>

                <textarea
                  id="project-requirement"
                  name="requirement"
                  placeholder="Tell us about your project, goals, budget, timeline..."
                  rows="5"
                  value={formData.requirement}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="project-form__submit"
              >
                Send Project Enquiry
                <span>↗</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}