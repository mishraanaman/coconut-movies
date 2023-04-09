import { useState } from "react"
import { products } from "../../constants";
import { filterData } from "../utils/helper";
import { useEffect } from "react";




const Body = () => {

  const [searchText, setSearchText] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    // handle the error using try... catch
    try {
      // const data = await fetch(swiggy_api_URL);
      // const json = await data.json();
      // updated state variable restaurants with Swiggy API data
      setAllProducts(products);
      setFilteredProducts(products);
    } catch (error) {
      console.log(error);
    }
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
          className="search-btn rounded-full bg-stone-200 hover:bg-stone-500 p-2"
          onClick={() => {
            // user click on button searchData function is called
            searchData(searchText, allProducts);
          }}
        >
          Search
        </button>      
        
      {errorMessage && <div className="error-container">{errorMessage}</div>}

<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {filteredProducts.map(product => (
    <li key={product.name} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-110">
      <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
      <div className="py-4 px-6">
        <h3 className="text-lg mb-2">{product.name}</h3>
        <button className="bg-stone-100 text-neutral-950 font-bold py-2 px-4 rounded mt-4 opacity-70">+</button>
      </div>
    </li>
  ))}
</ul>
</div>
)
}

export default Body;
