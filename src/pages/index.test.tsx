import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Index from "./index";
import "@testing-library/jest-dom/extend-expect";
import { getFunctions, httpsCallable } from "firebase/functions";
import type {
  PlaylistItemListResponse,
  VideoListResponse,
  VideoMetadata,
} from "../types";

const mockVideosById: Record<string, VideoMetadata> = {
  abc: {
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
  def: {
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

const mockPlaylistsById: Record<string, PlaylistItemListResponse> = {
  playlist1: {
    kind: "youtube#playlistItemListResponse",
    nextPageToken: "",
    prevPageToken: "",
    pageInfo: {
      totalResults: 1,
      resultsPerPage: 1,
    },
    items: [
      {
        kind: "youtube#playlistItem",
        snippet: {
          resourceId: {
            videoId: "abc",
          },
        },
      },
    ],
  },
  playlist2: {
    kind: "youtube#playlistItemListResponse",
    nextPageToken: "",
    prevPageToken: "",
    pageInfo: {
      totalResults: 1,
      resultsPerPage: 1,
    },
    items: [
      {
        kind: "youtube#playlistItem",
        snippet: {
          resourceId: {
            videoId: "def",
          },
        },
      },
    ],
  },
};

const mockVideoFunction = ({ id }): { data: VideoListResponse } => {
  return {
    data: {
      kind: "youtube#videoListResponse",
      nextPageToken: "",
      prevPageToken: "",
      pageInfo: {
        totalResults: 1,
        resultsPerPage: 1,
      },
      items: [mockVideosById[id]],
    },
  };
};

const mockPlaylistFunction = ({ id }): { data: PlaylistItemListResponse } => {
  return { data: mockPlaylistsById[id] };
};

jest.mock("firebase/functions", () => {
  return {
    __esModule: true,
    ...jest.requireActual("firebase/functions"),
    httpsCallable: (_, name) => {
      if (name === "video") {
        return mockVideoFunction;
      } else if (name === "playlist") {
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
