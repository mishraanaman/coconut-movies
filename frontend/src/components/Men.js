import ProductGrid from "./ProductGrid";

const Men = () => {
  const menProductCodes = [
    "20106592",
    "20120393", 
    "20121852",
    "20121981",
    "20121833",
    "20109731"
  ];

  return <ProductGrid productCodes={menProductCodes} title="Men's Collection" />;
};

export default Men;