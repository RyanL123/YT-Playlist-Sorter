import { InfoOutlined, Search as SearchIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const Search = (props) => (
  <Box display="flex" justifyContent="center" py="5vh" px="10vw">
    <Box display="flex" width="100%" alignItems="center" flexDirection="column">
      <form style={{ width: "100%" }}>
        <Box width="100%">
          <TextField
            fullWidth
            variant="outlined"
            label="Playlist ID or Link"
            name="playlistID"
            value={props.playlistID}
            onChange={props.updatePlaylistID}
          />
        </Box>
        <Box width="100%" mt="20px">
          <TextField
            select
            value={props.order}
            name="order"
            label="Order"
            fullWidth
            onChange={props.updateSortOrder}
          >
            {props.sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box
          mt="20px"
          display="flex"
          flexDirection="row"
          justifyContent="center"
        >
          <Box mx="5px">
            <LoadingButton
              variant="outlined"
              color="primary"
              onClick={props.search}
              loading={props.loading}
              loadingPosition="end"
              endIcon={<SearchIcon />}
              type="submit"
            >
              Search
            </LoadingButton>
          </Box>
          <Box mx="5px">
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
  </Box>
);

Search.propTypes = {
  playlistID: PropTypes.string,
  order: PropTypes.string,
  loading: PropTypes.bool,
  updatePlaylistID: PropTypes.func,
  updateSortOrder: PropTypes.func,
  search: PropTypes.func,
  sortOptions: PropTypes.array,
};

export default Search;
