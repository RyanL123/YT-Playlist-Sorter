import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Index from "./index";

it("renders correctly", async () => {
  const component = renderer.create(
    <BrowserRouter>
      <Index />
    </BrowserRouter>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <Index />
    </BrowserRouter>,
  );

  const playlistIdInput = screen.getByTestId("playlistIdInput");
  await user.click(playlistIdInput);
  await user.keyboard("PLFs4vir_WsTwEd-nJgVJCZPNL3HALHHpF");

  const form = screen.getByTestId("form");
  fireEvent.submit(form);

  return Promise.resolve();
});
