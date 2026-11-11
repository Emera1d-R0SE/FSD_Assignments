import './ActionChecklist.css';

const PRIORITY_CONFIG = {
  HIGH:   { label: 'High Priority',   icon: '🔴', className: 'action-high'   },
  MEDIUM: { label: 'Medium Priority', icon: '🟠', className: 'action-medium' },
  LOW:    { label: 'Low Priority',    icon: '🟢', className: 'action-low'    },
};

/**
 * @param {{ action, deadline, priority, reason }} props
 */
function ActionItem({ action, deadline, priority, reason }) {
  const config = PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG.LOW;

  return (
    <li className={`action-item ${config.className}`}>
      <div className="action-header">
        <span className={`badge badge-${priority.toLowerCase()}`} aria-label={`Priority: ${config.label}`}>
          {config.icon} {priority}
        </span>
        {deadline && deadline !== 'Not specified' && (
          <span className="action-deadline">
            <span aria-hidden="true">🗓</span> {deadline}
          </span>
        )}
      </div>
      <p className="action-text">{action}</p>
      {reason && reason !== 'Not specified' && (
        <p className="action-reason">{reason}</p>
      )}
    </li>
  );
}

/**
 * Renders the action checklist, actions pre-sorted HIGH → MEDIUM → LOW.
 * @param {{ actions: Array<{ action, deadline, priority, reason }> }} props
 */
export default function ActionChecklist({ actions }) {
  if (!actions || actions.length === 0) {
    return (
      <div className="card checklist-card">
        <p className="card-title">Action Checklist</p>
        <p className="checklist-empty">No specific actions were identified in this announcement.</p>
      </div>
    );
  }

  return (
    <div className="card checklist-card">
      <p className="card-title">Action Checklist</p>
      <ul className="action-list" aria-label="Required actions">
        {actions.map((item, i) => (
          <ActionItem key={i} {...item} />
        ))}
      </ul>
    </div>
  );
}
