"use client";
import Link from "next/link";

// Define a TypeScript interface for the product prop
interface Product {
  id: number;
  image: string;
  title: string;
  category: string;
  price: number;
  // Optionally, you can add these properties if you plan to use them
  // description: string;
  // rating: {
  //   rate: number;
  //   count: number;
  // };
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="border p-4 rounded-lg shadow-md">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain mb-4"
        />
        <h2 className="font-semibold text-lg">{product.title}</h2>
        <p className="text-gray-600 text-sm mb-2">{product.category}</p>
        {/* <p className="text-gray-700 text-sm mb-2">{product.description}</p> */}
        <p className="text-green-600 font-bold mb-2">${product.price}</p>
        {/* <div className="flex items-center text-sm text-gray-500">
          <span className="mr-2">Rating: {product.rating.rate}</span>
          <span>({product.rating.count} reviews)</span>
        </div> */}
      </div>
    </Link>
  );
}
