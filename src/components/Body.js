import Women from "./Women";
import Men from "./Men"
import Banner from "./Banner";
/**
 * 
 * Create dark theme using useContext
 */



const Body = () => {
  return (
    <>
      <ul>
        <li><Banner /></li>
        <li><h1 className="py-20">Welcome to Coconout, your own sustainable fashion brand that embodies sensible clothing</h1></li>
      </ul>
    </>
  )

}

export default Body;
