import styles from './DistrictPanel.module.css';

export default function FestivalsTab({ data }) {
  return (
    <div className={styles.festivalTimeline}>
      {data.festivals.map((fest) => (
        <div key={fest.name} className={styles.festivalItem}>
          <div className={styles.festivalDot} />
          <div className={styles.festivalName}>{fest.name}</div>
          <div className={styles.festivalMonth}>{fest.month}</div>
        </div>
      ))}
    </div>
  );
}
