import { convertISOtoInt } from "../util/convertDate";

function sortPlaylist(videos, order) {
    var ret = videos;
    if (order == "va") {
        ret.sort(function comp(a, b) {
            return a.stats.views - b.stats.views;
        });
    } else if (order == "vd") {
        ret.sort(function comp(a, b) {
            return b.stats.views - a.stats.views;
        });
    } else if (order == "la") {
        ret.sort(function comp(a, b) {
            return a.stats.likes - b.stats.likes;
        });
    } else if (order == "ld") {
        ret.sort(function comp(a, b) {
            return b.stats.likes - a.stats.likes;
        });
    } else if (order == "da") {
        ret.sort(function comp(a, b) {
            return a.stats.dislikes - b.stats.dislikes;
        });
    } else if (order == "dd") {
        ret.sort(function comp(a, b) {
            return b.stats.dislikes - a.stats.dislikes;
        });
    } else if (order == "ua") {
        ret.sort(function comp(a, b) {
            return (
                convertISOtoInt(a.stats.uploadDate) -
                convertISOtoInt(b.stats.uploadDate)
            );
        });
    } else if (order == "ud") {
        ret.sort(function comp(a, b) {
            return (
                convertISOtoInt(b.stats.uploadDate) -
                convertISOtoInt(a.stats.uploadDate)
            );
        });
    }
    return ret;
}

export default sortPlaylist;
