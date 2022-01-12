import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import SEO from "./components/SEO";
import Search from "./components/Search";
import Results from "./components/Results";
import Help from "./components/Help";
import { getPlaylist, sortPlaylist } from "./util/playlistUtil";
import ReactGA from "react-ga4";

ReactGA.initialize("G-LRVNS567ZT");
ReactGA.send(window.location.pathname + window.location.search);

const App = () => {
    const [order, setOrder] = useState("vd");
    const [playlistID, setPlaylistID] = useState("");
    const [loading, setLoading] = useState(false);
    const [playlist, setPlaylist] = useState([]);
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
        setOrder(value); // update global order
        setPlaylist(sortPlaylist(playlist, value)); // resorts the playlist
    };
    const updatePlaylistID = (event) => {
        setPlaylistID(event.target.value);
    };
    const handleSearch = () => {
        // Google Analytics
        ReactGA.event({
            category: "Search",
            action: "Search",
            value: 1,
        });
        setLoading(true);
        getPlaylist(playlistID, order).then((data) => {
            setPlaylist(data);
            setLoading(false);
        });
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
                                    search={() => handleSearch()}
                                    loading={loading}
                                />
                                <Results videos={playlist} />
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
