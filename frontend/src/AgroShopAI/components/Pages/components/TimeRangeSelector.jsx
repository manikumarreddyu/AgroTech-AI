import React from 'react';

export default function TimeRangeSelector({ timeRange, setTimeRange }) {
  return (
    <div className="mb-6">
      <label htmlFor="timeRange" className="mr-2">Time Range:</label>
      <select
        id="timeRange"
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
        className="border rounded p-1"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
    </div>
  );
}
