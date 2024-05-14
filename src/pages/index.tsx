import { InfoOutlined, Search as SearchIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import ReactGA from "react-ga4";
import { Link } from "react-router-dom";
import Video from "../components/Video";
import { SortOptions, VideoMetadata } from "../types";
import { convertISOtoInt } from "../util/dateUtil";
import { getPlaylist } from "../util/playlistUtil";

ReactGA.initialize("G-LRVNS567ZT");
ReactGA.send(window.location.pathname + window.location.search);

function sortPlaylist(videos: VideoMetadata[], order: SortOptions) {
  var ret = [...videos]; // make a copy to operate on
  let compFunction = (a: VideoMetadata, b: VideoMetadata) => {
    switch (order) {
      case SortOptions.VIEWS_ASC:
        return a.views - b.views;
      case SortOptions.VIEWS_DESC:
        return b.views - a.views;
      case SortOptions.LIKES_ASC:
        return a.likes - b.likes;
      case SortOptions.LIKES_DESC:
        return b.likes - a.likes;
      case SortOptions.LEAST_RECENT:
        return convertISOtoInt(a.uploadDate) - convertISOtoInt(b.uploadDate);
      case SortOptions.MOST_RECENT:
        return convertISOtoInt(b.uploadDate) - convertISOtoInt(a.uploadDate);
      case SortOptions.SHORTEST:
        return a.duration - b.duration;
      case SortOptions.LONGEST:
        return b.duration - a.duration;
      default:
        return 0;
    }
  };
  return ret.sort(compFunction);
}

const SearchPanel = ({
  setPlaylist,
  order,
  setOrder,
}: {
  setPlaylist: React.Dispatch<React.SetStateAction<VideoMetadata[]>>;
  order: SortOptions;
  setOrder: React.Dispatch<React.SetStateAction<SortOptions>>;
}) => {
  const [playlistID, setPlaylistID] = useState("");
  const [loading, setLoading] = useState(false);

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

    getPlaylist(sanitizedPlaylistID, "", 1)
      .then((data) => {
        setPlaylist(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Box display="flex" justifyContent="center" py="5vh" px="10vw">
      <form style={{ width: "100%" }}>
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          flexDirection="column"
          gap={3}
        >
          <TextField
            fullWidth
            variant="outlined"
            label="Playlist ID or Link"
            name="playlistID"
            value={playlistID}
            onChange={(event) => setPlaylistID(event.target.value)}
          />
          <TextField
            select
            value={order}
            name="order"
            label="Order"
            fullWidth
            onChange={updateSortOrder}
          >
            {Object.values(SortOptions).map((option) => (
              <MenuItem key={option} value={option.valueOf()}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Box
            mt="20px"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            gap={5}
          >
            <LoadingButton
              variant="outlined"
              color="primary"
              onClick={handleSearch}
              loading={loading}
              loadingPosition="end"
              endIcon={<SearchIcon />}
              type="submit"
            >
              Search
            </LoadingButton>
            <Button
              variant="outlined"
              component={Link}
              to="/help"
              endIcon={<InfoOutlined />}
            >
              Help
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

const Results = ({
  playist,
  order,
}: {
  playist: VideoMetadata[];
  order: SortOptions;
}) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    px="10vw"
    pb="5vh"
  >
    {sortPlaylist(playist, order).map((video, index) => {
      return <Video metadata={video} key={index}></Video>;
    })}
  </Box>
);

const Index = () => {
  const [playlist, setPlaylist] = useState<VideoMetadata[]>([]);
  const [order, setOrder] = useState(SortOptions.VIEWS_DESC);
  return (
    <>
      <SearchPanel
        setPlaylist={setPlaylist}
        order={order}
        setOrder={setOrder}
      />
      <Results playist={playlist} order={order} />
    </>
  );
};

export default Index;
