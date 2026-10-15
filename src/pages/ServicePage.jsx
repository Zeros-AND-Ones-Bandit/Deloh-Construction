import { useParams, Navigate } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import services from '../data/services'
import QuoteBar from '../components/QuoteBar'
import Gallery from '../components/Gallery'

export default function ServicePage() {
  const { slug } = useParams()
  const s = services.find((x) => x.slug === slug)
  if (!s) return <Navigate to="/" replace />

  const list = (
    <ul className="check-list">
      {s.items.map((item) => (
        <li key={item}><FaCheck /> {item}</li>
      ))}
    </ul>
  )

  return (
    <>
      <section
        className="page-hero"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(20,28,40,.8), rgba(20,28,40,.05)), url(${s.hero})` }}
      >
        <h1>{s.name}</h1>
        <p>{s.tagline}</p>
      </section>

      <section className="service-content">
        {s.wide ? (
          <div className="service-grid wide">
            <div>
              <h3>{s.heading}</h3>
              <p>{s.intro}</p>
              {list}
            </div>
            <img src={s.side} alt={s.name} className="side-img" />
            <QuoteBar icon={s.icon} title={s.quoteTitle} text={s.quoteText} stacked />
          </div>
        ) : (
          <>
            <div className="service-grid">
              <div>
                <h3>{s.heading}</h3>
                <p>{s.intro}</p>
                {list}
              </div>
              <img src={s.side} alt={s.name} className="side-img" />
            </div>
            <QuoteBar icon={s.icon} title={s.quoteTitle} text={s.quoteText} />
          </>
        )}
          </section>

      <Gallery slug={s.slug} />
    </>
  )
}