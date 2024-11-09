import React, { useState, useEffect } from 'react'

export default function GiftCardForm() {
  const [giftCardNumber, setGiftCardNumber] = useState('')
  const [pin, setPin] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleApplyGiftCard = (e) => {
    e.preventDefault()
    if (giftCardNumber.length === 16 && (pin.length === 0 || pin.length === 4)) {
      setMessage('Gift card applied successfully! Balance: $50.00')
      setIsSuccess(true)
    } else {
      setMessage('Invalid gift card code or PIN')
      setIsSuccess(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('')
    }, 5000)
    return () => clearTimeout(timer)
  }, [message])

  return (
    <section id="gift-card-form" className="bg-white p-8 rounded-xl shadow-2xl mb-12 transform hover:shadow-3xl transition duration-300">
      <h2 className="text-3xl font-bold mb-6 text-green-700">Apply Gift Card</h2>
      <form onSubmit={handleApplyGiftCard} className="space-y-6">
        {/* Gift Card Number Input */}
        <div>
          <label htmlFor="giftCardNumber" className="block text-lg font-medium text-gray-700 mb-2">
            Gift Card Number
          </label>
          <input
            type="text"
            id="giftCardNumber"
            value={giftCardNumber}
            onChange={(e) => setGiftCardNumber(e.target.value)}
            className="w-full border-2 border-green-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
            required
            maxLength={16}
            placeholder="Enter 16-digit gift card number"
          />
        </div>
        {/* PIN Input */}
        <div>
          <label htmlFor="pin" className="block text-lg font-medium text-gray-700 mb-2">
            PIN (optional)
          </label>
          <input
            type="text"
            id="pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full border-2 border-green-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
            maxLength={4}
            placeholder="Enter 4-digit PIN (if applicable)"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:from-green-700 hover:to-green-800 transition duration-300 transform hover:scale-105"
        >
          Apply Gift Card
        </button>
      </form>
      {message && (
        <div
          className={`mt-6 p-4 rounded-lg ${
            isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          } text-center text-lg font-semibold animate-bounce`}
        >
          {message}
        </div>
      )}
    </section>
  )
}
