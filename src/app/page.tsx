"use client";
import HeroBanner from "./components/HeroBanner";
import Wrapper from "./components/Wrapper";
import ProductCard from "./components/ProductCard";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: { rate: number; count: number };
}

export default async function Home() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store", // Fetch fresh data on every request
    });
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    products = await response.json();
  } catch (err: any) {
    error = err.message;
  }

  if (error) {
    return <div className="text-red-500 text-center my-10">{error}</div>;
  }

  const slides = products
    .filter((product) => product.rating && product.rating.rate >= 4.0)
    .slice(0, 3)
    .map((product) => ({
      id: product.id,
      src: product.image,
      caption: product.title,
    }));

  return (
    <div>
      <HeroBanner slides={slides} />
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <h1 className="text-[28px] md:text-[34px] font-semibold">
            Top Products
          </h1>
          <p className="text-md md:text-xl">
            Discover the best products with unbeatable prices and amazing
            quality.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products
            .filter((product) => product.rating.rate >= 4.0)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </Wrapper>
    </div>
  );
}
