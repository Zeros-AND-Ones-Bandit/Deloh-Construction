import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

const KEYS = ['phone', 'email', 'address', 'hours', 'about_text']

export default function AdminSettings() {
  const [values, setValues] = useState({ phone: '', email: '', address: '', hours: '', about_text: '' })
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('key, value')
      .in('key', KEYS)
      .then(({ data }) => {
        const next = {}
        ;(data || []).forEach((r) => { next[r.key] = r.value })
        setValues((v) => ({ ...v, ...next }))
      })
  }, [])

  const set = (k) => (e) => setValues({ ...values, [k]: e.target.value })

  const save = async () => {
    setBusy(true)
    setMsg('')
    const now = new Date().toISOString()
    const rows = KEYS.map((k) => ({ key: k, value: (values[k] || '').trim(), updated_at: now }))
    const { error } = await supabase.from('site_settings').upsert(rows)
    setMsg(error ? error.message : 'Saved. The website is updated.')
    setBusy(false)
  }

  return (
    <div className="admin-form">
      <label>Phone number (used by the "Contact Us" button)</label>
      <input type="tel" placeholder="+27 82 123 4567" value={values.phone} onChange={set('phone')} />

      <label>Email address</label>
      <input type="email" placeholder="info@yourcompany.co.za" value={values.email} onChange={set('email')} />

      <label>Address</label>
      <input type="text" placeholder="Street, suburb, city" value={values.address} onChange={set('address')} />

      <label>Working hours</label>
      <input type="text" placeholder="Mon–Fri 07:00–17:00, Sat 08:00–13:00" value={values.hours} onChange={set('hours')} />

      <label>About us text (press Enter for a new paragraph)</label>
      <textarea rows={7} value={values.about_text} onChange={set('about_text')}
        placeholder="Leave empty to use the default text." />

      <button className="btn btn-yellow" onClick={save} disabled={busy}>
        {busy ? 'Saving…' : 'Save changes'}
      </button>
      {msg && <p className="admin-msg">{msg}</p>}
    </div>
  )
}