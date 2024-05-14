import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { parse, toSeconds } from "iso8601-duration";
import { VideoMetadata } from "../types";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
// connectFunctionsEmulator(functions, "localhost", 5001);

/**
 * Returned from the Youtube API from Firebase functions.
 * This type should be cleaned up in the future to live in a centralized
 * place to be leveraged by the firebase functions as well
 */
type VideoMetadataAPI = {
  id: number;
  statistics: {
    viewCount: string;
    likeCount: string;
  };
  snippet: {
    publishedAt;
    channelTitle: string;
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  contentDetails: {
    duration: string;
  };
};

type VideoFunctionResponse = {
  data: {
    items: VideoMetadataAPI[];
  };
};

function getVideo(videoID): Promise<VideoMetadata | null> {
  const videoFunction = httpsCallable(functions, "video");
  return videoFunction({ id: videoID }).then((res: VideoFunctionResponse) => {
    const video = res.data.items[0];
    // make sure video isn't private or removed
    if (res.data.items.length !== 0) {
      return {
        views: parseInt(video.statistics.viewCount),
        likes: parseInt(video.statistics.likeCount) ?? 0,
        uploadDate: video.snippet.publishedAt,
        channel: video.snippet.channelTitle,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.medium.url,
        link: `https://www.youtube.com/watch?v=${video.id}`,
        duration: toSeconds(parse(video.contentDetails.duration)),
      };
    }
    return null;
  });
}

/**
 * Returned from the Youtube API from Firebase functions.
 * This type should be cleaned up in the future to live in a centralized
 * place to be leveraged by the firebase functions as well
 */
type PlaylistMetadataAPI = {
  snippet: {
    resourceId: {
      videoId: number;
    };
  };
};

type PlaylistFunctionResponse = {
  data: {
    items: PlaylistMetadataAPI[];
    nextPageToken: string;
  };
};

export async function getPlaylist(
  playlistID: string,
  pageToken: string,
  count: number,
): Promise<VideoMetadata[]> {
  // 4 pages * 50 videos/page = 200 videos max
  if (count > 4) {
    return [];
  }
  const playlistFunction = httpsCallable(functions, "playlist");
  return playlistFunction({ id: playlistID, token: pageToken }).then(
    async (res: PlaylistFunctionResponse) => {
      const playlist = res.data;
      let results: VideoMetadata[] = [];
      if (!playlist.items) return results; // playlist is empty
      for (var i = 0; i < playlist.items.length; i++) {
        const videoID = playlist.items[i].snippet.resourceId.videoId;
        // ensure all videos are processed before returning
        // eslint-disable-next-line
        await getVideo(videoID).then((data) => {
          if (data) {
            results.push(data);
          }
        });
      }
      // recursively get next page of data
      if (res.data.nextPageToken) {
        await getPlaylist(playlistID, res.data.nextPageToken, count + 1).then(
          (data) => {
            // append data to current results
            results = results.concat(data);
          },
        );
      }
      return results;
    },
  );
}
