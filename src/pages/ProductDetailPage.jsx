import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import { fetchProductById, clearCurrentProduct } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import Button from "../components/ui/Button";
import ProductGridSkeleton from "../components/ui/ProductGridSkeleton";
import ErrorState from "../components/ui/ErrorState";
import { formatPrice, discountedPrice, getProductImage } from "../utils/format";

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  const { currentProduct, detailStatus, detailError } = useSelector(
    (state) => state.products
  );
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => dispatch(clearCurrentProduct());
  }, [dispatch, id]);

  if (detailStatus === "loading") {
    return (
      <div className="page-container py-8">
        <ProductGridSkeleton count={1} />
      </div>
    );
  }

  if (detailStatus === "failed") {
    return (
      <ErrorState
        message={detailError}
        onRetry={() => dispatch(fetchProductById(id))}
      />
    );
  }

  if (!currentProduct) return null;

  const product = currentProduct;
  const isInCart = cartItems.some((item) => item.id === product.id);
  const hasDiscount = product.discountPercentage > 0;
  const finalPrice = hasDiscount
    ? discountedPrice(product.price, product.discountPercentage)
    : product.price;
  const reviews = product.reviews || [];
  const images = product.images?.length ? product.images : [product.thumbnail];
  const defaultImage = getProductImage(product);
  const activeImage = selectedImage || defaultImage;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Added to bag");
  };

  return (
    <div className="page-container py-8 md:py-12">
      <Link
        to="/products"
        className="text-sm text-muted hover:text-brand transition-colors duration-150 mb-8 inline-block"
      >
        ← Back to catalog
      </Link>

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-16">
        <div>
          <div className="aspect-[4/5] overflow-hidden hairline mb-3">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 flex-shrink-0 overflow-hidden border transition-colors duration-150 ${
                  activeImage === img ? "border-brand" : "border-border"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="md:pt-4">
          {product.brand && (
            <p className="text-xs uppercase tracking-widest text-muted mb-2">{product.brand}</p>
          )}
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 mt-3 text-sm text-muted">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-brand stroke-brand" />
              <span>{product.rating}</span>
            </div>
            <span>·</span>
            <span>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</span>
          </div>

          <div className="flex items-baseline gap-3 mt-6">
            <p className="text-2xl font-medium">{formatPrice(finalPrice)}</p>
            {hasDiscount && (
              <>
                <p className="text-muted line-through text-sm">{formatPrice(product.price)}</p>
                <span className="text-xs text-muted">-{Math.round(product.discountPercentage)}%</span>
              </>
            )}
          </div>

          <p className="text-muted text-sm mt-6 leading-relaxed">{product.description}</p>

          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs text-muted border border-border px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <Button
            onClick={handleAddToCart}
            size="lg"
            className="mt-8 w-full md:w-auto"
            disabled={product.stock === 0}
          >
            {isInCart ? "Added to bag" : "Add to bag"}
          </Button>
        </div>
      </div>

      <section className="mt-16 pt-8 border-t border-border">
        <h2 className="text-lg font-medium tracking-tight mb-6">Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-6 max-w-2xl">
            {reviews.map((r, i) => (
              <div key={i} className="border-b border-border pb-6 last:border-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-medium">{r.reviewerName}</span>
                  <span className="text-xs text-muted">
                    {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">No reviews yet.</p>
        )}
      </section>
    </div>
  );
}
