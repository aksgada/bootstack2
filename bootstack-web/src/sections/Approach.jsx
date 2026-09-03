import SectionMarker from '../components/SectionMarker.jsx';
import { stages } from '../data/approach';
import './Approach.css';

/**
 * Section 06 — From idea to impact.
 *
 * Static grid of the six stages. No scroll pinning, no scrub, no motion —
 * just the process laid out plainly.
 */
export default function Approach() {
  return (
    <section className="approach band" data-bg="mist">
      <div className="approach__inner">
        <div className="shell">
          <SectionMarker index="06" title="The Bootstack Approach" note="Six stages" />

          <div className="approach__head">
            <h2 className="display display--xxl">
              From idea
            
              to <span className="accent">impact.</span>
            </h2>
            <p className="body">
              The same route every time, whether we are naming a company or rebuilding a
              funnel. It is what keeps the work honest.
            </p>
          </div>
        </div>

        <div className="shell">
          <ol className="approach__track">
            {stages.map((stage) => (
              <li className="approach__stage" key={stage.index}>
                <span className="approach__num display">{stage.index}</span>
                <div className="approach__stage-body">
                  <h3 className="approach__title display">{stage.title}</h3>
                  <p className="approach__line">{stage.line}</p>
                  <p className="approach__text">{stage.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}