import React, { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
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
    </header>
  )
}
