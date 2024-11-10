import React from 'react';

const ActivityLog = () => {
  const activities = [
    'Logged in from a new device',
    'Changed email address',
    'Password updated',
  ];

  return (
    <div className="activity-log">
      <h3>Activity Log</h3>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
