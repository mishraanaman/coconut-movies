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
      <h2 style={{   fontSize: "1.5rem", margin: "0 0 8px 0", minHeight: "48px",WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{movie.title}</h2>
      <p>
        IMDb Rating: <strong>{movie.imdb?.rating ?? "N/A"}</strong>
        <br />
        Search Score: <strong>{movie.score?.toFixed(2) ?? "N/A"}</strong>
      </p>
    </div>
  );
};

export default Movie;
