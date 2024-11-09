import React from 'react';

export default function StatCard({ title, value, color }) {
  return (
    <div className={`${color} p-4 rounded`}>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
}
