export function calculateWorkHours(startDate, startTime, endDate, endTime) {
  const dayInMs = 86400000
  const [yearA, monthA, dayA] = splitDateToNumbers(startDate)
  const [hourA, minutesA] = splitTimeToNumbers(startTime)
  const msTimeA = getMsTimeFromDateTime(yearA, monthA, dayA, hourA, minutesA)
  const A = new Date(yearA, monthA, dayA)
  const minutes1 = hourA * 60 + minutesA
  const [yearB, monthB, dayB] = splitDateToNumbers(endDate)
  const [hourB, minutesB] = splitTimeToNumbers(endTime)
  const msTimeB = getMsTimeFromDateTime(yearB, monthB, dayB, hourB, minutesB)
  const B = new Date(yearB, monthB, dayB)
  const minutes2 = hourB * 60 + minutesB
  const dayDiffInMs =
    (calculateDaysWorked(yearB, monthB, dayB) - calculateDaysWorked(yearA, monthA, dayA)) / dayInMs

  const timeDif = msTimeB - msTimeA

  const [hours, minutes] = hoursToMin(startTime, endTime)

  if (B > A && minutes2 < minutes1) {
    const adjustedMinutes = minutes === 0 ? 0 : minutes + 60
    return `${hours + 24} timer, ${formatMinutes(adjustedMinutes)}`
  }

  if (timeDif > 0 && dayDiffInMs > 0) {
    return `${dayDiffInMs} dage, ${hours} timer, ${formatMinutes(minutes)}`
  }

  if (timeDif < 0 && Math.abs(timeDif) > dayInMs) {
    return `-${Math.abs(dayDiffInMs)} dage, ${hours} timer, ${formatMinutes(minutes)}`
  }

  return `${hours} timer, ${formatMinutes(minutes)}`
}

function calculateDaysWorked(year, month, day) {
  return Date.UTC(year, month - 1, day)
}

function splitDateToNumbers(date) {
  return date.split('-').map(Number)
}

function splitTimeToNumbers(time) {
  return time.split(':').map(Number)
}

function getMsTimeFromDateTime(year, month, day, hour, minutes) {
  return Date.UTC(year, month - 1, day, hour, minutes)
}

function splitDateToNumbersForExport(date) {
  const [day, month, year] = date.split('-').map(Number)
  return [year, month, day]
}

function hoursToMin(startTime, endTime) {
  const [startHour, startMin] = startTime.split(':').map(Number)
  const [endHour, endMin] = endTime.split(':').map(Number)

  const startTimeInMinutes = Math.floor(startHour * 60) + startMin
  const endTimeInMinutes = Math.floor(endHour * 60) + endMin

  const diffInMinutes = endTimeInMinutes - startTimeInMinutes
  const hours = Math.floor(diffInMinutes / 60)
  const minutes = diffInMinutes % 60

  return [hours, minutes]
}

export function calculateWorkDurationInMinutes(startDate, startTime, endDate, endTime) {
  const [startHour, startMin] = splitTimeToNumbers(startTime)
  const [endHour, endMin] = splitTimeToNumbers(endTime)
  const [startYear, startMonth, startDay] = splitDateToNumbersForExport(startDate)
  const [endYear, endMonth, endDay] = splitDateToNumbersForExport(endDate)

  const start = new Date(startYear, startMonth - 1, startDay, startHour, startMin)
  const end = new Date(endYear, endMonth - 1, endDay, endHour, endMin)

  const diffInMs = end - start
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

  return `${diffInMinutes}`
}

 function formatMinutes(m) {
  if (m === 1) return '1 minut'
  return `${m} minutter`
}