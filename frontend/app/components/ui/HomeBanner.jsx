import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";

import banner1 from "../../../images/Banner/hero-laptop.jpg";
import banner2 from "../../../images/Banner/iphone-banner.jpg";
import banner3 from "../../../images/Banner/Headphone-Banner.jpg";
import banner4 from "../../../images/Banner/Samsung-Banner.jpg";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleTouchStart = (event) => {
    touchStart.current = event.targetTouches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEnd.current = event.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;

    const distance = touchStart.current - touchEnd.current;

    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  return (
    <div
      className="relative h-[400px] w-full overflow-hidden rounded-xl md:h-[520px]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {banners.map((banner, index) => (
        <img
          key={banner.title}
          src={banner.image}
          alt={banner.title}
          className={`absolute h-full w-full object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex items-center">
        <div className="ml-8 max-w-lg space-y-4 text-white md:ml-16 lg:ml-24">
          <h1 className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            {banners[current].title}
          </h1>
          <p className="text-lg font-light opacity-90 md:text-xl lg:text-2xl">
            {banners[current].subtitle}
          </p>
          <Link
            to={banners[current].link}
            className="inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-700"
          >
            Shop Now {"->"}
          </Link>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 hover:bg-white/40"
      >
        <ChevronLeft className="text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 hover:bg-white/40"
      >
        <ChevronRight className="text-white" />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((banner, index) => (
          <span
            key={banner.title}
            className={`h-3 w-3 rounded-full ${
              index === current ? "bg-indigo-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
