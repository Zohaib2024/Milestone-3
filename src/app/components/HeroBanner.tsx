import React, { useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  if (slides.length === 0) {
    return <div>Loading...</div>; // You can replace this with your CircularLoader component
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
