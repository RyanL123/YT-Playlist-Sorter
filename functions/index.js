const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
require("dotenv").config();
const fetch = require("node-fetch");

exports.playlist = functions.https.onCall(async (req, res) => {
    return cors(req, res, async () => {
        const id = req.query.id;
        const data = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet&maxResults=50&playlistId=${id}&key=${process.env.YOUTUBE_API_KEY}`
        ).then((res) => {
            return res.json();
        });
        return res.json(data);
    });
});

exports.video = functions.https.onCall(async (req, res) => {
    return cors(req, res, async () => {
        const id = req.query.id;
        const data = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics%2Csnippet&id=${id}&key=${process.env.YOUTUBE_API_KEY}`
        ).then((res) => {
            return res.json();
        });
        return res.json(data);
    });
});
