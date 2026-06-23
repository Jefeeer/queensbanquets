import { useLandingContent } from '../content/LandingContentContext.jsx';
import SectionHeading from './SectionHeading.jsx';

function Experience() {
  const {
    content: { brand, experiencePoints },
  } = useLandingContent();

  return (
    <section className="section split-section" id="experience">
      <div className="split-panel">
        <span className="ornament" />
        <p>{brand.owner} coordinates the flow behind your most important moments.</p>
      </div>

      <div>
        <SectionHeading
          eyebrow="Marou's coordination experience"
          title="Experienced guidance before and during your event."
        >
          Queen's Banquet Events focuses on coordination, not owning the entire
          event. Marou helps bring your plans, suppliers, program, and family
          movement together with clarity.
        </SectionHeading>

        <div className="experience-grid">
          {experiencePoints.map((point) => (
            <article key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
