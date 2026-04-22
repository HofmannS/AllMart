import { useSelector } from "react-redux";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Cart from "./Cart";

export default function Header() {
  const [open, setOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);

  const totalCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const linkClass =
    "px-4 py-2 rounded-md text-sm font-medium transition";

  const activeClass = "bg-white text-black";
  const inactiveClass = "text-white hover:bg-gray-700";

  return (
    <>
      <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-gray-900 text-white">
        <NavLink to="/">
          <h1 className="text-xl font-bold">AllMart</h1>
        </NavLink>

        <div className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Products
          </NavLink>

          <button
            onClick={() => setOpen(true)}
            className="relative px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Cart 🛒

            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <Cart open={open} onClose={() => setOpen(false)} />
    </>
  );
}