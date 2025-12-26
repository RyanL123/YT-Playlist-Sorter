import { youtube } from "@googleapis/youtube";
import * as logger from "firebase-functions/logger";
import { onCall } from "firebase-functions/v2/https";

const youtubeClient = youtube({
  auth: process.env.YOUTUBE_API_KEY,
  version: "v3",
});

const MAX_VIDEOS_LIMIT = 500;

export const getVideosFromPlaylist = onCall(async (request) => {
  const playlistId = request.data.id;

  let allVideos = [];
  let pageToken = "";

  while (allVideos.length < MAX_VIDEOS_LIMIT) {
    const playlist = await youtubeClient.playlistItems.list({
      playlistId: playlistId,
      part: ["contentDetails", "snippet"],
      maxResults: 50,
      pageToken: pageToken,
    });

    const videoIds = playlist?.data?.items
      ?.map((playlistItem) => playlistItem.snippet?.resourceId?.videoId ?? "")
      .filter((id) => id !== "");

    const videos = await youtubeClient.videos.list({
      part: ["statistics", "snippet", "contentDetails"],
      id: videoIds,
    });

    allVideos.push(...(videos.data?.items ?? []));

    pageToken = playlist.data?.nextPageToken ?? "";
    if (!pageToken) {
      break;
    }
  }

  logger.debug(allVideos);
  return { videos: allVideos };
});

export const getVideosFromChannel = onCall(async (request) => {
  const channelHandle = request.data.id;
  const channels = await youtubeClient.channels.list({
    forHandle: channelHandle,
    part: ["snippet"],
  });

  let allVideos = [];
  let pageToken = "";

  while (allVideos.length < MAX_VIDEOS_LIMIT) {
    const channelVideos = await youtubeClient.search.list({
      channelId: channels.data?.items?.[0]?.id ?? "",
      part: ["snippet"],
      maxResults: 50,
      pageToken: pageToken,
    });

    const videoIds = channelVideos?.data?.items
      ?.map((videoItem) => videoItem.id?.videoId ?? "")
      .filter((id) => id !== "");

    const videos = await youtubeClient.videos.list({
      part: ["statistics", "snippet", "contentDetails"],
      id: videoIds,
    });

    allVideos.push(...(videos.data?.items ?? []));

    pageToken = channelVideos.data?.nextPageToken ?? "";
    if (!pageToken) {
      break;
    }
  }

  logger.debug(allVideos);
  return { videos: allVideos };
});
