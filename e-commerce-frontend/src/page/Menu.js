import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addCartItem } from "../redux/productSlice";

const Menu = () => {
  const { filterby } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const productData = useSelector((state) => state.product.productList);
  const user = useSelector(state => state.user);

  const userEmail=user.email;

  const productDisplay = productData.find((el) => el._id === filterby);

  const handleAddCartProduct = () => {
    if (productDisplay && userEmail) {
      dispatch(addCartItem(userEmail, productDisplay));
    } else {
      console.log("User email or product is missing.");
    }
  };

  const handleBuy = () => {
    if (productDisplay && userEmail) {
      dispatch(addCartItem(userEmail, productDisplay));
      navigate("/cart");
    } else {
      console.log("User email or product is missing.");
    }
  };

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto md:flex bg-white">
        <div className="max-w-sm overflow-hidden w-full p-5">
          <img
            src={productDisplay?.image}
            className="hover:scale-105 transition-all h-full"
            alt="img"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl">
            {productDisplay?.name}
          </h3>
          <p className="text-slate-500 font-medium text-2xl">{productDisplay?.category}</p>
          <p className="font-bold md:text-2xl">
            <span className="text-red-500 ">₹</span>
            <span>{productDisplay?.price}</span>
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleBuy}
              className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
            >
              Buy
            </button>
            <button
              onClick={handleAddCartProduct}
              className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
            >
              Add Cart
            </button>
          </div>
          <div>
            <p className="text-slate-600 font-medium">Description :</p>
            <p>{productDisplay?.description}</p>
          </div>
        </div>
      </div>

      <AllProduct heading={"Related Product"} />
    </div>
  );
};

export default Menu;
