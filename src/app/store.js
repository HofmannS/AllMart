import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";
import ordersReducer from "../features/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    checkout: checkoutReducer,
    orders: ordersReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  try {
    localStorage.setItem("cart", JSON.stringify(state.cart.items));
  } catch (e) {
    console.error("Failed to save cart", e);
  }
});
