import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import styles from './Bookings.module.css';

export default function Bookings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    axios.get('/api/bookings/my')
      .then((res) => setBookings(res.data.data))
      .catch(() => setMsg('Could not load bookings. Make sure the server is running.'))
      .finally(() => setLoading(false));
  }, [user]);

  const cancelBooking = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await axios.delete(`/api/bookings/${id}`);
      setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status: 'cancelled' } : b));
    } catch {
      alert('Failed to cancel booking');
    }
  };

  const statusColor = { pending: '#f1a501', confirmed: '#16a34a', cancelled: '#dc2626' };

  if (loading) return <div className={styles.center}>Loading bookings...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Bookings</h1>
        <p className={styles.sub}>Manage all your travel bookings here</p>
      </div>

      {msg && <p className={styles.msg}>{msg}</p>}

      {bookings.length === 0 && !msg ? (
        <div className={styles.empty}>
          <p>No bookings yet! 🌍</p>
          <button onClick={() => navigate('/destinations')} className={styles.exploreBtn}>
            Explore Destinations
          </button>
        </div>
      ) : (
        <div className={styles.list}>
          {bookings.map((b) => (
            <div key={b._id} className={styles.card}>
              <div className={styles.imgSide}>
                {b.destination?.image ? (
                  <img src={b.destination.image} alt={b.destination.name} />
                ) : (
                  <div className={styles.imgPlaceholder}>✈️</div>
                )}
              </div>
              <div className={styles.details}>
                <div className={styles.topRow}>
                  <h3>
                    {b.destination?.name || 'Destination'},{' '}
                    {b.destination?.country || ''}
                  </h3>
                  <span
                    className={styles.status}
                    style={{ background: statusColor[b.status] + '20', color: statusColor[b.status] }}
                  >
                    {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                  </span>
                </div>
                <p className={styles.meta}>
                  📅 Travel: {new Date(b.travelDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className={styles.meta}>👥 {b.travelers} traveler{b.travelers > 1 ? 's' : ''}</p>
                <p className={styles.meta}>💰 Total: ${b.totalPrice?.toLocaleString()}</p>
                {b.specialRequests && <p className={styles.meta}>📝 {b.specialRequests}</p>}
                <p className={styles.date}>Booked on {new Date(b.createdAt).toLocaleDateString()}</p>
              </div>
              {b.status !== 'cancelled' && (
                <button className={styles.cancelBtn} onClick={() => cancelBooking(b._id)}>
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
