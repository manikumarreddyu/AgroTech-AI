import React from 'react'

export default function HeroSection() {
  return (
    <div className="bg-green-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-4">Welcome to Agroshop</h2>
        <p className="text-xl text-green-700 mb-8">Your one-stop shop for all agricultural needs</p>
        <a href="#" className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300">Shop Now</a>
      </div>
    </div>
  )
}
