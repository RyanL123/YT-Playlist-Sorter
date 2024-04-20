import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import ReactGA from "react-ga4";
import Search from "./components/Search";
import Results from "./components/Results";
import Help from "./components/Help";
import { getPlaylist, sortPlaylist } from "./util/playlistUtil";

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
    {
      value: "dd",
      label: "Longest",
    },
    {
      value: "da",
      label: "Shortest",
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
    <Box backgroundColor="background.default" minHeight="100vh">
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
