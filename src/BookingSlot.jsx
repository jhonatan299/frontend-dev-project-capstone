function BookingSlot({ time, isBooked = false }) {
  return (
    <div
      className={`booking-slot ${isBooked ? 'booked' : 'available'}`}
      role="listitem"
      aria-label={`Time slot ${time}: ${isBooked ? 'Reserved' : 'Available'}`}
    >
      <span className="slot-time">{time}</span>
      <span className="slot-badge">{isBooked ? 'Reserved' : 'Available'}</span>
    </div>
  )
}

export default BookingSlot
