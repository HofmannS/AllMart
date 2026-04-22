import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import ProductModal from "../components/ProductModal";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status } = useSelector((state) => state.products);

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (items.length) {
      const shuffled = [...items]
        .sort(() => 0.5 - Math.random())
        .slice(0, 12);

      setFeaturedProducts(shuffled);
    }
  }, [items]);

  if (status === "loading") {
    return <p className="p-4">Loading products...</p>;
  }



  return (
    <div className="px-4 md:px-8 py-6">
      <h2 className="text-2xl font-bold mb-6">
        Featured Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={setSelectedProduct} />
        ))}
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          View All Products →
        </button>
      </div>
    </div>
  );
}