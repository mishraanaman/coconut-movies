import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MOVIES_API_URL = "http://localhost:3000/v1/movies/posters"; // returns 7 movies

const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(MOVIES_API_URL);
        const data = await response.json();
        const filteredMovies = data.filter((movie) => movie.poster);
        setMovies(filteredMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [movies]);

  const getMonthName = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[new Date().getMonth()];
  };

  if (movies.length === 0)
    return (
      <div className="flex justify-center items-center h-80 text-gray-500">
        Loading movies...
      </div>
    );

  const leftIndex = (currentIndex - 1 + movies.length) % movies.length;
  const centerIndex = currentIndex;
  const rightIndex = (currentIndex + 1) % movies.length;

  const centerMovie = movies[centerIndex];

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie._id}`);
  };

  return (
    <div className="py-8">
      {/* Subtle heading */}
      <div className="text-center mb-3">
        <h2 className="text-3xl font-light text-[#001E2B] opacity-80">
          Celebrating cinema's finest from {getMonthName()}
        </h2>
      </div>

      <div className="relative w-[600px] h-[700px] mx-auto flex justify-center items-center gap-4 overflow-visible">
        {/* Left */}
        <img
          src={movies[leftIndex].poster}
          alt={movies[leftIndex].title}
          className="w-[280px] h-[400px] object-cover rounded-[30px] transform scale-90 opacity-70 transition-all duration-1000 ease-in-out cursor-pointer hover:opacity-90"
          onClick={() => handleMovieClick(movies[leftIndex])}
        />

        {/* Center */}
        <img
          src={centerMovie.poster}
          alt={centerMovie.title}
          className="w-[400px] h-[580px] object-cover rounded-[40px] shadow-2xl transition-all duration-1000 ease-in-out cursor-pointer hover:scale-105"
          onClick={() => handleMovieClick(centerMovie)}
        />

        {/* Right */}
        <img
          src={movies[rightIndex].poster}
          alt={movies[rightIndex].title}
          className="w-[280px] h-[400px] object-cover rounded-[30px] transform scale-90 opacity-70 transition-all duration-1000 ease-in-out cursor-pointer hover:opacity-90"
          onClick={() => handleMovieClick(movies[rightIndex])}
        />
      </div>
    </div>
  );
};

export default Carousel;
