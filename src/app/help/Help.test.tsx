import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Help from "../../pages/help";

it("renders correctly", () => {
  const component = renderer.create(
    <BrowserRouter>
      <Help />
    </BrowserRouter>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
