export const  filterData = (searchText, products)=>{

    const filteredProducts = products.filter((product) =>
      product?.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return filteredProducts;
}


export  const postData = async (url, data) => {
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
