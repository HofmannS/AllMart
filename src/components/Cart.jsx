import { useDispatch, useSelector } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../features/cart/cartSlice";

export default function Cart({ open, onClose }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white text-black shadow-2xl transform transition-transform duration-300 z-[60]
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <button onClick={onClose} className="text-xl">
              ✕
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-3 border-b pb-3">
                  <img
                    src={item.thumbnail}
                    className="w-16 h-16 object-cover rounded"
                    alt={item.title}
                  />

                  <div className="flex-1">
                    <h3 className="font-medium text-sm">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm">
                      ${item.price}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => dispatch(decreaseQty(item.id))}
                        className="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-200 transition"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => dispatch(increaseQty(item.id))}
                        className="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-200 transition"
                      >
                        +
                      </button>

                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="ml-auto text-red-500 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="text-sm mt-1 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="flex justify-between font-bold mb-3">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}