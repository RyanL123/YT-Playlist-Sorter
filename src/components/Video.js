import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Link, useMediaQuery } from "@mui/material";
import { convertISOtoString } from "../util/dateUtil";

const Video = (props) => {
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
                    <Link href={props.stats.link} target="_blank">
                        {props.stats.title}
                    </Link>
                </Typography>
                <Typography variant="h6" color="text.primary">
                    {props.stats.channel}
                </Typography>
                <Typography variant="h6" color="text.primary">
                    Views:{" "}
                    {props.stats.views
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Typography>
                <Typography variant="h6" color="text.primary">
                    Likes:{" "}
                    {props.stats.likes
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Typography>
                <Typography variant="h6" color="text.primary">
                    Upload Date: {convertISOtoString(props.stats.uploadDate)}
                </Typography>
                <Typography variant="h6" color="text.primary">
                    Duration:{" "}
                    {new Date(props.stats.duration * 1000)
                        .toISOString()
                        .substr(11, 8)}
                </Typography>
            </Box>
            <Box>
                <Link href={props.stats.link} target="_blank">
                    <img
                        src={props.stats.thumbnail}
                        style={{
                            width: mobile ? "100%" : "300px",
                            height: "auto",
                        }}
                        alt={props.stats.title}
                    />
                </Link>
            </Box>
        </Box>
    );
};

export default Video;
