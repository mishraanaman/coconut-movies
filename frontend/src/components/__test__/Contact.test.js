import Contact from "../Contact";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom"

test("Contact Component is rendered", ()=>{
  render(<Contact/>);

  const heading = screen.getAllByRole("heading");
  expect(heading).toBeInTheDocument();

})