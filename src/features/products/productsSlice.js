import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "https://dummyjson.com";

export function filterProductsBySearch(products, searchTerm) {
  const query = searchTerm?.trim().toLowerCase();
  if (!query) return products;
  return products.filter((p) => p.title.toLowerCase().includes(query));
}

function buildProductsUrl({ limit, skip, searchTerm, category }) {
  const params = new URLSearchParams({ limit: String(limit), skip: String(skip) });

  if (searchTerm?.trim() && category === "all") {
    return `${API_BASE}/products/search?${new URLSearchParams({
      q: searchTerm.trim(),
      limit: String(limit),
      skip: String(skip),
    })}`;
  }

  if (category && category !== "all") {
    if (searchTerm?.trim()) {
      return `${API_BASE}/products/category/${category}?limit=100&skip=0`;
    }
    return `${API_BASE}/products/category/${category}?${params}`;
  }

  return `${API_BASE}/products?${params}`;
}

export const fetchProductsPage = createAsyncThunk(
  "products/fetchProductsPage",
  async ({ page = 1, limit = 12, searchTerm = "", category = "all" } = {}, { rejectWithValue }) => {
    try {
      const skip = (page - 1) * limit;
      const hasCategorySearch = category !== "all" && searchTerm?.trim();

      const url = buildProductsUrl({ limit, skip, searchTerm, category });
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch products (${res.status})`);
      }

      const data = await res.json();
      let products = data.products;
      let total = data.total;

      if (hasCategorySearch) {
        const filtered = filterProductsBySearch(products, searchTerm);
        total = filtered.length;
        products = filtered.slice(skip, skip + limit);
      }

      return {
        products,
        total,
        page,
        limit,
        skip,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch products");
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/products?limit=30`);

      if (!res.ok) {
        throw new Error(`Failed to fetch featured products (${res.status})`);
      }

      const data = await res.json();
      const featured = [...data.products]
        .sort((a, b) => b.rating - a.rating || b.discountPercentage - a.discountPercentage)
        .slice(0, 12);

      return featured;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch featured products");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);

      if (!res.ok) {
        throw new Error(`Product not found (${res.status})`);
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch product");
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/products/categories`);

      if (!res.ok) {
        throw new Error(`Failed to fetch categories (${res.status})`);
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch categories");
    }
  }
);

function sortProducts(products, sortBy) {
  const result = [...products];

  switch (sortBy) {
    case "name-asc":
      return result.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return result.sort((a, b) => b.title.localeCompare(a.title));
    case "price-asc":
      return result.sort((a, b) => a.price - b.price);
    case "price-desc":
      return result.sort((a, b) => b.price - a.price);
    case "rating-asc":
      return result.sort((a, b) => a.rating - b.rating);
    case "rating-desc":
      return result.sort((a, b) => b.rating - a.rating);
    default:
      return result;
  }
}

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    featuredItems: [],
    categories: [],
    currentProduct: null,
    status: "idle",
    featuredStatus: "idle",
    detailStatus: "idle",
    categoriesStatus: "idle",
    error: null,
    featuredError: null,
    detailError: null,
    searchTerm: "",
    selectedCategory: "all",
    sortBy: "default",
    page: 1,
    limit: 12,
    total: 0,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.page = 1;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.page = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      if (state.items.length > 0) {
        state.items = sortProducts(state.items, action.payload);
      }
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
      state.detailStatus = "idle";
      state.detailError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsPage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = sortProducts(action.payload.products, state.sortBy);
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchProductsPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch products";
      })
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.featuredStatus = "loading";
        state.featuredError = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredStatus = "succeeded";
        state.featuredItems = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.featuredStatus = "failed";
        state.featuredError = action.payload || "Failed to fetch featured products";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.detailStatus = "loading";
        state.detailError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.detailError = action.payload || "Failed to fetch product";
      })
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesStatus = "failed";
      });
  },
});

export const {
  setSearchTerm,
  setCategory,
  setSortBy,
  setPage,
  clearCurrentProduct,
} = productsSlice.actions;

export const selectSortedItems = (state) => {
  const { items, sortBy } = state.products;
  return sortProducts(items, sortBy);
};

export default productsSlice.reducer;
