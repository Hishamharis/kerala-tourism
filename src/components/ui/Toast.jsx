import { useEffect } from 'react';
import styles from './Toast.module.css';

/**
 * Auto-dismiss toast for short feedback (replaces window.alert).
 */
export default function Toast({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return undefined;
    const id = setTimeout(() => onDismiss?.(), 2200);
    return () => clearTimeout(id);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      {message}
    </div>
  );
}
