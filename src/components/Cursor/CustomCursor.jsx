import { useEffect, useRef, useMemo, useState } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isTouch = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
    []
  );
  const [hoverType, setHoverType] = useState(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (isTouch) return undefined;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const onOver = (e) => {
      const target = e.target;
      if (target.closest('.district-path')) {
        setHoverType('map');
      } else if (target.closest('button, a, [role="button"]')) {
        setHoverType('button');
      } else {
        setHoverType(null);
      }
    };

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`${styles.dot} ${hoverType === 'button' ? styles.dotExpand : ''}`}
      />
      <div
        ref={ringRef}
        className={`${styles.ring} ${
          hoverType === 'map' ? styles.ringMap : hoverType === 'button' ? styles.ringButton : ''
        }`}
      >
        {hoverType === 'map' && <span className={styles.ringLabel}>Click</span>}
      </div>
    </>
  );
}
