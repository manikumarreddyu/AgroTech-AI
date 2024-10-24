import React, { useState, useEffect } from "react";
import ReviewSection from "../components/ReviewSection"; // Adjust the path as needed
import { useParams } from "react-router-dom";
import NotFound from "../../NotFound";
const ProductPage = () => {
  const {id} = useParams();
  if (!id){
    return (
      <NotFound />
    )
  }
  const [quantity, setQuantity] = useState(1); // State to hold the selected quantity
  const [chosenVariant, setChosenVariant] = useState(null); // State to store chosen variant
  const [product,setProduct] = useState(null)//will help in adding to cart
  const handleVariantClick = (index) => {
    setChosenVariant(index); // Set the chosen variant's index
    setProduct(items.variants[index]._id)
    console.log('hello')
    console.log(items.variants[index]._id)
  };
  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value)); // Update the state when quantity is selected
  };
  const [reviews, setReviews] = useState([]);
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const url = `http://127.0.0.1:8080/api/products/${id}`; // Replace with your API URL

  // Function to fetch product data and reviews
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await fetch(url); // Replace with your API URL
      const data = await response.json();
      setItems(data); // Set fetched data to items
      setReviews(data.reviews); // Assuming reviews come from product API
      if (data.images && data.images.length > 0) {
        setCurrentImage(data.images[0]); // Set the first image in the array as the default image
      }
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, [id]);

  // Function to calculate the average rating from reviews
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); // Round to 1 decimal
  };

  const averageRating = calculateAverageRating();

  // Display loader while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center text-white">
          <div className="loader border-t-4 border-b-4 border-purple-600 rounded-full w-12 h-12 mb-4 animate-spin"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (!items) return null;

  return (
    <div className="min-h-screen bg-gray-800 p-2 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full bg-white border border-gray-300 rounded-md shadow-md">
        {/* Image Section */}
        <div className="flex p-2 bg-white border-r-2 rounded-l-md">
          {/* Thumbnails Column */}
          <div className="flex flex-col pt-6 space-y-2 items-center w-16">
            {items.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover w-16 h-16 border border-gray-300 rounded-md cursor-pointer hover:opacity-75"
                onMouseEnter={() => setCurrentImage(image)}
              />
            ))}
          </div>

          {/* Main Product Image */}
          <div className="flex justify-center w-full h-2/3 p-6 space-y-6">
            <img
              src={currentImage}
              alt={items.name}
              className="object-cover w-full max-w-lg transition-transform duration-300 ease-in-out transform hover:scale-105 rounded-md"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white p-6 space-y-6 rounded-md">
          {/* Product Title */}
          <h1 className="text-4xl font-bold">{items.name}</h1>

          {/* Dynamic Star Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`text-yellow-500 ${
                    index < Math.floor(averageRating)
                      ? "fas fa-star"
                      : "far fa-star"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-gray-600">({reviews.length} reviews)</span>
            <span className="text-gray-600">Average: {averageRating} / 5</span>
          </div>
          {/* Product Description */}
          <p className="text-gray-700">{items.description}</p>
          <div className="space-y-2">
            <p className="text-lg font-semibold">Usage Instructions:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Apply 1 cup per 10 square feet of soil.</li>
              <li>Mix well with the topsoil before planting.</li>
              <li>Water the soil thoroughly after application.</li>
            </ul>
          </div>

          {/* Variants */}
          <div>
      {items.variants && items.variants.length > 0 && (
        <div className="space-y-2">
          <p className="text-lg font-semibold">Size:</p>
          <div className="flex space-x-4">
            {items.variants.map((variant, index) => (
              <div key={index}>
                <button
                  className={`w-20 h-20 rounded-md border border-green-500 text-black ${
                    chosenVariant === index
                      ? 'bg-green-500' // Highlight selected variant
                      : 'bg-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  disabled={variant.stock <= 0} // Disable if out of stock
                  onClick={() => handleVariantClick(index)} // Handle selection
                >
                  <p>
                    {variant.size} {variant.type ? 'Kg' : 'L'}
                  </p>
                  <p>₹{variant.price}</p>
                </button>
                <p
                  className={`ml-2 ${
                    variant.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {variant.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            ))}
          </div>

          
        </div>
      )}
    </div>

          
<div>
      <div className="flex items-center space-x-4">
        <label htmlFor="quantity" className="font-semibold">Quantity:</label>
        <select
          id="quantity"
          className="border border-gray-300 rounded-md px-4 py-2"
          value={quantity}
          onChange={handleQuantityChange} // Call the function on change
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} {/* Add "kg" to the 10th option */}
            </option>
          ))}
        </select>
      </div>

      {/* You can now use the selected quantity elsewhere */}
      
    </div>
          {/* Add to Cart and Buy Now Buttons */}
          <div className="space-y-4">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-md font-bold hover:bg-yellow-500 w-full">
              Add to Cart ( {quantity>0?`${quantity}`:''} )
            </button>
            <button className="bg-orange-600 text-white px-6 py-3 rounded-md font-bold hover:bg-orange-700 w-full">
              Buy Now
            </button>
          </div>

          {/* Shipping Information */}
          <div className="text-sm text-gray-600">
            <p>Ships from and sold by AgriShop.</p>
            <p>Eligible for free shipping on orders over ₹500.</p>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <ReviewSection product_id={items._id} reviews={reviews} setReviews={setReviews} />
    </div>
  );
};

export default ProductPage;
