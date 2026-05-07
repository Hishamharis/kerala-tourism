import { useState, useRef } from 'react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { AnimatePresence, motion } from 'framer-motion';
import { districtData } from '../../../data/districts';
import TabNav from './TabNav';
import BeachesTab from './BeachesTab';
import TemplesTab from './TemplesTab';
import FoodTab from './FoodTab';
import FestivalsTab from './FestivalsTab';
import AIItineraryTab from './AIItineraryTab';
import styles from './DistrictPanel.module.css';

const tabContent = {
  overview: 'Overview',
  beaches: 'Beaches',
  temples: 'Temples',
  food: 'Food',
  festivals: 'Festivals',
  itinerary: 'AI Itinerary',
};

export default function DistrictPanel({ district, isOpen, onClose }) {
  const [tab, setTab] = useState('overview');
  const panelRef = useRef(null);
  const data = district ? districtData[district] : null;

  useFocusTrap(isOpen && !!data, panelRef, tab);

  if (!data) return null;

  const renderTab = () => {
    switch (tab) {
      case 'beaches':
        return <BeachesTab data={data} />;
      case 'temples':
        return <TemplesTab data={data} />;
      case 'food':
        return <FoodTab data={data} />;
      case 'festivals':
        return <FestivalsTab data={data} />;
      case 'itinerary':
        return <AIItineraryTab district={district} />;
      default:
        return (
          <div className={styles.overview}>
            <p className={styles.description}>{data.description}</p>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Best Season</span>
                <span className={styles.infoValue}>{data.bestTime}</span>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Visitors</span>
                <span className={styles.infoValue}>{data.visitors}</span>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Category</span>
                <span className={styles.infoValue} style={{ textTransform: 'capitalize' }}>{data.category}</span>
              </div>
            </div>
            <h4 className={styles.highlightsTitle}>Highlights</h4>
            <div className={styles.highlights}>
              {[...data.beaches.slice(0, 2), ...data.temples.slice(0, 2)].map((item) => (
                <span key={item} className={styles.highlightPill}>{item}</span>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          ref={panelRef}
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="district-panel-title"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 280 }}
        >
          <div className={styles.panelBg} style={{ backgroundImage: `url(${data.image})` }} />
          <div className={styles.panelOverlay} />

          <div className={styles.panelContent}>
            <div className={styles.topBar}>
              <button type="button" className={styles.backBtn} onClick={onClose}>← Back to Map</button>
              <div>
                <h2 id="district-panel-title" className={styles.districtName}>{district}</h2>
                <p className={styles.districtTagline}>&ldquo;{data.tagline}&rdquo;</p>
              </div>
              <div className={styles.ratingBadge}>★ {data.rating}</div>
            </div>

            <TabNav tabs={tabContent} active={tab} onChange={setTab} />

            <div className={styles.tabBody}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTab()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
