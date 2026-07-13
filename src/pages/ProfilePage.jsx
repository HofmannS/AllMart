import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  const { items: orders } = useSelector((state) => state.orders);

  if (!user) return null;

  const userOrders = orders.filter(
    (o) => !o.userId || o.userId === user.id
  );

  return (
    <div className="page-container py-8 md:py-12 max-w-2xl">
      <p className="section-title mb-2">Account</p>
      <h1 className="text-2xl font-medium tracking-tight mb-10">Profile</h1>

      <div className="border border-border p-6 flex items-center gap-6 mb-8 bg-surface">
        <img
          src={user.image}
          alt={user.firstName}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{user.firstName} {user.lastName}</p>
          <p className="text-sm text-muted">@{user.username}</p>
          <p className="text-xs text-muted mt-1">{user.email}</p>
        </div>
      </div>

      <div className="border border-border p-6 bg-surface">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium">Recent orders</h2>
          <Link to="/orders">
            <Button variant="ghost" size="sm">View all</Button>
          </Link>
        </div>

        {userOrders.length === 0 ? (
          <p className="text-sm text-muted">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {userOrders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex justify-between text-sm border-b border-border pb-3">
                <span className="font-mono text-xs">{order.id}</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
