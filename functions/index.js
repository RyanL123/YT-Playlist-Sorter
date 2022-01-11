const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")({ origin: true });
require("dotenv").config();
const fetch = require("node-fetch");
const app = express();

app.use(cors);

app.get("/api/playlist", async (req, res) => {
    const id = req.query.id;
    const data = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet&maxResults=50&playlistId=${id}&key=${process.env.YOUTUBE_API_KEY}`
    ).then((res) => {
        return res.json();
    });
    return res.json(data);
});

app.get("/api/video", async (req, res) => {
    const id = req.query.id;
    const data = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics%2Csnippet&id=${id}&key=${process.env.YOUTUBE_API_KEY}`
    ).then((res) => {
        return res.json();
    });
    return res.json(data);
});

exports.app = functions.https.onRequest(app);
