import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-green-100 py-2">
      <div className="max-w-4xl mx-auto p-8 bg-gray-50 shadow-md rounded-t-lg">
        <h1 className="text-4xl font-bold text-center text-teal-700 mb-6">
          Privacy Policy
        </h1>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-teal-600 pb-2">
            1. Introduction
          </h2>
          <p className="text-gray-700 mb-4">
            At AgroShop AI, we are committed to respecting and protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our e-commerce platform and related services. By accessing or using our services, you agree to the terms of this Privacy Policy. Please review it carefully to understand our practices regarding your information.
          </p>
        </section>

        {/* Information Collection */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-teal-600 pb-2">
            2. Information We Collect
          </h2>
          <p className="text-gray-700 mb-4">
            We collect information to provide a personalized shopping experience and ensure compliance with legal regulations.
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li><strong>Personal Information:</strong> Includes name, email, contact details, shipping and billing addresses, and payment information.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our platform, including browsing behavior, purchase history, and device information.</li>
            <li><strong>Cookies and Tracking Technologies:</strong> Used to remember preferences and improve user experience. For more details, see our <a href="#cookie-policy" className="text-teal-600">Cookie Policy</a>.</li>
            <li><strong>Payment Information:</strong> Securely handled through compliant third-party payment processors to complete transactions.</li>
          </ul>
        </section>

        {/* Use of Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-teal-600 pb-2">
            3. Use of Information
          </h2>
          <p className="text-gray-700 mb-4">
            We use the collected information for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>To process transactions, including payments and order fulfillment.</li>
            <li>To enhance and personalize your shopping experience on our platform.</li>
            <li>To send marketing and promotional content, subject to your consent.</li>
            <li>To provide customer support and respond to inquiries.</li>
            <li>To comply with legal obligations, including tax and anti-fraud regulations.</li>
          </ul>
        </section>

        {/* Information Sharing */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-teal-600 pb-2">
            4. Information Sharing and Disclosure
          </h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>We do not sell or rent personal information to third parties.</li>
            <li>We may share your information with trusted service providers who assist in fulfilling orders, processing payments, and delivering services.</li>
            <li>We may disclose information to comply with legal obligations, protect our rights, and prevent fraudulent activities.</li>
            <li>If we are involved in a merger or acquisition, personal information may be transferred to the new entity, and you will be notified of such changes.</li>
          </ul>
        </section>

        {/* Data Security */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-teal-600 pb-2">
            5. Data Security
          </h2>
          <p className="text-gray-700 mb-4">
            We take appropriate security measures to protect your personal information. This includes encryption of sensitive data and secure payment processing through third-party providers. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute protection.
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-teal-600 pb-2">
            6. Your Rights and Choices
          </h2>
          <p className="text-gray-700 mb-4">
            Depending on your location, you may have certain rights over your personal information:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Access, correct, or delete your personal information.</li>
            <li>Withdraw consent for data processing where applicable.</li>
            <li>Object to data processing or request data portability under certain circumstances.</li>
            <li>Opt out of marketing communications at any time.</li>
          </ul>
          <p className="text-gray-700 mb-4">
            To exercise any of these rights, please contact us at <a href="mailto:support@agroshopai.com" className="text-teal-600">support@agroshopai.com</a>.
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-teal-600 pb-2">
            7. Children's Privacy
          </h2>
          <p className="text-gray-700 mb-4">
            Our platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected such data, we will take immediate steps to delete it.
          </p>
        </section>

        {/* Policy Updates */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-teal-600 pb-2">
            8. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 mb-4">
            We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on this page.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-teal-600 pb-2">
            9. Contact Us
          </h2>
          <p className="text-gray-700 mb-4">
            If you have questions or concerns about this Privacy Policy, please contact us at <a href="mailto:support@agroshopai.com" className="text-teal-600">support@agroshopai.com</a>.
          </p>
        </section>
      </div>
        <section className="max-w-4xl mx-auto p-8 shadow-md rounded-b-lg bg-green-800 px-6 py-4">
          <p className="text-sm ">
            By using our services, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
          </p>
          <p className="text-sm  mt-2">
            Last updated: 6/11/2024
          </p>
        </section>
      
    </div>
  );
};

export default PrivacyPolicy;
