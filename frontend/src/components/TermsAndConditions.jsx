import {Link} from 'react-router-dom'

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-green-50 py-24 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Terms and Conditions</h1>
        </div>
        <div className="px-6 py-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using our agricultural services, including soil quality prediction and farmer guidelines, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">2. Use of Services</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Our services are intended to provide information and predictions to assist farmers. However, you acknowledge that:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Predictions and guidelines are based on available data and models, and may not be 100% accurate.</li>
              <li>You should use our services as a supplement to, not a replacement for, professional agricultural advice.</li>
              <li>We are not responsible for any crop losses or damages resulting from the use of our services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">3. User Accounts</h2>
            <p className="text-gray-700 leading-relaxed">
              To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">4. Data Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              We collect and use your data in accordance with our Privacy Policy. By using our services, you consent to such processing and you warrant that all data provided by you is accurate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">5. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              The content, features, and functionality of our service are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">6. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">7. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">8. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms, please contact us at:
            </p>
            <address className="mt-2 not-italic text-green-700">
              AgriTech Solutions<br />
              Madhapur, Hyderabad<br />
              Email: support@agritech.com<br />
              Phone: (555) 123-4567
            </address>
          </section>
        </div>
        <div className="bg-green-100 px-6 py-4">
          <p className="text-sm  text-green-800">
            By using our services, you acknowledge that you have read and understood these Terms and Conditions and agree to be bound by them.
          </p>
          <p className="text-sm text-green-800 mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to='/' className="text-green-600 hover:text-green-800 transition-colors duration-200">
          Return to Home
        </Link>
      </div>
    </div>
  )
}