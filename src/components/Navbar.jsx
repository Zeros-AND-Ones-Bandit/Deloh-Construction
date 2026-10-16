import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import Logo from './Logo'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="navbar">
      <Logo />
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
        {open ? <FaTimes /> : <FaBars />}
      </button>
     <nav className={`nav-links ${open ? 'open' : ''}`}>
        <NavLink to="/" end onClick={close}>Home</NavLink>
        <Link to="/#services" onClick={close}>Services</Link>
        <NavLink to="/about" onClick={close}>About</NavLink>
        <NavLink to="/contact" onClick={close}>Contact</NavLink>
        <Link to="/quote" className="btn btn-yellow btn-small" onClick={close}>Get a Quote</Link>
     </nav>
    </header>
  )
}