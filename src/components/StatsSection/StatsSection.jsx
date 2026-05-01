import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CountUp } from 'countup.js';
import { motion } from 'framer-motion';
import styles from './StatsSection.module.css';

const stats = [
  { end: 25880365, label: 'Visitors welcomed in 2025', prefix: '', suffix: '', separator: ',', decimals: 0 },
  { end: 14, label: 'Magical districts', prefix: '', suffix: '', separator: '', decimals: 0 },
  { end: 580, label: 'Kilometres of coastline', prefix: '', suffix: 'km', separator: ',', decimals: 0 },
  { end: 4.7, label: 'Average tourist rating ★', prefix: '', suffix: '', separator: '', decimals: 1 },
];

const badges = [
  '#1 Tourism Website in India 2024–25',
  'Top 10 Global Trending Destination 2025',
  "God's Own Country — UNESCO Biosphere Reserve",
];

function StatCounter({ stat }) {
  const spanRef = useRef(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView && !started && spanRef.current) {
      const cu = new CountUp(spanRef.current, stat.end, {
        duration: 2.5,
        separator: stat.separator,
        decimal: '.',
        prefix: stat.prefix,
        suffix: stat.suffix,
        decimalPlaces: stat.decimals,
      });
      if (!cu.error) {
        cu.start();
        setStarted(true);
      }
    }
  }, [inView, started, stat]);

  return (
    <div ref={ref} className={styles.stat}>
      <span ref={spanRef} className={styles.statNumber}>0</span>
      <span className={styles.statLabel}>{stat.label}</span>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className={styles.section}>
      {/* Watermark */}
      <div className={styles.watermark}>KERALA</div>

      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} />
          ))}
        </div>

        <motion.div
          className={styles.badges}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {badges.map((badge) => (
            <div key={badge} className={styles.badge}>
              <span className={styles.badgeIcon}>✦</span>
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
