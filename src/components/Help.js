import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default () => (
    <Box py="5vh" px="10vw">
        <Button
            variant="text"
            component={Link}
            to="/"
            startIcon={<ArrowBack />}
        >
            Back
        </Button>
        <Typography variant="h3" component="h4" textAlign="center">
            Tutorial
        </Typography>
        <Typography variant="h6" component="h6">
            1. Find the ID of the playlist you wish to sort on YouTube
        </Typography>
        <Typography variant="h6" component="h6">
            2. Click search
        </Typography>
        <Typography variant="h6" component="h6">
            3. Select a sorting option (Default sorted by most views)
        </Typography>
    </Box>
);
