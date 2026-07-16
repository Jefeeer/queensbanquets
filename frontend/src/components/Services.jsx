import { useLandingContent } from '../content/LandingContentContext.jsx';
import ScrollReveal from './ScrollReveal.jsx';

const pillarImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuWeIS6PBK5x1TntjprzE7CzeENe87tDXA0qOdafX1DEHaf4smxKp5zA9sobjPjHzTXlnot7QZ-aI-wsE5Rz7myTGhXrq8X4iq8idpYvkZ3LdLj7GoCmnL__R6d90rphQ_sAi9I5kAIUKl6Etm6hDNEQI6UGKStKRl-HSt0uLjfL--A3NlpR01Yb5wy0Est0Yo-1ExPFBCS_aC5sCQ2CGWtOUHkYwW4vfs9DM8DNaRLHbviJaeVHICF1znJ-BUmLo9ba4JuM2paKw0',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAh9pYoVXbwDjDjCVKmudDKuduT93iUGQSQcwwGHqT616H8nogmxXz2DP_3GB_Dxog_31LF9VSip9rrq-GUwSEsAIqSXL2mN_VRglwZzZMPy0IZIKuu2gubsmhZOxm4LLMRyLp2-GcuSFL0DjwMhNipX9ejBVDvRxMRVT4Ah0SLwvHvthOhrHsqBQgTqGVzmrgLHRW0W7r5uygjz84EBC9Ex2QzPZVTn4Uucgwt-DXTWKmQaKDtqBHjFozAPeto7fFAElSQjMWZnUE',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA9HX_moL8wA6QCW0OKwlwhuHbv1bsYuidTTr0Sn3ZzuIrlMzFOKEF19U4yru5JlIDnhJhZX8bPDm2ITN-G0U9OOXfAGa1K5KkqA5FgWsn06jQqlzRhbcJlsdzWRPrH2Pj7-DUrskYPrJfVSUoctxXMsuBI7BalcBdcmW86AIUpKKeX8lfguz27ITrEbF2LnR8yO9XVB-Of7QNuPWB-I2DIibZImT4uz2Y6-9uL5FyY096ZC_HjX96ibCyJ4d9aSJxsKt26ehWe-cg',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBhPwUSkEZMQrgImtFHIA6GEOAXYQSBXiecI5Wo30nIn95xbv2Ft9qGrVmJkrZsHEy8QWzUdmLc4ASAWQvNyiE2KA4O1NK1NKMh1jb2prn9dvqD6AKk0ODjDPu-qfwFcT6dn-hZKTWCL1NbikvnRULg0QMBe_JFITraASXHDiZHKuadRdPDuJdkXkKHAB7qX_IjG7R_PrEvd01VqtDfdzNyRLhmgRGhFmKlpc6bZV0LN_ihaUMVXQYOrHSaqLmeEZPFE1tAlHNTrRc',
];

function Services() {
  const {
    content: { services },
  } = useLandingContent();

  return (
    <section className="py-40 bg-surface-container-low" id="services">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="text-center mb-24">
          <span className="text-primary font-label-sm uppercase tracking-widest mb-4 block">
            THE FOUR PILLARS
          </span>
          <h2 className="font-headline-lg text-headline-lg">
            Signature Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto lg:h-[800px]">
          {services.map((service, index) => {
            const isLarge = index === 0 || index === 3;
            const colSpanClass = isLarge ? 'md:col-span-8' : 'md:col-span-4';
            const bgImage = pillarImages[index] || '/queens-banquet-logo.svg';

            return (
              <ScrollReveal
                as="div"
                className={`${colSpanClass} group relative overflow-hidden bg-white aspect-video md:aspect-auto`}
                delay={index * 120}
                key={service.title}
                variant="fade-up"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${bgImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
                  <span className="font-label-sm uppercase tracking-widest mb-2 opacity-80">
                    Pillar {['I', 'II', 'III', 'IV'][index]}
                  </span>
                  <h3 className="font-headline-md text-headline-md mb-4 text-[24px] font-semibold">
                    {service.title}
                  </h3>
                  <p className="font-body-md max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed text-[15px]">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
