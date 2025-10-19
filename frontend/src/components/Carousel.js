import React, { useState, useEffect } from "react";

const MOVIES_API_URL = "http://localhost:3000/v1/movies/posters"; // returns 7 movies

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(MOVIES_API_URL);
        const data = await response.json();
        const urls = data
          .filter((movie) => movie.poster)
          .slice(0, 7)
          .map((movie) => movie.poster);
        setImages(urls);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0)
    return (
      <div className="flex justify-center items-center h-80 text-gray-500">
        Loading movies...
      </div>
    );

  const leftIndex = (currentIndex - 1 + images.length) % images.length;
  const centerIndex = currentIndex;
  const rightIndex = (currentIndex + 1) % images.length;

  return (
    <div className="relative w-[500px] h-[750px] mx-auto flex justify-center items-center gap-4 overflow-visible py-8">
      {/* Left */}
      <img
        src={images[leftIndex]}
        alt="Left Slide"
        className="w-[300px] h-[450px] object-cover rounded-[30px] transform scale-90 opacity-70 transition-all duration-1000 ease-in-out"
      />

      {/* Center */}
      <img
        src={images[centerIndex]}
        alt="Center Slide"
        className="w-[450px] h-[750px] object-cover rounded-[40px] shadow-2xl transition-all duration-1000 ease-in-out"
      />

      {/* Right */}
      <img
        src={images[rightIndex]}
        alt="Right Slide"
        className="w-[300px] h-[450px] object-cover rounded-[30px] transform scale-90 opacity-70 transition-all duration-1000 ease-in-out"
      />
    </div>
  );
};

export default Carousel;
