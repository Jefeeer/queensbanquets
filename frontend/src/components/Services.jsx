import { services } from '../data/siteContent.js';
import SectionHeading from './SectionHeading.jsx';

function Services() {
  return (
    <section className="section" id="services">
      <SectionHeading eyebrow="Coordination services" title="Support for the flow of your celebration.">
        Choose consultation, on-the-day coordination, or fuller planning support
        depending on what your wedding or event still needs.
      </SectionHeading>

      <div className="card-grid">
        {services.map((service, index) => (
          <article className="service-card" key={service.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;
