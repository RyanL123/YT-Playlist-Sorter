import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Index from "./index";
import "@testing-library/jest-dom/extend-expect";
import { setupServer } from "msw/node";
import { handlers } from "../mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

  await waitFor(
    () => expect(screen.getByText("The Kardashev Scale")).toBeInTheDocument(),
    {
      timeout: 10000,
    },
  );
  console.log(screen.debug());
  return Promise.resolve();
}, 20000);
