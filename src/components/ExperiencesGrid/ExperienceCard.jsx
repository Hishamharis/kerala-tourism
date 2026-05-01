import { motion } from 'framer-motion';
import styles from './ExperiencesGrid.module.css';

export default function ExperienceCard({ image, title, districts, icon, visitors, rating, bestSeason, delay = 0, onClick }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
    >
      <img src={image} alt={title} className={styles.cardImg} loading="lazy" />
      <div className={styles.cardOverlay} />

      {/* Hover preview stats */}
      <div className={styles.hoverPreview}>
        <div className={styles.previewStat}>
          <span className={styles.previewValue}>★ {rating}</span>
          <span className={styles.previewLabel}>Rating</span>
        </div>
        <div className={styles.previewDivider} />
        <div className={styles.previewStat}>
          <span className={styles.previewValue}>{visitors}</span>
          <span className={styles.previewLabel}>Visitors</span>
        </div>
        <div className={styles.previewDivider} />
        <div className={styles.previewStat}>
          <span className={styles.previewValue}>{bestSeason}</span>
          <span className={styles.previewLabel}>Best Season</span>
        </div>
      </div>

      <div className={styles.cardContent}>
        {icon && <span className={styles.cardIcon}>{icon}</span>}
        <h3 className={styles.cardTitle}>{title}</h3>
        {districts && (
          <div className={styles.cardDistricts}>
            {districts.map((d) => (
              <span key={d} className={styles.districtTag}>{d}</span>
            ))}
          </div>
        )}
        <span className={styles.cardExplore}>
          Explore →
        </span>
      </div>
    </motion.div>
  );
}
