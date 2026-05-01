import styles from './Hero.module.css';

const stats = [
  '✦ 2.58 Crore Visitors 2025',
  '✦ #1 Tourism Website India',
  '✦ 14 Magical Districts',
  '✦ 580km Coastline',
  '✦ Ranked Global Top 10',
  '✦ 8.21 Lakh Foreign Tourists',
];

export default function StatsTicker() {
  const row = stats.join('   ');

  return (
    <div className={styles.tickerWrap}>
      <div className={styles.tickerRow}>
        <span>{row}</span>
        <span>{row}</span>
      </div>
      <div className={`${styles.tickerRow} ${styles.tickerReverse}`}>
        <span>{row}</span>
        <span>{row}</span>
      </div>
    </div>
  );
}
