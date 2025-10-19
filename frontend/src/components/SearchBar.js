// src/components/SearchBar.jsx
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(searchText);
    console.log("Search clicked:", searchText);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex w-full max-w-3xl mx-4">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search movies, actors and more"
        className="flex-grow py-2 px-4 rounded-l-md border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
      />
      <button
        onClick={handleSearch}
        className="px-4 bg-red-500 hover:bg-green-700 text-white font-semibold rounded-r-md transition-colors"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
