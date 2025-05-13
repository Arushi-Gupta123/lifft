import React, { useState, useEffect } from "react";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import liftiamge from '../../assets/liftiamge.jpg';
import hotel from '../../assets/hotel.png';
import gallery from '../../assets/gallery.jpg';
import image3 from '../../assets/image3.jpg';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    {
      image: liftiamge,
      quote: "Innovative lifts for modern living.",
      colorClass: "text-white",
    },
    {
      image: hotel,
      quote: "Reaching new heights of luxury.",
      colorClass: "text-white",
    },
    {
      image: gallery,
      quote: "A smooth lift to the top, every time.",
      colorClass: "text-white",
    },
    {
      image: image3,
      quote: "Making every floor accessible with ease.",
      colorClass: "text-white",
    },
  ];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(autoSlide); // Clear interval on unmount
  }, [data.length]);

  return (
    <div className="w-full h-[550px] overflow-hidden relative">
      {/* Carousel Container */}
      <div
        style={{
          transform: `translateX(-${currentSlide * 100}vw)`,
          width: `${data.length * 100}vw`,
        }}
        className="h-full flex transition-transform duration-1000"
      >
        {data.map((item, index) => (
          <div key={index} className="relative w-screen h-full">
            <img
              className="w-screen h-full object-cover bg-gray-100"
              src={item.image}
              alt={`Img${index + 1}`}
              loading="priority"
            />
            {/* Overlay with Quote */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
              <h2
                className={`${item.colorClass} font-extrabold text-5xl drop-shadow-xl`}
                style={{
                  textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
                }}
              >
                {item.quote}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 mx-auto flex justify-center items-center gap-7">
        {/* Left Arrow */}
        <div
          onClick={() => {
            prevSlide();
          }}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 w-12 h-12 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-80 hover:cursor-pointer text-white"

        >
          <HiArrowLeft size={25} />
        </div>

        {/* Right Arrow */}
        <div
          onClick={() => {
            nextSlide();
          }}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-80 hover:cursor-pointer text-white"

        > 
          <HiArrowRight size={25} />
        </div>
      </div>
    </div>
  );
};

export default Home;
