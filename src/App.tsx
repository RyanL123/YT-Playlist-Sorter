import { Box } from "@mui/material";
import React, { useState } from "react";
import ReactGA from "react-ga4";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Help from "./components/Help";
import Results from "./components/Results";
import Search from "./components/Search";
import { SortOptions, VideoMetadata } from "./types";
import { getPlaylist, sortPlaylist } from "./util/playlistUtil";

ReactGA.initialize("G-LRVNS567ZT");
ReactGA.send(window.location.pathname + window.location.search);

const App = () => {
  const [order, setOrder] = useState<SortOptions>(SortOptions.VIEWS_DESC);
  const [playlistID, setPlaylistID] = useState("");
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState<VideoMetadata[]>([]);

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
    // extracts playlist ID from a complete link
    // if ?list= doesn't exist, assume user pasted in only the ID
    const sanitizedPlaylistID =
      playlistID.indexOf("list=") === -1
        ? playlistID
        : playlistID.slice(playlistID.indexOf("list=") + "list=".length);
    try {
      getPlaylist(sanitizedPlaylistID, "", order, 1).then((data) => {
        setPlaylist(data);
        setLoading(false);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box bgcolor="background.default" minHeight="100vh">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Box>
                <Search
                  sortOptions={Object.values(SortOptions)}
                  order={order}
                  playlistID={playlistID}
                  updatePlaylistID={(event) => updatePlaylistID(event)}
                  updateSortOrder={(event) => updateSortOrder(event)}
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
