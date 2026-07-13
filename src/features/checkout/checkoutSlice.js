import { createSlice } from "@reduxjs/toolkit";

const initialForm = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  zip: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    form: { ...initialForm },
    errors: {},
    step: "shipping",
  },
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state.form[field] = value;
      delete state.errors[field];
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    resetCheckout: (state) => {
      state.form = { ...initialForm };
      state.errors = {};
      state.step = "shipping";
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
  },
});

export const { updateField, setErrors, resetCheckout, setStep } = checkoutSlice.actions;

export function validateCheckoutForm(form) {
  const errors = {};

  if (!form.fullName.trim()) errors.fullName = "Full name is required";
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email";
  }
  if (!form.address.trim()) errors.address = "Address is required";
  if (!form.city.trim()) errors.city = "City is required";
  if (!form.zip.trim()) errors.zip = "ZIP code is required";

  return errors;
}

export default checkoutSlice.reducer;
