import { useState } from "react"
import { products, FAB_INDIA_URL , FAB_INDIA_API} from "../../constants";
import { filterData } from "../utils/helper";
import { useEffect } from "react";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import ProductCard from "./ProductCard";
import { postData } from "../utils/helper";

const Men= () =>{
    [searchText, setSearchText] = useState("");
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
  
    useEffect(() => {
      getProducts();
    }, []);
  
    const handleItem= (()=>{
      useDispatch(addItem("Grapes"));
    })
  

  
    async function getProducts() {
      // handle the error using try... catch
  
      const url = FAB_INDIA_API;
      const data = {
       "productCodes": [
        "10706832",
        "10707843",
        "10703684",
        "10703715",
        "10707900",
        "10651713",
        "10654435",
        "10651705",
        "10659374",
        "10652540"
      ]
      };
    postData(url, data)
    .then(response => {
      setAllProducts(response.products);
      setFilteredProducts(response.products);
  
    })
    .catch(error => console.error(error));
        // const data = await fetch(swiggy_api_URL);
        // const json = await data.json();
        // updated state variable restaurants with Swiggy API data
    }
  
  
   // use searchData function and set condition if data is empty show error message
   const searchData = (searchText, products) => {
    if (searchText !== "") {
      const data = filterData(searchText, products);
      setFilteredProducts(data);
      setErrorMessage("");
      if (data.length === 0) {
        setErrorMessage(`We couldn't find any results for "${searchText}"`);
      }
    } else {
      setErrorMessage("");
      setFilteredProducts(products);
    }
  };
    if (!allProducts) return null;
  
  
  
   
  return(
  <>
  <Banner/>
  
  <div className="search-container flex justify-end">
          <input
            type="text"
            className="search-input p-2 m-2"
            placeholder="Search"
            value={searchText}
            // update the state variable searchText when we typing in input box
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <button
            className="search-btn rounded-lg bg-zinc-50 text-stone-500 hover:bg-zinc-200 px-2"
            onClick={() => {
              // user click on button searchData function is called
              searchData(searchText, allProducts);
            }}
          >
            Search
          </button>  
  
        {errorMessage && <div className="error-container">{errorMessage}</div>}
        </div>    
  
  <ul className="flex flex-wrap">
  {filteredProducts.map(product => {
  const { code, name, images, price } = product;

  return (
    <Link
    to={"/products/" + code}
    key={code}
  >
    <ProductCard
      id={code}
      name ={name}
      images={images}
      price={price}
    />

    </Link>
  );
})}
  </ul>
  </>
  )

}

export default Men;