import { initializeApp } from "firebase/app";
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions";
import type {
  PlaylistItemListResponse,
  VideoListResponse,
  VideoMetadata,
} from "../types";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

if (
  !process.env.NODE_ENV ||
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "test"
) {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

async function findVideoById(videoId): Promise<VideoMetadata | null> {
  const videoFunction = httpsCallable(functions, "video");
  const data = (await videoFunction({ id: videoId })).data as VideoListResponse;
  // This means the video is private or deleted
  if (data.items.length === 0) {
    return null;
  }
  return data.items[0];
}

const MAX_PLAYLIST_PAGINATION_COUNT = 4;

export async function findPlaylistById(
  playlistId: string,
  pageToken: string,
  pageCount: number,
): Promise<VideoMetadata[]> {
  // 4 pages * 50 videos/page = 200 videos max
  if (pageCount > MAX_PLAYLIST_PAGINATION_COUNT) {
    return [];
  }
  const playlistFunction = httpsCallable(functions, "playlist");
  const data = (await playlistFunction({ id: playlistId, token: pageToken }))
    .data as PlaylistItemListResponse;

  let results: VideoMetadata[] = [];

  // playlist is empty
  if (!data.items) {
    return [];
  }

  // Get the video metadata of each video in the playlist
  for (const playlistItem of data.items) {
    const videoId = playlistItem.snippet.resourceId.videoId;
    const video = await findVideoById(videoId);
    if (video) {
      results.push(video);
    }
  }

  if (!data.nextPageToken) {
    return results;
  }

  // recursively get next page of data
  const nextPlaylist = await findPlaylistById(
    playlistId,
    data.nextPageToken,
    pageCount + 1,
  );

  return [...results, ...nextPlaylist];
}
