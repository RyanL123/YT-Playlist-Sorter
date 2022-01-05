import React from "react";
import { Box } from "@mui/material";
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
        {props.videos.map((video) => {
            return <Video stats={video.stats}></Video>;
        })}
    </Box>
);

export default Results;
