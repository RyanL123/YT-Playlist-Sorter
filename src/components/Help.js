import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default () => (
    <Box display="flex" justifyContent="center" py="5vh" px="10vw">
        <Box display="flex">
            <Button
                variant="text"
                component={Link}
                to="/"
                startIcon={<ArrowBack />}
            >
                Back
            </Button>
            <Typography variant="h3" component="h1">
                Tutorial
            </Typography>
        </Box>
    </Box>
);
