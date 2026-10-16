import { Link } from 'react-router-dom'
import { FaMedal, FaClock, FaDollarSign, FaStar } from 'react-icons/fa'
import services from '../data/services'
import { useSettings } from '../lib/useSettings'
import PageHeader from '../components/PageHeader'

const DEFAULT_TEXT =
  'Deloh Construction is a building and construction company that delivers quality workmanship from foundations to finishes. ' +
  'We take pride in doing the job properly, on time and at a fair price.\n' +
  'Whether it is a new build, paving, drainage, ceilings, painting or door installation, our team treats every project with care and precision.'

const reasons = [
  { icon: FaMedal, title: 'High quality workmanship', text: 'Neat, durable results on every job.' },
  { icon: FaClock, title: 'On-time delivery', text: 'We respect your schedule and deadlines.' },
  { icon: FaDollarSign, title: 'Affordable rates', text: 'Fair, transparent pricing.' },
  { icon: FaStar, title: 'Customer satisfaction', text: 'Your happiness is how we measure success.' },
]

export default function About() {
  const { settings } = useSettings()
  const text = (settings.about_text || '').trim() || DEFAULT_TEXT
  const paragraphs = text.split(/\n+/).filter(Boolean)

  return (
    <>
      <PageHeader title="About Us" subtitle="Building better spaces, together." />

      <section className="page-section narrow">
        {paragraphs.map((p, i) => <p className="about-text" key={i}>{p}</p>)}
      </section>

      <section className="page-section">
        <h2 className="section-title">What we do</h2>
        <div className="services-grid">
          {services.map(({ slug, name, icon: Icon }) => (
            <Link to={`/services/${slug}`} className="service-tile" key={slug}>
              <Icon />
              <span>{name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section">
        <h2 className="section-title">Why choose us</h2>
        <div className="reasons">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div className="reason" key={title}>
              <Icon />
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <h3>Ready to start your project?</h3>
        <Link to="/quote" className="btn btn-yellow">Get a Quote</Link>
      </section>
    </>
  )
}