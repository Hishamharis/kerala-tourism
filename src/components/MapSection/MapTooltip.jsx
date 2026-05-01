import { AnimatePresence, motion } from 'framer-motion';
import { districtData, categoryColors } from '../../data/districts';
import styles from './MapSection.module.css';

export default function MapTooltip({ district }) {
  const data = district ? districtData[district] : null;

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          key={district}
          className={styles.tooltip}
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <h3 className={styles.tooltipName}>{district}</h3>
          <p className={styles.tooltipTagline}>{data.tagline}</p>
          <div className={styles.tooltipMeta}>
            <span className={styles.tooltipRating}>★ {data.rating}</span>
            <span className={styles.tooltipDot}>•</span>
            <span>{data.visitors} visitors</span>
          </div>
          <div className={styles.tooltipAttraction}>
            <span className={styles.attractionPill}>{data.topAttraction}</span>
          </div>
          <div className={styles.tooltipCategory}>
            <span
              className={styles.categoryDot}
              style={{ background: categoryColors[data.category] || data.color }}
            />
            <span>{data.category}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
