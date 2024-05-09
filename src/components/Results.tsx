import { Box } from "@mui/material";
import * as React from "react";
import { IVideoMetadata } from "../types";
import Video from "./Video";

const Results = ({ videos }: { videos: { stats: IVideoMetadata }[] }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    px="10vw"
    pb="5vh"
  >
    {videos.map((video, index) => {
      return <Video metadata={video.stats} key={index}></Video>;
    })}
  </Box>
);

export default Results;
