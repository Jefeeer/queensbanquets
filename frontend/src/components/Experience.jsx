import { useLandingContent } from '../content/LandingContentContext.jsx';
import ScrollReveal from './ScrollReveal.jsx';

function Experience() {
  const {
    content: { experiencePoints, highlights },
  } = useLandingContent();

  const [heritagePoint, philosophyPoint] = experiencePoints;

  const imageURL =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBlSlOUY6osmu8NHbhOTNhjb-HOaMgHMsq154EtV4xREvZQCho6OduFlLQsdqIgY4MrYDrbS5qdg39ebGL61yldRlKGpLODzbUq_lvNnCBnLeMcOCpDp8eXP7nbiZzCRkQCoTWSCC47C74gKFOQRyrItXX-FaJT2eo8ZPzsG-liFB0Cb6msy24j_cocMD93IeAxVB0MPcZVxuXNiQNzll11VIoGFIlWZ4Tn_Sybi5QHeTbDE6Gce0-zdkypelqJbCUYAhfk95IeJIQ';

  return (
    <section className="py-40 bg-surface" id="about">
      <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        
        {/* Left Column: Image with backdrop container */}
        <ScrollReveal as="div" className="lg:col-span-5 relative" variant="fade-left">
          <div
            className="aspect-[4/5] w-full bg-cover bg-center shadow-2xl relative z-10"
            style={{ backgroundImage: `url('${imageURL}')` }}
            role="img"
            aria-label="A vintage hand-penned wedding invitation with a wax seal"
          />
          <div className="absolute -bottom-10 -right-10 w-2/3 aspect-square bg-primary-container/10 -z-0" />
        </ScrollReveal>

        {/* Right Column: Copy & Stats */}
        <ScrollReveal as="div" className="lg:col-span-6 lg:col-start-7" variant="fade-right">
          <span className="text-primary font-label-sm uppercase tracking-widest mb-4 block">
            {heritagePoint?.title || 'OUR HERITAGE'}
          </span>
          <h2 className="font-headline-lg text-headline-lg mb-8">
            A Legacy of Meticulous Curation
          </h2>
          <div className="space-y-6 font-body-lg text-tertiary">
            <p className="leading-relaxed">
              {heritagePoint?.description}
            </p>
            <p className="leading-relaxed">
              {philosophyPoint?.description}
            </p>
          </div>

          <div className="mt-12 flex items-center gap-8 border-t border-outline-variant/30 pt-8">
            {highlights.map((stat, idx) => (
              <div key={idx}>
                <div className="font-headline-md text-primary text-[24px] md:text-[32px] font-semibold">
                  {stat.value}
                </div>
                <div className="font-label-sm uppercase opacity-60 text-[12px] tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

export default Experience;
