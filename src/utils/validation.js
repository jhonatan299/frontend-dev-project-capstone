export const validateDate = (date, minDate) => {
  if (!date) return false
  if (minDate && date < minDate) return false
  return true
}

export const validateTime = (time, availableTimes = []) => {
  if (!time) return false
  return availableTimes.includes(time)
}

export const validateGuests = (guests) => {
  if (guests === '' || guests === null || guests === undefined) return false
  const num = Number(guests)
  return Number.isInteger(num) && num >= 1 && num <= 10
}

export const validateOccasion = (occasion) => {
  if (!occasion) return false
  return typeof occasion === 'string' && occasion.trim().length > 0
}

export const validateBookingForm = ({ date, minDate, time, availableTimes, guests, occasion }) => {
  return (
    validateDate(date, minDate) &&
    validateTime(time, availableTimes) &&
    validateGuests(guests) &&
    validateOccasion(occasion)
  )
}

