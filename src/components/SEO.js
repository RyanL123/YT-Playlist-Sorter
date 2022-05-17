import React from "react";
import { Helmet } from "react-helmet";

export default () => (
    <Helmet>
        <title>YouTube Playlist Sorter</title>
        <meta name="title" content="Playlist Sorter" />
        <meta
            name="description"
            content="Sort any YouTube playlist based on selected attributes"
        />
        {/* <!-- Open Graph Protocol --> */}
        <meta
            property="og:url"
            content="https://playlist-view-sorter.firebaseapp.com/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="YouTube Playlist Sorter" />
        <meta
            property="og:description"
            content="Sort any YouTube playlist based on selected attributes"
        />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta
            property="og:image"
            content="https://firebasestorage.googleapis.com/v0/b/playlist-view-sorter.appspot.com/o/banner.png?alt=media&token=92a77b57-0e59-4d58-8689-f1f9f97f7557"
        />
        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
            property="twitter:image"
            content="https://firebasestorage.googleapis.com/v0/b/playlist-view-sorter.appspot.com/o/banner.png?alt=media&token=92a77b57-0e59-4d58-8689-f1f9f97f7557"
        />
        <meta
            property="twitter:url"
            content="https://playlist-view-sorter.firebaseapp.com/"
        />
        <meta property="twitter:title" content="YouTube Playlist Sorter" />
        <meta
            property="twitter:description"
            content="Sort any YouTube playlist based on selected attributes"
        />
        <meta
            name="google-site-verification"
            content="XMlh0bvuIwk4VLs0UKkRZaosgtFwe2ObsG0ZnXvGgks"
        />
    </Helmet>
);
