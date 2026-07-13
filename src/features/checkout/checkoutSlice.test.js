import { describe, it, expect } from "vitest";
import { validateCheckoutForm } from "./checkoutSlice";

describe("validateCheckoutForm", () => {
  it("returns no errors for valid form", () => {
    const errors = validateCheckoutForm({
      fullName: "John Doe",
      email: "john@example.com",
      address: "123 Main St",
      city: "New York",
      zip: "10001",
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it("returns errors for empty fields", () => {
    const errors = validateCheckoutForm({
      fullName: "",
      email: "",
      address: "",
      city: "",
      zip: "",
    });
    expect(errors.fullName).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.address).toBeDefined();
  });

  it("validates email format", () => {
    const errors = validateCheckoutForm({
      fullName: "John",
      email: "invalid",
      address: "123 St",
      city: "NYC",
      zip: "10001",
    });
    expect(errors.email).toBe("Enter a valid email");
  });
});
