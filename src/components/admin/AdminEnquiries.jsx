import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import services from '../../data/services'

export default function AdminEnquiries({ onChange }) {
  const [rows, setRows] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    const { data, error: err } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })
    if (err) setError(err.message)
    setRows(data || [])
    setLoading(false)
    onChange?.()
  }

  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleRead = async (row) => {
    await supabase.from('enquiries').update({ is_read: !row.is_read }).eq('id', row.id)
    load()
  }

  const remove = async (row) => {
    if (!window.confirm('Delete this enquiry?')) return
    await supabase.from('enquiries').delete().eq('id', row.id)
    load()
  }

  const serviceName = (slug) => services.find((s) => s.slug === slug)?.name
  const shown = rows.filter((r) => filter === 'all' || r.kind === filter)

  return (
    <div>
      <div className="filter-row">
        {['all', 'quote', 'contact'].map((f) => (
          <button key={f} className={`chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : f === 'quote' ? 'Quote requests' : 'Messages'}
          </button>
        ))}
      </div>

      {error && <p className="admin-error">{error}</p>}
      {loading && <p>Loading…</p>}
      {!loading && shown.length === 0 && <p>No enquiries yet.</p>}

      {shown.map((r) => (
        <div className={`enquiry ${r.is_read ? '' : 'unread'}`} key={r.id}>
          <div className="enquiry-head">
            <strong>{r.name}</strong>
            <span className={`tag ${r.kind}`}>{r.kind === 'quote' ? 'Quote' : 'Message'}</span>
            {r.service_slug && <span className="tag">{serviceName(r.service_slug)}</span>}
            <small>{new Date(r.created_at).toLocaleString('en-ZA', { dateStyle: 'medium', timeStyle: 'short' })}</small>
          </div>
          <p className="enquiry-msg">{r.message}</p>
          <div className="enquiry-contact">
            {r.phone && <a href={`tel:${r.phone.replace(/[^\d+]/g, '')}`}>{r.phone}</a>}
            {r.email && <a href={`mailto:${r.email}`}>{r.email}</a>}
          </div>
          <div className="enquiry-actions">
            <button onClick={() => toggleRead(r)}>{r.is_read ? 'Mark as unread' : 'Mark as read'}</button>
            <button className="danger" onClick={() => remove(r)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}