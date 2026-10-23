import { useReducer } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './HomePage'
import BookingPage from './BookingPage'
import ConfirmedBooking from './ConfirmedBooking'
import { initializeTimes, updateTimes, getSubmitAPI } from './utils/times'

export { parseLocalDate, getFetchAPI, getSubmitAPI, initializeTimes, updateTimes } from './utils/times'

function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, null, initializeTimes)
  const navigate = useNavigate()

  const submitForm = (formData) => {
    const submitFn = getSubmitAPI()
    const isSuccess = submitFn(formData)
    if (isSuccess) {
      navigate('/confirmed', { state: formData })
      return true
    }
    return false
  }

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          }
        />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
        <Route path="/booking-confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </main>
  )
}

export default Main
