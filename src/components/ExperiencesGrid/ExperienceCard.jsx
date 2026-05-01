import { motion } from 'framer-motion';
import styles from './ExperiencesGrid.module.css';

export default function ExperienceCard({ image, title, districts, delay = 0 }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <img src={image} alt={title} className={styles.cardImg} loading="lazy" />
      <div className={styles.cardOverlay} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {districts && (
          <div className={styles.cardDistricts}>
            {districts.map((d) => (
              <span key={d} className={styles.districtTag}>{d}</span>
            ))}
          </div>
        )}
        <span className={styles.cardExplore}>Explore →</span>
      </div>
    </motion.div>
  );
}
