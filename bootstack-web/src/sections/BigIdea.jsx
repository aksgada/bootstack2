import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import Marquee from '../components/Marquee.jsx';
import SectionMarker from '../components/SectionMarker.jsx';
import './BigIdea.css';


/* =========================================================
   SERVICES DATA
========================================================= */

const SERVICES = [
  {
    number: '01',
    category: 'TECHNOLOGY',
    title: 'ERP Solutions',
    body:
      'Every business works differently, so your software should too. We build custom ERP solutions that bring your sales, inventory, finance, HR, and operations together in one easy-to-use system.',
    tag: 'SYSTEMS',
    accent: '#F7AA00',
    icon: 'erp',

    whyItMatters:
      'Managing multiple tools and spreadsheets can slow your team down. A custom ERP keeps everything organized, saves time, and helps you make better business decisions.',

    whyBootstack:
      "We don't believe in one-size-fits-all software. We understand your business, design the right solution, and build an ERP that grows with you.",

    whatWeDoBest: [
      'Custom ERP Development',
      'CRM Integration',
      'Inventory Management',
      'HR & Payroll',
      'Finance & Reports',
    ],

    process:
      'We understand your business, plan the solution, develop the software, test everything carefully, and provide ongoing support after launch.',
  },

  {
    number: '02',
    category: 'MOBILE',
    title: 'Mobile App Development',
    body:
      "We create mobile apps that are fast, easy to use, and built around your business goals. Whether it's for your customers or your team, we make apps that deliver real value.",
    tag: 'APPS',
    accent: '#2357B4',
    icon: 'mobile',

    whyItMatters:
      'People expect everything to be available on their phones. A mobile app helps you stay connected with customers, improve services, and grow your business.',

    whyBootstack:
      'We focus on building reliable, user-friendly apps that not only look great but also perform smoothly across devices.',

    whatWeDoBest: [
      'Android Apps',
      'iOS Apps',
      'Cross-Platform Apps',
      'Business Applications',
      'API Integration',
    ],

    process:
      'We discuss your idea, design the user experience, build the application, test every feature, and help you launch successfully.',
  },

  {
    number: '03',
    category: 'WEB',
    title: 'High-Performing Websites',
    body:
      'Your website is often the first impression of your business. We build modern, responsive websites that look professional, load quickly, and help turn visitors into customers.',
    tag: 'WEBSITES',
    accent: '#4BA8C4',
    icon: 'web',

    whyItMatters:
      'A great website builds trust, improves your online presence, and works as a powerful tool to generate leads and sales.',

    whyBootstack:
      'We combine clean design, strong performance, and SEO best practices to create websites that support your business growth.',

    whatWeDoBest: [
      'Business Websites',
      'Corporate Websites',
      'eCommerce Stores',
      'Landing Pages',
      'Website Optimization',
    ],

    process:
      'We learn about your business, design the website, develop every page, optimize performance, and provide support after launch.',
  },

  {
    number: '04',
    category: 'GROWTH',
    title: 'Lead Generation',
    body:
      'We help businesses reach the right audience through digital marketing strategies that generate quality leads and create new business opportunities.',
    tag: 'MARKETING',
    accent: '#F7AA00',
    icon: 'growth',

    whyItMatters:
      'Getting more visitors is only part of the journey. The right lead generation strategy brings people who are genuinely interested in your products or services.',

    whyBootstack:
      'We create data-driven campaigns focused on delivering real leads, measurable growth, and a better return on your marketing investment.',

    whatWeDoBest: [
      'Google Ads',
      'Meta Ads',
      'SEO',
      'Landing Pages',
      'Marketing Automation',
    ],

    process:
      'We research your audience, create a marketing strategy, launch campaigns, optimize performance, and continuously improve results.',
  },

  {
    number: '05',
    category: 'BRAND',
    title: 'Brand Identity & Branding',
    body:
      'Your brand is more than just a logo. We help businesses build a strong identity that reflects their values, connects with customers, and stands out in the market.',
    tag: 'IDENTITY',
    accent: '#2357B4',
    icon: 'brand',

    whyItMatters:
      'A consistent brand builds trust, creates recognition, and helps customers remember your business over your competitors.',

    whyBootstack:
      'We create brands with purpose—combining strategy, creativity, and consistency to give your business a professional and lasting identity.',

    whatWeDoBest: [
      'Brand Strategy',
      'Logo Design',
      'Visual Identity',
      'Brand Guidelines',
      'Marketing Assets',
    ],

    process:
      'We understand your business, define your brand strategy, design your identity, create all brand assets, and ensure consistency across every platform.',
  },
];


/* =========================================================
   SVG ICON
========================================================= */

function ServiceIcon({ name, className = '' }) {
  return (
    <svg
      className={`service-svg-icon ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <use href={`/service-icons.svg#${name}`} />
    </svg>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function BigIdea() {
  const rootRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeService, setActiveService] = useState(null);

  const service = SERVICES[activeIndex];


  /* =======================================================
     SECTION ANIMATION
  ======================================================= */

  useEffect(() => {
    const ctx = gsap.context(() => {
      const introElements = rootRef.current?.querySelectorAll(
        '.idea__intro > *'
      );

      const showcaseElements = rootRef.current?.querySelectorAll(
        '.service-selector, .service-detail'
      );

      if (prefersReducedMotion()) {
        if (introElements?.length) {
          gsap.set(introElements, {
            opacity: 1,
            y: 0,
          });
        }

        if (showcaseElements?.length) {
          gsap.set(showcaseElements, {
            opacity: 1,
            y: 0,
          });
        }

        return;
      }

      /* Intro animation */

      if (introElements?.length) {
        gsap.fromTo(
          introElements,
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
              trigger: rootRef.current?.querySelector(
                '.idea__intro'
              ),
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }


      /* Services animation */

      if (showcaseElements?.length) {
        gsap.fromTo(
          showcaseElements,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',

            scrollTrigger: {
              trigger: rootRef.current?.querySelector(
                '.services-showcase'
              ),
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

    }, rootRef);

    return () => ctx.revert();
  }, []);


  /* =======================================================
     ACTIVE SERVICE ANIMATION
  ======================================================= */

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const elements = rootRef.current?.querySelectorAll(
      '.service-detail__animate'
    );

    if (!elements?.length) return;

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.05,
        ease: 'power2.out',
      }
    );

  }, [activeIndex]);


  /* =======================================================
     MODAL
  ======================================================= */

  useEffect(() => {
    if (!activeService) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveService(null);
      }
    };

    document.addEventListener(
      'keydown',
      handleKeyDown
    );

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [activeService]);


  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <section
      ref={rootRef}
      id="idea"
      className="idea band"
      data-bg="mist"
    >

      {/* =================================================
          TOP MARQUEE
      ================================================= */}

      <div className="idea__seam">

        <Marquee
          items={[
            'Brand',
            'System',
            'Growth',
          ]}
          size="lg"
          speed={30}
        />

      </div>


      <div className="shell">

        {/* =================================================
            SECTION MARKER
        ================================================= */}

        <SectionMarker
          index="02"
          title="What We Build"
        />


        {/* =================================================
            INTRO
        ================================================= */}

        <div className="idea__intro">

          <div className="idea__intro-copy">

            <span className="idea__eyebrow mono">
              OUR SERVICES
            </span>

            <h2 className="idea__heading">

              Digital solutions

              <span>
                that drive
              </span>

              <strong>
                real impact.
              </strong>

            </h2>

          </div>


          <div className="idea__intro-side">

            <span
              className="idea__intro-line"
              aria-hidden="true"
            />

            <p className="idea__intro-text">
              We combine strategy, design,
              technology and growth to build
              scalable digital experiences that
              move ambitious businesses forward.
            </p>

          </div>

        </div>


        {/* =================================================
            SERVICE SHOWCASE
        ================================================= */}

        <div className="services-showcase">


          {/* =================================================
              LEFT SERVICE SELECTOR
          ================================================= */}

          <div className="service-selector">


            {/* Selector Heading */}

            <div className="service-selector__heading">

              <span>
                01
              </span>

              <span>
                SELECT A SERVICE
              </span>

            </div>


            {/* Service List */}

            <div className="service-selector__list">

              {SERVICES.map((item, index) => {

                const isActive =
                  activeIndex === index;

                return (
                  <button
                    key={item.number}
                    type="button"

                    className={`
                      service-selector__item
                      ${
                        isActive
                          ? 'service-selector__item--active'
                          : ''
                      }
                    `}

                    style={{
                      '--service-accent':
                        item.accent,
                    }}

                    onClick={() =>
                      setActiveIndex(index)
                    }

                    aria-pressed={isActive}
                  >

                    {/* Icon */}

                    <span className="service-selector__icon" aria-hidden="true">
                      <ServiceIcon name={item.icon} />
                    </span>


                    {/* Title */}

                    <span className="service-selector__title">
                      {item.title}
                    </span>


                    {/* Arrow */}

                    <span
                      className="service-selector__arrow"
                      aria-hidden="true"
                    >
                      →
                    </span>

                  </button>
                );

              })}

            </div>


            {/* Selector Footer */}

            <div className="service-selector__bottom">

              <span>
                BOOTSTACK
              </span>

              <span>
                05 SERVICES
              </span>

            </div>

          </div>


          {/* =================================================
              RIGHT SERVICE DETAIL
          ================================================= */}

          <article
            className="service-detail"

            style={{
              '--service-accent':
                service.accent,
            }}
          >


            {/* Background Glow */}

            <div
              className="service-detail__glow"
              aria-hidden="true"
            />


            {/* =================================================
                DETAIL HEADER
            ================================================= */}

            <div className="service-detail__top">

              <div className="service-detail__category">

                <span
                  className="service-detail__dot"
                  aria-hidden="true"
                />

                {service.category}

              </div>


              <span className="service-detail__number">
                {service.number}
              </span>

            </div>


            {/* =================================================
                SERVICE VISUAL
            ================================================= */}

            <div className="service-detail__visual">

              <div className="service-detail__icon">
                <ServiceIcon name={service.icon} />
              </div>


              <div
                className="
                  service-detail__ring
                  service-detail__ring--one
                "
                aria-hidden="true"
              />


              <div
                className="
                  service-detail__ring
                  service-detail__ring--two
                "
                aria-hidden="true"
              />

            </div>


            {/* =================================================
                SERVICE CONTENT
            ================================================= */}

            <div className="service-detail__content">

              <span
                className="
                  service-detail__tag
                  service-detail__animate
                "
              >
                {service.tag}
              </span>


              <h3
                className="
                  service-detail__title
                  service-detail__animate
                "
              >
                {service.title}
              </h3>


              <p
                className="
                  service-detail__description
                  service-detail__animate
                "
              >
                {service.body}
              </p>

            </div>


            {/* =================================================
                FEATURES
            ================================================= */}

            <div className="service-detail__features">

              {service.whatWeDoBest
                .slice(0, 4)
                .map((feature, index) => (

                  <div
                    key={feature}
                    className="
                      service-feature
                      service-detail__animate
                    "
                  >

                    <span
                      className="service-feature__number"
                    >
                      {String(index + 1).padStart(
                        2,
                        '0'
                      )}
                    </span>

                    <span>
                      {feature}
                    </span>

                  </div>

                ))}

            </div>


            {/* =================================================
                DETAIL FOOTER
            ================================================= */}

            <div className="service-detail__footer">


              {/* Explore */}

              <button
                type="button"
                className="service-detail__button"
                onClick={() => setActiveService(service)}
                aria-haspopup="dialog"
                aria-label={`Explore ${service.title}`}
              >
                <span>Explore Service</span>
                <span aria-hidden="true">↗</span>
              </button>


              {/* Progress */}

              <div
                className="service-detail__progress"
                aria-hidden="true"
              >

                <span
                  style={{
                    width: `${
                      ((activeIndex + 1) /
                        SERVICES.length) *
                      100
                    }%`,
                  }}
                />

              </div>

            </div>

          </article>

        </div>


        {/* =================================================
            BOTTOM STRIP
        ================================================= */}

        <div className="idea__bottom">

          <div className="idea__bottom-brand">

            <span
              className="idea__bottom-icon"
              aria-hidden="true"
            >
              ✦
            </span>

            <div>

              <strong>
                ONE PARTNER.
              </strong>

              <span>
                ENDLESS POSSIBILITIES.
              </span>

            </div>

          </div>


          <div className="idea__bottom-points">

            <span>
              Strategy First
            </span>

            <span>
              Built To Scale
            </span>

            <span>
              Focused On Results
            </span>

          </div>

        </div>

      </div>


      {/* =====================================================
          SERVICE MODAL
      ===================================================== */}

      {activeService && (
        <div
          className="service-modal__overlay"
          onClick={() => setActiveService(null)}
          role="presentation"
        >
          <div
            className="service-modal"
            style={{ '--accent': activeService.accent }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
          >
            <button
              type="button"
              className="service-modal__close"
              onClick={() => setActiveService(null)}
              aria-label="Close service details"
            >
              <span aria-hidden="true">×</span>
            </button>

            <div className="service-modal__header">
              <div className="service-modal__number">
                {activeService.number}
              </div>

              <div className="service-modal__heading">
                <span className="service-modal__category mono">
                  {activeService.category}
                </span>
                <h3 id="service-modal-title">
                  {activeService.title}
                </h3>
                <p>{activeService.body}</p>
              </div>
            </div>

            <div className="service-modal__body">
              <section className="service-modal__section service-modal__section--highlight">
                <div className="service-modal__section-label">01</div>
                <div>
                  <h4>Why It Matters</h4>
                  <p>{activeService.whyItMatters}</p>
                </div>
              </section>

              <section className="service-modal__section service-modal__section--highlight">
                <div className="service-modal__section-label">02</div>
                <div>
                  <h4>Why Bootstack</h4>
                  <p>{activeService.whyBootstack}</p>
                </div>
              </section>

              <section className="service-modal__section">
                <div className="service-modal__section-label">03</div>
                <div>
                  <h4>What We Do Best</h4>
                  <ul className="service-modal__list">
                    {activeService.whatWeDoBest.map((item, index) => (
                      <li key={item}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="service-modal__section">
                <div className="service-modal__section-label">04</div>
                <div>
                  <h4>Our Process</h4>
                  <p>{activeService.process}</p>
                </div>
              </section>
            </div>

            <div className="service-modal__footer">
              <div>
                <span className="service-modal__footer-kicker">
                  BOOTSTACK / {activeService.tag}
                </span>
                <strong>Ready to build something better?</strong>
              </div>

              <a
                href="#contact"
                onClick={() => setActiveService(null)}
              >
                Start a project
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}