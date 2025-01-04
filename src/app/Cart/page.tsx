"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cartIds = JSON.parse(storedCart);

      const fetchProducts = async () => {
        setLoading(true); // Start loading when fetching data
        try {
          const products = await Promise.all(
            cartIds.map(async (id: number) => {
              const res = await fetch(
                `https://fakestoreapi.com/products/${id}`
              );
              return res.json();
            })
          );
          setCartItems(products);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false); // End loading once the data is fetched
        }
      };

      fetchProducts();
    }
  }, []);

  // Calculate the total whenever cartItems changes
  useEffect(() => {
    const calculateTotal = cartItems.reduce((acc, product) => {
      return acc + product.price * (product.quantity || 1); // Assuming quantity is available
    }, 0);
    setTotal(calculateTotal);
  }, [cartItems]);

  const handleRemoveFromCart = (id: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);

    // Update localStorage with the new cart
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cartIds = JSON.parse(storedCart);
      const updatedCartIds = cartIds.filter((itemId: number) => itemId !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCartIds));
    }
  };

  const handleCheckout = () => {
    // Clear localStorage and reset the cartItems state
    localStorage.removeItem("cart");
    setCartItems([]);

    // Show a success message using SweetAlert2
    Swal.fire({
      title: "Thank you for shopping!",
      text: "Your order has been placed successfully.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      // Redirect to home page or other action after closing the alert
      window.location.href = "/";
    });
  };

  return (
    <div className="w-screen h-screen">
      <main className="max-w-4xl mx-auto p-6 my-10 bg-white  rounded-lg">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div
              className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-blue-600"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <p className="text-center text-lg text-gray-500 flex justify-center items-center flex-col">
            <img
              src="empty-cart.jpg"
              alt="empty cart logo"
              height="500"
              width={500}
            />
            Your cart is empty
          </p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((product: any) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="ml-4">
                      <h1 className="text-xl font-semibold text-gray-800">
                        {product.title}
                      </h1>
                      <p className="text-lg text-gray-600">${product.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">
                      Qty: {product.quantity || 1}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(product.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center border-t pt-4">
              <h2 className="text-2xl font-semibold text-gray-800">Total</h2>
              <p className="text-xl text-gray-800">${total.toFixed(2)}</p>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleCheckout}
                className="bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
