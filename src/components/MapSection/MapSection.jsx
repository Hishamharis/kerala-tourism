import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import KeralaMap from './KeralaMap';
import MapTooltip from './MapTooltip';
import DistrictPanel from './DistrictPanel/DistrictPanel';
import styles from './MapSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function MapSection() {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [exploredCount, setExploredCount] = useState(0);
  const exploredSet = useRef(new Set());
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.heading}`,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleHover = useCallback((name) => {
    setHoveredDistrict(name);
  }, []);

  const handleSelect = useCallback((name) => {
    setSelectedDistrict(name);
    if (name && !exploredSet.current.has(name)) {
      exploredSet.current.add(name);
      setExploredCount(exploredSet.current.size);
    }
  }, []);

  const handleClose = useCallback(() => {
    setSelectedDistrict(null);
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="map-section">
      {/* Radial pulses */}
      <div className={styles.pulseContainer}>
        <div className={styles.pulse} />
        <div className={`${styles.pulse} ${styles.pulse2}`} />
        <div className={`${styles.pulse} ${styles.pulse3}`} />
      </div>

      <div className={styles.heading}>
        <h2 className={styles.title}>Discover the Districts</h2>
        <p className={styles.subtitle}>
          Click any district to explore the unique landscapes, heritage, and culture of God&apos;s Own Country.
        </p>
      </div>

      <div className={`${styles.mapLayout} ${selectedDistrict ? styles.mapShifted : ''}`}>
        <div className={styles.mapContainer}>
          <KeralaMap
            onHover={handleHover}
            onSelect={handleSelect}
            selectedDistrict={selectedDistrict}
          />

          <div className={styles.legend}>
            <h4 className={styles.legendTitle}>Terrain Guide</h4>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: '#1A6B3C' }} />
              Hills & Plantations
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: '#00B4D8' }} />
              Backwaters & Beaches
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: '#F4A228' }} />
              Heritage & Culture
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: '#E76F51' }} />
              Urban Centers
            </div>
          </div>
        </div>

        <MapTooltip district={hoveredDistrict} />
      </div>

      {/* District counter */}
      <div className={styles.counter}>
        <span>14 Districts — {exploredCount} Explored</span>
      </div>

      <DistrictPanel
        district={selectedDistrict}
        isOpen={!!selectedDistrict}
        onClose={handleClose}
      />
    </section>
  );
}
