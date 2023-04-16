import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"; // for routing our page import createBrowserRouter and RouterProvider for providing router & Outlet for children component for nested routing
import About from "./components/About";
import Contact from "./components/Contact";
import ProductMenu from "./components/ProductMenu"
import {Provider} from "react-redux"
import UserContext from "./utils/UserContext";
import Store  from "./utils/store";
import Men from "./components/Men"; 
import Women from "./components/Women";
import Cart from "./components/Cart";




const AppLayout =()=>{

const [user, setUser] = useState({name: "Naman Mishra", email: "reachoutnaman@gmail.com"});

   
  return (
    <>
    <Provider store ={Store}>
    <UserContext.Provider value ={{user: user, setUser: setUser}} >
    <Header/>
    <Outlet/>
    <Footer/>
    </UserContext.Provider>
    </Provider>
    
  </>
  )
}



const appRouter = createBrowserRouter([
  {
    path: "/", // show path for routing
    element: <AppLayout />, // show component for particular path
    errorElement: <Error />, // show error component for path is different
    children: [
      // show children component for routing
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/men",
        element: <Men />,
      },
      {
        path: "/women",
        element: <Women />,
      },
      {
        path: "/products/:prodId",
        element: <ProductMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
        errorElement: <Error />
      },
    ],
  },
   
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />); // render RouterProvider and use router as props and pass value appRouter

