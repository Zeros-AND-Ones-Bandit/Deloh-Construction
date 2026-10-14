import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="logo">
      <FaHome className="logo-icon" />
      <span className="logo-text">
        <strong>DELOH</strong>
        <small>CONSTRUCTION</small>
      </span>
    </Link>
  )
}