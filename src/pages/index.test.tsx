import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Index from "./index";
import "@testing-library/jest-dom/extend-expect";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import type {
  PlaylistItemListResponse,
  VideoListResponse,
  VideoMetadata,
} from "../types";
import { findPlaylistById } from "../util/playlistUtil";

// const handlers = [
//   // By calling "http.get()" we're instructing MSW
//   // to capture all outgoing "GET /posts" requests
//   // and execute the given response resolver when they
//   // happen.
//   http.get(
//     "http://127.0.0.1:5001/playlist-view-sorter/us-central1/playlist",
//     () => {
//       // Response resolver allows you to react to captured requests,
//       // respond with mock responses or passthrough requests entirely.
//       // For now, let's just print a message to the console.
//       console.log('Captured a "GET /posts" request');
//       const resp: PlaylistItemListResponse = {
//         kind: "youtube#playlistItemListResponse",
//         nextPageToken: "",
//         prevPageToken: "",
//         pageInfo: {
//           totalResults: 1,
//           resultsPerPage: 1,
//         },
//         items: [
//           {
//             kind: "youtube#playlistItem",
//             snippet: {
//               resourceId: {
//                 videoId: "abc",
//               },
//             },
//           },
//         ],
//       };
//       return HttpResponse.json(resp);
//     },
//   ),
// ];

// const server = setupServer(...handlers);

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// const test = () => {
//   return new Promise<VideoMetadata[]>((resolve) => {
//     resolve([]);
//   });
// };

// jest.mock("../util/playlistUtil", () => {
//   const originalModule = jest.requireActual("../util/playlistUtil");

//   //Mock the default export and named export 'foo'
//   return {
//     __esModule: true,
//     ...originalModule,
//     findPlaylistById: test,
//   };
// });

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

  const form = screen.getByTestId("searchPanelForm");
  fireEvent.submit(form);

  await waitFor(
    async () => {
      expect(
        await screen.findAllByText("Kurzgesagt", { exact: false }),
      ).toBeDefined();
    },
    {
      timeout: 10000,
    },
  );
}, 20000);
