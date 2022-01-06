import { convertISOtoInt } from "./dateUtil";

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

function getVideo(videoID) {
    return fetch(`/api/video/?id=${videoID}`).then((res) => {
        return res.json().then((data) => {
            const video = data.items[0];
            // make sure video isn't private or removed
            if (video) {
                return {
                    stats: {
                        views: parseInt(video.statistics.viewCount),
                        likes: video.statistics.likeCount
                            ? video.statistics.likeCount
                            : "Hidden",
                        uploadDate: video.snippet.publishedAt,
                        channel: video.snippet.channelTitle,
                        title: video.snippet.title,
                        thumbnail: video.snippet.thumbnails.medium.url,
                        link: `https://www.youtube.com/watch?v=${video.id}`,
                    },
                };
            }
        });
    });
}

export function getPlaylist(playlistID, order) {
    return fetch(`/api/playlist/?id=${playlistID}`).then((res) => {
        return res.json().then(async (playlist) => {
            let results = [];
            if (!playlist.items) return results; // playlist is empty
            for (var i = 0; i < playlist.items.length; i++) {
                const videoID = playlist.items[i].snippet.resourceId.videoId;
                // ensure all videos are processed before returning
                // eslint-disable-next-line
                await getVideo(videoID).then((data) => {
                    results.push(data);
                });
            }
            results = sortPlaylist(results, order);
            return results;
        });
    });
}
