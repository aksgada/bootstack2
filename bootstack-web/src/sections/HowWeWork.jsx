import { useState } from "react";
import useReveal from "../hooks/useReveal";
import "./HowWeWork.css";

const processSteps = [
  {
    number: "01",
    title: "Consult",
    icon: "⌕",
    description:
      "We start by understanding your business inside-out—your goals, challenges, and opportunities.",
  },
  {
    number: "02",
    title: "Strategy",
    icon: "♧",
    description:
      "We create a clear strategy that aligns technology, design, and business objectives to achieve measurable results.",
  },
  {
    number: "03",
    title: "Build",
    icon: "</>",
    description:
      "Our team turns the strategy into a powerful digital solution using modern technologies and scalable architecture.",
  },
  {
    number: "04",
    title: "Launch",
    icon: "↗",
    description:
      "We carefully test, optimize, and launch your product to ensure a smooth and successful digital experience.",
  },
  {
    number: "05",
    title: "Scale",
    icon: "⌁",
    description:
      "Once live, we continuously improve and scale your solution as your business grows.",
  },
];

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(2);
  const headerRef = useReveal();
  const cardRef = useReveal({ threshold: 0.1 });
  const activeContent = processSteps[activeStep];

  return (
    <section className="how-work" id="how-we-work">
      <div className="how-work__glow how-work__glow--one" aria-hidden="true" />
      <div className="how-work__glow how-work__glow--two" aria-hidden="true" />

      <div className="how-work__container">
        <div className="how-work__header reveal" ref={headerRef}>
          <span className="how-work__eyebrow">OUR PROCESS</span>
          <h2>How We <span>Work.</span></h2>
          <div className="how-work__header-line" />
        </div>

        <div className="process-wrapper reveal" ref={cardRef}>
          <div className="process-tabs">
            <div className="process-progress" aria-hidden="true">
              <span
                style={{
                  width: `${(activeStep / (processSteps.length - 1)) * 100}%`,
                }}
              />
            </div>

            {processSteps.map((step, index) => (
              <button
                type="button"
                key={step.number}
                className={`process-tab ${activeStep === index ? "is-active" : ""}`}
                style={{ "--tab-delay": `${index * 0.08}s` }}
                onClick={() => setActiveStep(index)}
                aria-label={`View ${step.title} step`}
                aria-pressed={activeStep === index}
              >
                <span className="process-tab__icon">{step.icon}</span>
                <span className="process-tab__number">{step.number}</span>
                <span className="process-tab__title">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="process-detail" key={activeStep}>
          <div className="process-detail__number">{activeContent.number}</div>

          <div className="process-detail__content">
            <span className="process-detail__label">STEP {activeContent.number}</span>
            <h3>{activeContent.title}</h3>
            <p>{activeContent.description}</p>
          </div>

          <div className="process-detail__decor" aria-hidden="true">→</div>
        </div>
      </div>
    </section>
  );
}
