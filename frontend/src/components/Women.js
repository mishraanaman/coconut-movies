import ProductGrid from "./ProductGrid";

const Women = () => {
  const womenProductCodes = [
    "20123561",
    "20123567",
    "20123334",
    "20123269",
    "20143647",
    "20123530"
  ];

  return <ProductGrid productCodes={womenProductCodes} title="Women's Collection" />;
};

export default Women;