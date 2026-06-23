import ScrollReveal from './ScrollReveal.jsx';

function SectionHeading({ eyebrow, title, children }) {
  return (
    <ScrollReveal className="section-heading" variant="fade-up">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </ScrollReveal>
  );
}

export default SectionHeading;
