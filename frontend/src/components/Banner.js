import { Link } from "react-router-dom";
import { useState } from "react";

const Banner = () => {

  return (
    <nav className="bg-[#00684A] text-[#ffffff] text-neutral-950 font-medium px-4 py-0.5">
      {/* Top links */}
      <ul className="flex flex-wrap justify-center md:justify-start gap-3 text-sm mb-2">
        <li><Link to="/women" className="hover:text-[#00ED64] transition-colors">Movies</Link></li>
        <li><Link to="/men" className="hover:text-[#00ED64] transition-colors">Shows</Link></li>
        <li><Link to="/kids" className="hover:text-[#00ED64] transition-colors">Games</Link></li>
      </ul>
    </nav>
  );
};

export default Banner;
