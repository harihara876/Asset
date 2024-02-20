export const epochToDate = (epoch) => {
    const dateObject = new Date(+epoch)
    const humanDateFormat = dateObject.toISOString()
    return humanDateFormat;
}

export const epochToDayName = (epochTime) => {
    const date = new Date(epochTime * 1000);
    const formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    });
    const formattedDate = formatter.format(date);
    return formattedDate;
}

export const epochToHumanReadable = (epochTime) => {
    const date = new Date(parseInt(epochTime) * 1000);

    const options: any = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Kolkata',
        timeZoneName: 'short'
    };

    return date.toLocaleString('en-US', options);
}
