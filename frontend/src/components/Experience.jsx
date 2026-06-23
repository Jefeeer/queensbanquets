import { useLandingContent } from '../content/LandingContentContext.jsx';
import ScrollReveal from './ScrollReveal.jsx';
import SectionHeading from './SectionHeading.jsx';

function Experience() {
  const {
    content: { brand, experiencePoints },
  } = useLandingContent();

  return (
    <section className="section split-section" id="experience">
      <ScrollReveal as="div" className="split-panel" variant="fade-left">
        <span className="ornament" />
        <p>{brand.owner} coordinates the flow behind your most important moments.</p>
      </ScrollReveal>

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
          {experiencePoints.map((point, index) => (
            <ScrollReveal as="article" delay={index * 120} key={point.title} variant="fade-up">
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
