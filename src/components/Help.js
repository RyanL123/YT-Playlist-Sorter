import React from "react";
import { Box, Typography, Button, Link as MuiLink } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Help = () => (
    <Box py="5vh" px="10vw">
        <Button
            variant="text"
            component={Link}
            to="/"
            startIcon={<ArrowBack />}
        >
            Back
        </Button>
        <Typography
            variant="h4"
            component="h4"
            textAlign="center"
            color="text.primary"
            mb="50px"
            fontWeight="bold"
        >
            FAQ
        </Typography>
        <Typography
            variant="h5"
            component="h5"
            color="text.primary"
            fontWeight="bold"
            my={1}
        >
            What is the Playlist ID?
        </Typography>
        <Typography variant="p" component="p" color="text.secondary" mb={5}>
            The playlist ID is found at the end of a YouTube playlist link, the
            letters immediately following &list=. Take
            <MuiLink
                href="https://www.youtube.com/playlist?list=PLFs4vir_WsTwEd-nJgVJCZPNL3HALHHpF"
                target="_blank"
                aria-label="Link to Kurzgesagt YouTube playlist"
                rel="noopener noreferrer"
            >
                {" "}
                this playlist{" "}
            </MuiLink>
            by Kurzgesagt for example: The link is
            https://www.youtube.com/playlist?list=
            <b>PLFs4vir_WsTwEd-nJgVJCZPNL3HALHHpF</b>, and the playlist ID would
            be the bolded part, <b>PLFs4vir_WsTwEd-nJgVJCZPNL3HALHHpF</b>. You
            can also paste in the entire link. In fact, try sorting it using the
            sorter!
        </Typography>
        <Typography
            variant="h5"
            component="h5"
            color="text.primary"
            fontWeight="bold"
            my={1}
        >
            How do I sort?
        </Typography>
        <Typography variant="p" component="p" color="text.secondary" mb={5}>
            After typing in the playlist ID into the search bar, simply click
            search and wait until the playlist loads. The videos are default
            sorted by most views which can be changed using the dropdown sort
            options menu. Only a maximum of 200 videos will be sorted due to API
            limits.
        </Typography>
        <Typography
            variant="h5"
            component="h5"
            color="text.primary"
            fontWeight="bold"
            my={1}
        >
            Feature Requests?
        </Typography>
        <Typography variant="p" component="p" color="text.secondary" mb={5}>
            For now, please submit a issue to{" "}
            <MuiLink
                href="https://github.com/RyanL123/YT-Playlist-Sorter/issues"
                target="_blank"
                aria-label="Link to GitHub repository"
                rel="noopener noreferrer"
            >
                this repository
            </MuiLink>
            .
        </Typography>
    </Box>
);

export default Help;
