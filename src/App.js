import React from "react";
import Search from "./components/Search";
import Results from "./components/Results";
import generatePlaylist from "./util/playlist";
import sortPlaylist from "./util/sortPlaylist";

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
        this.setState({
            [name]: [value],
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
        this.setState(
            {
                loading: true,
            },
            () => {
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
            <div>
                <Search
                    sortOptions={this.state.sortOptions}
                    order={this.state.order}
                    playlistID={this.state.playlistID}
                    handleChange={(event) => this.handleChange(event)}
                    search={() => this.getPlaylist()}
                />
                <Results
                    loading={this.state.loading}
                    videos={this.state.playlistItems}
                />
            </div>
        );
    }
}

export default App;
