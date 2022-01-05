import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import SEO from "./components/SEO";
import Search from "./components/Search";
import Results from "./components/Results";
import Help from "./components/Help";
import { generatePlaylist, sortPlaylist } from "./util/playlistUtil";
import ReactGA from "react-ga4";

ReactGA.initialize("G-LRVNS567ZT");
ReactGA.send(window.location.pathname + window.location.search);

const App = () => {
    const [order, setOrder] = useState("vd");
    const [playlistID, setPlaylistID] = useState("");
    const [loading, setLoading] = useState(false);
    const [playlistItems, setPlaylistItems] = useState([]);
    const sortOptions = [
        {
            value: "vd",
            label: "Views Descending",
        },
        {
            value: "va",
            label: "Views Ascending",
        },
        {
            value: "ld",
            label: "Likes Descending",
        },
        {
            value: "la",
            label: "Likes Ascending",
        },
        {
            value: "ud",
            label: "Most Recent",
        },
        {
            value: "ua",
            label: "Earliest",
        },
    ];
    const updateSortOrder = (event) => {
        const value = event.target.value;
        // Google Analytics
        ReactGA.event({
            category: "Search",
            action: "Sort",
            label: value,
            value: 1,
        });
        setOrder(value);
        setPlaylistItems(sortPlaylist(playlistItems, value));
    };
    const updatePlaylistID = (event) => {
        setPlaylistID(event.target.value);
    };
    const getPlaylist = () => {
        // Google Analytics
        ReactGA.event({
            category: "Search",
            action: "Search",
            value: 1,
        });
        setLoading(true);
        setPlaylistItems(generatePlaylist(playlistID, order));
        setLoading(false);
    };
    return (
        <Box backgroundColor="background.default" minHeight="100vh">
            <SEO />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Box>
                                <Search
                                    sortOptions={sortOptions}
                                    order={order}
                                    playlistID={playlistID}
                                    updatePlaylistID={(event) =>
                                        updatePlaylistID(event)
                                    }
                                    updateSortOrder={(event) =>
                                        updateSortOrder(event)
                                    }
                                    search={() => getPlaylist()}
                                    loading={loading}
                                />
                                <Results
                                    loading={loading}
                                    videos={playlistItems}
                                />
                            </Box>
                        }
                    />
                    <Route path="/help" element={<Help />} />
                </Routes>
            </BrowserRouter>
        </Box>
    );
};

export default App;
