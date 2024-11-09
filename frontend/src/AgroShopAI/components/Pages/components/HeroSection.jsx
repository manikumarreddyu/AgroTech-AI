import React from 'react'

export default function HeroSection() {
  return (
    <section className="text-center mb-16">
      <h1 className="text-5xl font-bold text-green-800 mb-4">Give the Gift of Green</h1>
      <p className="text-xl text-green-600 mb-8">Perfect for any gardening enthusiast in your life!</p>
      <a href="#gift-card-form" className="bg-green-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 transform hover:scale-105 inline-block">
        Get a Gift Card
      </a>
    </section>
  )
}
