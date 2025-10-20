// Movie.jsx
import React from "react";

const Movie = ({ movie }) => {
  return (
    <div
      style={{
        borderRadius: "8px",
        padding: "16px",
        margin: "5px",
        width: "250px",
        backgroundColor: "#001E2B",
        color: "#fff",
        minHeight: "400px",
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
         fontSize: "0.8rem"
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
      <h2 style={{   fontSize: "1rem", margin: "0 0 5px 0", minHeight: "48px",WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{movie.title}</h2>
      <p>
        IMDb: <strong>{movie.imdb?.rating ?? "N/A"}</strong>
        <br />
        Rotten Tomatoes: <strong>{movie.tomatoes?.viewer?.rating ?? "N/A"}</strong>
        <br />
        Search Score: <strong>{movie.score?.toFixed(2) ?? "N/A"}</strong>
      </p>
    </div>
  );
};

export default Movie;
