import React, { memo } from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteCartItem, updateCartItem } from "../redux/productSlice";
import { toast } from "react-hot-toast";

const CartProduct = memo(({ id, name, image, category, qty, total, price, userEmail }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log("Deleting item with ID:", id);
    console.log("User email:", userEmail);
  
    // Pass the correct structure to the deleteCartItem action
    dispatch(deleteCartItem({ productId: id, userEmail }))
      .then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          toast.success("Item deleted successfully.");
        } else {
          toast.error(result.payload || "Failed to delete item.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while deleting the item.");
        console.error("Delete Error:", error);
      });
  };
  
  

  const handleIncrease = () => {
    const newQty = qty + 1;
    if (newQty !== qty) {
      dispatch(updateCartItem({ userEmail, productId: id, qty: newQty }))
        .then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            toast.success("Quantity updated successfully.");
          } else {
            toast.error(result.payload || "Failed to update quantity.");
          }
        })
        .catch((error) => {
          toast.error("An error occurred while updating the quantity.");
          console.error("Increase Error:", error);
        });
    }
  };

  const handleDecrease = () => {
    if (qty > 1) {
      const newQty = qty - 1;
      if (newQty !== qty) {
        dispatch(updateCartItem({ userEmail, productId: id, qty: newQty }))
          .then((result) => {
            if (result.meta.requestStatus === "fulfilled") {
              toast.success("Quantity updated successfully.");
            } else {
              toast.error(result.payload || "Failed to update quantity.");
            }
          })
          .catch((error) => {
            toast.error("An error occurred while updating the quantity.");
            console.error("Decrease Error:", error);
          });
      }
    } else {
      toast.error("Quantity cannot be less than 1.");
    }
  };

  return (
    <div className="bg-slate-200 p-2 flex gap-4 rounded border border-slate-300">
      <div className="p-3 bg-white rounded overflow-hidden">
        <img src={image} className="h-28 w-40 object-cover" alt={name} />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600 capitalize text-lg md:text-xl">
            {name}
          </h3>
          <div className="cursor-pointer text-slate-700 hover:text-red-500" onClick={handleDelete}>
            <AiFillDelete />
          </div>
        </div>
        <p className="text-slate-500 font-medium">{category}</p>
        <p className="font-bold text-base">
          <span className="text-red-500">₹</span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <button
              onClick={handleIncrease}
              className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1"
            >
              <TbPlus />
            </button>
            <p className="font-semibold p-1">{qty}</p>
            <button
              onClick={handleDecrease}
              className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1"
            >
              <TbMinus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <p>Total :</p>
            <p>
              <span className="text-red-500">₹</span>
              {total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CartProduct;
