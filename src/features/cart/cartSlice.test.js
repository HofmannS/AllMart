import { describe, it, expect } from "vitest";
import cartReducer, {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "./cartSlice";

const product = {
  id: 1,
  title: "Test Product",
  price: 29.99,
  thumbnail: "test.jpg",
};

describe("cartSlice", () => {
  it("adds a new product to cart", () => {
    const state = cartReducer({ items: [] }, addToCart(product));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
  });

  it("increases quantity for existing product", () => {
    const initial = { items: [{ ...product, quantity: 1 }] };
    const state = cartReducer(initial, addToCart(product));
    expect(state.items[0].quantity).toBe(2);
  });

  it("increases quantity via increaseQty", () => {
    const initial = { items: [{ ...product, quantity: 1 }] };
    const state = cartReducer(initial, increaseQty(1));
    expect(state.items[0].quantity).toBe(2);
  });

  it("decreases quantity but not below 1", () => {
    const initial = { items: [{ ...product, quantity: 2 }] };
    const state = cartReducer(initial, decreaseQty(1));
    expect(state.items[0].quantity).toBe(1);
  });

  it("does not decrease below 1", () => {
    const initial = { items: [{ ...product, quantity: 1 }] };
    const state = cartReducer(initial, decreaseQty(1));
    expect(state.items[0].quantity).toBe(1);
  });

  it("removes product from cart", () => {
    const initial = { items: [{ ...product, quantity: 1 }] };
    const state = cartReducer(initial, removeFromCart(1));
    expect(state.items).toHaveLength(0);
  });

  it("clears the cart", () => {
    const initial = { items: [{ ...product, quantity: 2 }] };
    const state = cartReducer(initial, clearCart());
    expect(state.items).toHaveLength(0);
  });
});
