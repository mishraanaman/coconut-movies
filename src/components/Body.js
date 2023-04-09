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

      const url = 'https://apisap.fabindia.com/occ/v2/fabindiab2c/plpContent/searchProducts?fields=products(name,code,price(FULL),images(FULL),totalDiscount,priceAfterDiscount(FULL),newArrival,sale,stock)&lang=en&curr=INR';
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
          className="search-btn rounded-lg bg-stone-300 hover:bg-stone-400 p-2"
          onClick={() => {
            // user click on button searchData function is called
            searchData(searchText, allProducts);
          }}
        >
          Search
        </button>      

      {errorMessage && <div className="error-container">{errorMessage}</div>}

<ul className="flex flex-wrap">
  {filteredProducts.map(product => (
    <li key={product.code} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-110">
      <img src={"https://apisap.fabindia.com"+product.images[0].url} alt={product.name} className="w-full h-56 object-cover" />
      <div className="py-30 px-6">
        <h3 className="text-lg mb-2">{product.name}</h3>
        <ul className="flex justify-between">
          <li> <h3 className="text-lg mb-2">{product.price.formattedValue}</h3></li>
         <li><button className="bg-stone-100 text-neutral-950 font-bold py-2 px-4 rounded mt-4 opacity-70">+</button></li>
        </ul>
       
      </div>
    </li>
  ))}
</ul>
</div>
)
}

export default Body;
