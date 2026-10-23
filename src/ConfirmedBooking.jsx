import { Link, useLocation } from 'react-router-dom'

function ConfirmedBooking() {
  const location = useLocation()
  const bookingDetails = location.state

  return (
    <section
      className="confirmed-booking-section"
      aria-labelledby="confirmed-heading"
      aria-live="polite"
    >
      <div className="section-container">
        <article className="confirmed-booking-card">
          <div className="confirmed-icon" role="img" aria-label="Success checkmark">
            ✅
          </div>
          <h1 id="confirmed-heading">Booking Confirmed!</h1>
          <h2>Thank you for choosing Little Lemon!</h2>
          <p className="confirmation-lead">
            Your table reservation has been successfully confirmed.
          </p>

          {bookingDetails && (
            <div className="booking-summary-box" role="region" aria-label="Reservation Summary">
              <h3>Reservation Details</h3>
              <ul>
                <li><strong>Date:</strong> {bookingDetails.date}</li>
                <li><strong>Time:</strong> {bookingDetails.time}</li>
                <li><strong>Number of Guests:</strong> {bookingDetails.guests}</li>
                <li><strong>Occasion:</strong> {bookingDetails.occasion}</li>
              </ul>
            </div>
          )}

          <p className="confirmation-note">
            A confirmation email has been sent with all your reservation details.
            If you need to make changes or have questions, please call us at (312) 555-0199.
          </p>

          <div className="confirmation-actions">
            <Link to="/" className="cta-button" aria-label="On Click">
              Return to Home
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}

export default ConfirmedBooking
