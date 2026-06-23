import { useState } from 'react';
import { useLandingContent } from '../content/LandingContentContext.jsx';
import ScrollReveal from './ScrollReveal.jsx';
import SectionHeading from './SectionHeading.jsx';

function Experience() {
  const {
    content: { experienceContent, experiencePoints },
  } = useLandingContent();
  const [photoBroken, setPhotoBroken] = useState(false);

  const panelQuote =
    experienceContent?.panelQuote ??
    'Marou Madrid coordinates the flow behind your most important moments.';
  const photoUrl = experienceContent?.photoUrl ?? '';
  const showPhoto = Boolean(photoUrl) && !photoBroken;

  return (
    <section className="section split-section" id="experience">
      <ScrollReveal
        as="div"
        className={`split-panel${showPhoto ? ' split-panel-has-photo' : ''}`}
        variant="fade-left"
      >
        <span className="ornament" aria-hidden="true" />
        <p>{panelQuote}</p>
        {showPhoto ? (
          <div className="split-panel-photo">
            <img
              src={photoUrl}
              alt="Marou Madrid coordination experience"
              onError={() => setPhotoBroken(true)}
            />
          </div>
        ) : null}
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
