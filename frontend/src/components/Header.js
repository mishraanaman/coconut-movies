import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import Logo from "./Logo";

//const Header = ({ onSearch }) => {
const Header = () => {
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
    <div className="h-12 bg-[#001E2B] text-neutral-950 px-4 flex items-center justify-between">
      {/* <Logo /> */}
      <Link to="/" className="text-3xl text-[#ffffff] font-bold">mmflix</Link>
      <SearchBar/>      {/* <SearchBar onSearch={onSearch} /> */}
      
      {/* User info and cart */}
      <div className="flex items-center text-[#ffffff] space-x-4">
        <span>{user.name}</span>
        <Link to="/cart" className="font-bold">Cart-{cartItems.length} items</Link>
        <button
          className="border bg-white text-[#023430] py-1 px-2 rounded"
          onClick={changeLoginStatus}
        >
          {isLoggedIn ? "LogOut" : "LogIn"}
        </button>
      </div>
    </div>
  );
};

export default Header;
