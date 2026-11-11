import './WarningsCard.css';

/**
 * Renders stated consequences and warnings.
 * Hidden if the warnings array is empty.
 * @param {{ warnings: string[] }} props
 */
export default function WarningsCard({ warnings }) {
  if (!warnings || warnings.length === 0) return null;

  return (
    <div className="card warnings-card" role="alert">
      <p className="card-title">
        <span aria-hidden="true">⚠</span> Warnings / Consequences
      </p>
      <ul className="warnings-list">
        {warnings.map((warning, i) => (
          <li key={i} className="warning-item">
            <span className="warning-icon" aria-hidden="true">⚠</span>
            <span>{warning}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
