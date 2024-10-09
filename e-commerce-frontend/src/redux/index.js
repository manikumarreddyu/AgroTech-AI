import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer, { loadUserFromLocalStorage } from "./userSlice"; // Import the loadUserFromLocalStorage action
import productSliceReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    product: productSliceReducer,
  },
});

// Load user data from localStorage on store initialization
store.dispatch(loadUserFromLocalStorage());

export default store;
