"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

type MenuProps = {
  showCatMenu: boolean;
  setShowCatMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu: React.FC<MenuProps> = ({ showCatMenu, setShowCatMenu }) => {
  const [subMenuData, setSubMenuData] = useState<
    { id: number; name: string; doc_count: number; url: string }[]
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const products = await res.json();

        // Group products by category and count
        const categoryCounts = products.reduce((acc: any, product: any) => {
          acc[product.category] = (acc[product.category] || 0) + 1;
          return acc;
        }, {});

        const categories = Object.entries(categoryCounts).map(
          ([name, count], index) => ({
            id: index + 1,
            name,
            doc_count: count as number,
            url: `/Category/${name}`, // Query parameter in URL
          })
        );

        setSubMenuData(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      <li className="cursor-pointer">
        <Link href="/">Home</Link>
      </li>
      <li className="cursor-pointer">
        <Link href="/about">About</Link>
      </li>
      <li
        className="cursor-pointer flex items-center gap-2 relative"
        onMouseEnter={() => setShowCatMenu(true)}
        onMouseLeave={() => setShowCatMenu(false)}
      >
        Categories
        <BsChevronDown size={14} />
        {showCatMenu && (
          <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg">
            {subMenuData.map((submenu) => (
              <Link key={submenu.id} href={submenu.url}>
                <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
                  {submenu.name}
                  <span className="opacity-50 text-sm">
                    {submenu.doc_count}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </li>
      <li className="cursor-pointer">
        <Link href="/contact">Contact</Link>
      </li>
    </ul>
  );
};

export default Menu;
