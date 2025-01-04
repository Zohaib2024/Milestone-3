"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Menu: React.FC = () => {
  const [productData, setProductData] = useState<
    { id: number; name: string; doc_count: number; url: string }[]
  >([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const products = await res.json();

        // Group products by name and count occurrences
        const productCounts = products.reduce((acc: any, product: any) => {
          acc[product.title] = (acc[product.title] || 0) + 1;
          return acc;
        }, {});

        const productList = Object.entries(productCounts).map(
          ([name, count], index) => ({
            id: index + 1,
            name,
            doc_count: count as number,
            url: `/ProductList`,
          })
        );

        setProductData(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      <li className="cursor-pointer">
        <Link href="/">Home</Link>
      </li>
      <li className="cursor-pointer">
        <Link href="/about">About</Link>
      </li>
      <li className="cursor-pointer">
        <Link href="/ProductList">Products</Link>
      </li>
      <li className="cursor-pointer">
        <Link href="/contact">Contact</Link>
      </li>
    </ul>
  );
};

export default Menu;
