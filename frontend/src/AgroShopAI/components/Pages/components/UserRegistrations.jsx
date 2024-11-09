import React from 'react';

export default function UserRegistrations({ data, maxRegistrations }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">User Registrations</h3>
      <svg className="w-full h-60 bg-gray-50" viewBox="0 0 100 60">
        <polyline
          points={data.map((reg, index) => 
            `${index * 14 + 7},${60 - (reg / maxRegistrations) * 60}`
          ).join(' ')}
          fill="none"
          stroke="#2196F3"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
