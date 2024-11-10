import { Link } from 'react-router-dom';
import React from 'react';

export default function Feedback() {
  return (
    <div className="min-h-screen bg-blue-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Feedback Form</h1>
        </div>
        <div className="px-6 py-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-blue-800 mb-3">We Value Your Feedback</h2>
            <p className="text-gray-700 leading-relaxed">
              Your thoughts and suggestions are important to us. Please fill out the form below to share your feedback.
            </p>
          </section>

          <section>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-1">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-1">Your Feedback:</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </section>
        </div>
        <div className="bg-blue-100 px-6 py-4">
          <p className="text-sm text-blue-800">
            Thank you for taking the time to provide your feedback. We appreciate your input!
          </p>
          <p className="text-sm text-blue-800 mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
