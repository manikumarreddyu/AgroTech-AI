import React from 'react';

export default function AffiliateJoinSection() {
  return (
    <section className="mb-12 px-6 py-8 bg-gradient-to-r from-green-50 to-green-100 shadow-md rounded-lg">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Join Our Affiliate Program</h2>
        <p className="text-green-700 mb-6 leading-relaxed">
          Become a partner with AgroShop and earn commissions by promoting our high-quality agricultural products.
          Our program offers competitive rates and simple tools to help you maximize your earnings while supporting
          sustainable agriculture.
        </p>
      </div>

      <div className="text-green-800 mb-6">
        <h3 className="text-2xl font-semibold mb-4 text-center">How It Works</h3>
        <ol className="list-decimal list-inside text-green-700 space-y-3">
          <li>Sign up for our affiliate program with quick and easy registration.</li>
          <li>Receive your unique referral link to track sales and commissions.</li>
          <li>Promote AgroShop products through your website, blog, or social media.</li>
          <li>Earn a commission on every sale made through your link.</li>
        </ol>
      </div>

      <div className="text-green-800 mb-6">
        <h3 className="text-2xl font-semibold mb-4 text-center">Program Benefits</h3>
        <ul className="list-disc list-inside text-green-700 space-y-3">
          <li>10% commission on all sales - one of the highest in the industry.</li>
          <li>30-day cookie duration ensures you get credit for returning customers.</li>
          <li>Monthly payouts directly to your account.</li>
          <li>Access to exclusive promotions, materials, and early product launches.</li>
          <li>Dedicated support to help you grow your audience and earnings.</li>
        </ul>
      </div>

      <div className="text-center mt-8">
        <button className="bg-green-600 text-white font-bold px-8 py-3 rounded-full hover:bg-green-700 transition duration-300 shadow-lg">
          Join Now
        </button>
      </div>

      <div className="mt-10 text-center text-green-600">
        <p className="text-sm italic">
          Have questions? <a href="#contact" className="text-green-700 font-semibold hover:underline">Contact us</a> for more information
          about how the AgroShop Affiliate Program can work for you.
        </p>
      </div>
    </section>
  );
}
