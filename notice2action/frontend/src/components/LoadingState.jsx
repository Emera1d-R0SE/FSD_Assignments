import './LoadingState.css';

export default function LoadingState() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p className="loading-title">Analyzing announcement…</p>
      <p className="loading-subtitle">Extracting actions, dates, and deadlines</p>
    </div>
  );
}
