import styles from './Footer.module.css';

const destinations = ['Munnar', 'Alleppey', 'Kochi', 'Wayanad'];
const experiences = ['Backwaters', 'Ayurveda', 'Festivals', 'Cuisine'];
const planTrip = ['E-Brochures', 'Visa Information', 'Travel Advisories', 'Map Explorer'];
const info = ['Sustainability', 'Press Center', 'Contact Us', 'Privacy Policy'];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.watermark}>KERALA</div>

      <div className={styles.content}>
        <div className={styles.brand}>
          <h3 className={styles.logo}>KERALA</h3>
          <p className={styles.tagline}>God&apos;s Own Country</p>
          <div className={styles.socials}>
            {['Instagram', 'YouTube', 'X', 'Facebook'].map((s) => (
              <a key={s} href="#" className={styles.socialIcon} aria-label={s}>
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.links}>
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Destinations</h4>
            {destinations.map((d) => <a key={d} href="#" className={styles.link}>{d}</a>)}
          </div>
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Experiences</h4>
            {experiences.map((e) => <a key={e} href="#" className={styles.link}>{e}</a>)}
          </div>
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Plan Your Trip</h4>
            {planTrip.map((p) => <a key={p} href="#" className={styles.link}>{p}</a>)}
          </div>
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Information</h4>
            {info.map((i) => <a key={i} href="#" className={styles.link}>{i}</a>)}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2025 Kerala Tourism — Crafted with love for God&apos;s Own Country</span>
        <span className={styles.visitors}>Last Visitors: <strong style={{ color: 'var(--gold)' }}>2.58 Crore</strong></span>
      </div>
    </footer>
  );
}
