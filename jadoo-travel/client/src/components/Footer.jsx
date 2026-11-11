import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logo}>Jadoo<span>.</span></div>
          <p>Book your trip in minutes, get full control for much longer.</p>
        </div>

        <div className={styles.col}>
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Mobile</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Contact</h4>
          <ul>
            <li><a href="#">Help/FAQ</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Affiliates</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>More</h4>
          <ul>
            <li><a href="#">Airline fees</a></li>
            <li><a href="#">Airline</a></li>
            <li><a href="#">Low fare tips</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Discover our app</h4>
          <div className={styles.socials}>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Twitter">t</a>
          </div>
          <div className={styles.appBtns}>
            <a href="#" className={styles.appBtn}>🟢 Google Play</a>
            <a href="#" className={styles.appBtn}>🍎 App Store</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>All rights reserved @jadoo.co</p>
      </div>
    </footer>
  );
}
