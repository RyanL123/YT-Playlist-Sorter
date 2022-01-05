import api_key from "./api";
import { convertISOtoInt } from "./dateUtil";

function getJSON(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function getPlaylist(ID) {
    var playlist = getJSON(
        "https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet&maxResults=50&playlistId=" +
            ID +
            "&key=" +
            api_key
    );
    return playlist;
}

function getVideoStats(videoID) {
    var stats = getJSON(
        "https://www.googleapis.com/youtube/v3/videos?part=statistics%2Csnippet&id=" +
            videoID +
            "&key=" +
            api_key
    );
    return stats;
}

export function sortPlaylist(videos, order) {
    var ret = videos;
    switch (order) {
        case "va": // views ascending
            ret.sort(function comp(a, b) {
                return a.stats.views - b.stats.views;
            });
            break;
        case "vd": // views descending
            ret.sort(function comp(a, b) {
                return b.stats.views - a.stats.views;
            });
            break;
        case "la": // likes ascending
            ret.sort(function comp(a, b) {
                return a.stats.likes - b.stats.likes;
            });
            break;
        case "ld": // likes descending
            ret.sort(function comp(a, b) {
                return b.stats.likes - a.stats.likes;
            });
            break;
        case "ua": // upload date ascending
            ret.sort(function comp(a, b) {
                return (
                    convertISOtoInt(a.stats.uploadDate) -
                    convertISOtoInt(b.stats.uploadDate)
                );
            });
            break;
        case "ud": // upload date descending
            ret.sort(function comp(a, b) {
                return (
                    convertISOtoInt(b.stats.uploadDate) -
                    convertISOtoInt(a.stats.uploadDate)
                );
            });
            break;
        default:
            break;
    }
    return ret;
}

export function generatePlaylist(ID, order) {
    const playlist = JSON.parse(getPlaylist(ID));
    var videos = [];
    if (!playlist.items) return videos;
    for (var i = 0; i < playlist.items.length; i++) {
        const vid = playlist.items[i];
        var videoID = vid.snippet.resourceId.videoId;
        var video = JSON.parse(getVideoStats(videoID)).items[0];
        // make sure video isnt private or removed
        if (video) {
            videos.push({
                stats: {
                    views: parseInt(video.statistics.viewCount),
                    likes: video.statistics.likeCount
                        ? video.statistics.likeCount
                        : "Hidden",
                    uploadDate: video.snippet.publishedAt,
                    channel: video.snippet.channelTitle,
                    title: playlist.items[i].snippet.title,
                    thumbnail: playlist.items[i].snippet.thumbnails.medium.url,
                    link:
                        "https://www.youtube.com/watch?v=" +
                        playlist.items[i].snippet.resourceId.videoId,
                },
            });
        }
    }
    videos = sortPlaylist(videos, order);
    return videos;
}
