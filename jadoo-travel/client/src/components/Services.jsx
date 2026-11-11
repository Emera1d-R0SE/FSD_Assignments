import styles from './Services.module.css';

const services = [
  {
    icon: '🌤️',
    title: 'Calculated Weather',
    desc: 'Built Wicket longer admire do barton vanity itself do in it.',
    bg: '#fde5d4',
  },
  {
    icon: '✈️',
    title: 'Best Flights',
    desc: 'Engrossed listening. Park gate sell they west hard for the.',
    bg: '#e5f0ff',
    highlight: true,
  },
  {
    icon: '🎤',
    title: 'Local Events',
    desc: 'Barton vanity itself do in it. Preferred to men it engrossed listening.',
    bg: '#fff9e5',
  },
  {
    icon: '⚙️',
    title: 'Customization',
    desc: 'We deliver outsourced aviation services for military customers.',
    bg: '#f0f0f0',
  },
];

export default function Services() {
  return (
    <section className={styles.section}>
      <p className={styles.label}>CATEGORY</p>
      <h2 className={styles.title}>We Offer Best Services</h2>

      <div className={styles.grid}>
        {services.map((s, i) => (
          <div
            key={i}
            className={`${styles.card} ${s.highlight ? styles.highlight : ''}`}
          >
            <div className={styles.iconWrap} style={{ background: s.bg }}>
              <span className={styles.icon}>{s.icon}</span>
            </div>
            <h3 className={styles.cardTitle}>{s.title}</h3>
            <p className={styles.cardDesc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
