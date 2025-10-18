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
        maxWidth: "300px",
        backgroundColor: "#1a1a1a",
        color: "#fff",
      }}
    >
      <h2 style={{ margin: "0 0 8px 0" }}>{movie.title}</h2>
      <p>
        IMDb Rating: <strong>{movie.imdb?.rating ?? "N/A"}</strong>
      </p>
    </div>
  );
};

export default Movie;
