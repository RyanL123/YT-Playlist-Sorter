import { InfoOutlined, Search as SearchIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { parse, toSeconds } from "iso8601-duration";
import React, { useState } from "react";
import ReactGA from "react-ga4";
import { Link } from "react-router-dom";
import Video from "../components/Video";
import { IdType, SortOptions, VideoMetadata } from "../types";
import {
  findVideosByChannelId,
  findVideosByPlaylistId,
} from "../util/playlistUtil";

ReactGA.initialize("G-LRVNS567ZT");
ReactGA.send(window.location.pathname + window.location.search);

function sortPlaylist(videos: VideoMetadata[], order: SortOptions) {
  var ret = [...videos]; // make a copy to operate on
  let compFunction = (a: VideoMetadata, b: VideoMetadata) => {
    switch (order) {
      case SortOptions.VIEWS_ASC:
        return (
          parseInt(a.statistics.viewCount) - parseInt(b.statistics.viewCount)
        );
      case SortOptions.VIEWS_DESC:
        return (
          parseInt(b.statistics.viewCount) - parseInt(a.statistics.viewCount)
        );
      case SortOptions.LIKES_ASC:
        return (
          parseInt(a.statistics.likeCount) - parseInt(b.statistics.likeCount)
        );
      case SortOptions.LIKES_DESC:
        return (
          parseInt(b.statistics.likeCount) - parseInt(a.statistics.likeCount)
        );
      case SortOptions.LEAST_RECENT:
        return (
          new Date(a.snippet.publishedAt).getTime() -
          new Date(b.snippet.publishedAt).getTime()
        );
      case SortOptions.MOST_RECENT:
        return (
          new Date(b.snippet.publishedAt).getTime() -
          new Date(a.snippet.publishedAt).getTime()
        );
      case SortOptions.SHORTEST:
        return (
          toSeconds(parse(a.contentDetails.duration)) -
          toSeconds(parse(b.contentDetails.duration))
        );

      case SortOptions.LONGEST:
        return (
          toSeconds(parse(b.contentDetails.duration)) -
          toSeconds(parse(a.contentDetails.duration))
        );
      default:
        return 0;
    }
  };
  return ret.sort(compFunction);
}

const placeholderTextByIdType = {
  [IdType.PLAYLIST]: "Playlist ID or Link",
  [IdType.CHANNEL]: "Channel Handle (e.g. @Apple)",
};

const SearchPanel = ({
  setPlaylist,
  playlist,
}: {
  setPlaylist: React.Dispatch<React.SetStateAction<VideoMetadata[]>>;
  playlist: VideoMetadata[];
}) => {
  const [playlistID, setPlaylistID] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(SortOptions.VIEWS_DESC);
  const [idType, setIdType] = useState(IdType.PLAYLIST);

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
    setPlaylist(sortPlaylist(playlist, value));
  };

  const handleSearch = async () => {
    // Google Analytics
    ReactGA.event({
      category: "Search",
      action: "Search",
      value: 1,
    });

    setLoading(true);

    let videoData;

    switch (idType) {
      case IdType.CHANNEL:
        const sanitizedChannelName = playlistID.replace(
          new RegExp("@", "g"), // remove all instances of "@"
          "",
        );
        videoData = findVideosByChannelId(sanitizedChannelName);
        break;
      case IdType.PLAYLIST:
        // extracts playlist ID from a complete link
        // if ?list= doesn't exist, assume user pasted in only the ID
        const sanitizedPlaylistID =
          playlistID.indexOf("list=") === -1
            ? playlistID
            : playlistID.slice(playlistID.indexOf("list=") + "list=".length);
        videoData = findVideosByPlaylistId(sanitizedPlaylistID);
        break;
    }

    videoData
      .then((data) => {
        setPlaylist(sortPlaylist(data, order));
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box display="flex" justifyContent="center" py="5vh" px="10vw">
      <form
        style={{ width: "100%" }}
        onSubmit={handleSearch}
        data-testid="searchPanelForm"
      >
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
            label={placeholderTextByIdType[idType]}
            name="playlistID"
            value={playlistID}
            onChange={(event) => setPlaylistID(event.target.value)}
            inputProps={{ "data-testid": "playlistIdInput" }}
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
          <Box width="100%">
            <FormControl>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                value={idType}
                onChange={(e) => setIdType(e.target.value as IdType)}
              >
                <FormControlLabel
                  value={IdType.PLAYLIST}
                  control={<Radio />}
                  label={IdType.PLAYLIST.toString()}
                />
                <FormControlLabel
                  value={IdType.CHANNEL}
                  control={<Radio />}
                  label={IdType.CHANNEL.toString()}
                />
              </RadioGroup>
            </FormControl>
          </Box>
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

const Results = ({ playist }: { playist: VideoMetadata[] }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    px="10vw"
    pb="5vh"
  >
    {playist.map((video, index) => {
      return <Video metadata={video} key={index}></Video>;
    })}
  </Box>
);

const Index = () => {
  const [playlist, setPlaylist] = useState<VideoMetadata[]>([]);
  return (
    <>
      <SearchPanel setPlaylist={setPlaylist} playlist={playlist} />
      <Results playist={playlist} />
    </>
  );
};

export default Index;
