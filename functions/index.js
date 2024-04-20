const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
require("dotenv").config();
const fetch = require("node-fetch");

exports.playlist = functions.https.onCall(async (data, context) => {
  const id = data.id;
  const token = data.token || ""; // make sure token is not undefined
  return await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet&maxResults=50&playlistId=${id}&pageToken=${token}&key=${process.env.YOUTUBE_API_KEY}`,
  ).then((res) => {
    return res.json();
  });
});

exports.video = functions.https.onCall(async (data, context) => {
  const id = data.id;
  return await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics%2Csnippet%2CcontentDetails&id=${id}&key=${process.env.YOUTUBE_API_KEY}`,
  ).then((res) => {
    return res.json();
  });
});
