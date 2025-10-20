import { useState, useEffect } from "react"
import { products, FAB_INDIA_API, MEN_PRODUCT_CODES } from "../../constants";
import { filterData, postData } from "../utils/helper";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import ProductCard from "./ProductCard";


const Section = (props) => {

  const {product_codes} = props
  const [searchText, setSearchText] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getProducts();
  }, []);


  async function getProducts() {
    // handle the error using try... catch

    const url = FAB_INDIA_API;
    const data = {
      "productCodes": product_codes
    };
    postData(url, data)
      .then(response => {
        setAllProducts(response.products);
        setFilteredProducts(response.products);

      })
      .catch(error => console.error(error));
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


  return (
    <>
      <Banner />

      <div className="search-container flex justify-end p-2">
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
                name={name}
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

export default Section;