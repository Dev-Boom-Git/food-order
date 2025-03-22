import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const defaultImages = [
  { src: assets.banner, link: "/promo1" },
  { src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg", link: "/promo2" },
  { src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg", link: "/promo3" },
];

const Header = ({ images = defaultImages, autoSlideInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [images, autoSlideInterval]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // เมื่อคลิกที่รูป จะนำทางไปยัง link ที่กำหนด
  const handleImageClick = (link) => {
    navigate(link);
  };

  return (
    <header className="bg-white">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="relative h-80 md:h-96 overflow-hidden rounded-3xl">
          {images.map((item, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"
              }`}
            >
              <img
                src={item.src}
                alt={`Promotion ${index + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => handleImageClick(item.link)}
              />
            </div>
          ))}

          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 z-30 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition focus:outline-none"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 z-30 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition focus:outline-none"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
