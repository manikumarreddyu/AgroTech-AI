import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";
import { useParams } from 'react-router-dom';
import Preloader from "../../components/PreLoader";
import { useAuth } from "../../context/AuthContext";
import NotFound from "../../NotFound";
import { categories } from "../utils/home-data";
const CategoryPage = () => {
  const { isLoggedIn, userData } = useAuth(); 
  const [wrongURL, setWrongURL] =useState(false);
  const [items, setItems] = useState([]); // State to store fetched items
  const [filteredItems, setFilteredItems] = useState([]); // State for filtered items
  const [loading, setLoading] = useState(true); // State for loading status
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(true);
 
  // Using name instead of Id for test purpose.
  const {name} = useParams();
  let id;
  let url = '';
  if (id) {
    //  Add Data to collection and use that Id here
    url = `${import.meta.env.VITE_BACKEND_BASE_URL}api/products/category/${id}`;
  } else {
    /* Fetching every product for development phase
    Remove it after setting up db locally */
    url = `${import.meta.env.VITE_BACKEND_BASE_URL}api/products/`;
  }

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await fetch(url); // Replace with your API URL
      const data = await response.json();
      console.log(data)
      // Flatten data to include each variant as a separate item
      const flattenedData = data.flatMap(item =>
        item.variants.map(variant => ({
          ...item,
          variant, // Replace with individual variant
          variantId: variant._id, // Add a unique key for each variant
        }))
      );

      setItems(flattenedData); // Set flattened data to items
      setFilteredItems(flattenedData); // Set initial filtered items
    } catch (error) {
      console.error("Failed to fetch items:", error);
      setWrongURL(true);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };
  const fetchWishlist = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}api/wishlist/${userData}`); // Replace with your wishlist API URL
      const data = await response.json();
      const variantIds = data.wishlist.map(wishItem => wishItem.variantId._id);

      setWishlist(variantIds); // Set wishlist state with fetched data
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    }
   finally {
    setWishlistLoading(false); // Set loading to false after fetching
  }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
    fetchWishlist();
  }, [id]);
  if(wrongURL){
    return <NotFound />
  }
  // Display loader while fetching data
  if (loading || wishlistLoading) {
    return <Preloader />;
  }

  return (
    <div className="category bg-gray-800">
      <img
        className="mx-2"
        src={categories.find(category => category.alias === name)?.banner || null}
        
        alt=""
      />
      <div className="flex gap-4 mx-2 mt-2 pb-2">
        <div className="min-w-[250px] max-w-xs">
          <Filter items={items} setFilteredItems={setFilteredItems} />
          <img
            className="py-2"
            src="https://github.com/IkkiOcean/AgroTech_Assets/blob/main/shop-asset/category_page/category_banner_1.jpg?raw=true"
            alt=""
          />
        </div>
        <div className="product-panel border-2 rounded-lg flex-grow flex flex-col">
          <div className="grid grid-cols-3 gap-4 py-4">
          {filteredItems.slice(0, 12).map((item, index) => {

          let isInWishlist = wishlistLoading ? false : wishlist.includes(item.variant._id);

              return (
                <div className="justify-center mx-auto h-fit" key={item.variantId || index}>
                  <ProductCard item={item} initialWishlistStatus={isInWishlist} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
