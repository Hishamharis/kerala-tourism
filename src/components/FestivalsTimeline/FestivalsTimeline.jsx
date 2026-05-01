import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import styles from './FestivalsTimeline.module.css';

gsap.registerPlugin(ScrollTrigger);

const festivals = [
  { month: 'JAN', name: 'Attukal Pongala', location: 'Thiruvananthapuram', desc: "World's largest women's gathering", featured: false },
  { month: 'FEB', name: 'Bekal Utsavam', location: 'Kasaragod', desc: 'Fort heritage festival by the sea', featured: false },
  { month: 'APR', name: 'Thrissur Pooram', location: 'Thrissur', desc: "Asia's grandest temple festival with 30 caparisoned elephants", featured: true, badge: "Asia's Grandest Festival" },
  { month: 'AUG', name: 'Onam', location: 'Statewide', desc: "Kerala's harvest festival — boat races, Sadya feasts, and Pookalam flower carpets", featured: true, badge: "Kerala's Harvest Festival" },
  { month: 'AUG', name: 'Nehru Trophy Boat Race', location: 'Alappuzha', desc: 'Legendary snake boat races on Punnamada Lake', featured: false },
  { month: 'SEP', name: 'Kochi-Muziris Biennale', location: 'Kochi', desc: "India's largest contemporary art exhibition", featured: false },
  { month: 'NOV', name: 'Theyyam Season Opens', location: 'Kannur', desc: '1,500-year-old ritual art — performers become living gods', featured: false },
  { month: 'DEC', name: 'Christmas', location: 'Fort Kochi', desc: 'Colonial-era churches, midnight masses, and star-lantern streets', featured: false },
];

export default function FestivalsTimeline() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current || !sectionRef.current) return;

      const totalScroll = trackRef.current.scrollWidth - window.innerWidth + 160;

      gsap.to(trackRef.current, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.8,
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="festivals-section">
      <div className={styles.heading}>
        <h2 className={styles.title}>When to Visit</h2>
        <p className={styles.subtitle}>Kerala celebrates every month — scroll to explore the festival calendar</p>
      </div>

      <div className={styles.peakBand}>
        <span>Peak Season</span>
      </div>

      <div className={styles.trackWrapper}>
        <div ref={trackRef} className={styles.track}>
          {festivals.map((fest, i) => (
            <motion.div
              key={fest.name}
              className={`${styles.card} ${fest.featured ? styles.featured : ''} ${i % 2 === 0 ? styles.above : styles.below}`}
              initial={{ opacity: 0, y: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {fest.badge && <span className={styles.badge}>{fest.badge}</span>}
              <div className={styles.cardMonth}>{fest.month}</div>
              <div className={styles.cardLocation}>{fest.location}</div>
              <h3 className={styles.cardName}>{fest.name}</h3>
              <p className={styles.cardDesc}>{fest.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline line */}
        <div className={styles.timeline}>
          {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map((m) => (
            <div key={m} className={styles.monthMark}>
              <div className={`${styles.monthDot} ${['OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR'].includes(m) ? styles.peakDot : ''}`} />
              <span>{m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll progress bar */}
      <div className={styles.progressWrap}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${scrollProgress * 100}%` }} />
        </div>
        <div className={styles.progressLabel}>
          <span>JAN</span>
          <span>{Math.round(scrollProgress * 100)}%</span>
          <span>DEC</span>
        </div>
      </div>
    </section>
  );
}
