import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

export default function ProductCard({ product, onClick }) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = cartItems.some(
    (item) => item.id === product.id
  );

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <div
      onClick={() => onClick(product)}
      className="
        border rounded-xl p-3 md:p-4 
        shadow hover:shadow-lg 
        transition cursor-pointer
        bg-white
      "
    >
      {/* Image */}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-32 md:h-40 w-full object-cover rounded"
      />

      {/* Title */}
      <h2 className="font-semibold mt-2 text-sm md:text-base line-clamp-2">
        {product.title}
      </h2>

      {/* Price + Rating */}
      <div className="flex justify-between items-center mt-1 text-sm md:text-base">

        {/* Price */}
        <p className="text-gray-600">
          ${product.price}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 font-medium">
          <span>{product.rating.toFixed(2)}</span>
          <span>⭐</span>
        </div>

      </div>

      {/* Button */}
      <button
        onClick={handleAddToCart}
        className={`mt-3 w-full px-4 py-2 rounded transition text-sm md:text-base
          ${isInCart
            ? "bg-green-600 text-white"
            : "bg-black text-white hover:bg-gray-800"
          }`}
      >
        {isInCart ? "Added to Cart ✓" : "Add to Cart"}
      </button>
    </div>
  );
}