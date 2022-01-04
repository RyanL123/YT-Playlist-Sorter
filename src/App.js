import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import SEO from "./components/SEO";
import Search from "./components/Search";
import Results from "./components/Results";
import Help from "./components/Help";
import generatePlaylist from "./util/playlist";
import sortPlaylist from "./util/sortPlaylist";
import ReactGA from "react-ga4";

ReactGA.initialize("G-LRVNS567ZT");
ReactGA.send(window.location.pathname + window.location.search);

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            order: "vd",
            playlistID: "",
            loading: false,
            playlistItems: [],
            sortOptions: [
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
            ],
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const { value, name } = event.target;
        // Google Analytics
        ReactGA.event({
            category: "Search",
            action: "Sort",
            label: value,
            value: 1,
        });
        this.setState({
            [name]: value,
        });
        this.setState((prevState) => {
            return {
                playlistItems: sortPlaylist(
                    prevState.playlistItems,
                    prevState.order
                ),
            };
        });
    }
    getPlaylist() {
        // Google Analytics
        ReactGA.event({
            category: "Search",
            action: "Search",
            value: 1,
        });
        this.setState(
            {
                loading: true,
            },
            () => {
                // setTimeout shows the progress bar
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        playlistItems: generatePlaylist(
                            this.state.playlistID,
                            this.state.order
                        ),
                    });
                }, 500);
            }
        );
    }
    render() {
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
                                        sortOptions={this.state.sortOptions}
                                        order={this.state.order}
                                        playlistID={this.state.playlistID}
                                        handleChange={(event) =>
                                            this.handleChange(event)
                                        }
                                        search={() => this.getPlaylist()}
                                    />
                                    <Results
                                        loading={this.state.loading}
                                        videos={this.state.playlistItems}
                                    />
                                </Box>
                            }
                        />
                        <Route path="/help" element={<Help />} />
                    </Routes>
                </BrowserRouter>
            </Box>
        );
    }
}

export default App;
