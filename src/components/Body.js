import Banner from "./Banner";
import { HOME_PAGE_DESCRIPTION } from "../../constants";
/**
 * 
 * Create dark theme using useContext
 */



const Body = () => {
  return (
    <>
      <ul>
        <li><Banner /></li>
        <li><h1 className="py-10"></h1>{HOME_PAGE_DESCRIPTION}</li>
      </ul>
    </>
  )

}

export default Body;
