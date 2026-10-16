import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaPhoneAlt } from 'react-icons/fa'
import Logo from './Logo'
import { usePhone } from '../lib/usePhone'

export default function Footer() {
  const phone = usePhone()
  const telLink = phone.replace(/[^\d+]/g, '')

  return (
    <footer className="footer">
      <Logo />
      <nav className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/#services">Services</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/quote">Get a Quote</Link>
        <Link to="/admin" className="admin-link">Admin</Link>
      </nav>
      <div className="socials">
        {/* Replace the # links with your real Facebook and Instagram pages */}
        <a href="#" aria-label="Facebook"><FaFacebookF /></a>
        <a href="#" aria-label="Instagram"><FaInstagram /></a>
        {telLink && <a href={`tel:${telLink}`} aria-label="Phone"><FaPhoneAlt /></a>}
      </div>
    </footer>
  )
}