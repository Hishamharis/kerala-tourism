import { useEffect, useRef } from 'react';

const SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(root) {
  return Array.from(root.querySelectorAll(SELECTOR)).filter((el) => {
    if (el.hasAttribute('disabled')) return false;
    if (el.getAttribute('aria-hidden') === 'true') return false;
    if (el.getAttribute('tabindex') === '-1') return false;
    return true;
  });
}

/**
 * Trap Tab focus inside container while `active` is true.
 * @param {unknown} refreshKey — change when focusable children change (e.g. tab switch).
 */
export function useFocusTrap(active, containerRef, refreshKey) {
  const previousFocus = useRef(null);

  useEffect(() => {
    if (!active || !containerRef?.current) return undefined;

    previousFocus.current = document.activeElement;

    const root = containerRef.current;

    const focusFirst = () => {
      const els = getFocusableElements(root);
      if (els.length) els[0].focus();
    };

    // Wait one frame so Framer Motion / portals settle
    const raf = requestAnimationFrame(() => {
      focusFirst();
    });

    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const els = getFocusableElements(root);
      if (els.length === 0) return;

      const first = els[0];
      const last = els[els.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || !root.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    root.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener('keydown', onKeyDown);
      if (previousFocus.current && typeof previousFocus.current.focus === 'function') {
        previousFocus.current.focus();
      }
    };
  }, [active, containerRef, refreshKey]);
}
