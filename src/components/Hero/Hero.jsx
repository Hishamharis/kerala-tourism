import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  '2.58 Crore Visitors in 2025',
  '#1 Tourism Website India',
  '14 Magical Districts',
  '580km Coastline',
  'Ranked Top 10 Globally 2025',
];

export default function Hero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      gsap.set(`.${styles.nav}`, { y: 0, opacity: 1 });
      gsap.set(`.${styles.eyebrowLine}`, { width: 48 });
      gsap.set(`.${styles.eyebrow}`, { opacity: 1, y: 0 });
      gsap.set(`.${styles.titleSolid}`, { opacity: 1, y: 0 });
      gsap.set(`.${styles.titleOutline}`, { opacity: 1, y: 0 });
      gsap.set(`.${styles.subtitle}`, { opacity: 1, y: 0 });
      gsap.set(`.${styles.buttons}`, { opacity: 1, y: 0 });
      gsap.set(`.${styles.scrollHint}`, { opacity: 0.7 });
      gsap.set(`.${styles.statsBar}`, { y: 0, opacity: 1 });
      gsap.set(`.${styles.sideText}`, { opacity: 0.5 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(`.${styles.nav}`, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' })
        .fromTo(`.${styles.eyebrowLine}`, { width: 0 }, { width: 48, duration: 0.5, ease: 'power2.out' }, 0.4)
        .fromTo(`.${styles.eyebrow}`, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 0.5)
        .fromTo(`.${styles.titleSolid}`, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.7)
        .fromTo(`.${styles.titleOutline}`, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.9)
        .fromTo(`.${styles.subtitle}`, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 1.3)
        .fromTo(`.${styles.buttons}`, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }, 1.6)
        .fromTo(`.${styles.scrollHint}`, { opacity: 0 }, { opacity: 0.7, duration: 0.4 }, 2.0)
        .fromTo(`.${styles.statsBar}`, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 2.2)
        .fromTo(`.${styles.sideText}`, { opacity: 0 }, { opacity: 0.5, duration: 0.4 }, 2.0);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (contentRef.current) {
            contentRef.current.style.transform = `translateY(${self.progress * 80}px)`;
            contentRef.current.style.opacity = 1 - self.progress * 1.5;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToMap = () => {
    const map = document.getElementById('map-section');
    if (map) map.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPlanner = () => {
    const planner = document.getElementById('itinerary-section');
    if (planner) planner.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      {/* Cinematic Background */}
      <div className={styles.bgImage}>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXpZnNJkek5nCXfNGxmARlZvz4LfQfpCndG8dEAe-LoXHHaWoodHX6OaqLRn3G43dA0i9CtQGaVewEfA3NSjzTM7pjh-mbLK8DF30ZdSFdZ7ZSuBYNXOKVJKPqNLi_kaJ4N_7IKjrj6hJDxgDo-ahREspAI-z4l3Do3la1MezF7YB0pQsCZ1QPuMHKaEenLnInAR7Rran8BJFCJIj9U0oQypqAf_-IVKq6HAkgZBy9-T2pDBKFfJk1jbEzBvL5mltrydCdXWax-jw"
          alt="Kerala backwaters at sunrise"
          className={styles.bgImg}
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          loading="eager"
        />
        <div className={styles.overlayGradient} />
        <div className={styles.overlayTint} />
      </div>

      <ParticleCanvas />

      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <a href="#hero" className={styles.navBrand}>KERALA</a>
          <div className={styles.navLinks}>
            <a href="#map-section" className={styles.navLink}>Destinations</a>
            <a href="#experiences-section" className={`${styles.navLink} ${styles.navActive}`}>Experiences</a>
            <a href="#itinerary-section" className={styles.navLink}>Plan Your Trip</a>
            <a href="#festivals-section" className={styles.navLink}>About</a>
          </div>
          <button type="button" className={styles.navCta} onClick={scrollToPlanner}>Book a Stay</button>
        </div>
      </nav>

      {/* Side Vertical Branding */}
      <div className={styles.sideText}>KERALA TOURISM</div>

      {/* Main Hero Content */}
      <div ref={contentRef} className={styles.content}>
        {/* Eyebrow with flanking lines */}
        <div className={styles.eyebrowWrap}>
          <div className={styles.eyebrowLine} />
          <span className={styles.eyebrow}>EXPLORE • DISCOVER • EXPERIENCE</span>
          <div className={styles.eyebrowLine} />
        </div>

        {/* Title */}
        <h1 className={styles.titleWrap}>
          <span className={styles.titleSolid}>God&apos;s Own</span>
          <span className={styles.titleOutline}>Country.</span>
        </h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          14 districts. 580km of coastline. One journey you&apos;ll never forget.
        </p>

        {/* Buttons */}
        <div className={styles.buttons}>
          <motion.button
            type="button"
            className={styles.btnPrimary}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToMap}
          >
            Explore the Map
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </motion.button>
          <motion.button
            type="button"
            className={styles.btnSecondary}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToPlanner}
          >
            Generate My Itinerary
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" />
              <path d="M18 2l.6 2.4L21 5l-2.4.6L18 8l-.6-2.4L15 5l2.4-.6z" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollHint}>
        <span>Scroll to explore</span>
        <div className={styles.scrollLine} />
      </div>

      {/* Bottom Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.statsInner}>
          {stats.map((stat, i) => (
            <span key={stat} className={styles.statItem}>
              {i > 0 && <span className={styles.statDot} />}
              {stat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
