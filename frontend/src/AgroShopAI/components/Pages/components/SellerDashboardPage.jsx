import React from 'react';

const SellerDashboardPage = ({ sellerInfo }) => {
  return (
    <div className="container mx-auto p-6">
      {/* Dashboard Header */}
      <header className="mb-8">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-xl mt-2">Welcome, {sellerInfo.name}!</p>
      </header>

      {/* Main Content Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Store Information Section */}
        <section className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Store Information</h3>
          <p><strong>Store Name:</strong> {sellerInfo.storeName}</p>
          <p><strong>Email:</strong> {sellerInfo.email}</p>
          <p><strong>Join Date:</strong> {sellerInfo.joinDate}</p>
        </section>

        {/* Seller Profile Section */}
        <section className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Seller Profile</h3>
          <p><strong>Seller ID:</strong> {sellerInfo.sellerId}</p>
          <p><strong>Location:</strong> {sellerInfo.location}</p>
          <p><strong>Phone:</strong> {sellerInfo.phone}</p>
        </section>

        {/* Store Policies Section */}
        <section className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Store Policies</h3>
          <p><strong>Return Policy:</strong> {sellerInfo.returnPolicy}</p>
          <p><strong>Shipping Policy:</strong> {sellerInfo.shippingPolicy}</p>
          <p><strong>Payment Methods:</strong> {sellerInfo.paymentMethods.join(', ')}</p>
        </section>

        {/* Quick Links Section */}
        <section className="bg-white p-6 shadow rounded-lg md:col-span-2 lg:col-span-3">
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/update-profile" className="text-blue-500 hover:underline">Update Profile</a>
            </li>
            <li>
              <a href="/store-settings" className="text-blue-500 hover:underline">Store Settings</a>
            </li>
            <li>
              <a href="/customer-support" className="text-blue-500 hover:underline">Customer Support</a>
            </li>
            <li>
              <a href="/help-center" className="text-blue-500 hover:underline">Help Center</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default SellerDashboardPage;
