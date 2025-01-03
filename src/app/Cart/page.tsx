"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

const Page: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cart: { id: number }[] = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );

        const productRequests = cart.map((item) =>
          fetch(`https://fakestoreapi.com/products/${item.id}`).then((res) =>
            res.json()
          )
        );

        const products: CartItem[] = await Promise.all(productRequests);
        setCartItems(products);
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: "Failed to load cart items.",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);

    const updatedLocalStorageCart = (
      JSON.parse(localStorage.getItem("cart") || "[]") as { id: number }[]
    ).filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedLocalStorageCart));

    Swal.fire({
      title: "Removed!",
      text: "Product removed from cart.",
      icon: "success",
    });
  };

  const handleCheckout = () => {
    Swal.fire({
      title: "Thank you!",
      text: "Thanks for shopping with us!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      localStorage.removeItem("cart");
      setCartItems([]);
      window.location.href = "/";
    });
  };

  if (loading) return <p>Loading...</p>;
  if (!cartItems.length)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img src="/empty-cart.jpg" alt="Empty Cart" className="w-64 h-64" />
        <p className="mt-4 text-lg text-gray-500">Your cart is empty.</p>
      </div>
    );

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow rounded-md">
        <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4 mb-4"
          >
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="ml-4">
                <h2 className="text-lg font-medium">{item.title}</h2>
                <p className="text-sm text-gray-500">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleRemoveFromCart(item.id)}
              className="text-red-500 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-semibold">
            Total: ${totalPrice.toFixed(2)}
          </h2>
          <button
            onClick={handleCheckout}
            className="px-6 py-2 bg-black text-white rounded hover:bg-blue-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
