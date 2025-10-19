import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

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

      {/* ✅ Reusable Search Bar */}
      <SearchBar onSearch={onSearch} />

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
