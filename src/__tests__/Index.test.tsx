import { enableFetchMocks } from "jest-fetch-mock";
import React from "react";
import renderer from "react-test-renderer";
import Index from "../app/page";

enableFetchMocks();

it("renders correctly", () => {
  const component = renderer.create(<Index />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
