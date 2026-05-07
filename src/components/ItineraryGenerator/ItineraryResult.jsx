import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { districtData } from '../../data/districts';
import { exportItinerary, shareItinerary } from '../../utils/exportItinerary';
import Toast from '../ui/Toast';
import styles from './ItineraryGenerator.module.css';

export default function ItineraryResult({ itinerary, warning }) {
  const containerRef = useRef(null);
  const [toastMsg, setToastMsg] = useState(null);

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
  const dismissToast = useCallback(() => setToastMsg(null), []);

  const handleShare = () => {
    const ok = shareItinerary(itinerary);
    if (ok) setToastMsg('Link copied to clipboard!');
    else setToastMsg('Copy not supported — select the URL from the address bar.');
  };

  if (!itinerary.length) return null;

  return (
    <div className={styles.resultSection}>
      <h3 className={styles.resultTitle}>Your Curated Path</h3>
      <p className={styles.resultSub}>
        A preview of your {itinerary.length}-day journey through Kerala.
      </p>

      {warning && (
        <p className={styles.warningBanner} role="status">
          {warning}
        </p>
      )}

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
        <button
          type="button"
          className={`${styles.exportBtn} ${styles.exportBtnSave}`}
          onClick={handleExport}
        >
          Save Itinerary
        </button>
        <button
          type="button"
          className={`${styles.exportBtn} ${styles.exportBtnShare}`}
          onClick={handleShare}
        >
          Share Link
        </button>
      </div>

      <Toast message={toastMsg} onDismiss={dismissToast} />
    </div>
  );
}
