"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Slide {
  id: number;
  src: string;
  caption: string;
}

interface HeroBannerProps {
  slides: Slide[];
}

const HeroBanner: React.FC<HeroBannerProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  // Automatic slide change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full max-w-[1300px] mx-auto text-white">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
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

      {/* Navigation buttons */}
      <button
        onClick={() =>
          goToSlide((currentSlide - 1 + totalSlides) % totalSlides)
        }
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full cursor-pointer"
      >
        &lt;
      </button>
      <button
        onClick={() => goToSlide((currentSlide + 1) % totalSlides)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full cursor-pointer"
      >
        &gt;
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
