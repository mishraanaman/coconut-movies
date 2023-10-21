import React, { useState, useEffect } from 'react';

const UNSPLASH_API_KEY = 'Qw_7gw7afrYWAC21MmOgy4vsUJVUyTuQnKSjBhI2OGk';
const UNSPLASH_API_URL = `https://api.unsplash.com/search/photos?query=clothes&client_id=${UNSPLASH_API_KEY}&per_page=3`;

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(UNSPLASH_API_URL);
        const data = await response.json();
        const imageUrls = data.results.map((result) => result.urls.regular);
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, 3000); // Switch images every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel relative w-2000 h-600 overflow-hidden p-10">
      <div className="w-full h-full flex">
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt="Clothes"
            className={`w-2000 h-6000 absolute transition-opacity duration-1000 opacity-${
              index === currentIndex ? '100' : '0'
            } group-hover:opacity-100`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;