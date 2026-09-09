import { useState } from "react";
import "./FAQSection.css";

const faqs = [
  {
    question: "What services does Bootstack offer?",
    answer:
      "We provide branding, website development, performance marketing, software development, ERP solutions and automation to help businesses grow.",
  },
  {
    question: "How does Bootstack work?",
    answer:
      "We start by understanding your goals, audience and business requirements, then plan, build and measure the solution from start to finish.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Project timelines depend on the scope and complexity. Once we understand your requirements, we provide a clear estimated timeline.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Every project is different. Pricing depends on the scope, features and level of support required.",
  },
  {
    question: "Do you work with small businesses?",
    answer:
      "Yes. We work with businesses at different stages and tailor our approach according to the project's goals and budget.",
  },
  {
    question: "Can you redesign our existing website?",
    answer:
      "Absolutely. We can review your existing website, identify opportunities and redesign it around your business goals and users.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. Ongoing support, maintenance and optimisation can be provided after the initial project is completed.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">

        <div className="faq-heading">
          <span>FREQUENTLY ASKED QUESTIONS</span>
          <h2>FAQs</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                className={`faq-item ${isOpen ? "faq-item-open" : ""}`}
                key={faq.question}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>

                  <span className="faq-icon">
                    <span className="faq-horizontal" />
                    <span
                      className={`faq-vertical ${
                        isOpen ? "faq-vertical-open" : ""
                      }`}
                    />
                  </span>
                </button>

                <div className="faq-answer-wrapper">
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
