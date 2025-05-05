//i utils
export function calculateWorkHours(startDate, startTime, endDate, endTime) {
    const dayInMs = 86400000;
    const [yearA, monthA, dayA] = splitDateToNumbers(startDate);
    const [hourA, minutesA] = splitTimeToNumbers(startTime);
    const msTimeA = getMsTimeFromDateTime(yearA, monthA, dayA, hourA, minutesA);
    const A = new Date(yearA, monthA, dayA);
    const minutes1 = hourA * 60 + minutesA;
    // -********************************************
    const [yearB, monthB, dayB] = splitDateToNumbers(endDate);
    const [hourB, minutesB] = splitTimeToNumbers(endTime);
    const msTimeB = getMsTimeFromDateTime(yearB, monthB, dayB, hourB, minutesB);
    const B = new Date(yearB, monthB, dayB);
    const minutes2 = hourB * 60 + minutesB;
    const dayDiffInMs =
        (calculateDaysWorked(yearB, monthB, dayB) -
            calculateDaysWorked(yearA, monthA, dayA)) /
        dayInMs;
    console.log('dayDiffInMs: ', dayDiffInMs);

    //find arbejdstid
    const timeDif = msTimeB - msTimeA;
    if (timeDif <= 0) {
        return 'ugyldigt input. start tid skal være før slut tid';
    } else if (B > A && minutes2 < minutes1) {
        console.log('NatteArbejde');
        const [hours, minutes] = hoursToMin(startTime, endTime);
        return `${hours + 24} timer, ${
            minutes === 0 ? minutes : minutes + 60
        } minutter`;

        // return `${hours + 24} timer, ${
        //         minutes === 0 ? minutes : minutes + 60
        //     } minutter`;

        //console.log(`${hours + 24} timer, ${minutes + 60} minutter`);
    } else if (timeDif > 0 && dayDiffInMs > 0) {
        console.log('Flere dages arbejde');
        const [hours, minutes] = hoursToMin(startTime, endTime);
        return `${dayDiffInMs} dage, ${hours} timer, ${
            minutes === 0 ? minutes : minutes + 60
        } minutter`;
    }

    const result = hoursToMin(startTime, endTime);

    return result;
    // return timeDif / 1000 / 60 / (60).toString();
}

function calculateDaysWorked(year, month, day) {
    return Date.UTC(year, month - 1, day);
}
function splitDateToNumbers(date) {
    return date.split('-').map(Number);
}

function splitTimeToNumbers(time) {
    return time.split(':').map(Number);
}

function getMsTimeFromDateTime(year, month, day, hour, minutes) {
    return Date.UTC(year, month - 1, day, hour, minutes);
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

    // if (endtime  større end starttime ) {
    //     return (`${hours + 24} timer, ${minutes + 60} minutter`);
    // }

    // return `${hours} timer, ${minutes} minutter`;
    return [hours, minutes];
    //return `${hours + 24} timer, ${  minutes === 0 ? minutes  : minutes + 60 } minutter`;
    // console.log(20 % 5);
    // console.log(20 % 6);

    //const timeInMinutes = Math.floor(hour * 60) + min;
}
