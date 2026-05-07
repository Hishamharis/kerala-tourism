import styles from './Footer.module.css';

const destinations = [
  { label: 'Munnar', href: '#map-section' },
  { label: 'Alleppey', href: '#map-section' },
  { label: 'Kochi', href: '#map-section' },
  { label: 'Wayanad', href: '#map-section' },
];

const experiences = [
  { label: 'Backwaters', href: '#experiences-section' },
  { label: 'Ayurveda', href: '#experiences-section' },
  { label: 'Festivals', href: '#festivals-section' },
  { label: 'Cuisine', href: '#experiences-section' },
];

const planTrip = [
  { label: 'E-Brochures', href: null },
  { label: 'Visa Information', href: null },
  { label: 'Travel Advisories', href: null },
  { label: 'Map Explorer', href: '#map-section' },
];

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
              <span
                key={s}
                className={styles.socialDisabled}
                aria-label={`${s} (link coming soon)`}
                title="Add profile URLs when deploying"
              >
                {s[0]}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.links}>
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Destinations</h4>
            {destinations.map((d) => (
              <a key={d.label} href={d.href} className={styles.link}>
                {d.label}
              </a>
            ))}
          </div>
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Experiences</h4>
            {experiences.map((e) => (
              <a key={e.label} href={e.href} className={styles.link}>
                {e.label}
              </a>
            ))}
          </div>
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Plan Your Trip</h4>
            {planTrip.map((p) =>
              p.href ? (
                <a key={p.label} href={p.href} className={styles.link}>
                  {p.label}
                </a>
              ) : (
                <span key={p.label} className={styles.linkMuted}>
                  {p.label}
                </span>
              )
            )}
          </div>
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Information</h4>
            {info.map((i) => (
              <span key={i} className={styles.linkMuted}>
                {i}
              </span>
            ))}
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
