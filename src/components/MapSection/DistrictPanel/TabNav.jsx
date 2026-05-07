import styles from './DistrictPanel.module.css';

export default function TabNav({ tabs, active, onChange }) {
  return (
    <nav className={styles.tabNav} aria-label="District detail tabs">
      {Object.entries(tabs).map(([key, label]) => (
        <button
          type="button"
          key={key}
          className={`${styles.tabBtn} ${active === key ? styles.tabBtnActive : ''}`}
          onClick={() => onChange(key)}
          aria-current={active === key ? 'page' : undefined}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}

