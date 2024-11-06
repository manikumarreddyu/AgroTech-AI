import { Link } from 'react-router-dom';
import React from 'react';

export default function CodeOfConduct() {
  return (
    <div className="min-h-screen bg-green-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Code of Conduct</h1>
        </div>
        <div className="px-6 py-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">1. Purpose</h2>
            <p className="text-gray-700 leading-relaxed">
              Our Code of Conduct is designed to promote respectful, inclusive, and productive interactions among users, partners, and staff members. By engaging with our community, you agree to uphold these standards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">2. Expected Behavior</h2>
            <p className="text-gray-700 leading-relaxed">
              All participants are expected to:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Be respectful and considerate in interactions with others.</li>
              <li>Provide constructive feedback and support.</li>
              <li>Respect diverse viewpoints and experiences.</li>
              <li>Follow the policies of the platform and community spaces.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">3. Unacceptable Behavior</h2>
            <p className="text-gray-700 leading-relaxed">
              The following behaviors are prohibited:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Harassment, discrimination, or offensive comments based on personal characteristics.</li>
              <li>Disruptive or harmful behaviors that hinder others' participation.</li>
              <li>Sharing inappropriate or offensive content.</li>
              <li>Spamming, trolling, or other forms of disruption.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">4. Reporting Violations</h2>
            <p className="text-gray-700 leading-relaxed">
              If you experience or witness behavior that violates this Code of Conduct, please report it to our support team. All reports will be handled with confidentiality and respect for privacy.
            </p>
            <address className="mt-2 not-italic text-green-700">
              Email: support@agritech.com<br />
              Phone: (555) 123-4567
            </address>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">5. Consequences of Violations</h2>
            <p className="text-gray-700 leading-relaxed">
              Participants who violate this Code of Conduct may be subject to corrective actions, including warnings, temporary suspension, or permanent removal from our platform and community spaces.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">6. Commitment to Improvement</h2>
            <p className="text-gray-700 leading-relaxed">
              We are committed to maintaining a safe and welcoming environment. This Code of Conduct may be updated periodically, and we encourage all participants to stay informed of its guidelines.
            </p>
          </section>
        </div>
        <div className="bg-green-100 px-6 py-4">
          <p className="text-sm text-green-800">
            By participating in our community, you acknowledge that you have read and understood this Code of Conduct and agree to abide by its terms.
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
