import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

export default function ProductModal({ product, onClose }) {
  const dispatch = useDispatch();

  const [activeImage, setActiveImage] = useState(null);
  const [reviews, setReviews] = useState([]);

  
  useEffect(() => {
    if (!product) return;
  
    setActiveImage(product.thumbnail);
    setReviews(product.reviews || []); 
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      <div className="relative bg-white max-w-4xl w-full rounded-xl shadow-lg overflow-hidden z-10">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl hover:text-red-500 z-20"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">

          <div>
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-64 object-cover rounded"
            />

            <div className="flex gap-2 mt-3 overflow-x-auto">
              {[product.thumbnail, ...(product.images || [])].map(
                (img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 object-cover rounded cursor-pointer border ${
                      activeImage === img ? "border-black" : ""
                    }`}
                  />
                )
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">
              {product.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {product.description}
            </p>

            <p className="mt-3 font-bold text-xl">
              ${product.price}
            </p>

            <div className="mt-2">
              ⭐ {product.rating} / 5
            </div>

            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-4 bg-black text-white py-3 px-4 rounded hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className="border-t p-6 max-h-64 overflow-y-auto">
          <h3 className="font-bold mb-3">Reviews</h3>

          {reviews.length ? (
            reviews.map((r, i) => (
              <div key={i} className="text-sm mb-3">
                <div className="text-yellow-500">
                  {"★".repeat(r.rating)}
                </div>
                <p>{r.comment}</p>
                <span className="text-gray-400 text-xs">
                  {r.reviewerName}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No reviews available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}