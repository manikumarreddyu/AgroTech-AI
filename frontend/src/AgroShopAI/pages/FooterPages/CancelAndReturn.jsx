import React from 'react';

const CancellationAndReturnPolicy = () => {
  return (
    <div className="bg-green-100 py-2">

    <div className="max-w-4xl mx-auto p-8 bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-center text-teal-700 mb-6">
        Cancellation & Return Policy
      </h1>
      <p className="text-gray-700 text-center mb-8">
        At AgroShopAI, we value your satisfaction and strive to ensure a seamless shopping experience. Please review our policies below for detailed guidance on cancellations and returns for various product categories.
      </p>

      {/* Cancellation Policy */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-teal-600 pb-2">
          Cancellation Policy
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-medium text-gray-900 mb-3">1. Time Frame for Cancellations</h3>
          <p className="text-gray-600 mb-4">
            Cancellations are allowed within <strong>24 hours</strong> of placing an order. If an order has already been shipped, cancellation may no longer be possible, but you may still initiate a return once the item is delivered.
          </p>

          <h3 className="text-xl font-medium text-gray-900 mb-3">2. Steps to Cancel Your Order</h3>
          <ul className="list-decimal list-inside text-gray-700 mb-4 space-y-2">
            <li>Log into your AgroShopAI account.</li>
            <li>Navigate to <strong>My Orders</strong> and select the relevant order.</li>
            <li>Click on <strong>Cancel Order</strong> and follow the provided instructions.</li>
            <li>If the order has already been shipped, please reach out to our <a href="/support" className="text-teal-700 underline">Customer Support Team</a> for assistance.</li>
          </ul>

          <h3 className="text-xl font-medium text-gray-900 mb-3">3. Fees and Conditions</h3>
          <p className="text-gray-600 mb-4">
            Cancellations made within the specified 24-hour window are <strong>free of charge</strong>. If an order has shipped, cancellation may involve a handling or restocking fee based on shipping costs.
          </p>

          <h3 className="text-xl font-medium text-gray-900 mb-3">4. Cancellations for Shipped Products</h3>
          <p className="text-gray-600">
            For shipped orders, cancellation may not be possible. In such cases, you may refuse delivery to have the item returned to our warehouse. Once the item is received, we will process a refund, minus any applicable shipping and handling fees. For additional assistance, please contact our <a href="/support" className="text-teal-700 underline">Customer Support Team</a>.
          </p>
        </div>
      </section>

      {/* Return Policy */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-teal-600 pb-2">
          Return Policy
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-medium text-gray-900 mb-3">1. Eligibility Criteria</h3>
          <p className="text-gray-600 mb-4">
            Returns are accepted within <strong>15 days</strong> of delivery, provided items are in original condition with all packaging and tags intact. Used or damaged items are not eligible for returns.
          </p>

          <h3 className="text-xl font-medium text-gray-900 mb-3">2. How to Initiate a Return</h3>
          <ul className="list-decimal list-inside text-gray-700 mb-4 space-y-2">
            <li>Log in to your AgroShopAI account and go to <strong>My Orders</strong>.</li>
            <li>Select the item for return and click on the <strong>Return Item</strong> button.</li>
            <li>Follow the instructions to complete the return request.</li>
          </ul>
          <p className="text-gray-600 mb-4">
            Please ensure all items are securely packaged to prevent damage during transit.
          </p>

          <h3 className="text-xl font-medium text-gray-900 mb-3">3. Refunds and Exchanges</h3>
          <p className="text-gray-600 mb-4">
            Once your return is received and inspected, a refund will be issued within <strong>5-7 business days</strong>. For exchanges, the replacement item will be dispatched within the same timeframe, subject to availability.
          </p>

          <h3 className="text-xl font-medium text-gray-900 mb-3">4. Exceptions to the Return Policy</h3>
          <p className="text-gray-600">
            Certain items, such as <strong>perishable goods, custom orders, and items marked as final sale</strong>, are not eligible for returns. For more details, please check our <a href="/faq" className="text-teal-700 underline">FAQ page</a>.
          </p>
        </div>
      </section>

      {/* Product-Specific Policies */}
      <section className="mb-12">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-teal-600 pb-2">
    Product-Specific Policies
  </h2>
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h3 className="text-xl font-medium text-gray-900 mb-3">Categories We Serve</h3>
    <p className="text-gray-600 mb-4">
      Our return and cancellation policies vary by product category. Please review the table below for specific return conditions:
    </p>
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-teal-600 text-white">
          <th className="border border-gray-300 px-4 py-2">Product Category</th>
          <th className="border border-gray-300 px-4 py-2">Return Days</th>
          <th className="border border-gray-300 px-4 py-2">Conditions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-300 px-4 py-2"><strong>Herbicides, Insecticides, and Fungicides</strong></td>
          <td className="border border-gray-300 px-4 py-2">15 Days</td> {/* Randomly assigned */}
          <td className="border border-gray-300 px-4 py-2">Must be unopened. No returns accepted for opened items due to safety regulations.</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2"><strong>Growth Promoters and Nutrients</strong></td>
          <td className="border border-gray-300 px-4 py-2">7 Days</td> {/* Randomly assigned */}
          <td className="border border-gray-300 px-4 py-2">Unopened items can be returned. Opened products are non-returnable.</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2"><strong>Vegetable & Fruit Seeds</strong></td>
          <td className="border border-gray-300 px-4 py-2">15 Days</td> {/* Randomly assigned */}
          <td className="border border-gray-300 px-4 py-2">Returns accepted only if packaging is intact. Verify viability before planting.</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2"><strong>Farm Machinery</strong></td>
          <td className="border border-gray-300 px-4 py-2">7 Days</td> {/* Randomly assigned */}
          <td className="border border-gray-300 px-4 py-2">Must be in original, unused condition. Visible signs of use void return eligibility.</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2"><strong>Organic Farming Products</strong></td>
          <td className="border border-gray-300 px-4 py-2">15 Days</td> {/* Randomly assigned */}
          <td className="border border-gray-300 px-4 py-2">Returnable only if unopened and unused within the return period.</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2"><strong>Animal Husbandry Products</strong></td>
          <td className="border border-gray-300 px-4 py-2">7 Days</td> {/* Randomly assigned */}
          <td className="border border-gray-300 px-4 py-2">Only unopened items are eligible for return due to hygiene concerns.</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2"><strong>New Products</strong></td>
          <td className="border border-gray-300 px-4 py-2">Varies</td>
          <td className="border border-gray-300 px-4 py-2"> Return eligibility is determined based on the specific conditions outlined on the product description page. This may include return periods of 7 or 15 days depending on the item.</td>
        </tr>
      </tbody>
    </table>
    <p className="text-gray-600 mt-4">
      For a smooth return process, please ensure you review specific return conditions at the time of purchase.
    </p>
  </div>
</section>




      {/* Additional Support Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-teal-600 pb-2">
          Need Help?
        </h2>
        <p className="text-gray-600 mb-4">
          If you have further questions or require assistance with cancellations or returns, please reach out to our <a href="/support" className="text-teal-700 underline">Customer Support Team</a>. For more information, visit our <a href="/faq" className="text-teal-700 underline">FAQ</a> page.
        </p>
      </section>
    </div>
    </div>
  );
};

export default CancellationAndReturnPolicy;
