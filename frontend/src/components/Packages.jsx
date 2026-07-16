import { useLandingContent } from '../content/LandingContentContext.jsx';
import ScrollReveal from './ScrollReveal.jsx';

function Packages() {
  const {
    content: { packages },
  } = useLandingContent();

  return (
    <section className="py-40 bg-surface" id="packages">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-primary font-label-sm uppercase tracking-widest mb-4 block animate-pulse">
              Bespoke Packages
            </span>
            <h2 className="font-headline-lg text-headline-lg">
              Tiered Experiences Tailored to Your Legacy
            </h2>
          </div>
          <p className="font-body-lg text-tertiary max-w-sm leading-relaxed">
            Every package is a starting point for a conversation about your unique requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-stretch">
          {packages.map((eventPackage, index) => {
            const isFeatured = eventPackage.featured;

            if (isFeatured) {
              return (
                <ScrollReveal
                  as="div"
                  className="bg-on-surface p-12 flex flex-col text-white shadow-2xl relative lg:-translate-y-10 z-10 transition-all duration-500 hover:-translate-y-12"
                  delay={index * 120}
                  key={eventPackage.name}
                  variant="fade-up"
                >
                  <div className="absolute top-0 right-0 bg-primary-container text-on-primary-container px-4 py-1 font-label-sm uppercase tracking-widest text-[12px] font-semibold">
                    Most Coveted
                  </div>
                  <span className="font-label-sm uppercase tracking-widest opacity-60 mb-4 block mt-2 text-[12px]">
                    {eventPackage.name}
                  </span>
                  <div className="font-headline-md mb-8 text-[24px] font-medium">
                    {eventPackage.price}
                  </div>
                  <ul className="space-y-6 mb-12 flex-grow">
                    {eventPackage.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 font-body-md opacity-80 text-[15px]">
                        <span
                          className="material-symbols-outlined text-primary-container text-[20px] shrink-0"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          stars
                        </span>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="w-full py-4 text-center bg-primary-container text-on-primary-container font-label-md uppercase tracking-widest hover:brightness-110 transition-all duration-300 font-semibold"
                  >
                    Select {eventPackage.name.replace('THE ', '').toLowerCase()}
                  </a>
                </ScrollReveal>
              );
            }

            return (
              <ScrollReveal
                as="div"
                className="bg-surface-container/30 backdrop-blur-md border border-outline-variant/20 shadow-md p-12 flex flex-col hover:-translate-y-4 transition-all duration-500"
                delay={index * 120}
                key={eventPackage.name}
                variant="fade-up"
              >
                <span className="font-label-sm uppercase tracking-widest text-tertiary mb-4 block text-[12px]">
                  {eventPackage.name}
                </span>
                <div className="font-headline-md mb-8 text-[24px] font-medium text-on-surface">
                  {eventPackage.price}
                </div>
                <ul className="space-y-6 mb-12 flex-grow">
                  {eventPackage.features.map((feature, idx) => {
                    const isIncluded = feature.included;
                    return (
                      <li
                        key={idx}
                        className={`flex items-start gap-3 font-body-md text-[15px] ${
                          isIncluded ? 'text-tertiary' : 'text-tertiary/50'
                        }`}
                      >
                        {isIncluded ? (
                          <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
                            check_circle
                          </span>
                        ) : (
                          <span className="material-symbols-outlined text-tertiary/40 text-[20px] shrink-0">
                            block
                          </span>
                        )}
                        <span>{feature.text}</span>
                      </li>
                    );
                  })}
                </ul>
                <a
                  href="#contact"
                  className="w-full py-4 text-center border border-outline text-on-surface font-label-md uppercase tracking-widest hover:bg-on-surface hover:text-white transition-all duration-300"
                >
                  Select {eventPackage.name.replace('THE ', '').toLowerCase()}
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Packages;
