import './AffectedCard.css';

/**
 * Renders the list of affected people/groups.
 * Hidden if the array is empty.
 * @param {{ affectedPeople: string[] }} props
 */
export default function AffectedCard({ affectedPeople }) {
  if (!affectedPeople || affectedPeople.length === 0) return null;

  return (
    <div className="card affected-card">
      <p className="card-title">Who Is Affected</p>
      <ul className="affected-list">
        {affectedPeople.map((person, i) => (
          <li key={i} className="affected-item">
            <span className="affected-dot" aria-hidden="true">●</span>
            {person}
          </li>
        ))}
      </ul>
    </div>
  );
}
