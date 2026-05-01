import styles from './DistrictPanel.module.css';

export default function TemplesTab({ data }) {
  return (
    <div className={styles.tabList}>
      {data.temples.map((temple) => (
        <div key={temple} className={styles.tabCard} style={{ borderLeft: '3px solid var(--gold)' }}>
          <div className={styles.tabCardTitle}>🏛️ {temple}</div>
          <div className={styles.tabCardSub}>Heritage site • Open 5 AM – 8 PM</div>
        </div>
      ))}
    </div>
  );
}
