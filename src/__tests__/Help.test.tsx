import React from "react";
import renderer from "react-test-renderer";
import Help from "../app/help/page";

it("renders correctly", () => {
  const component = renderer.create(<Help />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
