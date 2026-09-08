import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useReveal from "../hooks/useReveal";
import "./Bigidea.css";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

const icons = {
  erp: "▦",
  mobile: "▯",
  website: "◌",
  leads: "↗",
  branding: "✦",
};

const services = [
  {
    id: "software-development",
    title: "ERP Solutions",
    icon: icons.erp,
    description:
      "Streamline operations with custom ERP systems for sales, inventory, projects, finance, HR and workflows.",
    features: ["Inventory Management", "Finance & Accounting", "HR & Payroll", "CRM Integration"],
  },
  {
    id: "app-development",
    title: "Mobile App Development",
    icon: icons.mobile,
    description:
      "Build fast, intuitive and scalable mobile applications with seamless experiences across modern devices.",
    features: ["Android Applications", "iOS Applications", "Cross-Platform Apps", "API Integration"],
  },
  {
    id: "website-development",
    title: "High-Performing Websites",
    icon: icons.website,
    description:
      "Create modern, responsive and high-performing websites that strengthen your brand and convert visitors.",
    features: ["Responsive Design", "SEO Optimization", "Performance Optimization", "CMS Integration"],
  },
  {
    id: "performance-marketing",
    title: "Lead Generation",
    icon: icons.leads,
    description:
      "Generate high-quality leads through data-driven digital strategies designed to increase business opportunities.",
    features: ["Landing Pages", "Conversion Optimization", "Marketing Automation", "Lead Tracking"],
  },
  {
    id: "branding-uiux",
    title: "Brand Identity & Branding",
    icon: icons.branding,
    description:
      "Build a memorable brand identity with a consistent visual language that communicates your values.",
    features: ["Logo Design", "Visual Identity", "Brand Guidelines", "Marketing Materials"],
  },
];

export default function WhatWeBuild() {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(0);
  const headerRef = useReveal();
  const layoutRef = useReveal({ threshold: 0.05 });
  const currentService = services[activeService];

  return (
    <section className="build-section" id="what-we-build">
      <div className="build-container">
        <div className="build-header reveal" ref={headerRef}>
          <span className="build-eyebrow">WHAT WE BUILD</span>
          <h2>Digital Solutions <span>That Work.</span></h2>
          <p>
            Technology and growth solutions designed around your business,
            your customers and your goals.
          </p>
        </div>

        <div className="build-layout" ref={layoutRef}>
          <div className="build-services">
            {services.map((service, index) => (
              <button
                key={service.id}
                type="button"
                className={`build-service ${
                  activeService === index ? "build-service--active" : ""
                }`}
                onClick={() => setActiveService(index)}
              >
                <span className="build-service__icon">{service.icon}</span>
                <span className="build-service__title">{service.title}</span>
                <span className="build-service__arrow"><ArrowIcon /></span>
              </button>
            ))}
          </div>

          <div className="build-details build-details--fade" key={currentService.id}>
            <div className="build-details__top">
              <div className="build-details__icon">{currentService.icon}</div>
              <div>
                <span className="build-details__label">SERVICE</span>
                <h3>{currentService.title}</h3>
              </div>
            </div>

            <p className="build-details__description">
              {currentService.description}
            </p>

            <div className="build-features">
              {currentService.features.map((feature, index) => (
                <div className="build-feature" key={feature}>
                  <span className="build-feature__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
}
