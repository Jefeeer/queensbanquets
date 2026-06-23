import { useLandingContent } from '../content/LandingContentContext.jsx';
import ScrollReveal from './ScrollReveal.jsx';

function Footer() {
  const {
    content: { brand, contactChannels },
  } = useLandingContent();
  const emailChannel = contactChannels.find((channel) => channel.label.toLowerCase() === 'email');

  return (
    <ScrollReveal as="footer" className="site-footer" variant="fade-up">
      <p>{brand.name}</p>
      <p>Elegant weddings, refined receptions, and memorable family celebrations.</p>
      {emailChannel ? <a href={emailChannel.href}>{emailChannel.value}</a> : null}
    </ScrollReveal>
  );
}

export default Footer;
