import { Link } from 'react-router-dom'

export default function QuoteBar({ icon: Icon, title, text, stacked }) {
  return (
    <div className={`quote-bar ${stacked ? 'stacked' : ''}`}>
      <Icon className="quote-icon" />
      <div className="quote-text">
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
      <Link to="/#contact" className="btn btn-yellow btn-small">Get a Quote</Link>
    </div>
  )
}