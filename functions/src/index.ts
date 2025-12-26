import { youtube } from "@googleapis/youtube";
import { onCall } from "firebase-functions/v2/https";

const youtubeClient = youtube({
  auth: process.env.YOUTUBE_API_KEY,
  version: "v3",
});

const MAX_VIDEOS_LIMIT = 200;

async function getVideosFromPlaylistImpl(
  playlistId: string,
  limit: number = MAX_VIDEOS_LIMIT,
) {
  let allVideos = [];
  let pageToken: string | undefined;

  do {
    const playlistItems = await youtubeClient.playlistItems.list({
      playlistId,
      pageToken,
      part: ["snippet"],
      maxResults: 50,
    });

    const videoIds = playlistItems?.data?.items
      ?.map((item) => item.snippet?.resourceId?.videoId ?? "")
      .filter((id) => id !== "");

    const videos = await youtubeClient.videos.list({
      part: ["statistics", "snippet", "contentDetails"],
      id: videoIds,
    });

    allVideos.push(...(videos.data?.items ?? []));
    pageToken = playlistItems.data?.nextPageToken ?? "";
  } while (pageToken && allVideos.length < limit);

  return allVideos;
}

export const getVideosFromPlaylist = onCall(async (request) => {
  const playlistId = request.data.id;
  return { videos: await getVideosFromPlaylistImpl(playlistId) };
});

export const getVideosFromChannel = onCall(async (request) => {
  const channelHandle = request.data.id;
  const channels = await youtubeClient.channels.list({
    forHandle: channelHandle,
    part: ["contentDetails"],
  });
  const uploadsPlaylistId =
    channels.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

  let videos = null;
  if (uploadsPlaylistId) {
    videos = await getVideosFromPlaylistImpl(uploadsPlaylistId);
  }

  return { videos };
});
