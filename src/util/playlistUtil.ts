import { initializeApp } from "firebase/app";
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions";
import type { VideoMetadata } from "../types";
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

export async function findPlaylistById(
  playlistId: string,
): Promise<VideoMetadata[]> {
  const getVideosFromPlaylist = httpsCallable(
    functions,
    "getVideosFromPlaylist",
  );
  const data = (await getVideosFromPlaylist({ id: playlistId })).data as {
    videos: VideoMetadata[];
  };
  return data.videos;
}
