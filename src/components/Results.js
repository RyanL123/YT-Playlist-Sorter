import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import Video from "./Video";

class Results extends React.Component {
    render() {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                px="10vw"
                pb="5vh"
            >
                {this.props.loading ? (
                    <CircularProgress />
                ) : (
                    this.props.videos.map((video) => {
                        return <Video stats={video.stats}></Video>;
                    })
                )}
            </Box>
        );
    }
}

export default Results;
