import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaPhoneAlt } from 'react-icons/fa'
import Logo from './Logo'
import { usePhone } from '../lib/usePhone'

export default function Footer() {
  const phone = usePhone()
  return (
    <footer className="footer" id="contact">
      <Logo />
      <nav className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/#services">Services</Link>
        <Link to="/#about">About</Link>
        <Link to="/#contact">Contact</Link>
        <Link to="/admin" className="admin-link">Admin</Link>
      </nav>
      <div className="socials">
        {/* Replace the # links and phone number with your real ones */}
        <a href="#" aria-label="Facebook"><FaFacebookF /></a>
        <a href="#" aria-label="Instagram"><FaInstagram /></a>
        <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} aria-label="Phone"><FaPhoneAlt /></a>
      </div>
    </footer>
  )
}