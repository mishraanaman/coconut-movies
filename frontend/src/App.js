import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";

import Store from "./utils/store";
import UserContext from "./utils/UserContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Men from "./components/Men";
import Women from "./components/Women";
import Cart from "./components/Cart";
import SearchResults from "./components/SearchResults";
import Error from "./components/Error";

const AppLayout = () => {
  const [user, setUser] = useState({ name: "Naman Mishra", email: "reachoutnaman@gmail.com" });
  const [results, setResults] = useState([]); // store search results

  // // Search handler passed to Header
  // const handleSearch = async (query) => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/v1/movies/search/?q=${encodeURIComponent(query)}`);
  //     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  //     const data = await res.json();
  //     setResults(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <Provider store={Store}>
      <UserContext.Provider value={{ user, setUser }}>
        <Header/>{/* <Header onSearch={handleSearch} /> */}
        <Outlet /> {/* Nested routes */}
        <Footer />
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/search", element: <SearchResults /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/men", element: <Men /> },
      { path: "/women", element: <Women /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
