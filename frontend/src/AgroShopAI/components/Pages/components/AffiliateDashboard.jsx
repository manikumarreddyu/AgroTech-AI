import React from 'react';

export default function AffiliateDashboard({
  isLoggedIn,
  handleLogin,
  dateRange,
  setDateRange,
  dummyData,
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-green-800 mb-4">Referral Tracking Dashboard</h2>
      {!isLoggedIn ? (
        <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-green-700 mb-2">Email</label>
            <input type="email" id="email" required className="w-full px-3 py-2 border border-green-300 rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-green-700 mb-2">Password</label>
            <input type="password" id="password" required className="w-full px-3 py-2 border border-green-300 rounded" />
          </div>
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors">
            Log In
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-green-800">Your Performance</h3>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-green-300 rounded"
            >
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="lastMonth">Last Month</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-100 p-4 rounded">
              <h4 className="text-lg font-semibold text-green-800">Clicks</h4>
              <p className="text-2xl text-green-600">{dummyData.clicks}</p>
            </div>
            <div className="bg-green-100 p-4 rounded">
              <h4 className="text-lg font-semibold text-green-800">Sign-ups</h4>
              <p className="text-2xl text-green-600">{dummyData.signUps}</p>
            </div>
            <div className="bg-green-100 p-4 rounded">
              <h4 className="text-lg font-semibold text-green-800">Conversions</h4>
              <p className="text-2xl text-green-600">{dummyData.conversions}</p>
            </div>
            <div className="bg-green-100 p-4 rounded">
              <h4 className="text-lg font-semibold text-green-800">Commissions</h4>
              <p className="text-2xl text-green-600">${dummyData.commissions.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
