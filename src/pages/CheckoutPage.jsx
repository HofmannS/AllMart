import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  updateField,
  setErrors,
  validateCheckoutForm,
  resetCheckout,
} from "../features/checkout/checkoutSlice";
import { placeOrder } from "../features/orders/ordersSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { formatPrice } from "../utils/format";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.cart);
  const { form, errors } = useSelector((state) => state.checkout);
  const { status } = useSelector((state) => state.orders);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/products");
    }
  }, [items.length, navigate]);

  const handleChange = (field) => (e) => {
    dispatch(updateField({ field, value: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateCheckoutForm(form);

    if (Object.keys(validationErrors).length > 0) {
      dispatch(setErrors(validationErrors));
      return;
    }

    const result = await dispatch(
      placeOrder({ items, shipping: form, total })
    );

    if (placeOrder.fulfilled.match(result)) {
      toast.success("Order placed!");
      dispatch(resetCheckout());
      navigate("/order-confirmation");
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="page-container py-8 md:py-12 max-w-4xl">
      <p className="section-title mb-2">Checkout</p>
      <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-10">Shipping details</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Full name" value={form.fullName} onChange={handleChange("fullName")} error={errors.fullName} />
          <Input label="Email" type="email" value={form.email} onChange={handleChange("email")} error={errors.email} />
          <Input label="Address" value={form.address} onChange={handleChange("address")} error={errors.address} />
          <Input label="City" value={form.city} onChange={handleChange("city")} error={errors.city} />
          <Input label="ZIP code" value={form.zip} onChange={handleChange("zip")} error={errors.zip} />

          <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? "Placing order..." : "Place order"}
          </Button>
        </form>

        <div className="border border-border p-6 h-fit bg-surface">
          <h2 className="text-sm font-medium mb-6">Order summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="line-clamp-1 flex-1 mr-4 text-muted">
                  {item.title} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-6 pt-4 flex justify-between text-sm font-medium">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
