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
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Switch images every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="carousel relative w-100 h-80 overflow-hidden my-10">
      <div className="w-full h-full flex">
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt="Clothes"
            className={`w-full h-full absolute transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
      <button className="prev-button absolute top-1/2 left-0 transform -translate-y-1/2 px-2" onClick={goToPrevious}>
        &lt;
      </button>
      <button className="next-button absolute top-1/2 right-0 transform -translate-y-1/2 px-2" onClick={goToNext}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
