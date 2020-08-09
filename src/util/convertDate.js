export const convertISOtoString = (ISODate) => {
    var date = new Date(ISODate);
    var year = parseInt(date.getFullYear());
    var month = parseInt(date.getMonth());
    var day = parseInt(date.getDate());
    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    return months[month] + " " + day + ", " + year;
};

export const convertISOtoInt = (ISODate) => {
    var date = new Date(ISODate);
    return (
        parseInt(date.getFullYear()) * 10000 +
        (parseInt(date.getMonth()) + 1) * 100 +
        parseInt(date.getDate())
    );
};
