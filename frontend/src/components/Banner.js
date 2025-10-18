import { Link } from "react-router-dom";
import { useState } from "react";

const Banner = () => {

  return (
    <nav className="bg-stone-300 text-neutral-950 font-medium px-4 py-0.5">
      {/* Top links */}
      <ul className="flex flex-wrap justify-center md:justify-start gap-3 text-sm mb-2">
        <li><Link to="/women" className="hover:text-blue-600 transition-colors">Movies</Link></li>
        <li><Link to="/men" className="hover:text-blue-600 transition-colors">Shows</Link></li>
        <li><Link to="/kids" className="hover:text-blue-600 transition-colors">Games</Link></li>
      </ul>
    </nav>
  );
};

export default Banner;
