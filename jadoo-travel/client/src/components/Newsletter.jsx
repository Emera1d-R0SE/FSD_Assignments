import { useState } from 'react';
import axios from 'axios';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // 'success' | 'error' | ''
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await axios.post('/api/newsletter', { email });
      setStatus('success');
      setMsg(res.data.message);
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMsg(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          Subscribe to get information, latest news and other
          <br />interesting offers about Jadoo
        </h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputWrap}>
            <span className={styles.mailIcon}>✉</span>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {msg && (
          <p className={`${styles.msg} ${status === 'success' ? styles.success : styles.error}`}>
            {msg}
          </p>
        )}
      </div>
    </section>
  );
}
