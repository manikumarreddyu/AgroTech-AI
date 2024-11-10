import React, { useState } from 'react';

const ActiveSessions = () => {
  const [sessions, setSessions] = useState([
    { id: 1, device: 'MacBook Pro', location: 'New York', lastActive: '10 minutes ago' },
    { id: 2, device: 'iPhone', location: 'Los Angeles', lastActive: '1 hour ago' },
  ]);

  const handleLogout = (id) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

  return (
    <div className="active-sessions">
      <h3>Active Sessions</h3>
      {sessions.length === 0 ? (
        <p>No active sessions.</p>
      ) : (
        <ul>
          {sessions.map((session) => (
            <li key={session.id}>
              <span>{session.device} ({session.location})</span>
              <span>{session.lastActive}</span>
              <button onClick={() => handleLogout(session.id)}>Log Out</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActiveSessions;
