import { Box, Link, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { IVideoMetadata } from "../types";
import { convertISOtoString } from "../util/dateUtil";

const Video = ({ metadata }: { metadata: IVideoMetadata }) => {
  const mobile = useMediaQuery("(max-width:1000px)");
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
          <Link href={metadata.link} target="_blank">
            {metadata.title}
          </Link>
        </Typography>
        <Typography variant="h6" color="text.primary">
          {metadata.channel}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Views:{" "}
          {metadata.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Likes:{" "}
          {metadata.likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Upload Date: {convertISOtoString(metadata.uploadDate)}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Duration:{" "}
          {new Date(metadata.duration * 1000).toISOString().substr(11, 8)}
        </Typography>
      </Box>
      <Box>
        <Link href={metadata.link} target="_blank">
          <img
            src={metadata.thumbnail}
            style={{
              width: mobile ? "100%" : "300px",
              height: "auto",
            }}
            alt={metadata.title}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Video;
