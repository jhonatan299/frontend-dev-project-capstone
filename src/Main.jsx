import { useReducer } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './HomePage'
import BookingPage from './BookingPage'
import ConfirmedBooking from './ConfirmedBooking'
import { fetchAPI, submitAPI } from './api'

export const parseLocalDate = (dateVal) => {
  if (dateVal instanceof Date) return dateVal
  if (typeof dateVal === 'string') {
    const parts = dateVal.split('-')
    if (parts.length === 3) {
      return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
    }
  }
  return new Date(dateVal)
}

export const getFetchAPI = () => {
  if (typeof window !== 'undefined' && typeof window.fetchAPI === 'function') {
    return window.fetchAPI
  }
  return fetchAPI
}

export const getSubmitAPI = () => {
  if (typeof window !== 'undefined' && typeof window.submitAPI === 'function') {
    return window.submitAPI
  }
  return submitAPI
}

export const initializeTimes = () => {
  const fetchFn = getFetchAPI()
  const today = new Date()
  return fetchFn(today)
}

export const updateTimes = (state, action) => {
  switch (action?.type) {
    case 'UPDATE_TIMES': {
      const fetchFn = getFetchAPI()
      const dateVal = action.payload || action.date || new Date()
      const dateObj = parseLocalDate(dateVal)
      return fetchFn(dateObj)
    }
    default:
      return state || initializeTimes()
  }
}

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
