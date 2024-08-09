/**
 * @see https://developers.google.com/youtube/v3/docs/videos#resource-representation
 */
export type VideoMetadata = {
  id: string;
  statistics: {
    viewCount: string;
    likeCount: string;
  };
  snippet: {
    publishedAt: string;
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

/**
 * @see https://developers.google.com/youtube/v3/docs/videos/list#response
 */
export type VideoListResponse = {
  kind: "youtube#videoListResponse";
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: VideoMetadata[];
};

/**
 * @see https://developers.google.com/youtube/v3/docs/playlistItems#resource-representation
 */
export type PlaylistItem = {
  kind: "youtube#playlistItem";
  snippet: {
    resourceId: {
      videoId: string;
    };
  };
};

/**
 * @see https://developers.google.com/youtube/v3/docs/playlistItems/list#response
 */
export type PlaylistItemListResponse = {
  kind: "youtube#playlistItemListResponse";
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: PlaylistItem[];
};

export enum SortOptions {
  VIEWS_DESC = "Views Descending",
  VIEWS_ASC = "Views Ascending",
  LIKES_DESC = "Likes Descending",
  LIKES_ASC = "Likes Ascending",
  MOST_RECENT = "Most Recent",
  LEAST_RECENT = "Least Recent",
  LONGEST = "Longest",
  SHORTEST = "Shortest",
}
