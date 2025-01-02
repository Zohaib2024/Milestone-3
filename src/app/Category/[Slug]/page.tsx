"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard"; // Adjust the import path based on your folder structure
import Wrapper from "@/app/components/Wrapper";
import CircularLoader from "@/app/components/CircularLoader";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  // Uncomment these lines if using rating
  // rating: {
  //   rate: number;
  //   count: number;
  // };
};

const CategoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Extract the category from the URL
    const pathParts = window.location.pathname.split("/");
    const categoryFromUrl = pathParts[pathParts.length - 1];

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://fakestoreapi.com/products/category/${categoryFromUrl}`
        );
        if (!res.ok) throw new Error("Failed to fetch products.");

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="text-center">
        <CircularLoader />
      </div>
    );
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <Wrapper className="my-10">
      <div>
        <h1 className="text-2xl text-center font-bold mb-4">Products {}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default CategoryPage;
