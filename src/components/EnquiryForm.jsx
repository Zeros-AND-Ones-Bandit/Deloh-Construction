import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import services from '../data/services'

const empty = { name: '', phone: '', email: '', service: '', message: '', website: '' }

export default function EnquiryForm({
  kind,
  showService = false,
  defaultService = '',
  submitLabel = 'Send',
  successTitle = 'Thank you!',
  successText = 'We have received your message and will get back to you soon.',
}) {
  const [form, setForm] = useState({ ...empty, service: defaultService })
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [error, setError] = useState('')

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    // "website" is a hidden field only bots fill in
    if (form.website) { setStatus('sent'); return }

    if (!form.phone.trim() && !form.email.trim()) {
      setError('Please give us a phone number or an email address so we can reply.')
      return
    }

    setStatus('sending')
    const { error: err } = await supabase.from('enquiries').insert({
      kind,
      name: form.name.trim(),
      phone: form.phone.trim() || null,
      email: form.email.trim() || null,
      service_slug: showService && form.service ? form.service : null,
      message: form.message.trim(),
    })

    if (err) {
      console.error(err.message)
      setStatus('idle')
      setError('Something went wrong. Please try again, or call us directly.')
      return
    }
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="form-card form-success">
        <h3>{successTitle}</h3>
        <p>{successText}</p>
        <button
          className="btn btn-outline-dark btn-small"
          onClick={() => { setForm({ ...empty, service: defaultService }); setStatus('idle') }}
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <label htmlFor="f-name">Your name *</label>
      <input id="f-name" value={form.name} onChange={set('name')} maxLength={100} required />

      <div className="form-row">
        <div>
          <label htmlFor="f-phone">Phone</label>
          <input id="f-phone" type="tel" value={form.phone} onChange={set('phone')} maxLength={30} />
        </div>
        <div>
          <label htmlFor="f-email">Email</label>
          <input id="f-email" type="email" value={form.email} onChange={set('email')} maxLength={150} />
        </div>
      </div>

      {showService && (
        <>
          <label htmlFor="f-service">Service needed</label>
          <select id="f-service" value={form.service} onChange={set('service')}>
            <option value="">Not sure / other</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </>
      )}

      <label htmlFor="f-message">{kind === 'quote' ? 'Tell us about your project *' : 'Your message *'}</label>
      <textarea id="f-message" value={form.message} onChange={set('message')} maxLength={2000} required />

      {/* honeypot */}
      <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true"
        value={form.website} onChange={set('website')} name="website" />

      {error && <p className="admin-error">{error}</p>}
      <button className="btn btn-yellow" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : submitLabel}
      </button>
      <small className="form-note">We only use your details to respond to this enquiry.</small>
    </form>
  )
}