import './SummaryCard.css';

/**
 * @param {{ title: string, summary: string }} props
 */
export default function SummaryCard({ title, summary }) {
  return (
    <div className="card summary-card">
      <p className="card-title">Quick Summary</p>
      <h2 className="summary-title">{title}</h2>
      <p className="summary-text">{summary}</p>
    </div>
  );
}
