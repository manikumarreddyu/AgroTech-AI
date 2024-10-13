import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({category,onClick,isActive}) => {
  return (
    <div onClick={onClick}>
      <p className="text-center font-medium my-1 capitalize text-green-600">{category}</p>
    </div>
  );
};

export default FilterProduct;
