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
        <Link to="/#about" onClick={close}>About</Link>
        <Link to="/#contact" onClick={close}>Contact</Link>
        <Link to="/#contact" className="btn btn-yellow btn-small" onClick={close}>Get a Quote</Link>
      </nav>
    </header>
  )
}