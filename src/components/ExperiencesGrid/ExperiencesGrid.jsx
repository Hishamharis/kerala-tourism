import ExperienceCard from './ExperienceCard';
import styles from './ExperiencesGrid.module.css';

const experiences = [
  {
    title: 'Backwaters & Houseboats',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',
    districts: ['Alappuzha', 'Kumarakom'],
  },
  {
    title: 'Hills & Tea Gardens',
    image: 'https://images.unsplash.com/photo-1597735881932-d9664c9bbcea?w=800&q=80',
    districts: ['Munnar', 'Wayanad'],
  },
  {
    title: 'Beaches & Coastline',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    districts: ['Kovalam', 'Varkala'],
  },
  {
    title: 'Temples & Festivals',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
    districts: ['Thrissur', 'Guruvayur'],
  },
  {
    title: 'Wildlife & Forests',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80',
    districts: ['Periyar', 'Silent Valley'],
  },
  {
    title: 'Food & Culture',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80',
    districts: ['Kozhikode', 'Kochi'],
  },
];

export default function ExperiencesGrid() {
  return (
    <section className={styles.section} id="experiences-section">
      <div className={styles.container}>
        <h2 className={styles.title}>Explore by Experience</h2>
        <p className={styles.subtitle}>
          Discover the soul of God&apos;s Own Country through curated journeys, from tranquil waters to untamed jungles.
        </p>

        <div className={styles.grid}>
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.title} {...exp} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
