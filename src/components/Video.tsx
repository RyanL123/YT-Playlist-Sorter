import { Box, Link, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { convertISOtoString } from "../util/dateUtil";

const Video = ({
  stats,
}: {
  stats: {
    link: string;
    title: string;
    channel: string;
    views: number;
    likes: number;
    uploadDate: string;
    duration: number;
    thumbnail: string;
  };
}) => {
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
          <Link href={stats.link} target="_blank">
            {stats.title}
          </Link>
        </Typography>
        <Typography variant="h6" color="text.primary">
          {stats.channel}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Views: {stats.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Likes: {stats.likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Upload Date: {convertISOtoString(stats.uploadDate)}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Duration:{" "}
          {new Date(stats.duration * 1000).toISOString().substr(11, 8)}
        </Typography>
      </Box>
      <Box>
        <Link href={stats.link} target="_blank">
          <img
            src={stats.thumbnail}
            style={{
              width: mobile ? "100%" : "300px",
              height: "auto",
            }}
            alt={stats.title}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Video;
