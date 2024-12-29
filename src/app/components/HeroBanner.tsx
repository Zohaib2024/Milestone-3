"use client";
import React, { useState, useEffect } from "react";

const HeroBanner = () => {
  // Images for the slider
  const slides = [
    { id: 1, src: "/slide-1.png", caption: "Shop now" },
    { id: 2, src: "/slide-2.png", caption: "Shop now" },
    { id: 3, src: "/slide-3.png", caption: "Shop now" },
  ];

  // State to track the current slide
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [slides.length]);

  // Function to handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Function to handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

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
              className="w-full flex-shrink-0 relative text-center"
            >
              <img
                src={slide.src}
                alt={`Slide ${slide.id}`}
                className="w-full object-cover aspect-[16/9]"
              />
              <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
                {slide.caption}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-3xl text-black p-2 rounded-full hover:bg-gray-700  hover:text-white"
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
