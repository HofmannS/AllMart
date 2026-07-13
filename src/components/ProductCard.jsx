import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Star, Plus, Check } from "lucide-react";
import toast from "react-hot-toast";
import { addToCart } from "../features/cart/cartSlice";
import { formatPrice, discountedPrice, getProductImage } from "../utils/format";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = cartItems.some((item) => item.id === product.id);
  const hasDiscount = product.discountPercentage > 0;
  const finalPrice = hasDiscount
    ? discountedPrice(product.price, product.discountPercentage)
    : product.price;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success("Added to bag");
  };

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group border border-border bg-surface cursor-pointer transition-opacity duration-200 hover:opacity-90 flex flex-col h-full"
    >
      <div className="aspect-[4/5] overflow-hidden shrink-0">
        <img
          src={getProductImage(product)}
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-3 md:p-4 flex flex-col flex-1">
        <p className="text-[10px] uppercase tracking-widest text-muted mb-1 min-h-[14px]">
          {product.brand || "\u00A0"}
        </p>

        <h2 className="text-sm line-clamp-2 leading-snug mb-2 min-h-[2.75rem]">
          {product.title}
        </h2>

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">{formatPrice(finalPrice)}</span>
            {hasDiscount && (
              <span className="text-xs text-muted">
                -{Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-muted text-xs">
            <Star className="w-3 h-3 fill-brand stroke-brand" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`mt-auto pt-3 w-full flex items-center justify-center gap-1.5 py-2 text-xs uppercase tracking-wider border border-border transition-all duration-200 md:opacity-0 md:group-hover:opacity-100 ${
            isInCart
              ? "bg-brand text-white border-brand md:opacity-100"
              : "hover:bg-brand hover:text-white hover:border-brand"
          }`}
        >
          {isInCart ? (
            <>
              <Check className="w-3.5 h-3.5" /> Added
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" /> Add to bag
            </>
          )}
        </button>
      </div>
    </div>
  );
}
