import styles from './DistrictPanel.module.css';

export default function BeachesTab({ data }) {
  if (!data.beaches?.length) {
    return (
      <div style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', padding: '24px 0' }}>
        This is an inland district — explore temples and nature trails instead!
      </div>
    );
  }

  return (
    <div className={styles.tabList}>
      {data.beaches.map((beach) => (
        <div key={beach} className={styles.tabCard}>
          <div className={styles.tabCardTitle}>🏖️ {beach}</div>
          <div className={styles.tabCardSub}>Best for: swimming, sunset walks, water sports</div>
        </div>
      ))}
    </div>
  );
}
