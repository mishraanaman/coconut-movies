import React, { useState, useEffect } from 'react';

const RunningBanner = () => {
  const [position, setPosition] = useState(100); // Initial position
  const bannerWidth = 500; // Adjust this based on your banner width
  const screenWidth = window.innerWidth;
  const animationDuration = 10; // Adjust animation speed

  useEffect(() => {
    const updatePosition = () => {
      const interval = setInterval(() => {
        setPosition((prevPosition) => {
          if (prevPosition < -bannerWidth) {
            // Reset the position when it's out of the screen
            return screenWidth;
          }
          return prevPosition - 1;
        });
      }, animationDuration);

      return () => clearInterval(interval);
    };

    updatePosition();
  }, [screenWidth, bannerWidth, animationDuration]);

  return (
    <div className="fixed top-0 bg-red-500 text-white p-1 transition-transform" style={{ transform: `translateX(${position}px)` }}>
      <p className="text-lg">50% off on all items</p>
    </div>
  );
};

export default RunningBanner;
