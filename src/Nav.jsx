import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav className="nav" aria-label="Main navigation">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/#about">About</Link></li>
        <li><Link to="/#menu">Menu</Link></li>
        <li><Link to="/booking">Reservations</Link></li>
        <li><a href="#order-online">Order Online</a></li>
        <li><a href="#login">Login</a></li>
      </ul>
    </nav>
  )
}

export default Nav
