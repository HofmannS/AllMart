import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories } from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import FiltersBar from "../components/FiltersBar";

export default function Products() {
    const dispatch = useDispatch();

    const {
        items,
        status,
        searchTerm,
        selectedCategory,
        sortBy,
    } = useSelector((state) => state.products);

    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    const processedProducts = useMemo(() => {
        let result = [...items];

        result = result.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (selectedCategory !== "all") {
            result = result.filter(
                (product) => product.category === selectedCategory
            );
        }

        switch (sortBy) {
            case "name-asc":
              result.sort((a, b) => a.title.localeCompare(b.title));
              break;
          
            case "name-desc":
              result.sort((a, b) => b.title.localeCompare(a.title));
              break;
          
            case "price-asc":
              result.sort((a, b) => a.price - b.price);
              break;
          
            case "price-desc":
              result.sort((a, b) => b.price - a.price);
              break;
          
            case "rating-asc":
              result.sort((a, b) => a.rating - b.rating);
              break;
          
            case "rating-desc":
              result.sort((a, b) => b.rating - a.rating);
              break;
          
            default:
              break;
          }



        return result;
    }, [items, searchTerm, selectedCategory, sortBy]);

    if (status === "loading") {
        return <p className="p-4">Loading products...</p>;
    }

    return (
        <div>
            <FiltersBar />

            <div className="px-4 md:px-8 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {processedProducts.map((product) => (
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
            {processedProducts.length === 0 && (
                <p className="text-center py-10 text-gray-500">
                    No products found
                </p>
            )}
        </div>
    );
}