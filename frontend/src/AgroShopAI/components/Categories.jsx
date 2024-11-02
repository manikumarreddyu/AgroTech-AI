import React from "react";
import { Link } from "react-router-dom";
const Categories = ({ categories }) => {
  return (
    <div className="category-container d-flex justify-content-center align-items-center mx-2 my-2">
      <div className="top-heading text-left bg-green-200 border-b-2 border-bottom border-green-600">
        <h1 className="font-bold py-1 ml-8 text-2xl text-black">
          Featured Categories
        </h1>
      </div>
      <div className="bg-green-100 py-4 mt-2">
        <div className="grid gap-4 grid-cols-5 ">
          {categories.map((category, index) => (
            <>
              <div key={index} className="w-36 justify-center mx-auto ">
                {/* display category information here */}
                <Link to={`category/${category.alias}`}>
                  {" "}
                  {/* Adjust the route as needed */}
                  <img
                    className="rounded-full"
                    src={category.image}
                    alt={category.title}
                  />
                  <h1 className="pt-2 font-semibold text-center cursor-pointer hover:text-green-400">
                    {category.title}
                  </h1>
                </Link>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
