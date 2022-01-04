import React from "react";
import { Link } from "react-router-dom";
import { Box, TextField, MenuItem, Button } from "@mui/material";
import { Search as SearchIcon, InfoOutlined } from "@mui/icons-material";

class Search extends React.Component {
    render() {
        return (
            <Box display="flex" justifyContent="center" py="5vh" px="10vw">
                <Box
                    display="flex"
                    width="100%"
                    alignItems="center"
                    flexDirection="column"
                >
                    <Box width="100%">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Playlist ID"
                            name="playlistID"
                            value={this.props.playlistID}
                            onChange={this.props.handleChange}
                        />
                    </Box>
                    <Box width="100%" mt="20px">
                        <TextField
                            select
                            value={this.props.order}
                            name="order"
                            label="Order"
                            fullWidth
                            onChange={this.props.handleChange}
                        >
                            {this.props.sortOptions.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box mt="20px" display="flex" flexDirection="row">
                        <Box mx="5px">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={this.props.search}
                                startIcon={<SearchIcon />}
                            >
                                Search
                            </Button>
                        </Box>
                        <Box mx="5px">
                            <Button
                                variant="outlined"
                                component={Link}
                                to="/help"
                                startIcon={<InfoOutlined />}
                            >
                                Help
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default Search;
