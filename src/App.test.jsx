import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BookingForm from './BookingForm'
import ConfirmedBooking from './ConfirmedBooking'
import { initializeTimes, updateTimes, parseLocalDate } from './Main'
import { fetchAPI } from './api'

describe('Booking Form & Time Reducer Unit Tests', () => {
  test('Renders the BookingForm heading', () => {
    render(<BookingForm />)
    const headingElement = screen.getByText('Book Now')
    expect(headingElement).toBeInTheDocument()
  })

  test('initializeTimes returns a non-empty array of available booking times', () => {
    const times = initializeTimes()
    expect(Array.isArray(times)).toBe(true)
    expect(times.length).toBeGreaterThan(0)
    times.forEach((slot) => {
      expect(slot).toMatch(/^\d{2}:\d{2}$/)
    })
  })

  test('updateTimes returns expected available times for a pre-selected date', () => {
    const selectedDate = '2026-10-28'
    const action = { type: 'UPDATE_TIMES', payload: selectedDate, date: selectedDate }
    const updatedTimes = updateTimes([], action)

    expect(Array.isArray(updatedTimes)).toBe(true)
    expect(updatedTimes.length).toBeGreaterThan(0)

    const expected = fetchAPI(parseLocalDate(selectedDate))
    expect(updatedTimes).toEqual(expected)
  })

  test('Changing the date field in BookingForm dispatches UPDATE_TIMES with the new date', () => {
    const mockDispatch = vi.fn()
    render(<BookingForm dispatch={mockDispatch} />)

    const dateInput = screen.getByLabelText('Choose date')
    fireEvent.change(dateInput, { target: { value: '2026-10-29' } })

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'UPDATE_TIMES',
        date: '2026-10-29',
      })
    )
  })

  test('Renders ConfirmedBooking confirmation message', () => {
    render(
      <MemoryRouter>
        <ConfirmedBooking />
      </MemoryRouter>
    )
    expect(screen.getByText('Booking Confirmed!')).toBeInTheDocument()
    expect(screen.getByText('Thank you for choosing Little Lemon!')).toBeInTheDocument()
  })
})
