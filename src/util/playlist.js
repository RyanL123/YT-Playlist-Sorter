import api_key from "./api";
import sortPlaylist from "./sortPlaylist";

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

function generatePlaylist(ID, order) {
    const playlist = JSON.parse(getPlaylist(ID));
    var videos = [];
    if (!playlist.items) return videos;
    for (var i = 0; i < playlist.items.length; i++) {
        const vid = playlist.items[i];
        var videoID = vid.snippet.resourceId.videoId;
        var video = JSON.parse(getVideoStats(videoID)).items[0];
        videos.push({
            stats: {
                views: parseInt(video.statistics.viewCount),
                likes: video.statistics.likeCount,
                dislikes: video.statistics.dislikeCount,
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
    videos = sortPlaylist(videos, order);
    return videos;
}

export default generatePlaylist;
