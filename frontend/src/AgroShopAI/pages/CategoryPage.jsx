import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";

const CategoryPage = ({ items }) => {
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    setFilteredItems(items); // Set initial items
  }, [items]);

  return (
    <div className="category bg-gray-800">
      <img className="mx-2"src="https://github.com/IkkiOcean/AgroTech_Assets/blob/main/shop-asset/category_page/seed_banner.png?raw=true" alt="" />
    <div className="flex gap-4 mx-2 mt-2 pb-2">
      <div className="min-w-[250px] max-w-xs">
        <Filter items={items} setFilteredItems={setFilteredItems} />
        <img className="py-2" src="https://github.com/IkkiOcean/AgroTech_Assets/blob/main/shop-asset/category_page/category_banner_1.jpg?raw=true" alt="" />
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
