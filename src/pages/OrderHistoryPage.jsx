import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import { loadOrders } from "../features/orders/ordersSlice";
import EmptyState from "../components/ui/EmptyState";
import { formatPrice } from "../utils/format";

export default function OrderHistoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(loadOrders());
  }, [dispatch]);

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No orders yet"
        description="When you place an order, it will appear here."
        actionLabel="Browse catalog"
        onAction={() => navigate("/products")}
      />
    );
  }

  return (
    <div className="page-container py-8 md:py-12 max-w-2xl">
      <p className="section-title mb-2">Account</p>
      <h1 className="text-2xl font-medium tracking-tight mb-10">Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-border p-6 bg-surface">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-mono text-xs">{order.id}</p>
                <p className="text-xs text-muted mt-1">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <p className="text-sm font-medium">{formatPrice(order.total)}</p>
            </div>
            <div className="space-y-2 border-t border-border pt-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-muted">
                  <span>{item.title} × {item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
