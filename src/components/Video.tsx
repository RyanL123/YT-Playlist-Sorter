import { Box, Link, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import { parse, toSeconds } from "iso8601-duration";
import * as React from "react";
import { VideoMetadata } from "../types";

const Video = ({ metadata }: { metadata: VideoMetadata }) => {
  const mobile = useMediaQuery("(max-width:1000px)");
  const videoLink = `https://www.youtube.com/watch?v=${metadata.id}`;

  return (
    <Box
      display="flex"
      flexDirection={mobile ? "column" : "row"}
      width="100%"
      justifyContent="space-between"
      my="20px"
    >
      <Box display="flex" flexDirection="column">
        <Typography variant="h5" color="text.primary">
          <Link href={videoLink} target="_blank">
            {metadata.snippet.title}
          </Link>
        </Typography>
        <Typography variant="h6" color="text.primary">
          {metadata.snippet.channelTitle}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Views:{" "}
          {metadata.statistics.viewCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Likes:{" "}
          {metadata.statistics.likeCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Upload Date:{" "}
          {Intl.DateTimeFormat("en", {
            dateStyle: "long",
            timeZone: "UTC",
          }).format(new Date(metadata.snippet.publishedAt))}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Duration:{" "}
          {new Date(toSeconds(parse(metadata.contentDetails.duration)) * 1000)
            .toISOString()
            .substring(11, 19)}
        </Typography>
      </Box>
      <Box>
        <Link href={videoLink} target="_blank">
          <img
            src={metadata.snippet.thumbnails.medium.url}
            style={{
              width: mobile ? "100%" : "300px",
              height: "auto",
            }}
            alt={metadata.snippet.title}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Video;
