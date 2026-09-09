import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ServiceDetails.css";

const serviceDetails = {
  "website-development": {
    title: "Website Development",
    category: "DIGITAL DEVELOPMENT",
    icon: "💻",

    intro:
      "A website is more than an online presence — it is your digital identity. We design and develop high-performance websites that communicate your brand value, build trust, and convert visitors into customers.",

    importance: [
      "Creates a strong first impression",
      "Builds brand credibility and trust",
      "Helps generate leads 24/7",
      "Improves customer experience",
      "Provides a foundation for digital growth",
    ],

    process: [
      {
        number: "01",
        title: "Business Understanding",
        description:
          "We analyse your goals, audience, competitors, and industry requirements.",
      },
      {
        number: "02",
        title: "Strategy & Planning",
        description:
          "We create a website structure, user journey, and technology roadmap.",
      },
      {
        number: "03",
        title: "Design & Development",
        description:
          "Our team builds a modern, responsive, and scalable website.",
      },
      {
        number: "04",
        title: "Testing & Optimisation",
        description:
          "We ensure speed, security, performance, and a smooth user experience.",
      },
    ],

    why:
      "A poorly designed website can cost potential customers. A strategic website turns your brand into a powerful digital asset.",

    impactTitle: "Website = 24/7 Sales Representative",

    impact: [
      ["70%", "Trust Building"],
      ["20%", "Lead Generation"],
      ["10%", "Brand Visibility"],
    ],
  },

  "branding-ui-ux": {
    title: "Branding & UI/UX",
    category: "BRANDING & DESIGN",
    icon: "🎨",

    intro:
      "Branding is the process of creating a unique identity that makes your business recognizable, memorable, and valuable in the market.",

    importance: [
      "Differentiates you from competitors",
      "Builds customer loyalty",
      "Creates emotional connection",
      "Increases perceived value",
      "Strengthens market positioning",
    ],

    process: [
      {
        number: "01",
        title: "Brand Discovery",
        description:
          "Understanding your vision, audience, and business goals.",
      },
      {
        number: "02",
        title: "Brand Positioning",
        description:
          "Defining your unique market identity and messaging.",
      },
      {
        number: "03",
        title: "Visual Identity Creation",
        description:
          "Developing a logo, colours, design language, and brand guidelines.",
      },
      {
        number: "04",
        title: "Brand Growth Strategy",
        description:
          "Planning communication across digital platforms.",
      },
    ],

    why:
      "People don't just buy products; they buy brands they trust and connect with.",

    impactTitle: "Strong Brand = Strong Business Value",

    impact: [
      ["40%", "Recognition"],
      ["30%", "Trust"],
      ["20%", "Customer Loyalty"],
      ["10%", "Market Growth"],
    ],
  },

  "social-media-management": {
    title: "Social Media Management",
    category: "SOCIAL MEDIA",
    icon: "📱",

    intro:
      "Social media marketing helps businesses build online communities, increase visibility, and connect with potential customers through strategic content.",

    importance: [
      "Builds brand awareness",
      "Creates customer engagement",
      "Generates organic growth",
      "Improves customer relationships",
      "Supports sales growth",
    ],

    process: [
      {
        number: "01",
        title: "Social Media Audit",
        description:
          "Analyzing your current presence and competitors.",
      },
      {
        number: "02",
        title: "Content Strategy",
        description:
          "Creating content pillars, themes, and posting plans.",
      },
      {
        number: "03",
        title: "Creative Production",
        description:
          "Designing reels, posts, campaigns, and storytelling content.",
      },
      {
        number: "04",
        title: "Performance Analysis",
        description:
          "Tracking insights and improving strategies.",
      },
    ],

    why:
      "Your customers are already online. The right strategy helps your brand stay visible and relevant.",

    impactTitle: "Social Media Growth Formula",

    impact: [
      ["50%", "Content Quality"],
      ["30%", "Consistency"],
      ["20%", "Audience Engagement"],
    ],
  },

  "performance-marketing": {
    title: "Performance Marketing",
    category: "DIGITAL MARKETING",
    icon: "🚀",

    intro:
      "Performance marketing uses data-driven advertising strategies to generate measurable results like leads, sales, and conversions.",

    importance: [
      "Generates targeted leads",
      "Provides measurable ROI",
      "Helps scale faster",
      "Reaches the right audience",
      "Optimises marketing budget",
    ],

    process: [
      {
        number: "01",
        title: "Business & Audience Research",
        description:
          "Understanding your customers and market.",
      },
      {
        number: "02",
        title: "Campaign Strategy",
        description:
          "Creating ad structure, targeting, and creative direction.",
      },
      {
        number: "03",
        title: "Launch & Monitoring",
        description:
          "Managing campaigns and tracking performance.",
      },
      {
        number: "04",
        title: "Optimisation & Scaling",
        description:
          "Improving results through continuous testing.",
      },
    ],

    why:
      "Marketing without measurement is guesswork. Performance marketing turns investment into measurable growth.",

    impactTitle: "Ad Success Depends On",

    impact: [
      ["40%", "Targeting"],
      ["30%", "Creative"],
      ["20%", "Strategy"],
      ["10%", "Optimisation"],
    ],
  },

  "crm-business-automation": {
    title: "CRM & Business Automation",
    category: "AUTOMATION",
    icon: "⚙️",

    intro:
      "CRM and automation systems help businesses manage customers, sales processes, and operations efficiently through technology.",

    importance: [
      "Organises customer data",
      "Improves sales follow-ups",
      "Reduces manual work",
      "Increases team productivity",
      "Helps business decisions with data",
    ],

    process: [
      {
        number: "01",
        title: "Process Analysis",
        description:
          "Understanding your existing workflow.",
      },
      {
        number: "02",
        title: "System Planning",
        description:
          "Designing customised CRM solutions.",
      },
      {
        number: "03",
        title: "Implementation",
        description:
          "Setting up automation, dashboards, and integrations.",
      },
      {
        number: "04",
        title: "Training & Support",
        description:
          "Helping your team adopt the system effectively.",
      },
    ],

    why:
      "Growing businesses need systems, not just hard work. Automation creates efficiency and scalability.",

    impactTitle: "Business Efficiency Growth",

    impact: [
      ["40%", "Automation"],
      ["30%", "Data Management"],
      ["20%", "Process Improvement"],
      ["10%", "Reporting"],
    ],
  },

  "software-development": {
    title: "Software Development",
    category: "SOFTWARE",
    icon: "⚙️",

    intro:
      "Develop custom software solutions that simplify operations, improve efficiency, and support your business goals.",

    importance: [
      "Automates business processes",
      "Improves operational efficiency",
      "Reduces repetitive manual work",
      "Creates scalable business systems",
      "Supports long-term digital growth",
    ],

    process: [
      {
        number: "01",
        title: "Requirement Analysis",
        description:
          "Understanding your business requirements and workflows.",
      },
      {
        number: "02",
        title: "Architecture & Planning",
        description:
          "Designing the technology architecture and development roadmap.",
      },
      {
        number: "03",
        title: "Development",
        description:
          "Building secure, scalable, and high-performance software.",
      },
      {
        number: "04",
        title: "Testing & Deployment",
        description:
          "Testing, optimising, deploying, and supporting the solution.",
      },
    ],

    why:
      "Custom software helps businesses replace inefficient processes with scalable digital systems.",

    impactTitle: "Custom Software Business Impact",

    impact: [
      ["40%", "Efficiency"],
      ["30%", "Automation"],
      ["20%", "Scalability"],
      ["10%", "Cost Optimisation"],
    ],
  },

  "app-development": {
    title: "App Development",
    category: "MOBILE DEVELOPMENT",
    icon: "📲",

    intro:
      "Create secure, high-performance mobile applications that deliver seamless experiences on Android and iOS.",

    importance: [
      "Provides direct customer access",
      "Improves customer engagement",
      "Creates new digital experiences",
      "Supports business growth",
      "Builds stronger customer relationships",
    ],

    process: [
      {
        number: "01",
        title: "Idea & Requirement Analysis",
        description:
          "Understanding your app concept, users, and business goals.",
      },
      {
        number: "02",
        title: "UX/UI Design",
        description:
          "Creating intuitive and engaging mobile experiences.",
      },
      {
        number: "03",
        title: "App Development",
        description:
          "Developing secure and high-performance Android and iOS applications.",
      },
      {
        number: "04",
        title: "Testing & Launch",
        description:
          "Testing the application and preparing it for deployment.",
      },
    ],

    why:
      "A well-designed mobile application creates a direct and convenient connection between your business and customers.",

    impactTitle: "Mobile Growth Impact",

    impact: [
      ["40%", "User Experience"],
      ["30%", "Engagement"],
      ["20%", "Retention"],
      ["10%", "Growth"],
    ],
  },

  "marketing-automation": {
    title: "Marketing Automation",
    category: "MARKETING TECHNOLOGY",
    icon: "🤖",

    intro:
      "Automate repetitive marketing tasks, nurture leads, and improve customer engagement with smart workflows.",

    importance: [
      "Saves valuable time",
      "Improves lead nurturing",
      "Reduces repetitive tasks",
      "Improves customer engagement",
      "Creates scalable marketing processes",
    ],

    process: [
      {
        number: "01",
        title: "Workflow Analysis",
        description:
          "Understanding your existing marketing processes.",
      },
      {
        number: "02",
        title: "Automation Strategy",
        description:
          "Identifying repetitive tasks and automation opportunities.",
      },
      {
        number: "03",
        title: "Implementation",
        description:
          "Building automated workflows and integrations.",
      },
      {
        number: "04",
        title: "Monitoring & Optimisation",
        description:
          "Tracking automation performance and improving workflows.",
      },
    ],

    why:
      "Smart automation allows your team to spend less time on repetitive tasks and more time on business growth.",

    impactTitle: "Marketing Automation Impact",

    impact: [
      ["40%", "Automation"],
      ["30%", "Lead Nurturing"],
      ["20%", "Engagement"],
      ["10%", "Efficiency"],
    ],
  },
};

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const service = serviceDetails[serviceId];

  if (!service) {
    return (
      <section className="service-details service-details--not-found">
        <div className="service-details__not-found">
          <span>404</span>
          <h1>Service Not Found</h1>
          <p>
            The service you are looking for does not exist.
          </p>

          <button onClick={() => navigate("/#services")}>
            Back to Services
          </button>
        </div>
      </section>
    );
  }

  return (
    <main className="service-details">

      {/* ================= HERO ================= */}

      <section className="service-details__hero">
        <div className="service-details__hero-glow"></div>

        <div className="service-details__container">

          <button
            className="service-details__back"
            onClick={() => navigate("/#services")}
          >
            ← Back to Services
          </button>

          <div className="service-details__hero-content">

            <span className="service-details__category">
              {service.category}
            </span>

            <h1>{service.title}</h1>

            <p>{service.intro}</p>

          </div>

        </div>
      </section>

      {/* ================= IMPORTANCE ================= */}

      <section className="service-details__section">
        <div className="service-details__container">

          <div className="service-details__section-heading">
            <span>WHY IT MATTERS</span>

            <h2>
              Built around your
              <strong> business goals.</strong>
            </h2>
          </div>

          <div className="service-details__importance">

            {service.importance.map((item, index) => (
              <div
                className="importance-card"
                key={index}
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p>{item}</p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= PROCESS ================= */}

      <section className="service-details__process">
        <div className="service-details__container">

          <div className="service-details__section-heading">
            <span>OUR PROCESS</span>

            <h2>
              How we turn ideas into
              <strong> results.</strong>
            </h2>
          </div>

          <div className="process-grid">

            {service.process.map((step) => (
              <div
                className="process-card"
                key={step.number}
              >
                <span className="process-card__number">
                  {step.number}
                </span>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= WHY ================= */}

      <section className="service-details__why">
        <div className="service-details__container">

          <div className="why-box">

            <span>WHY THIS MATTERS</span>

            <h2>
              {service.why}
            </h2>

          </div>

        </div>
      </section>

      {/* ================= IMPACT ================= */}

      <section className="service-details__impact">
        <div className="service-details__container">

          <div className="service-details__section-heading">
            <span>BUSINESS IMPACT</span>

            <h2>
              Measure what
              <strong> matters.</strong>
            </h2>
          </div>

          <div className="impact-grid">

            {service.impact.map(([percentage, label]) => (
              <div
                className="impact-card"
                key={label}
              >
                <strong>{percentage}</strong>
                <span>{label}</span>
              </div>
            ))}

          </div>

          <div className="impact-title">
            {service.impactTitle}
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="service-details__cta">
        <div className="service-details__container">

          <div className="details-cta-box">

            <span>LET'S BUILD TOGETHER</span>

            <h2>
              Ready to move your
              <strong> business forward?</strong>
            </h2>

            <p>
              Let's discuss your requirements and create
              a solution designed for your business.
            </p>

            <button
              onClick={() => navigate("/#contact")}
            >
              Start a Conversation
              <span>↗</span>
            </button>

          </div>

        </div>
      </section>

    </main>
  );
}