import styles from './DistrictPanel.module.css';

const foodColors = ['#E76F51', '#1A6B3C', '#0077B6', '#F4A228', '#00B4D8', '#E76F51'];

export default function FoodTab({ data }) {
  return (
    <div className={styles.foodGrid}>
      {data.food.map((dish, i) => (
        <div
          key={dish}
          className={styles.foodCard}
          style={{ background: `${foodColors[i % foodColors.length]}33` }}
        >
          <div className={styles.foodName}>{dish}</div>
          <span className={styles.foodBadge}>Must try</span>
        </div>
      ))}
    </div>
  );
}
