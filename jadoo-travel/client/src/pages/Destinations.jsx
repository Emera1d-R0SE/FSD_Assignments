import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import styles from './Destinations.module.css';

const staticDestinations = [
  { _id: '1', name: 'Rome', country: 'Italy', price: 5420, duration: '10 Days Trip', rating: 4.8,
    description: 'Experience the eternal city with its stunning Colosseum, Vatican, and incredible cuisine.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&auto=format&fit=crop' },
  { _id: '2', name: 'London', country: 'UK', price: 4200, duration: '12 Days Trip', rating: 4.6,
    description: 'Discover the iconic Big Ben, Buckingham Palace, and vibrant cultural scene of London.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&auto=format&fit=crop' },
  { _id: '3', name: 'Full Europe', country: 'Europe', price: 15000, duration: '28 Days Trip', rating: 4.9,
    description: 'An epic 28-day journey across the best of Europe — Paris, Amsterdam, Prague and more.',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&auto=format&fit=crop' },
  { _id: '4', name: 'Santorini', country: 'Greece', price: 3800, duration: '7 Days Trip', rating: 4.9,
    description: 'White-washed buildings, blue domes, and stunning sunsets over the Aegean Sea.',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=500&auto=format&fit=crop' },
  { _id: '5', name: 'Bali', country: 'Indonesia', price: 2900, duration: '9 Days Trip', rating: 4.7,
    description: 'Tropical paradise with lush rice terraces, ancient temples and crystal clear waters.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&auto=format&fit=crop' },
  { _id: '6', name: 'Tokyo', country: 'Japan', price: 6100, duration: '14 Days Trip', rating: 4.8,
    description: 'Where ancient tradition meets futuristic innovation in the world\'s most exciting city.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&auto=format&fit=crop' },
];

export default function Destinations() {
  const [destinations, setDestinations] = useState(staticDestinations);
  const [bookingId, setBookingId] = useState(null);
  const [form, setForm] = useState({ travelDate: '', travelers: 1, specialRequests: '' });
  const [msg, setMsg] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/destinations')
      .then((res) => { if (res.data.data?.length) setDestinations(res.data.data); })
      .catch(() => {});
  }, []);

  const formatPrice = (p) => p >= 1000 ? `$${(p / 1000).toFixed(1).replace('.0', '')}k` : `$${p}`;

  const handleBook = (id) => {
    if (!user) return navigate('/login');
    setBookingId(id);
    setMsg('');
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/bookings', { destinationId: bookingId, ...form });
      setMsg('✅ Booking confirmed! Check your bookings page.');
      setBookingId(null);
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.message || 'Booking failed'));
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p className={styles.label}>Explore World</p>
        <h1 className={styles.title}>All Destinations</h1>
      </div>

      {msg && <p className={styles.globalMsg}>{msg}</p>}

      <div className={styles.grid}>
        {destinations.map((d) => (
          <div key={d._id} className={styles.card}>
            <div className={styles.imgWrap}>
              <img src={d.image} alt={d.name} className={styles.img} />
              <div className={styles.rating}>⭐ {d.rating?.toFixed(1) || '4.5'}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.row}>
                <h3 className={styles.name}>{d.name}, {d.country}</h3>
                <span className={styles.price}>{formatPrice(d.price)}</span>
              </div>
              <p className={styles.duration}>✈ {d.duration}</p>
              <p className={styles.desc}>{d.description}</p>
              <button className={styles.bookBtn} onClick={() => handleBook(d._id)}>
                Book Now
              </button>
            </div>

            {/* Inline booking form */}
            {bookingId === d._id && (
              <form className={styles.bookingForm} onSubmit={submitBooking}>
                <h4>Book: {d.name}</h4>
                <label>Travel Date
                  <input type="date" required value={form.travelDate}
                    onChange={(e) => setForm({ ...form, travelDate: e.target.value })} />
                </label>
                <label>Travelers
                  <input type="number" min="1" max="20" value={form.travelers}
                    onChange={(e) => setForm({ ...form, travelers: +e.target.value })} />
                </label>
                <label>Special Requests
                  <textarea rows="2" placeholder="Optional" value={form.specialRequests}
                    onChange={(e) => setForm({ ...form, specialRequests: e.target.value })} />
                </label>
                <div className={styles.formBtns}>
                  <button type="submit" className={styles.confirmBtn}>Confirm</button>
                  <button type="button" className={styles.cancelBtn} onClick={() => setBookingId(null)}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
