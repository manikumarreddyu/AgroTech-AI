import React from 'react'

function GiftLetter() {
  return (
    <div>
      <section className="bg-gradient-to-r from-green-400 to-green-500 p-8 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-4 text-white">Sign Up for Our Newsletter</h2>
          <p className="mb-6 text-green-100 text-lg">Get the latest deals and gardening tips delivered to your inbox!</p>
          <form className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow border-2 border-green-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
              required
            />
            <button
              type="submit"
              className="bg-white text-green-600 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-100 transition duration-300 transform hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        </section>
    </div>
  )
}

export default GiftLetter