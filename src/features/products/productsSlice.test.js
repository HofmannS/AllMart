import { describe, it, expect } from "vitest";
import productsReducer, {
  fetchProductsPage,
  setSortBy,
  filterProductsBySearch,
} from "./productsSlice";

const mockProducts = [
  { id: 1, title: "B Product", price: 20, rating: 4.5 },
  { id: 2, title: "A Product", price: 10, rating: 3.0 },
];

const categoryProducts = [
  { id: 1, title: "Wooden Table", category: "furniture" },
  { id: 2, title: "Glass Vase", category: "furniture" },
  { id: 3, title: "Metal Chair", category: "furniture" },
];

describe("filterProductsBySearch", () => {
  it("filters products by title case-insensitively", () => {
    const result = filterProductsBySearch(categoryProducts, "table");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Wooden Table");
  });

  it("returns all products when search is empty", () => {
    const result = filterProductsBySearch(categoryProducts, "");
    expect(result).toHaveLength(3);
  });

  it("returns empty array when no matches", () => {
    const result = filterProductsBySearch(categoryProducts, "xyz");
    expect(result).toHaveLength(0);
  });
});

describe("productsSlice", () => {
  it("sets loading status on fetchProductsPage.pending", () => {
    const state = productsReducer(
      { status: "idle" },
      { type: fetchProductsPage.pending.type }
    );
    expect(state.status).toBe("loading");
  });

  it("sets products on fetchProductsPage.fulfilled", () => {
    const state = productsReducer(
      { status: "loading", sortBy: "default", items: [] },
      {
        type: fetchProductsPage.fulfilled.type,
        payload: { products: mockProducts, total: 2, page: 1, limit: 12 },
      }
    );
    expect(state.status).toBe("succeeded");
    expect(state.items).toHaveLength(2);
    expect(state.total).toBe(2);
  });

  it("sets failed status on fetchProductsPage.rejected", () => {
    const state = productsReducer(
      { status: "loading" },
      {
        type: fetchProductsPage.rejected.type,
        payload: "Network error",
      }
    );
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Network error");
  });

  it("sorts products client-side on setSortBy", () => {
    const state = productsReducer(
      { items: mockProducts, sortBy: "default" },
      setSortBy("price-asc")
    );
    expect(state.items[0].price).toBe(10);
    expect(state.items[1].price).toBe(20);
  });
});
