import { brand, highlights } from '../data/siteContent.js';

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <p className="eyebrow">Queen's Banquet Events</p>
        <h1>Where royal wedding moments become timeless celebrations.</h1>
        <p className="hero-copy">
          Queen's Banquet Events blends grand reception styling, graceful
          hospitality, and refined planning for couples who want every detail to
          feel elegant, personal, and unforgettable.
        </p>
        <p className="owner-line">Owned and managed by {brand.owner}</p>

        <div className="hero-actions">
          <a className="button button-primary" href="#packages">
            Explore Packages
          </a>
          <a className="button button-secondary" href="#gallery">
            View Gallery
          </a>
        </div>

        <dl className="hero-highlights" aria-label="Venue highlights">
          {highlights.map((item) => (
            <div key={item.label}>
              <dt>{item.value}</dt>
              <dd>{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="hero-card" aria-label="Queen's Banquet Events brand presentation">
        <img className="hero-logo" src={brand.logo} alt="Queen's Banquet Events" />
        <div className="arch arch-large" />
        <div className="arch arch-small" />
        <div className="table-setting">
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}

export default Hero;
