import React, { useState, useEffect } from 'react'
import GiftBenefit from './GiftBenefit'
import GiftIdeas from './GiftIdeas'
import GiftTest from './GiftTest'
import GiftFaq from './GiftFaq'
import GiftLetter from './GIftLetter'

export default function GiftCard() {
  const [giftCardNumber, setGiftCardNumber] = useState('')
  const [pin, setPin] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleApplyGiftCard = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold">AgroShop</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:text-green-200 transition duration-300">Home</a></li>
              <li><a href="#" className="hover:text-green-200 transition duration-300">Products</a></li>
              <li><a href="#" className="hover:text-green-200 transition duration-300">Gift Cards</a></li>
              <li><a href="#" className="hover:text-green-200 transition duration-300">About</a></li>
              <li><a href="#" className="hover:text-green-200 transition duration-300">Contact</a></li>
            </ul>
          </nav>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-600 text-white p-4">
          <ul className="space-y-2">
            <li><a href="#" className="block hover:text-green-200 transition duration-300">Home</a></li>
            <li><a href="#" className="block hover:text-green-200 transition duration-300">Products</a></li>
            <li><a href="#" className="block hover:text-green-200 transition duration-300">Gift Cards</a></li>
            <li><a href="#" className="block hover:text-green-200 transition duration-300">About</a></li>
            <li><a href="#" className="block hover:text-green-200 transition duration-300">Contact</a></li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-green-800 mb-4">Give the Gift of Green</h1>
          <p className="text-xl text-green-600 mb-8">Perfect for any gardening enthusiast in your life!</p>
          <a href="#gift-card-form" className="bg-green-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 transform hover:scale-105 inline-block">
            Get a Gift Card
          </a>
        </section>

        {/* Sale Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 p-6 rounded-xl mb-12 text-center transform hover:scale-105 transition duration-300 shadow-xl">
          <h2 className="text-3xl font-bold mb-2">Spring Sale! 20% Off All Seeds</h2>
          <p className="text-xl">Use code: SPRING20 at checkout</p>
        </div>

        {/* Gift Card Section */}
        <section id="gift-card-form" className="bg-white p-8 rounded-xl shadow-2xl mb-12 transform hover:shadow-3xl transition duration-300">
          <h2 className="text-3xl font-bold mb-6 text-green-700">Apply Gift Card</h2>
          <form onSubmit={handleApplyGiftCard} className="space-y-6">
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

        <GiftBenefit/>

        {/* Featured Products */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-green-800">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Organic Tomato Seeds', price: 19.99, image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/plant-seed/7/9/s/60-1deshi-tomato-seeds2g-bdsresolve-original-imagsghfzcxe3y27.jpeg?q=20&crop=false' },
              { name: 'Garden Tool Set', price: 49.99, image: 'https://nurserylive.com/cdn/shop/products/nurserylive-combo-packs-tools-basic-garden-tool-kit-gardening-tools-16968613363852.jpg?v=1634214058' },
              { name: 'Eco-Friendly Fertilizer', price: 29.99, image: 'https://www.planetnatural.com/wp-content/uploads/2012/12/fertilizer-products-1.jpg' }
            ].map((product, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-green-600 font-bold text-lg mb-4">${product.price.toFixed(2)}</p>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        <GiftIdeas/>

       <GiftTest/>
       <GiftFaq/>
<GiftLetter />
        

        
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white p-8 mt-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">AgroShop</h3>
            <p>Your one-stop shop for all things gardening</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-300 transition duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-green-300 transition duration-300">Products</a></li>
              <li><a href="#" className="hover:text-green-300 transition duration-300">Gift Cards</a></li>
              <li><a href="#" className="hover:text-green-300 transition duration-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-300 transition duration-300">FAQ</a></li>
              <li><a href="#" className="hover:text-green-300 transition duration-300">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-green-300 transition duration-300">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-green-300 transition duration-300">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-green-300 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-green-300 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-green-300 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p>&copy; 2023 AgroShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}