import {Link} from 'react-router-dom'

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-green-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Cookie Policy</h1>
        </div>
        <div className="px-6 py-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">1. What Are Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small pieces of data stored on your device (computer or mobile device) when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">2. How We Use Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use cookies on our agricultural website for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>To provide personalized soil quality predictions and farming guidelines</li>
              <li>To remember your preferences and settings</li>
              <li>To improve the performance and functionality of our website</li>
              <li>To analyze how our website is used and improve our services</li>
              <li>To deliver relevant advertisements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">3. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-green-700">Essential Cookies:</h3>
                <p className="text-gray-700">These are necessary for the website to function properly and cannot be switched off.</p>
              </div>
              <div>
                <h3 className="font-medium text-green-700">Analytical/Performance Cookies:</h3>
                <p className="text-gray-700">These help us understand how visitors interact with our website, allowing us to improve its functionality.</p>
              </div>
              <div>
                <h3 className="font-medium text-green-700">Functionality Cookies:</h3>
                <p className="text-gray-700">These remember choices you make to improve your experience.</p>
              </div>
              <div>
                <h3 className="font-medium text-green-700">Targeting Cookies:</h3>
                <p className="text-gray-700">These collect information about your browsing habits to make advertising relevant to you and your interests.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">4. Third-Party Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              We may also use third-party cookies, such as Google Analytics, to help analyze how users use the site and to improve our services. These third-party cookies are subject to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">5. Managing Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may affect your experience of our website. You can manage your cookie preferences in the following ways:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Browser settings: You can usually find these in the 'options' or 'preferences' menu of your browser</li>
              <li>Cookie management tools: We provide options on our website to manage your cookie preferences</li>
              <li>Third-party opt-out: For third-party cookies, you may need to visit the respective website to opt out</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">6. Changes to Our Cookie Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-3">7. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about our Cookie Policy, please contact us at:
            </p>
            <address className="mt-2 not-italic text-green-700">
              AgriTech Solutions<br />
              Madhapur, Hyderabad<br />
              Email: privacy@agritech.com<br />
              Phone: (555) 987-6543
            </address>
          </section>
        </div>
        <div className="bg-green-100 px-6 py-4">
          <p className="text-sm text-green-800">
            By continuing to use our website, you consent to our use of cookies as described in this Cookie Policy.
          </p>
          <p className="text-sm text-green-800 mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link href="/" className="text-green-600 hover:text-green-800 transition-colors duration-200">
          Return to Home
        </Link>
      </div>
    </div>
  )
}