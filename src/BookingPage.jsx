import BookingForm from './BookingForm'
import BookingSlot from './BookingSlot'
import heroFoodImg from './assets/hero-food.jpg'

function BookingPage({ availableTimes, dispatch, submitForm }) {
  return (
    <div className="booking-page">
      <section className="booking-hero" aria-labelledby="booking-hero-heading">
        <div className="section-container booking-hero-container">
          <div className="booking-hero-content">
            <h1 id="booking-hero-heading">Reserve a Table</h1>
            <h2>Little Lemon Chicago</h2>
            <p>
              Experience our delightful Mediterranean dining. Choose your date,
              time, and seating preference below to book your table.
            </p>
          </div>
          <div className="booking-hero-image-wrapper">
            <img
              src={heroFoodImg}
              alt="Little Lemon dining experience"
              className="booking-hero-image"
            />
          </div>
        </div>
      </section>

      <section className="booking-content-section" aria-label="Reservation form and details">
        <div className="section-container booking-layout-container">
          <div className="booking-form-wrapper">
            <p className="booking-intro">
              Please fill in your details below to confirm your reservation.
            </p>
            <BookingForm
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
            />

            <div className="slots-preview-section" aria-live="polite">
              <h3>Available Slots for Selected Date</h3>
              <div className="booking-slots-grid" role="list" aria-label="Available booking slots">
                {availableTimes && availableTimes.map((slot) => (
                  <BookingSlot key={slot} time={slot} isBooked={false} />
                ))}
              </div>
            </div>
          </div>

          <aside className="booking-info-card" aria-labelledby="policies-heading">
            <h3 id="policies-heading">Reservation Policies</h3>
            <p>
              Reservations are held for 15 minutes past scheduled time. For parties
              larger than 10 guests, please contact us directly at (312) 555-0199.
            </p>
            <div className="booking-features-grid">
              <div className="booking-feature">
                <h4><span role="img" aria-label="Clock">🕒</span> Opening Hours</h4>
                <p>Mon - Fri: 11:00 AM - 10:00 PM<br />Sat - Sun: 10:00 AM - 11:00 PM</p>
              </div>
              <div className="booking-feature">
                <h4><span role="img" aria-label="Location pin">📍</span> Location</h4>
                <p>123 Lemon Street, Chicago, IL 60601</p>
              </div>
              <div className="booking-feature">
                <h4><span role="img" aria-label="Celebration">🎉</span> Occasions</h4>
                <p>Birthdays, Anniversaries, Special Events & more</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

export default BookingPage
