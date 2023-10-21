import Banner from "./Banner";
import Carousel from "./Carousel";
/**
 * 
 * Create dark theme using useContext
 */



const Body = () => {
  return (
    <div className="min-h-screen">
      <ul>
        <li><Banner /></li>
        <li><Carousel/></li>
      </ul>
    </div>
  )

}

export default Body;
