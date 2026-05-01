import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ExperiencesGrid.module.css';

export default function ExperienceModal({ experience, onClose }) {
  const overlayRef = useRef(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (experience) {
      document.body.style.overflow = 'hidden';
      setActiveImg(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [experience]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!experience) return null;
  const { title, icon, image, history, highlights, gallery, visitors, rating, bestSeason, districts } = experience;

  return (
    <AnimatePresence>
      {experience && (
        <motion.div
          className={styles.modalOverlay}
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <button className={styles.modalClose} onClick={onClose} aria-label="Close">
              ✕
            </button>

            {/* Hero image with gallery */}
            <div
              className={styles.modalHero}
              style={{ backgroundImage: `url(${gallery?.[activeImg] || image})` }}
            >
              <div className={styles.modalHeroOverlay} />
              <div className={styles.modalHeroContent}>
                <span className={styles.modalIcon}>{icon}</span>
                <h2 className={styles.modalTitle}>{title}</h2>
                <div className={styles.modalTags}>
                  {districts?.map(d => <span key={d} className={styles.modalTag}>{d}</span>)}
                </div>
              </div>

              {/* Gallery dots */}
              {gallery?.length > 1 && (
                <div className={styles.galleryDots}>
                  {gallery.map((_, i) => (
                    <button
                      key={i}
                      className={`${styles.galleryDot} ${i === activeImg ? styles.galleryDotActive : ''}`}
                      onClick={(e) => { e.stopPropagation(); setActiveImg(i); }}
                      aria-label={`View image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Stats bar */}
            <div className={styles.modalStats}>
              <div className={styles.modalStatItem}>
                <span className={styles.modalStatValue}>★ {rating}</span>
                <span className={styles.modalStatLabel}>Rating</span>
              </div>
              <div className={styles.modalStatItem}>
                <span className={styles.modalStatValue}>{visitors}</span>
                <span className={styles.modalStatLabel}>Annual Visitors</span>
              </div>
              <div className={styles.modalStatItem}>
                <span className={styles.modalStatValue}>{bestSeason}</span>
                <span className={styles.modalStatLabel}>Best Season</span>
              </div>
              <div className={styles.modalStatItem}>
                <span className={styles.modalStatValue}>{districts?.length}</span>
                <span className={styles.modalStatLabel}>Key Regions</span>
              </div>
            </div>

            {/* Body content */}
            <div className={styles.modalBody}>
              {/* History section */}
              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>History & Heritage</h3>
                <p className={styles.modalText}>{history}</p>
              </div>

              {/* Highlights */}
              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>Must-Visit Highlights</h3>
                <div className={styles.highlightsGrid}>
                  {highlights?.map((h, i) => (
                    <motion.div
                      key={h.label}
                      className={styles.highlightCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                    >
                      <span className={styles.highlightNum}>0{i + 1}</span>
                      <h4 className={styles.highlightLabel}>{h.label}</h4>
                      <p className={styles.highlightDesc}>{h.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Gallery strip */}
              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>Gallery</h3>
                <div className={styles.galleryStrip}>
                  {gallery?.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${title} ${i + 1}`}
                      className={`${styles.galleryThumb} ${i === activeImg ? styles.galleryThumbActive : ''}`}
                      onClick={() => setActiveImg(i)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
