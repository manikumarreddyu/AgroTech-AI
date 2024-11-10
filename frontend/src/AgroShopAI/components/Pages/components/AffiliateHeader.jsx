import React from 'react';

export default function AffiliateHeader() {
  return (
    <header className="bg-gradient-to-r from-green-700 to-green-900 text-white py-6 pt-10 shadow-md">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <img
            src="https://i.pinimg.com/736x/70/4e/fb/704efbd2e3759663b0218421e2670962.jpg"
            alt="AgroShop Logo"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-extrabold tracking-wide">
              AgroShop Affiliate Program
            </h1>
            <p className="text-green-200 text-sm">
              Partner with us to grow together in sustainable agriculture
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 md:mt-0">
          <ul className="flex space-x-6 font-medium text-lg">
            <li>
              <a href="#overview" className="hover:text-green-300 transition duration-300">
                Overview
              </a>
            </li>
            <li>
              <a href="#materials" className="hover:text-green-300 transition duration-300">
                Materials
              </a>
            </li>
            <li>
              <a href="#terms" className="hover:text-green-300 transition duration-300">
                Terms
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-green-300 transition duration-300">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Call to Action */}
        <div className="mt-4 md:mt-0">
          <a
            href="#signup"
            className="bg-white text-green-600 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-green-50 transition duration-300"
          >
            Join Now
          </a>
        </div>
      </div>

      {/* Subtext */}
      <div className="container mx-auto px-6 mt-4 text-center text-green-200 text-sm md:text-base">
        <p>Earn commissions, access exclusive materials, and help promote sustainable farming practices!</p>
      </div>
    </header>
  );
}
