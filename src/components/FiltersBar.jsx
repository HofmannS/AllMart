import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setCategory,
  setSortBy,
} from "../features/products/productsSlice";

export default function FiltersBar() {
  const dispatch = useDispatch();

  const {
    searchTerm,
    categories,
    selectedCategory,
    sortBy,
  } = useSelector((state) => state.products);

  return (
    <div className="flex flex-col md:flex-row gap-3 p-4 bg-white shadow">

      <select
        value={selectedCategory}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className="border px-3 py-2 rounded"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option
            key={typeof cat === "string" ? cat : cat.slug}
            value={typeof cat === "string" ? cat : cat.slug}
          >
            {typeof cat === "string" ? cat : cat.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        placeholder="Search products..."
        className="flex-1 border px-3 py-2 rounded"
      />

      <select
        value={sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value))}
        className="border px-3 py-2 rounded"
      >
        <option value="default">Sort by</option>
        <option value="name-asc">Name (A → Z)</option>
        <option value="name-desc">Name (Z → A)</option>
        <option value="price-asc">Price (Low → High)</option>
        <option value="price-desc">Price (High → Low)</option>
        <option value="rating-asc">Rating (Low → High)</option>
        <option value="rating-desc">Rating (High → Low)</option>
      </select>
    </div>
  );
}