// Movie.jsx
import React from "react";

const Movie = ({ movie }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "8px",
        minWidth: "300px",
        backgroundColor: "#373535ff",
        color: "#fff",
        minHeight: "400px",
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        lineHeight: "1.2",
      }}
    >
       {/* Poster */}
      {movie.poster && (
        <img
          src={movie.poster}
          alt={movie.title}
          style={{
            height: "350px", // standardized height
            objectFit: "cover",   // maintain aspect ratio, crop if needed
            borderRadius: "5px",
            marginBottom: "12px",
          }}
        />
      )}
      <h2 style={{   fontSize: "1 rem", margin: "0 0 5px 0", minHeight: "48px",WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{movie.title}</h2>
      <p>
        IMDb Rating: <strong>{movie.imdb?.rating ?? "N/A"}</strong>
        <br />
        Search Score: <strong>{movie.score?.toFixed(2) ?? "N/A"}</strong>
      </p>
    </div>
  );
};

export default Movie;
