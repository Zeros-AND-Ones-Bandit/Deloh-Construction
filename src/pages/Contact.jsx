import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { useSettings } from '../lib/useSettings'
import PageHeader from '../components/PageHeader'
import EnquiryForm from '../components/EnquiryForm'

export default function Contact() {
  const { settings, loaded } = useSettings()
  const phone = settings.phone || ''
  const telLink = phone.replace(/[^\d+]/g, '')
  const { email, address, hours } = settings

  const hasInfo = phone || email || address || hours

  return (
    <>
      <PageHeader title="Contact Us" subtitle="We'd love to hear from you." />
      <section className="page-section">
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Get in touch</h3>
            {phone && (
              <a className="info-item" href={`tel:${telLink}`}>
                <span className="info-icon"><FaPhoneAlt /></span>
                <span><strong>Phone</strong><br />{phone}</span>
              </a>
            )}
            {email && (
              <a className="info-item" href={`mailto:${email}`}>
                <span className="info-icon"><FaEnvelope /></span>
                <span><strong>Email</strong><br />{email}</span>
              </a>
            )}
            {address && (
              <a
                className="info-item"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="info-icon"><FaMapMarkerAlt /></span>
                <span><strong>Address</strong><br />{address}</span>
              </a>
            )}
            {hours && (
              <div className="info-item">
                <span className="info-icon"><FaClock /></span>
                <span><strong>Working hours</strong><br />{hours}</span>
              </div>
            )}
            {loaded && !hasInfo && <p>Send us a message using the form and we'll reply.</p>}
          </div>

          <div>
            <h3 style={{ marginBottom: 12 }}>Send us a message</h3>
            <EnquiryForm kind="contact" submitLabel="Send message" />
          </div>
        </div>
      </section>
    </>
  )
}