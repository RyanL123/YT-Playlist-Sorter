import React from "react";
import Typography from "@material-ui/core/Typography";
import { Box, Link, useMediaQuery } from "@material-ui/core";
import { convertISOtoString } from "../util/convertDate";

export default function Video(props) {
    const mobile = useMediaQuery("(max-width:1000px)");
    return (
        <Box
            display="flex"
            flexDirection={mobile ? "column" : "row"}
            width="100%"
            justifyContent="space-between"
            my="10px"
        >
            <Box display="flex" flexDirection="column">
                <Typography variant="h5">
                    <Link href={props.stats.link} target="_blank">
                        {props.stats.title}
                    </Link>
                </Typography>
                <Typography variant="h6">{props.stats.channel}</Typography>
                <Typography variant="h6">
                    Views:{" "}
                    {props.stats.views
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Typography>
                <Typography variant="h6">
                    Likes:{" "}
                    {props.stats.likes
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Typography>
                <Typography variant="h6">
                    Upload Date: {convertISOtoString(props.stats.uploadDate)}
                </Typography>
            </Box>
            <Box>
                <img
                    src={props.stats.thumbnail}
                    style={{ width: mobile ? "100%" : "300px", height: "auto" }}
                />
            </Box>
        </Box>
    );
}
