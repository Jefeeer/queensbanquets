import { useLandingContent } from '../content/LandingContentContext.jsx';

function Hero() {
  const {
    content: { heroContent },
  } = useLandingContent();

  const backgroundUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD4DLyVU1YrR8CRaASVouRz53kdS6pExr0eljjXk1aW3hOO2jCoX4LZMq51ubBn1WQRgelhqvBQzxHxSeabz42cTi7IRSu6Xwz6npILel4YKn4N7naLo6HrKLE8jRBJT54AXsb9RYgCMc2eGH5cKMNPawSbjkcFpwtGzp4gMJPkQQXC_BmUcnjFXhJONoASmvBXIYfnUU01CTtJWTUIDuphaqpdoCOQz39iXeK3RG2hFxr5bEQR0hGqg5--YzdMsj5vuyPRqkFGUN8';

  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden" id="home">
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-10000 hover:scale-105"
          style={{ backgroundImage: `url('${backgroundUrl}')` }}
          role="img"
          aria-label="A cinematic, wide-angle shot of a grand ballroom gala"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-brightness-75" />
      </div>
      <div className="relative z-10 text-center text-on-primary max-w-4xl px-margin-mobile">
        <span className="font-label-md text-label-md uppercase tracking-[0.3em] mb-6 block opacity-90">
          {heroContent.eyebrow}
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-8 leading-tight">
          Where Heritage Meets <br />
          <span className="italic font-normal">Timeless Splendor</span>
        </h1>
        <p className="font-body-lg text-body-lg mb-10 max-w-2xl mx-auto opacity-80">
          {heroContent.copy}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            className="px-10 py-4 bg-primary-container text-on-primary-container font-label-md uppercase tracking-widest hover:scale-105 transition-all duration-300"
            href="#services"
          >
            {heroContent.primaryCta}
          </a>
          <a
            className="px-10 py-4 backdrop-blur-md bg-white/10 border border-white/40 text-white font-label-md uppercase tracking-widest hover:bg-white hover:text-on-surface transition-all duration-300"
            href="#contact"
          >
            {heroContent.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
