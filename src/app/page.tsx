"use client";
import { useEffect, useState } from "react";
import HeroBanner from "./components/HeroBanner";
import Wrapper from "./components/Wrapper";
import ProductCard from "./components/ProductCard";
import CircularLoader from "./components/CircularLoader";

// Define the types for product data
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function Home() {
  // State to store products data with type definition
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data from the API
  const fetchProducts = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: Product[] = await response.json();
      // Filter products with a rating of 4.0 or higher
      const filteredProducts = data.filter(
        (product) => product.rating && product.rating.rate >= 4.0
      );
      setProducts(filteredProducts); // Update state with filtered data
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="">
      <HeroBanner />

      <Wrapper className="">
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Top Products
          </div>
          <div className="text-md md:text-xl">
            Discover the best products with unbeatable prices and amazing
            quality.
          </div>
        </div>

        {loading ? (
          <div className="text-center my-10">
            <CircularLoader />
          </div>
        ) : error ? (
          <div className="text-center my-10 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Wrapper>
    </div>
  );
}
