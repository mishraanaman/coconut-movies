import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const controllerRef = useRef(null); // For aborting fetch

  // Debounce: wait 300ms after typing stops
  useEffect(() => {
    if (!searchText.trim()) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(() => {
      // Abort previous request
      if (controllerRef.current) controllerRef.current.abort();
      controllerRef.current = new AbortController();

      fetch(
        `http://localhost:3000/v1/movies/search?q=${encodeURIComponent(searchText)}`,
        { signal: controllerRef.current.signal }
      )
        .then((res) => res.json())
        .then((data) => setSuggestions(data.slice(0, 5)))
        .catch((err) => {
          if (err.name !== "AbortError") console.error("Error fetching autocomplete", err);
        });
    }, 500); // 300ms debounce

    return () => clearTimeout(handler);
  }, [searchText]);

  const handleSearch = (query) => {
    const q = query || searchText;
    if (q.trim()) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="relative flex w-full max-w-3xl mx-4" ref={dropdownRef}>
      <input
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setShowDropdown(true);
        }}
        onKeyDown={handleKeyPress}
        placeholder="Search movies, actors and more"
        className="flex-grow py-2 px-4 rounded-l-md border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
      />
      <button
        onClick={() => handleSearch()}
        className="px-4 bg-red-500 hover:bg-green-700 text-white font-semibold rounded-r-md transition-colors"
      >
        Search
      </button>

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-50">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSearch(item.title)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
