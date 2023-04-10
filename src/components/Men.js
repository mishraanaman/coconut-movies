import { useState } from "react"
import { products, FAB_INDIA_URL , FAB_INDIA_API} from "../../constants";
import { filterData } from "../utils/helper";
import { useEffect } from "react";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
  
  
    const postData = async (url, data) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      return responseData;
    };
  
  
  
  
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
  <div className="m-5 flex justify-between">
  <Link to="/women"><h1 className="px-2">Women</h1></Link>
  <Link to="/men"><h1 className="px-2">Men</h1></Link>
  
  <div className="search-container">
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
        </div>    
    
  
  <ul className="flex flex-wrap">
    {filteredProducts.map(product => (
      <li key={product.code} className="bg-white shadow-lg rounded-lg hover:scale-11 h-120 w-80">
        <img src={FAB_INDIA_URL+product.images[0].url} alt={product.name} className="h-100 w-80" />
          <h3 className="text-lg mb-2">{product.name}</h3>
          <ul className="flex justify-between">
            <li> <h3 className="text-lg mb-2">{product.price.formattedValue}</h3></li>
           {/* <li><button className="bg-stone-100 text-neutral-950 font-bold py-2 px-4 rounded mt-4 opacity-70">+</button></li> */}
          </ul>
         
      </li>
    ))}
  </ul>
  </>
  )

}

export default Men;