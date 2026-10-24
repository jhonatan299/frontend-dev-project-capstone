import { useEffect, useState } from 'react'
import {
  validateDate,
  validateTime,
  validateGuests,
  validateOccasion,
  validateBookingForm,
} from './utils/validation'

export const getTodayDate = (now = new Date()) => {
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}
const DEFAULT_TIMES = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00']

function BookingForm({ availableTimes = DEFAULT_TIMES, dispatch, submitForm }) {
  const minDate = getTodayDate()
  const [date, setDate] = useState(minDate)
  const [selectedTime, setSelectedTime] = useState('')
  const [guests, setGuests] = useState(1)
  const [occasion, setOccasion] = useState('Birthday')
  const [submitError, setSubmitError] = useState(false)

  const [touched, setTouched] = useState({
    date: false,
    time: false,
    guests: false,
    occasion: false,
  })

  const time = (availableTimes.includes(selectedTime) ? selectedTime : availableTimes[0]) || ''

  const isDateValid = validateDate(date, minDate)
  const isTimeValid = validateTime(time, availableTimes)
  const isGuestsValid = validateGuests(guests)
  const isOccasionValid = validateOccasion(occasion)

  const isFormValid = validateBookingForm({
    date,
    minDate,
    time,
    availableTimes,
    guests,
    occasion,
  })

  useEffect(() => {
    if (dispatch) {
      const today = getTodayDate()
      dispatch({ type: 'UPDATE_TIMES', payload: today, date: today })
    }
  }, [dispatch])

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleDateChange = (e) => {
    const newDate = e.target.value
    setDate(newDate)
    if (dispatch) {
      dispatch({ type: 'UPDATE_TIMES', payload: newDate, date: newDate })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isFormValid) {
      setTouched({ date: true, time: true, guests: true, occasion: true })
      return
    }

    const reservationData = {
      date,
      time,
      guests: Number(guests),
      occasion,
    }
    if (submitForm) {
      setSubmitError(submitForm(reservationData) === false)
    }
  }

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      style={{ display: 'grid', maxWidth: '350px', gap: '20px' }}
      aria-label="Table reservation form"
      noValidate={false}
    >
      <h2>Book Now</h2>

      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={date}
        min={minDate}
        onChange={handleDateChange}
        onBlur={() => handleBlur('date')}
        aria-required="true"
        aria-invalid={touched.date && !isDateValid}
        aria-describedby={touched.date && !isDateValid ? 'res-date-error' : undefined}
        className={touched.date && !isDateValid ? 'invalid' : ''}
        required
      />
      {touched.date && !isDateValid && (
        <span id="res-date-error" className="error-message" role="alert">
          Please select a valid date (today or later).
        </span>
      )}

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={time}
        onChange={(e) => setSelectedTime(e.target.value)}
        onBlur={() => handleBlur('time')}
        aria-required="true"
        aria-invalid={touched.time && !isTimeValid}
        aria-describedby={touched.time && !isTimeValid ? 'res-time-error' : undefined}
        className={touched.time && !isTimeValid ? 'invalid' : ''}
        required
      >
        {availableTimes && availableTimes.map((availableTime) => (
          <option key={availableTime} value={availableTime}>
            {availableTime}
          </option>
        ))}
      </select>
      {touched.time && !isTimeValid && (
        <span id="res-time-error" className="error-message" role="alert">
          Please select an available reservation time.
        </span>
      )}

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        placeholder="1"
        min="1"
        max="10"
        id="guests"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        onBlur={() => handleBlur('guests')}
        aria-required="true"
        aria-invalid={touched.guests && !isGuestsValid}
        aria-describedby={touched.guests && !isGuestsValid ? 'guests-error' : undefined}
        className={touched.guests && !isGuestsValid ? 'invalid' : ''}
        required
      />
      {touched.guests && !isGuestsValid && (
        <span id="guests-error" className="error-message" role="alert">
          Number of guests must be between 1 and 10.
        </span>
      )}

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
        onBlur={() => handleBlur('occasion')}
        aria-required="true"
        aria-invalid={touched.occasion && !isOccasionValid}
        aria-describedby={touched.occasion && !isOccasionValid ? 'occasion-error' : undefined}
        className={touched.occasion && !isOccasionValid ? 'invalid' : ''}
        required
      >
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>
      {touched.occasion && !isOccasionValid && (
        <span id="occasion-error" className="error-message" role="alert">
          Please choose an occasion for your reservation.
        </span>
      )}

      {submitError && (
        <span className="error-message" role="alert">
          Sorry, we couldn't complete your reservation. Please try again or call us at (312) 555-0199.
        </span>
      )}

      <input
        type="submit"
        value="Make Your reservation"
        className="booking-submit-btn"
        disabled={!isFormValid}
        aria-label="On Click"
      />
    </form>
  )
}

export default BookingForm
