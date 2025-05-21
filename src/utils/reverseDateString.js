export function reverseString(dateString) {
  const parts = dateString.split('-')
  if (parts.length !== 3) return dateString

  const isLikelyDDMMYYYY = parts[0].length === 2 && parts[2].length === 4
  return isLikelyDDMMYYYY ? parts.reverse().join('-') : dateString
}
