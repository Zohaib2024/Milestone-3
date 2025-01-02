import React, { useState, useEffect } from "react";
import CircularLoader from "./CircularLoader";
import ProductCard from "./ProductCard"; // Import the ProductCard component

// Define types for the props
interface RelatedProductsProps {
  category: string;
}

// Define types for the product object
interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ category }) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerView, setItemsPerView] = useState<number>(3);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch related products");
        }
        const products: Product[] = await response.json();
        const filteredProducts = products.filter(
          (product) => product.category === category
        );
        setRelatedProducts(filteredProducts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [category]);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1); // Mobile devices
      } else {
        setItemsPerView(3); // Larger devices
      }
    };

    updateItemsPerView(); // Initial check
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, relatedProducts.length - itemsPerView)
    );
  };

  if (loading) return <CircularLoader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative w-full py-8">
      <h2 className="text-xl font-semibold mb-4">You Might Also Like</h2>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${(currentIndex / itemsPerView) * 100}%)`,
          }}
        >
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className={`w-full px-2 flex-shrink-0`}
              style={{ flex: `0 0 ${100 / itemsPerView}%` }}
            >
              <ProductCard product={product} />{" "}
              {/* Use the ProductCard component */}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
        >
          &#8249;
        </button>
      )}
      {currentIndex < relatedProducts.length - itemsPerView && (
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
        >
          &#8250;
        </button>
      )}
    </div>
  );
};

export default RelatedProducts;
