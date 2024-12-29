import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  const { id, name, price, originalPrice, discount, image } = product;

  return (
    <Link
      href={`/product/${id}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <Image width={500} height={500} src={image} alt={name} />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">{price} PKR</p>
          <p className="text-base font-medium line-through">
            {originalPrice} PKR
          </p>
          <p className="ml-auto text-base font-medium text-green-500">
            {discount}% off
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
