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

  const videoIds = playlist?.data?.items
    ?.map((playlistItem) => playlistItem.snippet?.resourceId?.videoId ?? "")
    .filter((id) => id !== "");

  const videos = await youtubeClient.videos.list({
    part: ["statistics", "snippet", "contentDetails"],
    id: videoIds,
  });

  logger.debug(videos.data.items);
  return { videos: videos.data.items };
});

export const getVideosFromChannel = onCall(async (request) => {
  const channelId = request.data.id;
  const channelVideos = await youtubeClient.search.list({
    channelId: channelId,
    part: ["contentDetails", "snippet"],
    maxResults: 50,
  });

  const videoIds = channelVideos?.data?.items
    ?.map((videoItem) => videoItem.id?.videoId ?? "")
    .filter((id) => id !== "");

  const videos = await youtubeClient.videos.list({
    part: ["statistics", "snippet", "contentDetails"],
    id: videoIds,
  });

  logger.debug(videos.data.items);
  return { videos: videos.data.items };
});
