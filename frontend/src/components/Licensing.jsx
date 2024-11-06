import { Link } from 'react-router-dom';
import React from 'react';

export default function Licensing() {
  return (
    <div className="min-h-screen bg-green-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Licensing</h1>
        </div>
        <div className="px-6 py-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              This Licensing Agreement outlines the terms and conditions under which you may use our agricultural services and software. By using our services, you agree to comply with the terms outlined in this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">2. License Grant</h2>
            <p className="text-gray-700 leading-relaxed">
              We grant you a non-exclusive, non-transferable license to use our software and services for personal or commercial purposes as per the terms of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">3. Usage Restrictions</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Reverse engineer or attempt to extract the source code of the software</li>
              <li>Redistribute or resell access to the software or services</li>
              <li>Use the software for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">4. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All intellectual property rights in our software and services, including but not limited to, trademarks, logos, and proprietary information, remain the sole property of AgriTech Solutions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">5. Warranty Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              Our software and services are provided "as is" without warranty of any kind. We disclaim all warranties, express or implied, including but not limited to, fitness for a particular purpose, accuracy, and non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">6. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              We shall not be liable for any damages resulting from the use or inability to use our services. This includes, but is not limited to, loss of data, business interruptions, or any indirect or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">7. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to terminate this license agreement if you violate any terms. Upon termination, you must cease all use of our software and services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">8. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or concerns about this Licensing Agreement, please contact us at:
            </p>
            <address className="mt-2 not-italic text-green-700">
              AgriTech Solutions<br />
              Madhapur, Hyderabad<br />
              Email: licensing@agritech.com<br />
              Phone: (555) 123-4567
            </address>
          </section>
        </div>
        <div className="bg-green-100 px-6 py-4">
          <p className="text-sm text-green-800">
            By using our services, you acknowledge that you have read and understood this Licensing Agreement and agree to its terms.
          </p>
          <p className="text-sm text-green-800 mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to="/" className="text-green-600 hover:text-green-800 transition-colors duration-200">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
