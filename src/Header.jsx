import { Link } from 'react-router-dom'
import logo from './assets/logo.png'

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo-link" aria-label="Little Lemon Home">
        <img src={logo} alt="Little Lemon Logo" className="header-logo" />
      </Link>
    </header>
  )
}

export default Header
