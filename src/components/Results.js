import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import Video from "./Video";

const Results = (props) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    px="10vw"
    pb="5vh"
  >
    {props.videos.map((video, index) => {
      return <Video stats={video.stats} key={index}></Video>;
    })}
  </Box>
);

Results.propTypes = {
  videos: PropTypes.array,
};

export default Results;
