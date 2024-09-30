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

export enum IdType {
  PLAYLIST = "Playlist",
  CHANNEL = "Channel",
}
