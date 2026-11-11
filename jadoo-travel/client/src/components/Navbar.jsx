import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        Jad<span>oo</span>
      </div>

      <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
        <li><Link to="/destinations">Destinations</Link></li>
        <li><a href="#hotels">Hotels</a></li>
        <li><a href="#flights">Flights</a></li>
        <li><Link to="/bookings">Bookings</Link></li>
      </ul>

      <div className={styles.navActions}>
        {user ? (
          <>
            <span className={styles.welcome}>Hi, {user.name.split(' ')[0]}</span>
            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.loginLink}>Login</Link>
            <Link to="/signup" className={styles.signupBtn}>Sign up</Link>
          </>
        )}
        <span className={styles.lang}>EN ▾</span>
      </div>
    </nav>
  );
}
