"use client";
import React, { useState } from "react";

const ProductDetailsCarousel = () => {
  // Images for the carousel
  const images = ["/p1.png", "/p2.png", "/p3.png", "/p4.png", "/p5.png"];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handler for navigating to the previous image
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Handler for navigating to the next image
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      {/* Image Display */}
      <div className="overflow-hidden rounded-lg">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-auto object-cover transition-all duration-300"
        />
      </div>

      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-700 transition"
      >
        &#8249;
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-700 transition"
      >
        &#8250;
      </button>

      {/* Thumbnails */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-16 h-16 rounded-lg overflow-hidden border ${
              index === currentIndex ? "border-black" : "border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsCarousel;
