import React from 'react';

export default function AffiliateMarketingMaterials() {
  return (
    <section className="mb-12 px-6 py-8 bg-gradient-to-r from-green-50 to-green-100 shadow-lg rounded-lg">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Marketing Materials</h2>
        <p className="text-green-700 leading-relaxed">
          Access a range of professional marketing tools designed to help you promote AgroShop and increase your earnings.
          Use these assets to engage your audience and drive conversions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-green-800 mb-3">Banners</h3>
          <p className="text-green-700 mb-3">Choose from a variety of banners tailored to promote AgroShop products effectively.</p>
          <img src="https://www.creativehatti.com/wp-content/uploads/edd/2021/06/Banner-for-high-quality-seeds-goodness-of-nature-15-large.jpg" alt="Banner Example" className="w-full h-32 object-cover rounded-md mb-4" />
          <button className="bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition-colors">
            Download Banner
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-green-800 mb-3">Referral Link</h3>
          <p className="text-green-700 mb-3">Use your unique referral link below to start earning commissions:</p>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              readOnly
              value="https://www.agroshop.com/referral?code=YOUR_CODE"
              className="w-full px-3 py-2 border border-green-300 rounded text-gray-600"
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
              Copy
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-green-800 mb-3">Social Media Content</h3>
          <p className="text-green-700 mb-3">Ready-to-post content for Facebook, Instagram, and Twitter.</p>
          <button className="bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition-colors">
            Download Content Pack
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-green-800 mb-3">Email Templates</h3>
          <p className="text-green-700 mb-3">Engage your subscribers with pre-written, customizable email templates.</p>
          <button className="bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition-colors">
            Download Email Pack
          </button>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-green-600 italic">Need custom materials? <a href="#contact" className="text-green-700 font-semibold hover:underline">Contact our support team</a> for assistance.</p>
      </div>
    </section>
  );
}
