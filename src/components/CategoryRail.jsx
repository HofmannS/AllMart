import { useNavigate } from "react-router-dom";

export default function CategoryRail({ categories }) {
  const navigate = useNavigate();

  if (!categories?.length) return null;

  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:-mx-0 md:px-0">
      <div className="flex gap-2 w-max md:w-auto">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => navigate(`/products?category=${cat.slug}`)}
            className="hairline px-4 py-2 text-sm whitespace-nowrap transition-colors duration-150 hover:bg-brand hover:text-white hover:border-brand"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
