import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "https://dummyjson.com";

const loadAuthFromStorage = () => {
  try {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");
    return {
      token: token || null,
      user: user ? JSON.parse(user) : null,
    };
  } catch {
    return { token: null, user: null };
  }
};

const { token: storedToken, user: storedUser } = loadAuthFromStorage();

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Invalid credentials");
      }

      return data;
    } catch {
      return rejectWithValue("Login failed. Please try again.");
    }
  }
);

export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (!token) {
      return rejectWithValue("No token");
    }

    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        return rejectWithValue("Session expired");
      }

      return await res.json();
    } catch {
      return rejectWithValue("Failed to restore session");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ firstName, lastName, email, username, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/users/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Registration failed");
      }

      return data;
    } catch {
      return rejectWithValue("Registration failed. Please try again.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser,
    token: storedToken,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.accessToken;
        state.user = {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          image: action.payload.image,
        };
        localStorage.setItem("authToken", action.payload.accessToken);
        localStorage.setItem("authUser", JSON.stringify(state.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          image: action.payload.image,
        };
        localStorage.setItem("authUser", JSON.stringify(state.user));
      })
      .addCase(restoreSession.rejected, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
