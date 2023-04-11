import { useState } from "react"
import { products , FAB_INDIA_API} from "../../constants";
import { filterData } from "../utils/helper";
import { useEffect } from "react";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import ProductCard from "./ProductCard";
import { postData } from "../utils/helper";


const Women= () =>{
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
       "10732177",
       "10732335",
       "10732171",
       "10733730",
       "10732231",
       "10732311"
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
  
  
   //use searchData function and set condition if data is empty show error message
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
            className="search-btn rounded-lg bg-stone-300 hover:bg-stone-400 p-2"
            onClick={() => {
              // user click on button searchData function is called
              searchData(searchText, allProducts);
            }}
          >
            Search
          </button>  
  
        {errorMessage && <div className="error-container">{errorMessage}</div>}
        </div>
    
  
  <ul className="flex flex-wrap ">

  {filteredProducts.map(product => {
  const { code, name, images, price } = product;

  return (
    <ProductCard
      id={code}
      name ={name}
      images={images}
      price={price}
    />
  );
})}

  </ul>
  </>
  )

}

export default Women;