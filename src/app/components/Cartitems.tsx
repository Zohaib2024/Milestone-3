"use client"; // Ensure client-side rendering
import React from "react";
import { FaTrash } from "react-icons/fa";

// Define types for the item and props
interface CartItem {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface CartItemsProps {
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  changeQuantity: (id: number, quantity: number) => void;
}

const CartItems: React.FC<CartItemsProps> = ({
  cart,
  removeFromCart,
  changeQuantity,
}) => {
  // Function to format the price
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="space-y-4">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b py-4"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="flex-1 px-4">
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.category}</p>
            <p className="font-bold text-gray-900">{formatPrice(item.price)}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="bg-gray-200 px-3 py-1 rounded-md text-lg"
              onClick={() => changeQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="text-lg font-medium">{item.quantity}</span>
            <button
              className="bg-gray-200 px-3 py-1 rounded-md text-lg"
              onClick={() => changeQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
            onClick={() => removeFromCart(item.id)}
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
