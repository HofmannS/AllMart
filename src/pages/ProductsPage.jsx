import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Package } from "lucide-react";
import {
  fetchCategories,
  fetchProductsPage,
  setCategory,
  setPage,
} from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";
import FiltersBar from "../components/FiltersBar";
import ProductGridSkeleton from "../components/ui/ProductGridSkeleton";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const {
    items,
    status,
    error,
    page,
    limit,
    total,
    searchTerm,
    selectedCategory,
    categories,
  } = useSelector((state) => state.products);

  const categoryParam = searchParams.get("category");
  const debounceRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCategory(categoryParam || "all"));
  }, [categoryParam, dispatch]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      dispatch(
        fetchProductsPage({ page, limit, searchTerm, category: selectedCategory })
      );
    }, searchTerm ? 300 : 0);

    return () => clearTimeout(debounceRef.current);
  }, [dispatch, page, limit, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(total / limit) || 1;

  const activeCategory = categories.find((c) => c.slug === selectedCategory);
  const pageTitle = activeCategory ? activeCategory.name : "All products";

  const handleRetry = () => {
    dispatch(
      fetchProductsPage({ page, limit, searchTerm, category: selectedCategory })
    );
  };

  return (
    <div className="page-container py-8 md:py-12">
      <div className="mb-8">
        <p className="section-title mb-2">Catalog</p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">{pageTitle}</h1>
        <FiltersBar />
      </div>

      {status === "loading" && <ProductGridSkeleton />}

      {status === "failed" && (
        <ErrorState message={error} onRetry={handleRetry} />
      )}

      {status === "succeeded" && items.length === 0 && (
        <EmptyState
          icon={Package}
          title="No products found"
          description="Try adjusting your search or filter."
        />
      )}

      {status === "succeeded" && items.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
              <button
                disabled={page <= 1}
                onClick={() => dispatch(setPage(page - 1))}
                className="text-sm transition-opacity duration-150 hover:opacity-60 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Prev
              </button>
              <span className="text-xs text-muted">
                {page} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => dispatch(setPage(page + 1))}
                className="text-sm transition-opacity duration-150 hover:opacity-60 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
