import React from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginPrompt from './LoginPrompt';
const ProductCard = ({ item }) => {
  const {isLoggedIn, userData} = useAuth();
  const salePrice = item.variant.price * (1 - (item.offer / 100));
  const savings = item.variant.price - salePrice;
  const navigate = useNavigate();
  const handleCart = async()=>{
    if(!isLoggedIn){
      return (
        <LoginPrompt/>
      )
    }
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/cart/${userData}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: item._id,
          variantId: item.variant._id,
          quantity: 1,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log(result.message);
        navigate('/agroshop/cart')
      } else {
        alert(result.message || "Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }
  return (
    <div
      className="flex-shrink-0 w-64 h-fit bg-white rounded-lg overflow-hidden relative"
      style={{
        boxShadow: `rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px,
                    rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px,
                    rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px`,
      }}
    >
      <div className="w-full h-48">
        {/* Image */}
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover cursor-pointer"
        />
        {/* Offer Tag */}
        {item.offer && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-l-full z-10">
            {item.offer}% OFF
          </span>
        )}
      </div>

      <div className="p-4 bg-white">
        {/* Title with truncation */}
        <Link to={`/AgroShop/Product/${item._id}`} className="block text-s font-semibold text-black cursor-pointer hover:text-blue-500">
          {item.name.length > 25 ? `${item.name.substring(0, 25)}...` : item.name}
        </Link>
        <Link  className="block text-gray-400 text-xs hover:underline cursor-pointer hover:text-blue-500">{item.brand.name.length > 25 ? `${item.brand.name.substring(0, 35)}...` : item.brand.name}</Link>
        <div className="flex items-center">
          <p className="text-black text-sm display-inline mr-2">Size :</p>
          <p className="text-gray-400 text-sm display-inline">{item.variant.size} {item.variant.type? 'Kg' : 'L'} </p>
        </div>
        <div className="flex items-center">
          <p className="text-black text-m display-inline mr-2">₹{salePrice.toFixed(2)}</p>
          <p className="text-gray-400 text-m display-inline line-through">₹{item.variant.price}</p>
        </div>
        <p className="text-green-600 text-xs font-bold">You Save: ₹{savings.toFixed(2)}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between px-4 py-3 bg-white border-t-2">
        <button className="bg-green-400 hover:bg-green-300 text-gray-800 font-medium px-4 py-2 rounded-md transition duration-200 ease-in-out shadow-sm">
          Buy Now
        </button>
        <button className="bg-orange-400 hover:bg-orange-300 text-gray-800 font-medium px-4 py-2 rounded-md transition duration-200 ease-in-out shadow-sm" onClick={() => handleCart()}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
