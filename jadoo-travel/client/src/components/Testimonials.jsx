import { useState } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Mike Taylor',
    location: 'Lahore, Pakistan',
    avatar: 'https://i.pravatar.cc/80?img=11',
    text: '"On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no."',
  },
  {
    name: 'Chris Thomas',
    location: 'CEO of Red Button',
    avatar: 'https://i.pravatar.cc/80?img=32',
    text: '"Jadoo made our family vacation absolutely unforgettable. From booking to the actual trip, everything was seamless and beautifully organized."',
  },
  {
    name: 'Sara Lee',
    location: 'Sydney, Australia',
    avatar: 'https://i.pravatar.cc/80?img=5',
    text: '"The best travel service I\'ve ever used. The team was responsive, the destinations were stunning, and the prices were unbeatable."',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className={styles.section}>
      <div className={styles.left}>
        <p className={styles.label}>TESTIMONIALS</p>
        <h2 className={styles.title}>
          What People Say
          <br />About Us.
        </h2>
        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === active ? styles.activeDot : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.right}>
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`${styles.card} ${i === active ? styles.activeCard : ''}`}
            onClick={() => setActive(i)}
          >
            <div className={styles.cardTop}>
              <img src={t.avatar} alt={t.name} className={styles.avatar} />
              {i === active && (
                <p className={styles.quote}>{t.text}</p>
              )}
              <button className={styles.toggle}>{i === active ? '▲' : '▼'}</button>
            </div>
            <div className={styles.cardBottom}>
              <span className={styles.name}>{t.name}</span>
              <span className={styles.loc}>{t.location}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
