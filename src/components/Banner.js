import {Link} from "react-router-dom"


const Banner = ()=>{

 return (
    <div className="h-2">
    <ul className="flex flex-row py-1 bg-stone-300 text-neutral-950 font-medium">
    <li className="px-2"><Link to="/new_arrivals">New Arrivals</Link></li>
    <li className="px-2"><Link to="/women">Women</Link></li>
    <li className="px-2"><Link to="/men">Men</Link></li>
    <li className="px-2"><Link to="/kids">Kids</Link></li>
    <li className="px-2"><Link to="/home_living">Home & Living</Link></li>
    </ul>
    </div>
 )
}

export default Banner;