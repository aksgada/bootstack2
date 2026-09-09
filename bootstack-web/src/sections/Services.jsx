import React from "react";
import { useNavigate } from "react-router-dom";
import serviceData from "../data/service.json";
import "./Services.css";

const Services = () => {
  const navigate = useNavigate();

  // Supports both:
  // [ ... ]
  // and
  // { services: [ ... ] }
  const services = Array.isArray(serviceData)
    ? serviceData
    : serviceData?.services || [];

  const handleExplore = (service) => {
    if (!service?.id) {
      console.error("Service ID is missing:", service);
      return;
    }

    navigate(`/services/${service.id}`);
  };

  return (
    <section className="services" id="services">
      <div className="services__container">

        {/* Header */}
        <div className="services__header">

          <div className="services__eyebrow">
            <span className="services__eyebrow-line"></span>
            WHAT WE DO
          </div>

          <h2 className="services__title">
            Digital solutions
            <span>built for growth.</span>
          </h2>

          <p className="services__description">
            We combine strategy, technology, design and marketing to create
            digital experiences that help businesses grow faster.
          </p>

        </div>

        {/* Cards */}
        <div className="services__grid">

          {services.map((service, index) => (
            <article
              className="service-card"
              key={service.id || index}
            >

              {/* Top */}
              <div className="service-card__top">

                <span className="service-card__number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="service-card__category">
                  {service.category}
                </span>

              </div>

              {/* Content */}
              <div className="service-card__content">

                <h3 className="service-card__title">
                  {service.title}
                </h3>

                <p className="service-card__description">
                  {service.description}
                </p>

              </div>

              {/* Bottom */}
              <div className="service-card__bottom">

                <button
                  type="button"
                  className="service-card__button"
                  onClick={() => handleExplore(service)}
                >
                  <span>Explore More</span>

                  <span className="service-card__arrow">
                    →
                  </span>
                </button>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Services;