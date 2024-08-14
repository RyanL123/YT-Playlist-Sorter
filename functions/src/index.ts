import { youtube } from "@googleapis/youtube";
import * as logger from "firebase-functions/logger";
import { onCall } from "firebase-functions/v2/https";

const youtubeClient = youtube({
  auth: process.env.YOUTUBE_API_KEY,
  version: "v3",
});

export const getVideosFromPlaylist = onCall(async (request) => {
  const playlistId = request.data.id;
  const playlist = await youtubeClient.playlistItems.list({
    playlistId: playlistId,
    part: ["contentDetails", "snippet"],
    maxResults: 50,
  });

  const dataItems = playlist?.data?.items ?? [];

  let videos = await Promise.all(
    dataItems.map((playlistItem) => {
      const videoId = playlistItem.snippet?.resourceId?.videoId ?? "";
      return youtubeClient.videos.list({
        part: ["statistics", "snippet", "contentDetails"],
        id: [videoId],
      });
    }),
  );

  let filteredVideos = videos
    .map((video) => video?.data?.items?.[0])
    .filter((video) => video != undefined);

  logger.debug(filteredVideos);
  return { videos: filteredVideos };
});
