"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Wrapper from "../components/Wrapper";
import CartItems from "../components/Cartitems";

// Define the unified CartItem type
interface CartItem {
  id: number;
  name: string;
  description: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
  category: string; // Added category
}

interface CartItemInLocalStorage {
  id: number;
  quantity: number;
}

const Page: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      const cartItems: CartItemInLocalStorage[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      const fetchedProducts: CartItem[] = [];

      for (const item of cartItems) {
        try {
          const response = await fetch(
            `https://fakestoreapi.com/products/${item.id}`
          );
          if (response.ok) {
            const product = await response.json();
            fetchedProducts.push({
              id: product.id,
              name: product.title,
              description: product.description,
              size: "Default",
              quantity: item.quantity,
              price: product.price,
              image: product.image,
              category: product.category || "General", // Default category
            });
          }
        } catch (error) {
          console.error("Failed to fetch product data:", error);
        }
      }

      setCart(fetchedProducts);
    };

    fetchCartProducts();
  }, []);

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);

    const localStorageCart: CartItemInLocalStorage[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const newLocalStorageCart = localStorageCart.filter(
      (item) => item.id !== productId
    );
    localStorage.setItem("cart", JSON.stringify(newLocalStorageCart));
  };

  const changeQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);

    const localStorageCart: CartItemInLocalStorage[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const updatedLocalStorageCart = localStorageCart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedLocalStorageCart));
  };

  const calculateTotal = (): string => {
    return cart
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Proceeding to checkout...",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thanks for Shopping",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        localStorage.removeItem("cart");
        setCart([]);
      });
    });
  };

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Shopping Cart
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center">
            <img
              src="/empty-cart.jpg"
              alt="Empty Cart"
              className="w-80 h-80 object-contain"
            />
            <div className="text-xl mt-4 font-semibold text-gray-600">
              Your cart is empty!
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 py-10">
            <div className="flex-[2]">
              <div className="text-lg font-bold">Cart Items</div>
              <CartItems
                cart={cart}
                removeFromCart={removeFromCart}
                changeQuantity={changeQuantity}
              />
            </div>

            <div className="flex-[1]">
              <div className="text-lg font-bold">Summary</div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>₹ {calculateTotal()}</span>
                </div>
                <button
                  className="mt-4 w-full bg-black text-white px-4 py-2 rounded-md hover:border-black transition"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Page;
