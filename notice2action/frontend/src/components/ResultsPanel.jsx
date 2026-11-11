import SummaryCard from './SummaryCard.jsx';
import ChangesCard from './ChangesCard.jsx';
import AffectedCard from './AffectedCard.jsx';
import DatesTable from './DatesTable.jsx';
import ActionChecklist from './ActionChecklist.jsx';
import WarningsCard from './WarningsCard.jsx';
import './ResultsPanel.css';

/**
 * Renders all 6 result sections from the normalized ExtractionResult.
 * @param {{ data: ExtractionResult }} props
 */
export default function ResultsPanel({ data }) {
  return (
    <section className="results-panel" aria-label="Analysis results">
      <h2 className="results-heading">
        <span className="results-heading-icon" aria-hidden="true">✦</span>
        Analysis Results
      </h2>

      <div className="results-grid">
        <SummaryCard
          title={data.title}
          summary={data.summary}
        />

        <ChangesCard
          changes={data.changes}
        />

        <AffectedCard
          affectedPeople={data.affected_people}
        />

        <DatesTable
          dates={data.important_dates}
        />

        <ActionChecklist
          actions={data.required_actions}
        />

        <WarningsCard
          warnings={data.warnings}
        />
      </div>
    </section>
  );
}
