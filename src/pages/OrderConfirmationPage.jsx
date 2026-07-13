import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { formatPrice } from "../utils/format";

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const { lastOrder } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!lastOrder) {
      navigate("/products");
    }
  }, [lastOrder, navigate]);

  if (!lastOrder) return null;

  return (
    <div className="max-w-md mx-auto px-4 py-16 md:py-24 text-center">
      <p className="section-title mb-2">Confirmed</p>
      <h1 className="text-2xl font-medium tracking-tight mb-4">Thank you</h1>
      <p className="text-sm text-muted mb-10">
        Your order has been placed successfully.
      </p>

      <div className="border border-border p-6 text-left mb-8 bg-surface">
        <p className="text-xs text-muted uppercase tracking-wider mb-1">Order ID</p>
        <p className="font-mono text-sm mb-6">{lastOrder.id}</p>

        <p className="text-xs text-muted uppercase tracking-wider mb-1">Ship to</p>
        <p className="text-sm mb-1">{lastOrder.shipping.fullName}</p>
        <p className="text-sm text-muted mb-6">
          {lastOrder.shipping.address}, {lastOrder.shipping.city} {lastOrder.shipping.zip}
        </p>

        <div className="border-t border-border pt-4 space-y-2">
          {lastOrder.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-muted">{item.title} × {item.quantity}</span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-medium pt-3 border-t border-border">
            <span>Total</span>
            <span>{formatPrice(lastOrder.total)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={() => navigate("/orders")}>View orders</Button>
        <Button variant="secondary" onClick={() => navigate("/products")}>
          Continue shopping
        </Button>
      </div>
    </div>
  );
}
