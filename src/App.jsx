import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
import { useScrollProgress } from './hooks/useScrollProgress';
import Preloader from './components/Preloader/Preloader';
import CustomCursor from './components/Cursor/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar/ScrollProgressBar';
import Hero from './components/Hero/Hero';
import MapSection from './components/MapSection/MapSection';
import ExperiencesGrid from './components/ExperiencesGrid/ExperiencesGrid';
import ItineraryGenerator from './components/ItineraryGenerator/ItineraryGenerator';
import FestivalsTimeline from './components/FestivalsTimeline/FestivalsTimeline';
import StatsSection from './components/StatsSection/StatsSection';
import Footer from './components/Footer/Footer';
import BackToTop from './components/ui/BackToTop';

export default function App() {
  const [loading, setLoading] = useState(true);
  const progress = useScrollProgress();
  useLenis();

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={handleLoadComplete} />}
      </AnimatePresence>

      <CustomCursor />
      <ScrollProgressBar progress={progress} />

      <main>
        <Hero />
        <MapSection />
        <ExperiencesGrid />
        <ItineraryGenerator />
        <FestivalsTimeline />
        <StatsSection />
        <Footer />
      </main>

      <BackToTop />
    </>
  );
}
