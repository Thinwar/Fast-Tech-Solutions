import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import banner1 from "../../../images/Banner/hero-laptop.jpg";
import banner2 from "../../../images/Banner/iphone-banner.jpg";
import banner3 from "../../../images/Banner/Headphone-Banner.jpg";
import banner4 from "../../../images/Banner/Samsung-Banner.jpg";
import { Link } from "react-router";

const banners = [
  {
    image: banner1,
    title: "Powerful Laptops",
    subtitle: "Upgrade your productivity",
    link: "/shop?category=laptops",
  },
  {
    image: banner2,
    title: "Latest Smartphones",
    subtitle: "Stay connected in style",
    link: "/shop?category=phones",
  },
  {
    image: banner3,
    title: "Premium Headphones",
    subtitle: "Experience crystal sound",
    link: "/shop?category=audio",
  },
  {
    image: banner4,
    title: "Samsung Deals",
    subtitle: "Exclusive discounts available",
    link: "/deals",
  },
];

export default function HomeBanner() {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Swipe handling
  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;

    const distance = touchStart.current - touchEnd.current;

    if (distance > 50) nextSlide(); // swipe left
    if (distance < -50) prevSlide(); // swipe right
  };

  return (
    <div
      className="relative w-full h-[400px] md:h-[520px] overflow-hidden rounded-xl"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Images */}
      {banners.map((banner, index) => (
        <img
          key={index}
          src={banner.image}
          alt={banner.title}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center space-y-5 md:space-y-8">
        <div className="max-w-lg ml-8 md:ml-16 lg:ml-24 text-white space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            {banners[current].title}
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl font-light opacity-90">
            {banners[current].subtitle}
          </p>

          <Link
            to={banners[current].link}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold transition"
          >
            Shop Now →
          </Link>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full"
      >
        <ChevronLeft className="text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-indigo-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
