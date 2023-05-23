import Banner from "./Banner";
import { HOME_PAGE_DESCRIPTION } from "../../constants";
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
      </ul>
    </div>
  )

}

export default Body;
