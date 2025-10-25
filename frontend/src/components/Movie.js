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
        minHeight: "450px",
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: "0.8rem",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Poster */}
      {movie.poster && (
        <img
          src={movie.poster}
          alt={movie.title}
          style={{
            height: "350px",
            width: "100%",
            objectFit: "cover",
            borderRadius: "5px",
            marginBottom: "12px",
          }}
        />
      )}
      
      <div style={{ flexGrow: 1 }}>
        <h2 style={{ 
          fontSize: "1rem", 
          margin: "0 0 8px 0", 
          minHeight: "48px",
          WebkitLineClamp: 2, 
          WebkitBoxOrient: "vertical",
          display: "-webkit-box",
          overflow: "hidden"
        }}>
          {movie.title}
        </h2>
        
        {movie.year && (
          <p style={{ margin: "4px 0", color: "#00ED64", fontWeight: "bold" }}>
            {movie.year} {movie.type && `• ${movie.type}`}
          </p>
        )}
        
        {movie.genres && movie.genres.length > 0 && (
          <p style={{ margin: "4px 0", fontSize: "0.7rem", color: "#ccc" }}>
            {movie.genres.slice(0, 3).join(", ")}
          </p>
        )}
        
        {movie.runtime && (
          <p style={{ margin: "4px 0", fontSize: "0.7rem", color: "#ccc" }}>
            Runtime: {movie.runtime} min
          </p>
        )}
        
        <p style={{ margin: "8px 0 0 0", fontSize: "0.8rem" }}>
          IMDb: <strong>{movie.imdb?.rating ?? "N/A"}</strong>
          {movie.tomatoes?.viewer?.rating && (
            <>
              <br />
              RT: <strong>{movie.tomatoes.viewer.rating}</strong>
            </>
          )}
          {movie.score && (
            <>
              <br />
              Score: <strong>{movie.score.toFixed(2)}</strong>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
