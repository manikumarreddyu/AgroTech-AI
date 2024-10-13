import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

const initialState = {
  productList: [],
  cartItem: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    setCartItem: (state, action) => {
      state.cartItem = action.payload.items;
    },
    removeCartItem: (state, action) => {
      state.cartItem = state.cartItem.filter(item => item.productId !== action.payload.productId);
    },
    updateCartItemQuantity: (state, action) => {  // Renamed action creator
      const { productId, qty } = action.payload;
      const item = state.cartItem.find(item => item.productId === productId);
      if (item) {
        item.qty = qty;
        item.total = item.price * qty; // Recalculate total
      }
    },
  },
});

export const { setDataProduct, setCartItem, removeCartItem, updateCartItemQuantity } = productSlice.actions;

// Async thunk for adding item to cart
export const addCartItem = (userEmail, product) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:8080/cart/add", { userEmail, product });
    dispatch(setCartItem(response.data.cart));
    toast("Item added successfully!");
  } catch (error) {
    console.log(error);
    toast.error("Failed to add item to cart.");
  }
};

// Async thunk for fetching cart items
export const fetchCartItems = (userEmail) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:8080/cart/${userEmail}`);
    dispatch(setCartItem(response.data));
  } catch (error) {
    toast.error("Failed to fetch cart items.");
  }
};

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ productId, userEmail }) => {
    const response = await fetch(`http://localhost:8080/cart/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail,productId }), // Send userEmail in the body
    });

    if (!response.ok) {
      console.log(await response.json());
      throw new Error('Failed to delete cart item');
    }

    return await response.json(); // Ensure to return the JSON response
  }
);


// Thunk for updating cart item
export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async ({ userEmail, productId, qty }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, productId, qty }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart item');
      }

      const updatedCart = await response.json();

      // Dispatch action to update the item in the Redux state
      dispatch(updateCartItemQuantity({ productId, qty })); // Use the renamed action creator
      toast.success("Quantity updated successfully!");
      return updatedCart;
    } catch (error) {
      console.error("Delete Error:", error.response ? error.response.data : error.message);
      toast.error(error.message || "Failed to update quantity.");
      return rejectWithValue(error.message);
    }
  }
);

export default productSlice.reducer;
