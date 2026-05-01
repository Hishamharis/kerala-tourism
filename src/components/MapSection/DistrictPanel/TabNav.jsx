import styles from './DistrictPanel.module.css';

const tabNavStyles = {
  nav: {
    display: 'flex',
    gap: '4px',
    overflowX: 'auto',
    borderBottom: '1px solid var(--glass-border)',
    paddingBottom: '0',
  },
  tab: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)',
    padding: '10px 16px',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  active: {
    color: 'var(--gold)',
    borderBottomColor: 'var(--gold)',
  },
};

export default function TabNav({ tabs, active, onChange }) {
  return (
    <nav style={tabNavStyles.nav}>
      {Object.entries(tabs).map(([key, label]) => (
        <button
          key={key}
          style={{
            ...tabNavStyles.tab,
            ...(active === key ? tabNavStyles.active : {}),
          }}
          onClick={() => onChange(key)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
