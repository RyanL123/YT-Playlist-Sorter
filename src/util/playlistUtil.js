import { convertISOtoInt } from "./dateUtil";
import { parse, toSeconds } from "iso8601-duration";
import { initializeApp } from "firebase/app";
import {
    getFunctions,
    httpsCallable,
    connectFunctionsEmulator,
} from "firebase/functions";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
// connectFunctionsEmulator(functions, "localhost", 5001);

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
        case "da":
            ret.sort(function comp(a, b) {
                return a.stats.duration - b.stats.duration;
            });
            break;
        case "dd":
            ret.sort(function comp(a, b) {
                return b.stats.duration - a.stats.duration;
            });
            break;
        default:
            break;
    }
    return ret;
}

function getVideo(videoID) {
    const videoFunction = httpsCallable(functions, "video");
    return videoFunction({ id: videoID }).then((res) => {
        const video = res.data.items[0];
        // make sure video isn't private or removed
        if (res.data.items.length !== 0) {
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
                    duration: toSeconds(parse(video.contentDetails.duration)),
                },
            };
        }
    });
}

export async function getPlaylist(playlistID, pageToken, order, count) {
    // 4 pages * 50 videos/page = 200 videos max
    if (count > 4) {
        return [];
    }
    const playlistFunction = httpsCallable(functions, "playlist");
    return playlistFunction({ id: playlistID, token: pageToken }).then(
        async (res) => {
            const playlist = res.data;
            let results = [];
            if (!playlist.items) return results; // playlist is empty
            for (var i = 0; i < playlist.items.length; i++) {
                const videoID = playlist.items[i].snippet.resourceId.videoId;
                // ensure all videos are processed before returning
                // eslint-disable-next-line
                await getVideo(videoID).then((data) => {
                    if (data) {
                        results.push(data);
                    }
                });
            }
            // recursively get next page of data
            if (res.data.nextPageToken) {
                await getPlaylist(
                    playlistID,
                    res.data.nextPageToken,
                    order,
                    count + 1
                ).then((data) => {
                    // append data to current results
                    results = results.concat(data);
                });
            }
            results = sortPlaylist(results, order);
            return results;
        }
    );
}
