
export function calculateWorkHours(startDate, startTime, endDate, endTime) {
    
    console.log("startDate: ", startDate)

const [yearStart, monthStart, dayStart ] = startDate.split("-")
const [hourStart, minStart] = startTime.split(":")
const msTimeStart = Date.UTC(yearStart, monthStart-1, dayStart, hourStart, minStart)
console.log(msTimeStart)

const [yearEnd, monthEnd, dayEnd ] = endDate.split("-")
const [hourEnd, minEnd] = endTime.split(":")
const msTimeEnd = Date.UTC(yearEnd, monthEnd-1, dayEnd, hourEnd, minEnd)
console.log(msTimeEnd)  

//find arbejdstid
const timeDif = msTimeEnd - msTimeStart
//Udregn antal timer arbejdet
    const hoursWorked = timeDif / 60 / 60 / 1000
    console.log(timeDif, hoursWorked)
    return hoursWorked.toString()


};