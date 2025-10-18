import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";



// SPA - Single Page Application???
// Client Side Routing

// const Title = () => (
//   <a href="/">
//     <img data-testid="logo" className="h-10 p-2 ml-2 rounded-full ring-1 ring-gray-300" alt="logo" src={Logo} />
//   </a>
// );

const Header = ({ onSearch }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isOnline = useOnline();

  const { user } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  const changeLoginStatus = (isLoggedIn) => {
    setIsLoggedIn(!isLoggedIn)
  }

  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(searchText);
    console.log("Search clicked:", searchText);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };
  return (
    <>

      <div className="h-10 bg-stone-400 text-neutral-950 shadow-md mb-1 px-4">
        <div className="nav-items">
          <ul className="flex justify-between py-1">
            {/* <li><Logo/></li> */}
            <li className="text-3xl font-bold"><Link to="/">Coconut</Link></li>
            <li>      {/* Centered search bar */}
                <div className="flex w-full max-w-3xl">
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Search products, brands and more"
                    className="flex-grow px-4 py-2 rounded-l-md border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-r-md transition-colors"
                  >
                    Search
                  </button>
                </div>
              </li>
            <li>
              <ul className="flex flex-wrap py-1">
                <li>{user.name}</li>
                <li className="font-bold px-4" data-testid="cart"> <Link to="/cart">Cart-{cartItems.length} items</Link></li>
                <li className="font-bold px-4" data-testid="button"> <button className="border border-blue-500 bg-white text-blue-500 font-semibold py-1 px-2 rounded" onClick={() => {
                  changeLoginStatus(isLoggedIn);
                  console.log('clicked', isLoggedIn)
                }}>{isLoggedIn ? 'LogIn' : 'LogOut'}</button></li>
              </ul>
            </li>

          </ul>
        </div>
      </div>

    </>
  );
};

export default Header;
