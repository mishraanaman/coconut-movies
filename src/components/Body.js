import Banner from "./Banner";
import { HOME_PAGE_DESCRIPTION } from "../../constants";
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
        <li className="my-6 mx-3 py-5">{HOME_PAGE_DESCRIPTION}</li>
        <li><Carousel><img src="https://via.placeholder.com/1600x300" alt="placeholder" />
    <img src="https://via.placeholder.com/1600x300" alt="placeholder" />
    <img src="https://via.placeholder.com/1600x300" alt="placeholder" />
</Carousel></li>
      </ul>
    </div>
  )

}

export default Body;
