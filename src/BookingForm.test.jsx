import { render, screen, fireEvent } from '@testing-library/react'
import BookingForm, { getTodayDate } from './BookingForm'
import {
  validateDate,
  validateTime,
  validateGuests,
  validateOccasion,
  validateBookingForm,
} from './utils/validation'

describe('BookingForm - HTML5 Validation (Step 1)', () => {
  test('Validates HTML5 attributes applied to the Date input', () => {
    render(<BookingForm />)
    const dateInput = screen.getByLabelText('Choose date')

    expect(dateInput).toHaveAttribute('type', 'date')
    expect(dateInput).toHaveAttribute('required')
    expect(dateInput).toHaveAttribute('min')
  })

  test('Validates HTML5 attributes applied to the Time select', () => {
    render(<BookingForm />)
    const timeSelect = screen.getByLabelText('Choose time')

    expect(timeSelect).toHaveAttribute('required')
  })

  test('Validates HTML5 attributes applied to the Guests input', () => {
    render(<BookingForm />)
    const guestsInput = screen.getByLabelText('Number of guests')

    expect(guestsInput).toHaveAttribute('type', 'number')
    expect(guestsInput).toHaveAttribute('required')
    expect(guestsInput).toHaveAttribute('min', '1')
    expect(guestsInput).toHaveAttribute('max', '10')
  })

  test('Validates HTML5 attributes applied to the Occasion select', () => {
    render(<BookingForm />)
    const occasionSelect = screen.getByLabelText('Occasion')

    expect(occasionSelect).toHaveAttribute('required')
  })
})

describe('BookingForm - JavaScript Validation Functions (Step 2)', () => {
  describe('validateDate()', () => {
    const today = '2026-10-23'

    test('returns true for a valid date equal to or after minDate', () => {
      expect(validateDate('2026-10-23', today)).toBe(true)
      expect(validateDate('2026-10-24', today)).toBe(true)
      expect(validateDate('2026-12-01', today)).toBe(true)
    })

    test('returns false for an invalid or past date', () => {
      expect(validateDate('2026-10-22', today)).toBe(false)
      expect(validateDate('', today)).toBe(false)
      expect(validateDate(null, today)).toBe(false)
    })
  })

  describe('validateTime()', () => {
    const availableTimes = ['17:00', '18:00', '19:00', '20:00']

    test('returns true when selected time is in availableTimes', () => {
      expect(validateTime('17:00', availableTimes)).toBe(true)
      expect(validateTime('20:00', availableTimes)).toBe(true)
    })

    test('returns false when selected time is not in availableTimes or empty', () => {
      expect(validateTime('16:00', availableTimes)).toBe(false)
      expect(validateTime('22:00', availableTimes)).toBe(false)
      expect(validateTime('', availableTimes)).toBe(false)
    })
  })

  describe('validateGuests()', () => {
    test('returns true for valid guest counts between 1 and 10', () => {
      expect(validateGuests(1)).toBe(true)
      expect(validateGuests(5)).toBe(true)
      expect(validateGuests(10)).toBe(true)
      expect(validateGuests('4')).toBe(true)
    })

    test('returns false for invalid guest counts outside 1-10', () => {
      expect(validateGuests(0)).toBe(false)
      expect(validateGuests(-1)).toBe(false)
      expect(validateGuests(11)).toBe(false)
      expect(validateGuests(100)).toBe(false)
      expect(validateGuests('')).toBe(false)
      expect(validateGuests('abc')).toBe(false)
    })
  })

  describe('validateOccasion()', () => {
    test('returns true for a valid occasion string', () => {
      expect(validateOccasion('Birthday')).toBe(true)
      expect(validateOccasion('Anniversary')).toBe(true)
    })

    test('returns false for an empty or whitespace occasion', () => {
      expect(validateOccasion('')).toBe(false)
      expect(validateOccasion('   ')).toBe(false)
      expect(validateOccasion(null)).toBe(false)
    })
  })

  describe('validateBookingForm()', () => {
    const validData = {
      date: '2026-10-25',
      minDate: '2026-10-23',
      time: '18:00',
      availableTimes: ['17:00', '18:00', '19:00'],
      guests: 4,
      occasion: 'Birthday',
    }

    test('returns true when all fields are valid', () => {
      expect(validateBookingForm(validData)).toBe(true)
    })

    test('returns false when any field is invalid', () => {
      expect(validateBookingForm({ ...validData, guests: 0 })).toBe(false)
      expect(validateBookingForm({ ...validData, date: '2026-10-01' })).toBe(false)
      expect(validateBookingForm({ ...validData, time: '12:00' })).toBe(false)
      expect(validateBookingForm({ ...validData, occasion: '' })).toBe(false)
    })
  })
})

describe('BookingForm - UI Validation Integration', () => {
  test('Submit button is disabled when guests is invalid and enabled when valid', () => {
    render(<BookingForm />)
    const guestsInput = screen.getByLabelText('Number of guests')
    const submitBtn = screen.getByDisplayValue('Make Your reservation')

    expect(submitBtn).toBeEnabled()

    fireEvent.change(guestsInput, { target: { value: '0' } })
    expect(submitBtn).toBeDisabled()

    fireEvent.change(guestsInput, { target: { value: '5' } })
    expect(submitBtn).toBeEnabled()
  })

  test('Displays inline error alert when blurring an invalid guests field', () => {
    render(<BookingForm />)
    const guestsInput = screen.getByLabelText('Number of guests')

    fireEvent.change(guestsInput, { target: { value: '15' } })
    fireEvent.blur(guestsInput)

    expect(
      screen.getByText('Number of guests must be between 1 and 10.')
    ).toBeInTheDocument()
  })

  test('Calls submitForm handler when valid form is submitted', () => {
    const mockSubmit = vi.fn()
    render(<BookingForm submitForm={mockSubmit} />)

    const submitBtn = screen.getByDisplayValue('Make Your reservation')
    fireEvent.click(submitBtn)

    expect(mockSubmit).toHaveBeenCalledTimes(1)
  })
})

describe('BookingForm - Accessibility (ARIA & Form Labels)', () => {
  test('Has aria-label="On Click" applied to the submit button', () => {
    render(<BookingForm />)
    const submitBtn = screen.getByDisplayValue('Make Your reservation')
    expect(submitBtn).toHaveAttribute('aria-label', 'On Click')
  })

  test('Associates every label with its form input via htmlFor and id', () => {
    render(<BookingForm />)

    expect(screen.getByLabelText('Choose date')).toHaveAttribute('id', 'res-date')
    expect(screen.getByLabelText('Choose time')).toHaveAttribute('id', 'res-time')
    expect(screen.getByLabelText('Number of guests')).toHaveAttribute('id', 'guests')
    expect(screen.getByLabelText('Occasion')).toHaveAttribute('id', 'occasion')
  })

  test('Updates aria-invalid and aria-describedby on invalid input', () => {
    render(<BookingForm />)
    const guestsInput = screen.getByLabelText('Number of guests')

    expect(guestsInput).toHaveAttribute('aria-required', 'true')
    expect(guestsInput).toHaveAttribute('aria-invalid', 'false')

    fireEvent.change(guestsInput, { target: { value: '0' } })
    fireEvent.blur(guestsInput)

    expect(guestsInput).toHaveAttribute('aria-invalid', 'true')
    expect(guestsInput).toHaveAttribute('aria-describedby', 'guests-error')
  })
})

describe('BookingForm - Date & Submission Edge Cases', () => {
  test('getTodayDate() uses the local calendar date, not UTC', () => {
    expect(getTodayDate(new Date(2026, 9, 23, 23, 30))).toBe('2026-10-23')
    expect(getTodayDate(new Date(2026, 0, 5, 0, 15))).toBe('2026-01-05')
  })

  test('Shows an error alert when submitForm reports failure', () => {
    const mockSubmit = vi.fn(() => false)
    render(<BookingForm submitForm={mockSubmit} />)

    fireEvent.click(screen.getByDisplayValue('Make Your reservation'))

    expect(screen.getByRole('alert')).toHaveTextContent(/couldn't complete your reservation/i)
  })
})
