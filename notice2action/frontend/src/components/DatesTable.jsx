import './DatesTable.css';

/**
 * Renders important dates in a responsive table.
 * Hidden if the array is empty.
 * @param {{ dates: Array<{ date, time, event, description }> }} props
 */
export default function DatesTable({ dates }) {
  if (!dates || dates.length === 0) return null;

  return (
    <div className="card dates-card">
      <p className="card-title">Important Dates</p>
      <div className="table-scroll" role="region" aria-label="Important dates table" tabIndex={0}>
        <table className="dates-table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Event</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {dates.map((row, i) => (
              <tr key={i}>
                <td className="date-cell">{row.date}</td>
                <td className="time-cell">{row.time}</td>
                <td className="event-cell">{row.event}</td>
                <td className="desc-cell">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
