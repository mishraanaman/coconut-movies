import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <nav className="bg-[#00684A] text-[#ffffff] font-medium px-4">
      {/* Top links */}
      <ul className="flex flex-wrap justify-center md:justify-start gap-3 text-sm mb-2 py-0.5">
        <li><Link to="/movies" className="hover:text-[#00ED64] transition-colors">Movies</Link></li>
        <li><Link to="/shows" className="hover:text-[#00ED64] transition-colors">Shows</Link></li>
        <li><Link to="/theaters" className="hover:text-[#00ED64] transition-colors">Theaters</Link></li>
      </ul>
    </nav>
  );
};

export default Banner;
