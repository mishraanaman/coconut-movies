import {Link} from "react-router-dom"
import Women from "./Women";
import Men from "./Men"
/**
 * 
 * Create dark theme using useContext
 */



const Body = () => {
return (
  <div className="">
  <ul className="flex py-8 bg-stone-300 text-neutral-950">
  <li className="px-2"><Link to="/women">Women</Link></li>
  <li className="px-2"><Link to="/men">Men</Link></li>
  </ul>
  </div>

)
  
}

export default Body;
