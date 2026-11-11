import styles from './Partners.module.css';

const partners = [
  { name: 'axon airlines', style: { fontFamily: 'serif', fontWeight: '300', fontSize: '22px', letterSpacing: '1px' } },
  { name: 'Jetstar ✦', style: { fontWeight: '700', fontSize: '22px' } },
  { name: '⊕ Expedia', style: { fontWeight: '700', fontSize: '24px', color: '#003580' } },
  { name: 'QANTAS', style: { fontWeight: '700', fontSize: '20px', letterSpacing: '3px' } },
  { name: 'Alitalia', style: { fontStyle: 'italic', fontWeight: '400', fontSize: '22px', color: '#006400' } },
];

export default function Partners() {
  return (
    <section className={styles.section}>
      <div className={styles.strip}>
        {partners.map((p, i) => (
          <div key={i} className={styles.partner} style={p.style}>
            {p.name}
          </div>
        ))}
      </div>
    </section>
  );
}
