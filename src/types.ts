/**
 * Represents metadata of a video
 */
export type VideoMetadata = {
  link: string;
  title: string;
  channel: string;
  views: number;
  likes: number;
  uploadDate: string;
  duration: number;
  thumbnail: string;
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
