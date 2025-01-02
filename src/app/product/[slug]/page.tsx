"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "@/app/components/Wrapper";
import RelatedProducts from "@/app/components/RelatedProducts";
import CircularLoader from "@/app/components/CircularLoader";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify
import Swal from "sweetalert2"; // Import SweetAlert2

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const url = window.location.href; // Get the full URL
        const id = url.split("/").pop(); // Extract the last part of the URL
        if (!id) {
          throw new Error("Product ID not found in the URL");
        }

        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) return <CircularLoader />;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found</p>;

  // Handle Add to Cart button click
  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product is already in the cart
    const isProductInCart = existingCart.some(
      (item: { id: number }) => item.id === product.id
    );

    if (isProductInCart) {
      // Trigger SweetAlert notification if product is already in the cart
      Swal.fire({
        title: "Already Added!",
        text: "This product is already in your cart.",
        icon: "info",
      });
    } else {
      // Add product to the cart
      const newCart = [...existingCart, { id: product.id }];
      localStorage.setItem("cart", JSON.stringify(newCart));

      // Trigger SweetAlert notification for successful addition
      Swal.fire({
        title: "Successfully Added!",
        text: "Product has been added to your cart.",
        icon: "success",
      });
    }
  };

  return (
    <div className="w-full md:py-20">
      <Wrapper className="">
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <img
              src={product.image}
              alt={product.title}
              className="rounded-md"
            />
          </div>

          <div className="flex-[1] py-3">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.category}</p>
            <p className="text-lg font-semibold">
              MRP : ₹{product.price.toFixed(2)}{" "}
              <span className="text-sm text-gray-500">(incl. of taxes)</span>
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>
            <p className="mb-6 text-gray-700">{product.description}</p>
            <div className="flex gap-4">
              <button
                className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition"
                onClick={handleAddToCart} // Add SweetAlert on click
              >
                Add to Cart
              </button>

              <button className="border border-gray-300 py-3 px-6 rounded-md hover:border-black transition">
                Wishlist ♥
              </button>
            </div>
          </div>
        </div>

        <RelatedProducts category={product.category} />
      </Wrapper>
    </div>
  );
};

export default ProductPage;
