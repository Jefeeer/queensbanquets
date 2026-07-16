import { useLandingContent } from '../content/LandingContentContext.jsx';
import ScrollReveal from './ScrollReveal.jsx';

function Footer() {
  const {
    content: { footerContent },
  } = useLandingContent();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full relative mt-20 bg-surface-container-lowest border-t border-outline-variant/10">
      <div className="max-w-container-max mx-auto px-margin-desktop py-20 grid grid-cols-1 md:grid-cols-3 gap-gutter">
        
        {/* Brand & Info */}
        <ScrollReveal as="div" className="flex flex-col" variant="fade-up">
          <div className="font-headline-lg text-headline-lg text-primary mb-4 italic">
            Queen's Banquet Events
          </div>
          <p className="font-body-md text-tertiary max-w-sm mb-8 leading-relaxed">
            {footerContent.tagline ||
              "Curating the world's most exclusive celebrations with precision and artistic flair since 1994."}
          </p>
          <div className="flex gap-6">
            <a
              className="text-tertiary hover:text-primary transition-colors duration-200 flex items-center justify-center w-10 h-10 border border-outline-variant/30 rounded-full hover:border-primary"
              href="#"
              aria-label="Instagram"
            >
              <span className="material-symbols-outlined text-[20px]">camera</span>
            </a>
            <a
              className="text-tertiary hover:text-primary transition-colors duration-200 flex items-center justify-center w-10 h-10 border border-outline-variant/30 rounded-full hover:border-primary"
              href="#"
              aria-label="Website"
            >
              <span className="material-symbols-outlined text-[20px]">public</span>
            </a>
            <a
              className="text-tertiary hover:text-primary transition-colors duration-200 flex items-center justify-center w-10 h-10 border border-outline-variant/30 rounded-full hover:border-primary"
              href="mailto:queensbanquet07@gmail.com"
              aria-label="Email"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Links */}
        <ScrollReveal as="div" className="grid grid-cols-2 gap-8" variant="fade-up" delay={100}>
          <div>
            <h4 className="font-label-md uppercase tracking-widest text-on-surface mb-6 text-[14px] font-semibold">
              Company
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  className="font-body-md text-tertiary hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-8 text-[15px]"
                  href="#services"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  className="font-body-md text-tertiary hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-8 text-[15px]"
                  href="#packages"
                >
                  Packages
                </a>
              </li>
              <li>
                <a
                  className="font-body-md text-tertiary hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-8 text-[15px]"
                  href="#about"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md uppercase tracking-widest text-on-surface mb-6 text-[14px] font-semibold">
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  className="font-body-md text-tertiary hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-8 text-[15px]"
                  href="#"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  className="font-body-md text-tertiary hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-8 text-[15px]"
                  href="#"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </ScrollReveal>

        {/* Newsletter */}
        <ScrollReveal as="div" className="flex flex-col" variant="fade-up" delay={200}>
          <h4 className="font-label-md uppercase tracking-widest text-on-surface mb-6 text-[14px] font-semibold">
            The Chronicle
          </h4>
          <p className="font-body-md text-tertiary mb-6 text-[15px] leading-relaxed">
            Subscribe to our seasonal editorial on luxury trends and event artistry.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="relative">
            <input
              className="w-full bg-surface-container-high border-none py-4 px-6 focus:ring-1 focus:ring-primary-container text-body-md text-on-surface"
              placeholder="Your email"
              type="email"
              required
            />
            <button
              type="submit"
              className="absolute right-2 top-2 p-2 text-primary hover:scale-115 transition-all"
              aria-label="Subscribe"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>
        </ScrollReveal>

      </div>
      <div className="max-w-container-max mx-auto px-margin-desktop py-8 border-t border-outline-variant/10 text-center">
        <span className="font-body-md text-tertiary opacity-60 text-[14px]">
          © {year} Queen's Banquet Events. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
