import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../features/cart/cartSlice";
import useEscapeKey from "../hooks/useEscapeKey";
import Button from "./ui/Button";
import EmptyState from "./ui/EmptyState";
import { formatPrice, getProductImage } from "../utils/format";

export default function Cart({ open, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);

  useEscapeKey(onClose, open);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-200 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden={!open}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-surface border-l border-border transform transition-transform duration-300 z-[60] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="px-4 py-5 border-b border-border flex justify-between items-center">
            <h2 className="text-sm font-medium tracking-tight">
              Bag ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
            <button
              onClick={onClose}
              className="text-sm text-muted hover:text-brand transition-colors duration-150"
              aria-label="Close bag"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {items.length === 0 ? (
              <EmptyState
                icon={ShoppingBag}
                title="Your bag is empty"
                description="Browse the catalog to find something you like."
                actionLabel="View catalog"
                onAction={() => { onClose(); navigate("/products"); }}
              />
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 border-b border-border pb-4">
                    <img
                      src={getProductImage(item)}
                      className="w-16 h-20 object-cover"
                      alt={item.title}
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm line-clamp-2 leading-snug">{item.title}</h3>
                      <p className="text-xs text-muted mt-1">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => dispatch(decreaseQty(item.id))}
                          className="w-6 h-6 flex items-center justify-center border border-border text-xs hover:bg-bg transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-xs">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(increaseQty(item.id))}
                          className="w-6 h-6 flex items-center justify-center border border-border text-xs hover:bg-bg transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="ml-auto text-xs text-muted hover:text-brand transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="px-4 py-5 border-t border-border">
              <div className="flex justify-between text-sm mb-4">
                <span className="text-muted">Total</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <Button onClick={handleCheckout} className="w-full" size="lg">
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
