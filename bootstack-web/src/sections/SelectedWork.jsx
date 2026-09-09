import "./SelectedWork.css";
const projects = [
  {
    number: "01",
    tags: ["BRANDING", "WEBSITE", "PERFORMANCE MARKETING"],
    description:
      "Reserved for the first brand we take from positioning through to launch — the real brief, the real build, the real numbers, written up in full.",
    artwork: "bars",
  },
  {
    number: "02",
    tags: ["SOFTWARE DEVELOPMENT", "ERP", "AUTOMATION"],
    description:
      "A custom ERP or business application that brings sales, inventory, finance, HR and operations into one system. When one ships, the story goes here — measured, not estimated.",
    artwork: "circle",
  },
  {
    number: "03",
    tags: ["LEAD GENERATION", "GOOGLE ADS", "META ADS"],
    description:
      "A performance programme run end to end — audience research, campaign build, landing pages and tracking. Every figure published here will be one we can show you inside the account.",
    artwork: "grid",
  },
];

function ProjectArtwork({ type }) {
  if (type === "bars") {
    return (
      <div className="project-artwork artwork-bars">
        <span className="art-bar art-bar-blue" />
        <span className="art-bar art-bar-yellow-small" />
        <span className="art-bar art-bar-gray" />
        <span className="art-bar art-bar-yellow-large" />
      </div>
    );
  }

  if (type === "circle") {
    return (
      <div className="project-artwork artwork-circle">
        <span className="circle-ring ring-one" />
        <span className="circle-ring ring-two" />
        <span className="circle-ring ring-three" />
        <span className="circle-ring ring-four" />
        <span className="circle-ring ring-five" />
        <span className="circle-center" />
        <span className="circle-dot" />
      </div>
    );
  }

  return (
    <div className="project-artwork artwork-grid">
      <div className="pixel-container">
        {Array.from({ length: 64 }).map((_, index) => (
          <span
            key={index}
            className={`pixel ${
              [2, 7, 9, 13, 19, 26, 28, 34, 39, 45, 49, 54, 61]
                .includes(index)
                ? "pixel-active"
                : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectSection() {
  return (
    <section className="projects-section">
      <div className="projects-heading">
        <h2>
          SELECTED
          <br />
          WORK
        </h2>

        <p>
          Bootstack is just getting started. Every project on this page will
          be a real, measurable growth story written up only once the numbers
          exist.
        </p>
      </div>

      <div className="projects-list">
        {projects.map((project) => (
          <article className="project-card" key={project.number}>
            <ProjectArtwork type={project.artwork} />

            <div className="project-card-content">
              <div className="project-category">
                CATEGORY / INDUSTRY
              </div>

              <h3>Your project could be here</h3>

              <p className="project-description">
                {project.description}
              </p>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="project-bottom">
                <strong>Open</strong>
                <span>taking on projects for this slot</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
