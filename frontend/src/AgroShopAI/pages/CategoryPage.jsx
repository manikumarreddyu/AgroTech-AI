import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const [items, setItems] = useState([]); // State to store fetched items
  const [filteredItems, setFilteredItems] = useState([]); // State for filtered items
  const [loading, setLoading] = useState(true); // State for loading status
  const { id } = useParams();
  let url = '';

  if (id) {
    url = `http://127.0.0.1:8080/api/products/category/${id}`;
  } else {
    url = `http://127.0.0.1:8080/api/products/`;
  }

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await fetch(url); // Replace with your API URL
      const data = await response.json();

      // Map the data to only include the first variant for each item
      const modifiedData = data.map(item => ({
        ...item,
        variant: item.variants[0] // Include only the first variant
      }));

      setItems(modifiedData); // Set fetched data to items
      setFilteredItems(modifiedData); // Set initial filtered items
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

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

  return (
    <div className="category bg-gray-800">
      <img
        className="mx-2"
        src="https://github.com/IkkiOcean/AgroTech_Assets/blob/main/shop-asset/category_page/seed_banner.png?raw=true"
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
            {filteredItems.slice(0, 12).map((item, index) => (
              <div className="justify-center mx-auto h-fit" key={index}>
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
