import React from 'react'

export default function AffiliateTerms() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-green-800 mb-4">Terms and Conditions</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-green-700 mb-4">
          By joining the AgroShop Affiliate Program, you agree to the following terms and conditions:
        </p>
        <ul className="list-disc list-inside text-green-700 mb-4">
          <li>You will earn a 10% commission on all qualifying sales.</li>
          <li>AgroShop reserves the right to modify the commission rate and terms at any time.</li>
          <li>Affiliate links have a 30-day cookie duration.</li>
          <li>Payment is processed monthly, with a minimum payout threshold.</li>
          <li>Affiliates must adhere to AgroShop’s branding guidelines.</li>
        </ul>
        <p className="text-green-700">
          For any questions, please contact our affiliate support team.
        </p>
      </div>
    </section>
  )
}
