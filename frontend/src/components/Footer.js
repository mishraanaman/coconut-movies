import {Link} from "react-router-dom"

const Footer = () => {

  return (
    <>
     <div className="nav-items h-16 bg-[#001E2B] text-white left-0 w-full mt-8">
        <ul className="flex py-5">
            <li className="px-2 font-bold"><Link to= "/">Home</Link></li>
            <li className="font-bold px-2"><Link to= "/about">About Us</Link></li>
            <li className="font-bold px-2"><Link to= "/contact">Contact</Link></li>
        </ul>
     </div>    
    </>
  );
};

export default Footer;
