import React, { useState, useEffect } from "react";

const UNSPLASH_API_KEY = "Qw_7gw7afrYWAC21MmOgy4vsUJVUyTuQnKSjBhI2OGk";
const UNSPLASH_API_URL = `https://api.unsplash.com/search/photos?query=clothes&client_id=${UNSPLASH_API_KEY}&per_page=5`;

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch images from Unsplash
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(UNSPLASH_API_URL);
        const data = await response.json();
        const urls = data.results.map((r) => r.urls.regular);
        setImages(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  // Auto-slide every 3s
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % images.length),
      3000
    );
    return () => clearInterval(interval);
  }, [images]);

  // Navigation handlers
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);

  if (images.length === 0) {
    return (
      <div className="flex justify-center items-center h-80 text-gray-500">
        Loading images...
      </div>
    );
  }

  return (
<div className="relative w-full h-80 max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-lg group pt-4">
      {/* Images */}
      {images.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Slide ${index + 1}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
        />
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-opacity opacity-0 group-hover:opacity-100"
        aria-label="Previous"
      >
        &lt;
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-opacity opacity-0 group-hover:opacity-100"
        aria-label="Next"
      >
        &gt;
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
