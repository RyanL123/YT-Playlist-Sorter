import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Index from "./index";

it("renders correctly", () => {
  const component = renderer.create(
    <BrowserRouter>
      <Index />
    </BrowserRouter>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
