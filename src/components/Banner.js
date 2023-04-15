import {Link} from "react-router-dom"


const Banner = ()=>{

 return (
    <div className="h-5">
    <ul className="flex py-3 bg-stone-300 text-neutral-950">
    <li className="px-2"><Link to="/women">Women</Link></li>
    <li className="px-2"><Link to="/men">Men</Link></li>
    </ul>
    </div>
 )
}

export default Banner;