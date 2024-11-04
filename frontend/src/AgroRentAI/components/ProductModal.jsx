import React from "react";

const ProductModal = ({ product, onClose }) => {
  const handleContactClick = () => {
    const userEmail = prompt("Enter your email to contact the owner:");
    if (userEmail) {
      alert(`An email has been sent from ${userEmail} to ${product.contactDetails.email} for further inquiries.`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold text-green-600">{product.productName}</h2>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <div className="mt-4">
          <p className="font-semibold">
            Price: ${product.price} ({product.priceType})
          </p>
          <p>Condition: {product.condition}</p>
          <p>
            Location: {product.location.city}, {product.location.state}
          </p>
          {product.availability && (
            <p>
              Available from {product.availability.startDate} to{" "}
              {product.availability.endDate}
            </p>
          )}
          <p className="mt-2 font-semibold">Contact:</p>
          <p>Phone: {product.contactDetails.phone}</p>
          <p>Email: {product.contactDetails.email}</p>
        </div>
        <button
          onClick={handleContactClick}
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Contact Owner
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
