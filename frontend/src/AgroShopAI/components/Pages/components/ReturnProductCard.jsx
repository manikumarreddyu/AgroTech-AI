function ReturnProductCard({ product, handleReturn }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover mb-4 rounded"
      />
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-1">Model: {product.model}</p>
      <p className="text-gray-600 mb-1">Start: {product.startDate}</p>
      <p className="text-gray-600 mb-3">End: {product.endDate}</p>
      <div className="mt-auto flex justify-between items-center">
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            product.status === "Eligible"
              ? "bg-green-200 text-green-800"
              : product.status === "Pending"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {product.status}
        </span>
        {product.status === "Eligible" && (
          <button
            onClick={() => handleReturn(product)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Return
          </button>
        )}
      </div>
    </div>
  );
}

export default ReturnProductCard;
