import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './TopDestinations.module.css';

// Fallback static data in case backend is not connected
const fallbackDestinations = [
  {
    _id: '1',
    name: 'Rome',
    country: 'Italy',
    price: 5420,
    duration: '10 Days Trip',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&auto=format&fit=crop&q=80',
  },
  {
    _id: '2',
    name: 'London',
    country: 'UK',
    price: 4200,
    duration: '12 Days Trip',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&auto=format&fit=crop&q=80',
  },
  {
    _id: '3',
    name: 'Full Europe',
    country: 'Europe',
    price: 15000,
    duration: '28 Days Trip',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&auto=format&fit=crop&q=80',
  },
];

export default function TopDestinations() {
  const [destinations, setDestinations] = useState(fallbackDestinations);

  useEffect(() => {
    axios
      .get('/api/destinations?featured=true')
      .then((res) => {
        if (res.data.data && res.data.data.length > 0) {
          setDestinations(res.data.data);
        }
      })
      .catch(() => {
        // Use fallback if API not available
      });
  }, []);

  const formatPrice = (p) => {
    if (p >= 1000) return `$${(p / 1000).toFixed(1).replace('.0', '')}k`;
    return `$${p}`;
  };

  return (
    <section className={styles.section}>
      <p className={styles.label}>Top Selling</p>
      <h2 className={styles.title}>Top Destinations</h2>

      <div className={styles.grid}>
        {destinations.slice(0, 3).map((d) => (
          <div key={d._id} className={styles.card}>
            <div className={styles.imgWrap}>
              <img src={d.image} alt={d.name} className={styles.img} />
            </div>
            <div className={styles.info}>
              <div className={styles.row}>
                <span className={styles.name}>
                  {d.name}, {d.country}
                </span>
                <span className={styles.price}>{formatPrice(d.price)}</span>
              </div>
              <p className={styles.duration}>✈ {d.duration}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Link to="/destinations" className={styles.viewAll}>
          View All Destinations →
        </Link>
      </div>
    </section>
  );
}
