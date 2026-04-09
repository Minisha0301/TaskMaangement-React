import React from "react";
import { useSummary } from "./useSummary";
import "./table.css";

const Summary = ({ refreshKey }) => {
  const { summary, loading } = useSummary(refreshKey);

  if (loading) return <center><p>Loading...</p></center>;
  if (!summary) return <div className="summary-container"><p>No data in summary</p></div>;

  return (
    <div className="summary-container">
      <h2>Task Summary</h2>

      <div className="summary-top">
        <p><strong>Total Tasks:</strong> {summary.total_tasks}</p>
        <p><strong>Total Time:</strong> {summary.Total_estimated_time} min</p>
      </div>

      <table className="summary-table">
        <thead>
          <tr>
            <th>Frequency</th>
            <th>Total Time</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(summary.frequencies).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value.total_time}</td>
              <td>
                {value.tasks.map((t) => t.name).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Summary;