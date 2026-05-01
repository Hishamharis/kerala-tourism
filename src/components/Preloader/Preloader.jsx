import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Preloader.module.css';

const loadingPhrases = [
  'Discovering the soul of Kerala...',
  'Mapping the backwaters...',
  'Gathering festival stories...',
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    // Animate progress from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Slow down near the end for dramatic effect
        const increment = prev < 60 ? 2.5 : prev < 85 ? 1.5 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    // Cycle loading phrases
    const phraseInterval = setInterval(() => {
      setPhraseIdx((p) => (p + 1) % loadingPhrases.length);
    }, 1400);

    // Complete after animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearInterval(interval);
      clearInterval(phraseInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className={styles.preloader}
      exit={{
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Background Image */}
      <div className={styles.bgImage}>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtbx-Zq3BlowEPwDTUWrXhIUe-ayxxeWZUWZbtGOOFX1luxWkXJgon24NsCAtngpXsJw4igUcqSnZy12qNl9i29licNmdJzoJ6jeUOMixRNRfahOsKYzhRIAhIDxeUdML-xXwUkcS9k_wG5CrOsbYtKnUdGa-NGBmkoJKLABi3c7j5wFqdNu_YllNCkgTgjCtEr8d_Wrvgk3KKHSb0ArResl653K0Knt2EcIuHuWYuncpwEHaIvbxyVKKANkfc2azlCc0O05ytWfg"
          alt="Kerala backwaters aerial view"
          className={styles.bgImg}
        />
        <div className={styles.bgOverlay} />
      </div>

      {/* Center Content */}
      <div className={styles.content}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          KERALA
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          God&apos;s Own Country
        </motion.p>

        <motion.div
          className={styles.loaderBlock}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.0 }}
        >
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className={styles.loadingText}>
            {loadingPhrases[phraseIdx]}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
