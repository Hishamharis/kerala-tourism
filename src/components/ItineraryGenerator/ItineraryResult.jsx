import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { districtData } from '../../data/districts';
import { exportItinerary, shareItinerary } from '../../utils/exportItinerary';
import styles from './ItineraryGenerator.module.css';

export default function ItineraryResult({ itinerary }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!itinerary.length || !containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(`.${styles.dayCard}`);
    gsap.from(cards, {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
    });
  }, [itinerary]);

  const handleExport = () => exportItinerary(containerRef.current);
  const handleShare = () => {
    const ok = shareItinerary(itinerary);
    if (ok) alert('Link copied to clipboard!');
  };

  if (!itinerary.length) return null;

  return (
    <div className={styles.resultSection}>
      <h3 className={styles.resultTitle}>Your Curated Path</h3>
      <p className={styles.resultSub}>
        A preview of your {itinerary.length}-day journey through Kerala.
      </p>

      <div className={styles.dayScroll} ref={containerRef}>
        {itinerary.map((day) => {
          const distColor = districtData[day.location]?.color || '#1A6B3C';
          return (
            <div
              key={day.day}
              className={styles.dayCard}
              style={{ background: `${distColor}dd` }}
            >
              <div className={styles.dayNumber}>Day {day.day}</div>
              <div className={styles.dayLocation}>{day.location}</div>
              <div className={styles.dayTitle}>{day.title}</div>

              <div className={styles.daySlot}>
                <span className={styles.daySlotIcon}>🌅</span>
                <span>{day.morning}</span>
              </div>
              <div className={styles.daySlot}>
                <span className={styles.daySlotIcon}>☀️</span>
                <span>{day.afternoon}</span>
              </div>
              <div className={styles.daySlot}>
                <span className={styles.daySlotIcon}>🌙</span>
                <span>{day.evening}</span>
              </div>

              <div className={styles.dayBottom}>
                <span>🛏️ {day.stay}</span>
                <span>🍽️ {day.food}</span>
              </div>

              {day.tip && <div className={styles.dayTip}>💡 {day.tip}</div>}
            </div>
          );
        })}
      </div>

      <div className={styles.exportActions}>
        <button className={`${styles.exportBtn} ${styles.exportBtnSave}`} onClick={handleExport}>
          Save Itinerary
        </button>
        <button className={`${styles.exportBtn} ${styles.exportBtnShare}`} onClick={handleShare}>
          Share Link
        </button>
      </div>
    </div>
  );
}
