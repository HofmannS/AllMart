import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  try {
    localStorage.setItem(
      "cart",
      JSON.stringify(state.cart.items)
    );
  } catch (e) {
    console.error("Failed to save cart", e);
  }
});