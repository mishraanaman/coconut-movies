// Search.jsx
import React, { useState } from "react";
import Movie from "./Movie";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await fetch(`http://localhost:5000/search?q=${query}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        style={{ padding: "8px", width: "300px", marginRight: "8px" }}
      />
      <button onClick={handleSearch} style={{ padding: "8px" }}>
        Search
      </button>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "16px" }}>
        {results.map((movie, i) => (
          <Movie key={i} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Search;
