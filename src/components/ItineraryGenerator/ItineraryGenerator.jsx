import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { districtNames } from '../../data/districts';
import { generateItinerary } from '../../utils/claudeApi';
import ItineraryResult from './ItineraryResult';
import styles from './ItineraryGenerator.module.css';

const travelStyles = [
  { emoji: '🌊', label: 'Beaches' },
  { emoji: '🏛️', label: 'Culture' },
  { emoji: '🌿', label: 'Nature' },
  { emoji: '🏠', label: 'Relaxation' },
  { emoji: '💑', label: 'Honeymoon' },
  { emoji: '🙏', label: 'Spiritual' },
  { emoji: '👨‍👩‍👧', label: 'Family' },
  { emoji: '🎒', label: 'Adventure' },
];

const budgetOptions = [
  { key: 'budget', label: 'Budget', symbol: '₹' },
  { key: 'mid', label: 'Mid-range', symbol: '₹₹' },
  { key: 'luxury', label: 'Luxury', symbol: '₹₹₹' },
];

export default function ItineraryGenerator() {
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [days, setDays] = useState(7);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [budget, setBudget] = useState('mid');
  const [itinerary, setItinerary] = useState([]);
  const [itineraryWarning, setItineraryWarning] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading) return;
    const msgs = [
      'Reading the backwaters...',
      'Consulting local guides...',
      'Mapping your journey...',
      'Almost there...',
    ];
    let i = 0;
    const id = setInterval(() => {
      setLoadingMsg(msgs[i % msgs.length]);
      i++;
    }, 1200);
    return () => clearInterval(id);
  }, [loading]);

  const toggleDistrict = (name) => {
    setSelectedDistricts((prev) =>
      prev.includes(name) ? prev.filter((d) => d !== name) : [...prev, name]
    );
  };

  const toggleStyle = (label) => {
    setSelectedStyles((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const handleGenerate = async () => {
    if (!selectedDistricts.length) {
      setError('Please select at least one district.');
      return;
    }
    setLoading(true);
    setLoadingMsg('Reading the backwaters...');
    setItinerary([]);
    setItineraryWarning(null);
    setError(null);
    try {
      const { itinerary: rows, warning } = await generateItinerary({
        districts: selectedDistricts,
        days,
        styles: selectedStyles.length ? selectedStyles : ['General'],
        budget: budgetOptions.find((b) => b.key === budget)?.label || 'Mid-range',
      });
      setItinerary(rows);
      if (warning) setItineraryWarning(warning);
    } catch {
      setError('Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section} id="itinerary-section">
      <div className={styles.bgImage} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.eyebrow}>POWERED BY AI</p>
          <h2 className={styles.title}>Plan Your Kerala Journey</h2>
          <p className={styles.subtitle}>
            Craft a personalized itinerary tailored to your passions, pace, and budget in seconds.
          </p>
        </motion.div>

        <motion.div
          className={styles.form}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* District chips */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Where do you want to explore?</label>
            <div className={styles.chips}>
              {districtNames.map((name) => (
                <button
                  type="button"
                  key={name}
                  className={`${styles.chip} ${selectedDistricts.includes(name) ? styles.chipActive : ''}`}
                  onClick={() => toggleDistrict(name)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Duration + Travel Style */}
          <div className={styles.formRow}>
            <div className={styles.formGroup} style={{ flex: '0 0 200px' }}>
              <label className={styles.label}>Duration</label>
              <div className={styles.sliderWrap}>
                <input
                  type="range"
                  min={3}
                  max={14}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className={styles.slider}
                />
                <span className={styles.sliderValue}>{days} Days</span>
              </div>
            </div>

            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label className={styles.label}>Travel Style</label>
              <div className={styles.stylePills}>
                {travelStyles.map((s) => (
                  <button
                    type="button"
                    key={s.label}
                    className={`${styles.pill} ${selectedStyles.includes(s.label) ? styles.pillActive : ''}`}
                    onClick={() => toggleStyle(s.label)}
                  >
                    {s.emoji} {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Budget</label>
            <div className={styles.budgetCards}>
              {budgetOptions.map((b) => (
                <button
                  type="button"
                  key={b.key}
                  className={`${styles.budgetCard} ${budget === b.key ? styles.budgetActive : ''}`}
                  onClick={() => setBudget(b.key)}
                >
                  <span className={styles.budgetSymbol}>{b.symbol}</span>
                  <span className={styles.budgetLabel}>{b.label}</span>
                </button>
              ))}
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="button"
            className={styles.generateBtn}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? loadingMsg : 'Generate My Itinerary ✦'}
          </button>
        </motion.div>

        {itinerary.length > 0 && (
          <ItineraryResult itinerary={itinerary} warning={itineraryWarning} />
        )}
      </div>
    </section>
  );
}
