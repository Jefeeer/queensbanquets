import { useEffect, useRef, useState } from 'react';

function ScrollReveal({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  once = true,
  style,
  threshold = 0.12,
  variant = 'fade-up',
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -6% 0px',
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once, threshold]);

  const classes = ['scroll-reveal', `scroll-reveal-${variant}`, isVisible ? 'is-visible' : '', className]
    .filter(Boolean)
    .join(' ');

  const mergedStyle = delay ? { ...style, transitionDelay: `${delay}ms` } : style;

  return (
    <Tag ref={ref} className={classes} style={mergedStyle} {...props}>
      {children}
    </Tag>
  );
}

export default ScrollReveal;
