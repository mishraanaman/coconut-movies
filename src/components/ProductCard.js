import {FAB_INDIA_URL} from "../../constants.js"


const ProductCard =({code, name, images, price})=>{

  return(
    <li key={code} className="bg-white shadow-lg rounded-lg hover:scale-11 h-120 w-80">
    <img src={FAB_INDIA_URL+images[0].url} alt={name} className="h-100 w-80" />
      <h3 className="text-lg mb-2">{name}</h3>
      <ul className="flex justify-between">
        <li> <h3 className="text-lg mb-2">{price.formattedValue}</h3></li>
       {/* <li><button className="bg-stone-100 text-neutral-950 font-bold py-2 px-4 rounded mt-4 opacity-70">+</button></li> */}
      </ul>
     
  </li>
  )
    
}

export default ProductCard;