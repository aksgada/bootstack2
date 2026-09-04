import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/motion';
import MagneticButton from '../components/MagneticButton.jsx';
import { contact } from '../data/site';
import './FinalCta.css';

const HEADING = ['Ready to build'];

export default function FinalCta() {
  const rootRef = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirement: '',
  });

  /* -------------------------------------------------------
     GSAP
  ------------------------------------------------------- */

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.cta__eyebrow', {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 80%',
          },
        });

        gsap.from('.cta__line > span', {
          yPercent: 115,
          duration: 1.15,
          ease: 'expo.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.cta__heading',
            start: 'top 82%',
          },
        });

        gsap.from('.cta__support', {
          opacity: 0,
          y: 25,
          duration: 0.8,
          delay: 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta__body',
            start: 'top 85%',
          },
        });

        gsap.from('.cta__actions > *', {
          opacity: 0,
          y: 20,
          duration: 0.7,
          stagger: 0.1,
          delay: 0.35,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta__actions',
            start: 'top 88%',
          },
        });

        gsap.from('.cta__detail', {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta__details',
            start: 'top 88%',
          },
        });

        gsap.to('.cta__ghost', {
          xPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  /* -------------------------------------------------------
     BODY LOCK + ESC
  ------------------------------------------------------- */

  useEffect(() => {
    if (!isFormOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsFormOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFormOpen]);

  /* -------------------------------------------------------
     FORM
  ------------------------------------------------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      'https://akshadak.pythonanywhere.com/api/contact/project-enquiry/',
      // http://127.0.0.1:8000/api/contact/project-enquiry/
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data);
      alert('Something went wrong. Please try again.');
      return;
    }

    console.log('Enquiry submitted:', data);

    alert(
      data.email_sent
        ? 'Thank you! Your enquiry has been sent successfully.'
        : 'Your enquiry was saved, but email delivery failed.'
    );

    setFormData({
      name: '',
      email: '',
      phone: '',
      requirement: '',
    });

    setIsFormOpen(false);

  } catch (error) {
    console.error('Network Error:', error);
    alert(
      'Unable to connect to the server. Please make sure Django is running.'
    );
  }
};
  return (
    <>
      {/* =====================================================
          CTA
      ===================================================== */}

      <section
        ref={rootRef}
        id="contact"
        className="cta band"
        data-bg="yellow"
      >
        {/* Decorative background */}
        <div className="cta__noise" aria-hidden="true" />

        <span
          className="cta__ghost display"
          aria-hidden="true"
        >
          BOOTSTACK
        </span>

        <span
          className="cta__ghost cta__ghost--two display"
          aria-hidden="true"
        >
          BUILD
        </span>

        <div className="shell cta__inner">

          {/* TOP LABEL */}

          <div className="cta__top">
            <span className="cta__index mono">
              12 / CONTACT
            </span>

            <span className="cta__status">
              <i />
              AVAILABLE FOR SELECT PROJECTS
            </span>
          </div>

          {/* EYEBROW */}

          <p className="cta__eyebrow mono">
            LET'S BEGIN
          </p>

          {/* HEADING */}

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

          {/* BODY */}

          <div className="cta__body">

            <p className="cta__support lead">
              Tell us what you're building, where you want to go,
              and what needs to grow. We'll come back with a
              straight answer about whether we're the right people
              for it.
            </p>

            {/* ACTIONS */}

            <div className="cta__actions">

              <MagneticButton
                type="button"
                variant="solid"
                onClick={() => setIsFormOpen(true)}
              >
                <span>Start a Project</span>
                <b>↗</b>
              </MagneticButton>

              <MagneticButton
                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                variant="ghost"
              >
                <span>Talk to Bootstack</span>
                <b>↗</b>
              </MagneticButton>

            </div>
          </div>

          {/* CONTACT DETAILS */}

          <div className="cta__details">

            <div className="cta__detail">
              <span className="mono">EMAIL</span>

              <a href={`mailto:${contact.email}`}>
                {contact.email}
                <span>↗</span>
              </a>
            </div>

            <div className="cta__detail">
              <span className="mono">PHONE</span>

              <a
                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
              >
                {contact.phone}
                <span>↗</span>
              </a>
            </div>

            <div className="cta__detail">
              <span className="mono">STUDIO</span>

              <strong>
                {contact.location}
              </strong>
            </div>

          </div>

          {/* BOTTOM */}

          <div className="cta__bottom">
            <span className="mono">
              DIGITAL SYSTEMS / CREATIVE TECHNOLOGY
            </span>

            <span className="mono">
              SCROLL ↓
            </span>
          </div>

        </div>
      </section>

      {/* =====================================================
          PROJECT MODAL
      ===================================================== */}

      {isFormOpen && (
        <div
          className="project-modal"
          onClick={() => setIsFormOpen(false)}
        >
          <div
            className="project-modal__box"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE */}

            <button
              type="button"
              className="project-modal__close"
              onClick={() => setIsFormOpen(false)}
              aria-label="Close form"
            >
              ×
            </button>

            {/* MODAL HEADER */}

            <div className="project-modal__header">

              <div className="project-modal__label">
                <span className="modal-dot" />
                START A PROJECT
              </div>

              {/* <h3>
                Tell us what
                <span> you're building.</span>
              </h3> */}

              {/* <p>
                Give us a little context and we'll get back
                to you with the next step.
              </p> */}

            </div>

            {/* FORM */}

            <form
              className="project-form"
              onSubmit={handleSubmit}
            >

              <div className="project-form__row">

                <div className="project-form__field">
                  <label htmlFor="project-name">
                    NAME
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

                <div className="project-form__field">
                  <label htmlFor="project-phone">
                    PHONE
                  </label>

                  <input
                    id="project-phone"
                    type="tel"
                    name="phone"
                    placeholder="Your phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="project-form__field">

                <label htmlFor="project-email">
                  EMAIL
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

              <div className="project-form__field">

                <label htmlFor="project-requirement">
                  PROJECT
                </label>

                <textarea
                  id="project-requirement"
                  name="requirement"
                  placeholder="What are you building?"
                  rows="4"
                  value={formData.requirement}
                  onChange={handleChange}
                  required
                />

              </div>

              <button
                type="submit"
                className="project-form__submit"
              >
                <span>SEND ENQUIRY</span>
                <b>↗</b>
              </button>

            </form>

          </div>
        </div>
      )}
    </>
  );
}
