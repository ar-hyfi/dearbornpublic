export function convertUTCToHoursMinutesFromNow(utcString) {
    const utcDate = new Date(utcString);
    const now = new Date();
    const timeDifferenceInMilliseconds = now - utcDate;

    // Convert milliseconds to hours and minutes
    const hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

    // Create a reader-friendly string
    let resultString = "As of ";

    if (hours > 0) {
        resultString += `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }

    if (minutes > 0) {
        if (hours > 0) {
        resultString += " and ";
        }
        resultString += `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    }

    if (hours === 0 && minutes === 0) {
        resultString += "less than a minute";
    }

    resultString += " ago";

    return resultString;
}