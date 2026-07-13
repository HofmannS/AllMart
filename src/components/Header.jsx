import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogOut, Package, ChevronDown } from "lucide-react";
import { logout } from "../features/auth/authSlice";
import Cart from "./Cart";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const cartItems = useSelector((state) => state.cart.items);
  const { user, token } = useSelector((state) => state.auth);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `text-sm transition-opacity duration-150 hover:opacity-60 pb-0.5 ${
      isActive ? "border-b-2 border-brand" : ""
    }`;

  const navLinks = (
    <>
      <NavLink to="/" onClick={() => setMobileOpen(false)} className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/products" onClick={() => setMobileOpen(false)} className={navLinkClass}>
        Catalog
      </NavLink>
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface border-b border-border">
        <div className="page-container flex justify-between items-center py-4">
          <NavLink to="/" className="text-base font-semibold tracking-tight">
            AllMart
          </NavLink>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className="relative transition-opacity duration-150 hover:opacity-60"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand text-white text-[10px] w-4 h-4 flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            {token && user ? (
              <div className="relative hidden md:block" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-sm transition-opacity duration-150 hover:opacity-60"
                >
                  <img src={user.image} alt="" className="w-6 h-6 rounded-full" />
                  <span>{user.firstName}</span>
                  <ChevronDown className="w-3.5 h-3.5 stroke-[1.5]" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-surface border border-border py-1 z-50">
                    <button
                      onClick={() => { navigate("/profile"); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-bg transition-colors"
                    >
                      <User className="w-4 h-4 stroke-[1.5]" /> Profile
                    </button>
                    <button
                      onClick={() => { navigate("/orders"); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-bg transition-colors"
                    >
                      <Package className="w-4 h-4 stroke-[1.5]" /> Orders
                    </button>
                    <button
                      onClick={() => { dispatch(logout()); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-bg transition-colors text-muted"
                    >
                      <LogOut className="w-4 h-4 stroke-[1.5]" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="hidden md:flex items-center gap-1.5 text-sm transition-opacity duration-150 hover:opacity-60"
              >
                <User className="w-4 h-4 stroke-[1.5]" /> Sign in
              </NavLink>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden transition-opacity duration-150 hover:opacity-60"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5 stroke-[1.5]" /> : <Menu className="w-5 h-5 stroke-[1.5]" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden flex flex-col gap-4 px-4 pb-4 border-t border-border pt-4">
            {navLinks}
            {token && user ? (
              <>
                <NavLink to="/profile" onClick={() => setMobileOpen(false)} className="text-sm">
                  Profile
                </NavLink>
                <NavLink to="/orders" onClick={() => setMobileOpen(false)} className="text-sm">
                  Orders
                </NavLink>
                <button
                  onClick={() => { dispatch(logout()); setMobileOpen(false); }}
                  className="text-sm text-left text-muted"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" onClick={() => setMobileOpen(false)} className="text-sm">
                Sign in
              </NavLink>
            )}
          </nav>
        )}
      </header>

      <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
