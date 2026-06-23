import { brand } from '../data/siteContent.js';

function Footer() {
  return (
    <footer className="site-footer">
      <p>{brand.name}</p>
      <p>Elegant weddings, refined receptions, and memorable family celebrations.</p>
      <a href="mailto:queensbanquet07@gmail.com">queensbanquet07@gmail.com</a>
    </footer>
  );
}

export default Footer;
