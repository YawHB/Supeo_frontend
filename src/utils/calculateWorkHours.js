//i utils
export function calculateWorkHours(startDate, startTime, endDate, endTime) {
    const msTimeStart = getMsTimeFromDate(startDate, startTime);
    const msTimeEnd = getMsTimeFromDate(endDate, endTime);

    //find arbejdstid
    const timeDif = msTimeEnd - msTimeStart;
    if (timeDif <= 0) {
        return 'ugyldigt indput. start tid skal være før slut tid';
    }
    return (timeDif / 60 / 60 / 1000).toString();
}

function getMsTimeFromDate(date, time) {
    const [year, month, day] = date.split('-').map(Number);
    const [hour, min] = time.split(':').map(Number);
    return Date.UTC(year, month - 1, day, hour, min);
}
