// var express = require("express");
// var router = express.Router();
// require("dotenv").config();
// const fetch = require("node-fetch");

// router.get("/playlist", async (req, res) => {
//     const id = req.query.id;
//     const data = await fetch(
//         `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet&maxResults=50&playlistId=${id}&key=${process.env.YOUTUBE_API_KEY}`
//     ).then((res) => {
//         return res.json();
//     });
//     return res.json(data);
// });

// router.get("/video", async (req, res) => {
//     const id = req.query.id;
//     const data = await fetch(
//         `https://www.googleapis.com/youtube/v3/videos?part=statistics%2Csnippet&id=${id}&key=${process.env.YOUTUBE_API_KEY}`
//     ).then((res) => {
//         return res.json();
//     });
//     return res.json(data);
// });

// module.exports = router;
