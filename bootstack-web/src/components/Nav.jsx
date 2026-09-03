
import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/motion';
import { nav as navLinks, brand, contact, socials } from '../data/site';
import Wordmark from './Wordmark.jsx';
import './Nav.css';
import logo from './2.png';
/**
 * Main navigation
 *
 * Features:
 * - GSAP entrance / scroll behavior
 * - Scroll progress indicator
 * - Navbar retracts while scrolling down
 * - Navbar returns while scrolling up
 * - Responsive mobile menu
 * - Start a Project opens enquiry form
 * - Enquiry form connects directly to Django API
 */
export default function Nav({ ready }) {
  const rootRef = useRef(null);
  const progressRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirement: '',
  });

  /* -------------------------------------------------------
     GSAP / NAV SCROLL BEHAVIOR
  ------------------------------------------------------- */

  useEffect(() => {
    if (!ready) return undefined;

    const ctx = gsap.context(() => {

      /* Scroll progress */

      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          start: 0,
          end: 'max',
          scrub: 0.3,
        },
      });

      /* Navbar hide/show */

      ScrollTrigger.create({
        start: 0,
        end: 'max',

        onUpdate: (self) => {
          const currentScroll = self.scroll();

          const hidden =
            self.direction === 1 &&
            currentScroll > 240;

          const stuck =
            currentScroll > 120;

          rootRef.current?.classList.toggle(
            'is-hidden',
            hidden
          );

          rootRef.current?.classList.toggle(
            'is-stuck',
            stuck
          );
        },
      });

    }, rootRef);

    return () => ctx.revert();
  }, [ready]);

  /* -------------------------------------------------------
     BODY LOCK
  ------------------------------------------------------- */

  useEffect(() => {
    if (open || isFormOpen) {
      document.body.classList.add('is-locked');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('is-locked');
      document.body.style.overflow = '';
    }

    return () => {
      document.body.classList.remove('is-locked');
      document.body.style.overflow = '';
    };
  }, [open, isFormOpen]);

  /* -------------------------------------------------------
     ESC KEY
  ------------------------------------------------------- */

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setIsFormOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, []);

  /* -------------------------------------------------------
     OPEN PROJECT FORM
  ------------------------------------------------------- */

  const handleOpenProject = () => {
    setOpen(false);
    setIsFormOpen(true);
  };

  /* -------------------------------------------------------
     CLOSE PROJECT FORM
  ------------------------------------------------------- */

  const handleCloseProject = () => {
    if (isSubmitting) return;

    setIsFormOpen(false);
  };

  /* -------------------------------------------------------
     FORM INPUT
  ------------------------------------------------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* -------------------------------------------------------
     SUBMIT FORM
  ------------------------------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/contact/project-enquiry/',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log('Django API response:', data);

      /* ---------------------------------------------
         API validation error
      --------------------------------------------- */

      if (!response.ok) {
        console.error('API Error:', data);

        const errorMessage =
          data?.detail ||
          data?.name?.[0] ||
          data?.email?.[0] ||
          data?.phone?.[0] ||
          data?.requirement?.[0] ||
          'Something went wrong. Please check your details.';

        alert(errorMessage);

        return;
      }

      /* ---------------------------------------------
         SUCCESS
      --------------------------------------------- */

      console.log(
        'Enquiry submitted successfully:',
        data
      );

      /*
       * Your Django API should return:
       *
       * {
       *   id: 1,
       *   name: "...",
       *   email: "...",
       *   phone: "...",
       *   requirement: "...",
       *   created_at: "..."
       * }
       *
       * If email_sent is returned from Django,
       * we also display email status.
       */

      if (data.email_sent === true) {

        alert(
          'Thank you! Your enquiry has been sent successfully.'
        );

      } else if (data.email_sent === false) {

        alert(
          'Your enquiry was saved successfully, but the email could not be sent.'
        );

        console.warn(
          'Email delivery failed:',
          data.email_error
        );

      } else {

        /*
         * Your current API response does not appear
         * to return email_sent, so treat the API request
         * itself as successful.
         */

        alert(
          'Thank you! Your enquiry has been submitted successfully.'
        );
      }

      /* Clear form */

      setFormData({
        name: '',
        email: '',
        phone: '',
        requirement: '',
      });

      /* Close modal */

      setIsFormOpen(false);

    } catch (error) {

      console.error(
        'Network Error:',
        error
      );

      alert(
        'Unable to connect to the server. Please make sure Django is running.'
      );

    } finally {

      setIsSubmitting(false);

    }
  };

  /* -------------------------------------------------------
     NAV LINK CLICK
  ------------------------------------------------------- */

  const handleNavLinkClick = () => {
    setOpen(false);
  };

  /* -------------------------------------------------------
     RENDER
  ------------------------------------------------------- */

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header
        ref={rootRef}
        className="nav"
        data-state={ready ? 'in' : 'out'}
      >

        <div className="nav__bar">

          {/* -------------------------------------------------
              LOGO
          ------------------------------------------------- */}

          <a
  className="nav__brand"
  href="#top"
  aria-label={`${brand.name} — home`}
  onClick={handleNavLinkClick}
>
  <img
    src={logo}
    alt={brand.name}
    className="nav__logo"
  />
</a>

          {/* -------------------------------------------------
              DESKTOP NAVIGATION
          ------------------------------------------------- */}

          <nav
            className="nav__links"
            aria-label="Primary"
          >

            {navLinks.map((link) => (
              <a
                key={link.href}
                className="nav__link mono"
                href={link.href}
                onClick={handleNavLinkClick}
              >

                <span>
                  {link.label}
                </span>

                <span aria-hidden="true">
                  {link.label}
                </span>

              </a>
            ))}

          </nav>


          {/* -------------------------------------------------
              ACTIONS
          ------------------------------------------------- */}

          <div className="nav__actions">

            {/* START A PROJECT */}

            <button
              type="button"
              className="nav__cta mono"
              onClick={handleOpenProject}
            >
              Start a Project
            </button>


            {/* MOBILE MENU */}

            <button
              type="button"
              className={`nav__toggle${
                open ? ' is-open' : ''
              }`}
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="nav-panel"
            >

              <span className="visually-hidden">
                {open
                  ? 'Close menu'
                  : 'Open menu'}
              </span>

              <i aria-hidden="true" />
              <i aria-hidden="true" />

            </button>

          </div>

        </div>


        {/* ---------------------------------------------------
            SCROLL PROGRESS
        --------------------------------------------------- */}

        <div
          className="nav__progress"
          aria-hidden="true"
        >
          <span ref={progressRef} />
        </div>

      </header>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <div
        id="nav-panel"
        className={`menu${open ? ' is-open' : ''}`}
        hidden={!open}
      >

        <div className="menu__inner shell">

          {/* MOBILE LINKS */}

          <nav
            className="menu__links"
            aria-label="Mobile"
          >

            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavLinkClick}
                style={{
                  '--i': i,
                }}
                className="display display--xl"
              >

                <span className="menu__index mono">
                  0{i + 1}
                </span>

                {link.label}

              </a>
            ))}

          </nav>


          {/* MOBILE FOOTER */}

          <div className="menu__foot">

            <a
              className="menu__mail"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>

            <ul className="menu__social mono">

              {socials.map((social) => (
                <li key={social.label}>

                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {social.label}
                  </a>

                </li>
              ))}

            </ul>

          </div>

        </div>

      </div>


      {/* =====================================================
          PROJECT ENQUIRY MODAL
      ===================================================== */}

      {isFormOpen && (

        <div
          className="project-modal"
          onClick={handleCloseProject}
        >

          <div
            className="project-modal__box"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE BUTTON */}

            <button
              type="button"
              className="project-modal__close"
              onClick={handleCloseProject}
              disabled={isSubmitting}
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

              <h3>
                Tell us what
                <span> you're building.</span>
              </h3>

              <p>
                Give us a little context and we'll get back
                to you with the next step.
              </p>

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            <form
              className="project-form"
              onSubmit={handleSubmit}
            >

              {/* NAME + PHONE */}

              <div className="project-form__row">

                <div className="project-form__field">

                  <label htmlFor="nav-project-name">
                    NAME
                  </label>

                  <input
                    id="nav-project-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    minLength={2}
                    required
                    disabled={isSubmitting}
                  />

                </div>


                <div className="project-form__field">

                  <label htmlFor="nav-project-phone">
                    PHONE
                  </label>

                  <input
                    id="nav-project-phone"
                    type="tel"
                    name="phone"
                    placeholder="Your phone"
                    value={formData.phone}
                    onChange={handleChange}
                    minLength={10}
                    required
                    disabled={isSubmitting}
                  />

                </div>

              </div>


              {/* EMAIL */}

              <div className="project-form__field">

                <label htmlFor="nav-project-email">
                  EMAIL
                </label>

                <input
                  id="nav-project-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />

              </div>


              {/* REQUIREMENT */}

              <div className="project-form__field">

                <label htmlFor="nav-project-requirement">
                  PROJECT
                </label>

                <textarea
                  id="nav-project-requirement"
                  name="requirement"
                  placeholder="What are you building?"
                  rows="4"
                  value={formData.requirement}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                className="project-form__submit"
                disabled={isSubmitting}
              >

                <span>
                  {isSubmitting
                    ? 'SENDING...'
                    : 'SEND ENQUIRY'}
                </span>

                <b>
                  {isSubmitting
                    ? '...'
                    : '↗'}
                </b>

              </button>

            </form>

          </div>

        </div>

      )}

    </>
  );
}

