import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Index from "./index";
import "@testing-library/jest-dom/extend-expect";
import { getFunctions, httpsCallable } from "firebase/functions";
import type { VideoMetadata } from "../types";

const mockVideosByPlaylistId: Record<string, VideoMetadata> = {
  playlist1: {
    id: "abc",
    statistics: {
      viewCount: "1",
      likeCount: "1",
    },
    snippet: {
      publishedAt: "2000/01/01",
      channelTitle: "A",
      title: "Video1",
      thumbnails: {
        medium: {
          url: "abc.com",
        },
      },
    },
    contentDetails: {
      duration: "PT10S",
    },
  },
  playlist2: {
    id: "abc",
    statistics: {
      viewCount: "1",
      likeCount: "1",
    },
    snippet: {
      publishedAt: "2000/01/01",
      channelTitle: "A",
      title: "Video2",
      thumbnails: {
        medium: {
          url: "abc.com",
        },
      },
    },
    contentDetails: {
      duration: "PT10S",
    },
  },
};

const mockPlaylistFunction = ({
  id,
}): { data: { videos: VideoMetadata[] } } => {
  return {
    data: {
      videos: [mockVideosByPlaylistId[id]],
    },
  };
};

jest.mock("firebase/functions", () => {
  return {
    __esModule: true,
    ...jest.requireActual("firebase/functions"),
    httpsCallable: (_, name) => {
      if (name === "getVideosFromPlaylist") {
        return mockPlaylistFunction;
      }
    },
  };
});

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
  await user.keyboard("playlist1");

  const form = screen.getByTestId("searchPanelForm");
  fireEvent.submit(form);

  await waitFor(
    async () => {
      expect(
        await screen.findAllByText("Video1", { exact: false }),
      ).toBeDefined();
    },
    {
      timeout: 5000,
    },
  );

  await user.clear(playlistIdInput);
  await user.click(playlistIdInput);
  await user.keyboard("playlist2");

  fireEvent.submit(form);

  await waitFor(
    async () => {
      expect(
        await screen.findAllByText("Video2", { exact: false }),
      ).toBeDefined();
    },
    {
      timeout: 5000,
    },
  );
}, 20000);
