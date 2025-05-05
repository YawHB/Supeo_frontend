//i utils
export function calculateWorkHours(startDate, startTime, endDate, endTime) {
    const msTimeStart = getMsTimeFromDate(startDate, startTime);
    const msTimeEnd = getMsTimeFromDate(endDate, endTime);

    //find arbejdstid
    const timeDif = msTimeEnd - msTimeStart;
    if (timeDif <= 0) {
        return 'ugyldigt input. start tid skal være før slut tid';
    }

    hoursToMin(startTime, endTime);

    return (timeDif / 60 / 60 / 1000).toString();
}

function getMsTimeFromDate(date, time) {
    const [year, month, day] = date.split('-').map(Number);
    const [hour, min] = time.split(':').map(Number);

    return Date.UTC(year, month - 1, day, hour, min);
}

function hoursToMin(startTime, endTime) {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    console.log(startHour, startMin);

    const startTimeInMinutes = Math.floor(startHour * 60) + startMin;
    const endTimeInMinutes = Math.floor(endHour * 60) + endMin;
    console.log(startTimeInMinutes);
    console.log(endTimeInMinutes);
    const diff = endTimeInMinutes - startTimeInMinutes;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    console.log(`${hours} timer, ${minutes} minutter`);
    // console.log(20 % 5);
    // console.log(20 % 6);

    //const timeInMinutes = Math.floor(hour * 60) + min;
}
