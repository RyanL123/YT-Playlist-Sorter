import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import type {
  PlaylistItemListResponse,
  VideoListResponse,
  VideoMetadata,
} from "../types";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
// connectFunctionsEmulator(functions, "localhost", 5001);

function findVideoById(videoId): Promise<VideoMetadata | null> {
  const videoFunction = httpsCallable(functions, "video");
  return videoFunction({ id: videoId }).then((res) => {
    const data = res.data as VideoListResponse;

    // This means the video is private or deleted
    if (data.items.length === 0) {
      return null;
    }

    return data.items[0];
  });
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
  return playlistFunction({ id: playlistId, token: pageToken }).then(
    async (res) => {
      const data = res.data as PlaylistItemListResponse;
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
    },
  );
}
