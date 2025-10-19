import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Movie from "./Movie";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/v1/movies/search/?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="p-4 flex flex-wrap justify-center gap-4">
      {results.length ? (
        results.map((movie) => <Movie key={movie._id} movie={movie} />)
      ) : (
        <p>No results found for "{query}"</p>
      )}
    </div>
  );
};

export default SearchResults;
