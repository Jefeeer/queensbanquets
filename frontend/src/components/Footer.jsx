import { useLandingContent } from '../content/LandingContentContext.jsx';

function Footer() {
  const {
    content: { brand, contactChannels },
  } = useLandingContent();
  const emailChannel = contactChannels.find((channel) => channel.label.toLowerCase() === 'email');

  return (
    <footer className="site-footer">
      <p>{brand.name}</p>
      <p>Elegant weddings, refined receptions, and memorable family celebrations.</p>
      {emailChannel ? <a href={emailChannel.href}>{emailChannel.value}</a> : null}
    </footer>
  );
}

export default Footer;
