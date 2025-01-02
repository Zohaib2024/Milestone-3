"use client";
import React, { useState, useEffect } from "react";
import CircularLoader from "./CircularLoader";
import Link from "next/link";

interface Slide {
  id: number;
  src: string;
  caption: string;
}

const HeroBanner: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        const highCountProducts = data
          .filter((product: any) => product.rating.count > 100)
          .slice(0, 3);

        const formattedSlides: Slide[] = highCountProducts.map(
          (product: any) => ({
            id: product.id,
            src: product.image,
            caption: product.title,
          })
        );

        setSlides(formattedSlides);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [slides]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  if (slides.length === 0) {
    return (
      <div>
        <CircularLoader />
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[1300px] mx-auto text-white">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="w-full flex justify-center items-center flex-shrink-0 relative text-center"
            >
              <img
                src={slide.src}
                alt={`Slide ${slide.id}`}
                className="w-[800px] h-[800px]"
              />
              <Link href={`/product/${slide.id}`}>
                <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
                  SHOP NOW
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-3xl text-black p-2 rounded-full hover:bg-gray-700 hover:text-white"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-3xl text-black p-2 rounded-full hover:bg-gray-700 hover:text-white"
      >
        &#10095;
      </button>
    </div>
  );
};

export default HeroBanner;
