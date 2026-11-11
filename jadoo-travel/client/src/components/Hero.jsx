import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.tagline}>BEST DESTINATIONS AROUND THE WORLD</p>
        <h1 className={styles.heading}>
          Travel, <span className={styles.underline}>enjoy</span>
          <br />and live a new
          <br />and full life
        </h1>
        <p className={styles.subtext}>
          Built for explorers who dare to discover. Your journey starts here —
          where every destination tells a story worth living.
        </p>
        <div className={styles.actions}>
          <Link to="/destinations" className={styles.findBtn}>Find out more</Link>
          <button className={styles.playBtn}>
            <span className={styles.playIcon}>▶</span>
            Play Demo
          </button>
        </div>
      </div>

      <div className={styles.imageWrap}>
        <div className={styles.bgCircle}></div>
        {/* Plane decorations */}
        <div className={styles.plane1}>✈</div>
        <div className={styles.plane2}>✈</div>
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80"
          alt="Happy traveler"
          className={styles.heroImg}
        />
        {/* Trip card overlay */}
        <div className={styles.tripCard}>
          <div className={styles.tripImgWrap}>
            <img
              src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=80&h=80&auto=format&fit=crop"
              alt="Trip"
            />
          </div>
          <div>
            <p className={styles.tripTitle}>Trip To Greece</p>
            <p className={styles.tripSub}>14-29 June | by Robbin joe</p>
            <div className={styles.tripIcons}>🌿 📋 📍</div>
            <p className={styles.tripPeople}>👥 24 people going</p>
          </div>
        </div>
        {/* Ongoing trip bubble */}
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
