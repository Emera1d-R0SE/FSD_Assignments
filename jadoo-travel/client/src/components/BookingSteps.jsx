import styles from './BookingSteps.module.css';

const steps = [
  {
    icon: '🗺️',
    color: '#f1a501',
    title: 'Choose Destination',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.',
  },
  {
    icon: '💳',
    color: '#df6951',
    title: 'Make Payment',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.',
  },
  {
    icon: '🛫',
    color: '#006380',
    title: 'Reach Airport on Selected Date',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.',
  },
];

export default function BookingSteps() {
  return (
    <section className={styles.section}>
      <div className={styles.left}>
        <p className={styles.label}>Easy and Fast</p>
        <h2 className={styles.title}>
          Book Your Next Trip
          <br />In 3 Easy Steps
        </h2>

        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.iconBox} style={{ background: s.color }}>
                <span>{s.icon}</span>
              </div>
              <div>
                <h4 className={styles.stepTitle} style={{ color: s.color }}>
                  {s.title}
                </h4>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.mainCard}>
          <img
            src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=420&auto=format&fit=crop&q=80"
            alt="Trip to Greece"
            className={styles.mainImg}
          />
          <div className={styles.cardInfo}>
            <h4>Trip To Greece</h4>
            <p>14-29 June | by Robbin joe</p>
            <p className={styles.people}>👥 24 people going</p>
          </div>
        </div>

        <div className={styles.ongoingCard}>
          <p className={styles.ongoingLabel}>Ongoing</p>
          <p className={styles.ongoingTitle}>Trip to Rome</p>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
          <p className={styles.progressText}>40% completed</p>
        </div>
      </div>
    </section>
  );
}
