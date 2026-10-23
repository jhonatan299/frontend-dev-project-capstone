import { Link } from 'react-router-dom'
import heroFoodImg from './assets/hero-food.jpg'

function CallToAction() {
  return (
    <section className="hero-banner" aria-labelledby="hero-heading">
      <div className="hero-container">
        <div className="hero-content">
          <h1 id="hero-heading">Little Lemon</h1>
          <h2><span className="hero-city">Chicago</span></h2>
          <p>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </p>
          <Link to="/booking" className="cta-button" aria-label="On Click">
            Reserve a Table
          </Link>
        </div>
        <div className="hero-image-wrapper">
          <img
            src={heroFoodImg}
            alt="Little Lemon signature Mediterranean dish"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  )
}

export default CallToAction
