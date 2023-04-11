import {Link} from "react-router-dom"

import About from "./About";

const Footer = () => {


  return (
    <>
     <div className="h-16 bg-stone-300 text-neutral-950 fixed bottom-0 left-0 w-full mt-8">
     <div className="nav-items">
        <ul className="flex py-8">
            <li className="px-2 font-bold">Home</li>
            <li className="font-bold px-2"><Link to= "/about">About Us</Link></li>
            <li className="font-bold px-2"><Link to= "/contact">Contact</Link></li>
        </ul>
     </div>
    </div>
    
    </>
  );
};

export default Footer;
