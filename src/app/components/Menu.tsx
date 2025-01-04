"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

type MenuProps = {
  showProductMenu: boolean;
  setShowProductMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu: React.FC<MenuProps> = ({ showProductMenu, setShowProductMenu }) => {
  const [productData, setProductData] = useState<
    { id: number; name: string; doc_count: number; url: string }[]
  >([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const products = await res.json();

        // Group products by name (or other property) and count
        const productCounts = products.reduce((acc: any, product: any) => {
          acc[product.title] = (acc[product.title] || 0) + 1;
          return acc;
        }, {});

        const productList = Object.entries(productCounts).map(
          ([name, count], index) => ({
            id: index + 1,
            name,
            doc_count: count as number,
            url: `/ProductList`, // Redirect to the product list page
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
        <Link href="../pages/about">About</Link>
      </li>
      <li className="cursor-pointer flex items-center gap-2 relative">
        <Link href="/ProductList">Products</Link>
      </li>
      <li className="cursor-pointer">
        <Link href="../pages/contact">Contact</Link>
      </li>
    </ul>
  );
};

export default Menu;
