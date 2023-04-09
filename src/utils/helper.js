export const  filterData = (searchText, products)=>{

    const filteredProducts = products.filter((product) =>
      product?.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return filteredProducts;
  }