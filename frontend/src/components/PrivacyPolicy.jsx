import { Link } from 'react-router-dom';
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-green-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
        </div>
        <div className="px-6 py-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy outlines how we collect, use, and protect your personal information when you use our agricultural services. By using our services, you consent to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">2. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Personal identification information (Name, email address, etc.)</li>
              <li>Data related to agricultural activities and soil quality</li>
              <li>Technical information about your device and usage patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed">
              The information we collect is used to improve our services, provide accurate soil quality predictions, and offer personalized guidelines for farmers. We may also use it to contact you regarding updates or changes to our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">4. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed">
              We do not share your personal information with third parties unless required by law or to protect our rights and services. In such cases, we will take all necessary steps to ensure that your data is protected.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement security measures to protect your data from unauthorized access, alteration, or disclosure. However, no system is completely secure, and we cannot guarantee the absolute security of your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">6. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to access, correct, or delete the personal data we hold about you. If you wish to exercise these rights, please contact us at the details below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">7. Changes to this Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">8. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or concerns about our Privacy Policy, please contact us at:
            </p>
            <address className="mt-2 not-italic text-green-700">
              AgriTech Solutions<br />
              Madhapur, Hyderabad<br />
              Email: privacy@agritech.com<br />
              Phone: (555) 123-4567
            </address>
          </section>
        </div>
        <div className="bg-green-100 px-6 py-4">
          <p className="text-sm text-green-800">
            By using our services, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
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
