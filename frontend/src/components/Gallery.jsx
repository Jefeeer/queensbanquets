import { galleryMoments } from '../data/siteContent.js';
import SectionHeading from './SectionHeading.jsx';

function Gallery() {
  return (
    <section className="section gallery-section" id="gallery">
      <SectionHeading eyebrow="Coordination moments" title="The quiet details that make events feel effortless.">
        From supplier briefing to ceremony cues, coordination keeps each moment
        clear while the couple and guests enjoy the celebration.
      </SectionHeading>

      <div className="gallery-grid">
        {galleryMoments.map((moment, index) => (
          <article className={`gallery-card gallery-card-${index + 1}`} key={moment}>
            <span>{moment}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
