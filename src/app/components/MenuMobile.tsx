"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";

// Define types for categories and menu items
type Category = {
  id: number;
  name: string;
  doc_count: number;
  url: string;
};

type MenuItem = {
  id: number;
  name: string;
  url?: string;
  subMenu?: boolean;
};

type MenuProps = {
  showCatMenu: boolean;
  setShowCatMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuMobile: React.FC<MenuProps> = ({
  showCatMenu,
  setShowCatMenu,
  setMobileMenu,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const products = await res.json();
        const categoryCounts: { [key: string]: number } = {};

        products.forEach((product: { category: string }) => {
          categoryCounts[product.category] =
            (categoryCounts[product.category] || 0) + 1;
        });

        const formattedCategories = Object.entries(categoryCounts).map(
          ([name, doc_count], index) => ({
            id: index + 1,
            name,
            doc_count,
            url: `/categories?category=${name}`, // Passing category as query param
          })
        );

        setCategories(formattedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const data: MenuItem[] = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "../pages/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Contact", url: "../pages/contact" },
  ];

  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
      {data.map((item) => (
        <React.Fragment key={item.id}>
          {item?.subMenu ? (
            <li
              className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
              onClick={() => setShowCatMenu(!showCatMenu)}
            >
              <div className="flex justify-between items-center">
                {item.name}
                <BsChevronDown size={14} />
              </div>

              {showCatMenu && (
                <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/Category/${category.name}`} // Use category.url here
                      onClick={() => {
                        setShowCatMenu(false);
                        setMobileMenu(false);
                      }}
                    >
                      <li className="py-4 px-4 border-t flex justify-between">
                        {category.name}
                        <span className="opacity-50 text-sm">
                          {category.doc_count}
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li className="py-4 px-5 border-b">
              <Link href={item.url || "#"} onClick={() => setMobileMenu(false)}>
                {item.name}
              </Link>
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default MenuMobile;
