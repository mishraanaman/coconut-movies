import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import ProductCard from "./ProductCard";
import { filterData, postData } from "../utils/helper";
import { FAB_INDIA_API } from "../../constants";

const ProductGrid = ({ productCodes, title = "Products" }) => {
  const [searchText, setSearchText] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (productCodes?.length) {
      getProducts();
    }
  }, [productCodes]);

  const getProducts = async () => {
    try {
      const data = { productCodes };
      const response = await postData(FAB_INDIA_API, data);
      setAllProducts(response.products || []);
      setFilteredProducts(response.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setErrorMessage("Failed to load products");
    }
  };

  const searchData = (searchText, products) => {
    if (searchText.trim()) {
      const data = filterData(searchText, products);
      setFilteredProducts(data);
      setErrorMessage(data.length === 0 ? `No results found for "${searchText}"` : "");
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
          className="search-input p-2 m-2 border rounded"
          placeholder="Search products"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="search-btn rounded-lg bg-zinc-50 text-stone-500 hover:bg-zinc-200 px-2"
          onClick={() => searchData(searchText, allProducts)}
        >
          Search
        </button>
      </div>

      {errorMessage && (
        <div className="error-container text-center text-red-500 p-4">
          {errorMessage}
        </div>
      )}

      <ul className="flex flex-wrap">
        {filteredProducts.map(product => {
          const { code, name, images, price } = product;
          return (
            <Link to={`/products/${code}`} key={code}>
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
  );
};

export default ProductGrid;