import { useState } from 'react'
import img1 from "./rent-assets/tp.png"

export default function HeroSectionRent() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={img1}
          alt="Farm background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-green-900 opacity-70"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="lg:w-2/3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Transform Your Farm Operations with AgroRent AI
          </h1>
          <p className="text-xl sm:text-2xl text-green-100 mb-8">
            Rent the best agricultural equipment, hassle-free.
          </p>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search by equipment or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-green-200 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transform hover:scale-105 transition duration-300">
              Browse Equipment
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-800 transform hover:scale-105 transition duration-300">
              How It Works
            </button>
          </div>
        </div>
      </div>

      {/* Features Highlight Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['Trusted Rentals', 'Affordable Rates', 'Verified Equipment', 'Easy Payment Options'].map((feature, index) => (
              <div key={index} className="group">
                <div className="text-green-300 mb-2 group-hover:text-white transition duration-300">
                  <svg className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-green-100 group-hover:text-white transition duration-300">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}