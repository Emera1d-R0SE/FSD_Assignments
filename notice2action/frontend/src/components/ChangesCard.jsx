import './ChangesCard.css';

/**
 * Only renders if changes.hasChanges === true.
 * @param {{ changes: { hasChanges, description, previous, current } }} props
 */
export default function ChangesCard({ changes }) {
  if (!changes?.hasChanges) return null;

  return (
    <div className="card changes-card">
      <p className="card-title">What Changed</p>
      {changes.description && changes.description !== 'Not specified' && (
        <p className="changes-description">{changes.description}</p>
      )}
      <div className="changes-comparison">
        <div className="change-block change-old">
          <span className="change-label">Before</span>
          <span className="change-value">{changes.previous}</span>
        </div>
        <span className="change-arrow" aria-hidden="true">→</span>
        <div className="change-block change-new">
          <span className="change-label">Now</span>
          <span className="change-value">{changes.current}</span>
        </div>
      </div>
    </div>
  );
}
