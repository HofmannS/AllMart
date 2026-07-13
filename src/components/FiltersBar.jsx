import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  setSearchTerm,
  setCategory,
  setSortBy,
} from "../features/products/productsSlice";

export default function FiltersBar() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    searchTerm,
    categories,
    selectedCategory,
    sortBy,
    total,
    status,
  } = useSelector((state) => state.products);

  const inputClass =
    "border border-border rounded-sm px-3 py-2 text-sm bg-surface focus:outline-none focus:border-brand transition-colors duration-150";

  const handleCategoryChange = (value) => {
    dispatch(setCategory(value));
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    setSearchParams(params);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
      <select
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className={inputClass}
        aria-label="Filter by category"
      >
        <option value="all">All categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        placeholder="Search..."
        className={`flex-1 ${inputClass}`}
        aria-label="Search products"
      />

      <select
        value={sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value))}
        className={inputClass}
        aria-label="Sort products"
      >
        <option value="default">Sort by</option>
        <option value="name-asc">Name (A → Z)</option>
        <option value="name-desc">Name (Z → A)</option>
        <option value="price-asc">Price (low → high)</option>
        <option value="price-desc">Price (high → low)</option>
        <option value="rating-asc">Rating (low → high)</option>
        <option value="rating-desc">Rating (high → low)</option>
      </select>

      {status === "succeeded" && (
        <span className="text-xs text-muted whitespace-nowrap md:ml-auto">
          {total} products
        </span>
      )}
    </div>
  );
}
