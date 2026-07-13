import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchFeaturedProducts,
  fetchCategories,
} from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";
import CategoryRail from "../components/CategoryRail";
import ProductGridSkeleton from "../components/ui/ProductGridSkeleton";
import ErrorState from "../components/ui/ErrorState";
import SectionHeader from "../components/ui/SectionHeader";
import Button from "../components/ui/Button";
import { getProductImage } from "../utils/format";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { featuredItems, featuredStatus, featuredError, categories, categoriesStatus } =
    useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (featuredStatus === "loading") {
    return (
      <div className="page-container py-12">
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  if (featuredStatus === "failed") {
    return (
      <ErrorState
        message={featuredError}
        onRetry={() => dispatch(fetchFeaturedProducts())}
      />
    );
  }

  const heroProduct = featuredItems[0];

  return (
    <div>
      <section className="page-container py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <p className="section-title mb-4">Curated collection</p>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-tight mb-6">
              Quality products,<br />thoughtfully selected
            </h1>
            <p className="text-muted text-sm md:text-base mb-8 max-w-md leading-relaxed">
              Discover top-rated essentials at fair prices. Every item chosen for quality and value.
            </p>
            <Button size="lg" onClick={() => navigate("/products")}>
              Shop collection
            </Button>
          </div>

          {heroProduct && (
            <button
              onClick={() => navigate(`/products/${heroProduct.id}`)}
              className="aspect-[4/5] overflow-hidden hairline group"
            >
              <img
                src={getProductImage(heroProduct)}
                alt={heroProduct.title}
                className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-90"
              />
            </button>
          )}
        </div>
      </section>

      {categoriesStatus === "succeeded" && categories.length > 0 && (
        <section className="page-container pb-12">
          <p className="section-title mb-4">Browse</p>
          <CategoryRail categories={categories} />
        </section>
      )}

      <section className="page-container pb-12">
        <SectionHeader label="Curated" title="Featured" linkTo="/products" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-t border-border py-6">
        <p className="page-container text-center text-xs text-muted tracking-wide">
          Free shipping · Secure checkout · Easy returns
        </p>
      </section>
    </div>
  );
}
