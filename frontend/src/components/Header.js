import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = ({ onSearch }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { user } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);
  const isOnline = useOnline();

  const changeLoginStatus = () => setIsLoggedIn(!isLoggedIn);

  // Call the parent search handler
  const handleSearch = () => {
    if (onSearch) onSearch(searchText); // send text to Body
    console.log("Search clicked:", searchText);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="h-12 bg-stone-400 text-neutral-950 shadow-md mb-1 px-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-3xl font-bold">Coconut</Link>

      {/* Search bar */}
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
          className="px-4 bg-red-500 hover:bg-yellow-500 text-black font-semibold rounded-r-md transition-colors"
        >
          Search
        </button>
      </div>

      {/* User info and cart */}
      <div className="flex items-center space-x-4">
        <span>{user.name}</span>
        <Link to="/cart" className="font-bold">Cart-{cartItems.length} items</Link>
        <button
          className="border border-blue-500 bg-white text-blue-500 font-semibold py-1 px-2 rounded"
          onClick={changeLoginStatus}
        >
          {isLoggedIn ? "LogOut" : "LogIn"}
        </button>
      </div>
    </div>
  );
};

export default Header;
