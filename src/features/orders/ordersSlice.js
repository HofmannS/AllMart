import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearCart } from "../cart/cartSlice";

const loadOrdersFromStorage = () => {
  try {
    const data = localStorage.getItem("orders");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveOrdersToStorage = (orders) => {
  try {
    localStorage.setItem("orders", JSON.stringify(orders));
  } catch (e) {
    console.error("Failed to save orders", e);
  }
};

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ items, shipping, total }, { getState, dispatch }) => {
    const { auth } = getState();

    const order = {
      id: `ORD-${Date.now()}`,
      items: items.map(({ id, title, price, quantity, thumbnail }) => ({
        id,
        title,
        price,
        quantity,
        thumbnail,
      })),
      shipping,
      total,
      userId: auth.user?.id || null,
      createdAt: new Date().toISOString(),
    };

    const existing = loadOrdersFromStorage();
    const updated = [order, ...existing];
    saveOrdersToStorage(updated);

    dispatch(clearCart());

    return order;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    items: loadOrdersFromStorage(),
    lastOrder: null,
    status: "idle",
  },
  reducers: {
    loadOrders: (state) => {
      state.items = loadOrdersFromStorage();
    },
    clearLastOrder: (state) => {
      state.lastOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastOrder = action.payload;
        state.items = [action.payload, ...state.items];
      })
      .addCase(placeOrder.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { loadOrders, clearLastOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
