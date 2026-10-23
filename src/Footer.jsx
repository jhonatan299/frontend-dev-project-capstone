import { Link } from 'react-router-dom'
import logo from './assets/logo.png'

const CURRENT_YEAR = new Date().getFullYear()

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo-col">
          <Link to="/" aria-label="Little Lemon Home">
            <img src={logo} alt="Little Lemon" className="footer-logo" />
          </Link>
        </div>
        <nav className="footer-nav-col" aria-label="Footer navigation">
          <h4 className="footer-heading">Doormat Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><Link to="/booking">Reservations</Link></li>
            <li><a href="#order-online">Order Online</a></li>
            <li><a href="#login">Login</a></li>
          </ul>
        </nav>
        <div className="footer-contact-col">
          <h4 className="footer-heading">Contact</h4>
          <address>
            <p>123 Lemon Street, Chicago, IL</p>
            <p>Phone: <a href="tel:+13125550199">(312) 555-0199</a></p>
            <p>Email: <a href="mailto:info@littlelemon.com">info@littlelemon.com</a></p>
          </address>
        </div>
        <nav className="footer-social-col" aria-label="Social media">
          <h4 className="footer-heading">Social Media</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>&copy; {CURRENT_YEAR} Little Lemon. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
