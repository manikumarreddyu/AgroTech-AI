import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";
const CategoryPage = ({ items }) => {
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    setFilteredItems(items); // Set initial items
  }, [items]);

  return (
    <div className="flex gap-4 p-6 bg-gray-100">
      <div className="min-w-[250px] max-w-xs">
        <Filter items={items} setFilteredItems={setFilteredItems} />
        <img className="py-2"src="/category_banner_1.jpg" alt="" />
      </div>
      <div className="product-panel flex-grow ">
        <div className="grid grid-cols-3 gap-4 py-4 border-2 bg-green-100 rounded-lg">
          {filteredItems.slice(0, 12).map((item, index) => (
            <div className="justify-center mx-auto" key={index}>
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
