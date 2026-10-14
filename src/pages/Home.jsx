import { Link } from 'react-router-dom'
import { FaMedal, FaClock, FaDollarSign, FaStar } from 'react-icons/fa'
import services from '../data/services'
import homeHero from '../images/home-hero.jpeg'
import Logo from '../components/Logo'

const features = [
  { icon: FaMedal, label: 'High Quality Workmanship' },
  { icon: FaClock, label: 'On-Time Delivery' },
  { icon: FaDollarSign, label: 'Affordable Rates' },
  { icon: FaStar, label: 'Customer Satisfaction' },
]

export default function Home() {
  return (
    <>
      <section
        className="home-hero"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(20,28,40,.85), rgba(20,28,40,.2)), url(${homeHero})` }}
      >
        <p className="eyebrow">Quality Construction – Reliable Service – Built for Your Future</p>
        <h1>
          DELOH<br />
          <span>CONSTRUCTION</span>
        </h1>
        <p className="hero-sub">From foundations to finishes, we build with passion and precision.</p>
        <div className="hero-buttons">
          <Link to="/#contact" className="btn btn-yellow">Get a Quote</Link>
          <a href="#services" className="btn btn-outline">Our Services</a>
        </div>
      </section>

      <section className="services-section" id="services">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map(({ slug, name, icon: Icon }) => (
            <Link to={`/services/${slug}`} className="service-tile" key={slug}>
              <Icon />
              <span>{name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="features-strip" id="about">
        {features.map(({ icon: Icon, label }) => (
          <div className="feature" key={label}>
            <Icon />
            <span>{label}</span>
          </div>
        ))}
      </section>

      <div className="home-bottom" id="contact">
        <p>Building better spaces, together.</p>
        <Logo />
      </div>
    </>
  )
}