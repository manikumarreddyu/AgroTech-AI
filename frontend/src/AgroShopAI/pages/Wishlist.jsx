import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom"; // Ensure useNavigate is imported

const Wishlist = () => {
  const { userData } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}api/wishlist/${userData}`
        );
        const result = await response.json();
        if (response.ok) {
          // Transform the fetched wishlist data
          const transformedWishlist = result.wishlist.map((item) => {
            const { productId, variantId } = item;
            return {
              __v: 5,
              _id: productId._id,
              brand: {
                _id: productId.brand?._id,
                name: productId.brand?.name,
              },
              createdAt: productId.createdAt,
              description: productId.description,
              images: productId.images,
              name: productId.name,
              offer: productId.offer,
              reviews: productId.reviews || [],
              updatedAt: productId.updatedAt,
              variant: {
                _id: variantId._id,
                price: variantId.price,
                product: variantId.product,
                size: variantId.size,
                type: variantId.type,
                color: variantId.color,
              },
              variantId: variantId._id,
              variants: productId.variants || [],
            };
          });
          setWishlistItems(transformedWishlist);
        } else {
          alert(result.message || "Failed to fetch wishlist items.");
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userData]);

  const updateWishlistStatus = async (productId, variantId, isInWishlist) => {
    if (isInWishlist) {
      setWishlistItems((prevItems) =>
        prevItems.filter(
          (item) => !(item._id === productId && item.variantId === variantId)
        )
      );
    } else {
      await fetchWishlist();
    }
  };

  return (
    <div className="py-5 bg-gray-800">
      <div className="mx-5 bg-white rounded-lg">
        {/* Header Section */}
        <header className="bg-green-400 rounded-lg py-4">
          <h1 className="text-4xl font-bold text-center text-black">
            Your Wishlist
          </h1>
        </header>

        {/* Main Content Section */}
        <main className="mt-5 mx-2">
          {wishlistItems.length > 0 ? (
            <div className="flex flex-row gap-6 p-4 overflow-hidden">
              {wishlistItems.map((product) => (
                <div key={product._id} className="w-fit border rounded-lg shadow-lg transition-transform transform hover:scale-105 bg-white">
                  <ProductCard
                    item={product}
                    initialWishlistStatus={true}
                    onWishlistToggle={updateWishlistStatus}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center text-center text-gray-600 p-6">
              <div>
                <p className="text-xl">Your wishlist is empty.</p>
                <p>
                  Start adding items to your wishlist by browsing our products.
                </p>
                <button
                  onClick={() => navigate("/agroshop")}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Go to Shop
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Wishlist;
