import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Index from "./index";
import "@testing-library/jest-dom/extend-expect";
import type { VideoMetadata } from "../types";
import { findPlaylistById } from "../util/playlistUtil";

const mockPlaylist1: VideoMetadata[] = [
  {
    id: "abc",
    statistics: {
      viewCount: "1",
      likeCount: "1",
    },
    snippet: {
      publishedAt: "2000/01/01",
      channelTitle: "Channel1",
      title: "Video1",
      thumbnails: {
        medium: {
          url: "google.com",
        },
      },
    },
    contentDetails: {
      duration: "PT10S",
    },
  },
];

const mockPlaylist2: VideoMetadata[] = [
  {
    id: "abc",
    statistics: {
      viewCount: "1",
      likeCount: "1",
    },
    snippet: {
      publishedAt: "2000/01/01",
      channelTitle: "Channel1",
      title: "Video2",
      thumbnails: {
        medium: {
          url: "google.com",
        },
      },
    },
    contentDetails: {
      duration: "PT10S",
    },
  },
];

jest.mock("../util/playlistUtil", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../util/playlistUtil"),
    findPlaylistById: (
      playlistId: string,
      pageToken: string,
      pageCount: number,
    ) => {
      if (playlistId === "video1") {
        return Promise.resolve(mockPlaylist1);
      } else {
        return Promise.resolve(mockPlaylist2);
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
  await user.keyboard("video1");

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

  await user.click(playlistIdInput);
  await user.keyboard("video2");

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
