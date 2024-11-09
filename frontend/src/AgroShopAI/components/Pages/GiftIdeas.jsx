import React from 'react'

function GiftIdeas() {
  return (
    <div>
      {/* Gift Ideas */}
      <section className="bg-white p-8 rounded-xl shadow-2xl mb-12">
          <h2 className="text-3xl font-bold mb-6 text-green-700">Gift Ideas for Garden Lovers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-green-100 rounded-lg">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <div>
                <h3 className="text-xl font-semibold mb-2">Gardening Books</h3>
                <p>Inspire with knowledge and tips</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-green-100 rounded-lg">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <div>
                <h3 className="text-xl font-semibold mb-2">Magnifying Glass</h3>
                <p>For examining plants up close</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-green-100 rounded-lg">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <div>
                <h3 className="text-xl font-semibold mb-2">Seed Storage Box</h3>
                <p>Organize and preserve seeds</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-green-100 rounded-lg">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-xl font-semibold mb-2">Garden Planner</h3>
                <p>Plan and track garden progress</p>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default GiftIdeas