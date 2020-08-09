import React from "react";
import { Box, TextField, MenuItem, Button, Link } from "@material-ui/core";

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
                            >
                                Search
                            </Button>
                        </Box>
                        <Box mx="5px">
                            <Button
                                variant="outlined"
                                color="default"
                                href="https://github.com/RyanL123/YT-Playlist-Sorter/blob/master/README.md"
                                target="_blank"
                            >
                                Tutorial
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default Search;
