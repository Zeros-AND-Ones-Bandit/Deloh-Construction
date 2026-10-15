import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import services from '../data/services'
import { compressImage } from '../lib/imageUtils'

export default function Admin() {
  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [checking, setChecking] = useState(true)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [slug, setSlug] = useState(services[0].slug)
  const [files, setFiles] = useState([])
  const [caption, setCaption] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [images, setImages] = useState([])

  // Track login state
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  // Check the logged-in user is in the admins table
  useEffect(() => {
    if (!session) {
      setIsAdmin(false)
      setChecking(false)
      return
    }
    setChecking(true)
    supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        setIsAdmin(!!data)
        setChecking(false)
      })
  }, [session])

  const loadImages = async () => {
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('service_slug', slug)
      .order('created_at', { ascending: false })
    setImages(data || [])
  }

  useEffect(() => {
    if (isAdmin) loadImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, slug])

  const login = async (e) => {
    e.preventDefault()
    setLoginError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setLoginError(error.message)
  }

  const upload = async () => {
    if (files.length === 0) return
    setBusy(true)
    setMessage('')
    let done = 0
    try {
      for (const file of files) {
        const blob = await compressImage(file)
        const path = `${slug}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`

        const { error: upErr } = await supabase.storage
          .from('gallery')
          .upload(path, blob, { contentType: blob.type || 'image/jpeg' })
        if (upErr) throw upErr

        const { data: pub } = supabase.storage.from('gallery').getPublicUrl(path)
        const { error: dbErr } = await supabase.from('gallery_images').insert({
          service_slug: slug,
          image_path: path,
          image_url: pub.publicUrl,
          caption: caption.trim() || null,
        })
        if (dbErr) {
          await supabase.storage.from('gallery').remove([path])
          throw dbErr
        }
        done++
      }
      setMessage(`Uploaded ${done} picture${done === 1 ? '' : 's'}.`)
      setFiles([])
      setCaption('')
      document.getElementById('file-input').value = ''
      loadImages()
    } catch (err) {
      setMessage(`Upload stopped after ${done}: ${err.message}`)
    }
    setBusy(false)
  }

  const remove = async (img) => {
    if (!window.confirm('Delete this picture?')) return
    await supabase.storage.from('gallery').remove([img.image_path])
    const { error } = await supabase.from('gallery_images').delete().eq('id', img.id)
    if (error) setMessage(error.message)
    loadImages()
  }

  // ---------- Views ----------
  if (checking) return <div className="admin"><p>Loading…</p></div>

  if (!session) {
    return (
      <div className="admin">
        <form className="admin-card" onSubmit={login}>
          <h2>Admin Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {loginError && <p className="admin-error">{loginError}</p>}
          <button className="btn btn-yellow" type="submit">Log in</button>
        </form>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="admin">
        <div className="admin-card">
          <h2>No access</h2>
          <p>This account is not an admin.</p>
          <button className="btn btn-yellow" onClick={() => supabase.auth.signOut()}>Log out</button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin">
      <div className="admin-card wide">
        <div className="admin-top">
          <h2>Manage Pictures</h2>
          <button className="btn btn-outline-dark btn-small" onClick={() => supabase.auth.signOut()}>Log out</button>
        </div>

        <label>Service</label>
        <select value={slug} onChange={(e) => setSlug(e.target.value)}>
          {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
        </select>

        <label>Pictures (you can pick several)</label>
        <input id="file-input" type="file" accept="image/*" multiple onChange={(e) => setFiles([...e.target.files])} />

        <label>Caption (optional)</label>
        <input type="text" placeholder="e.g. Driveway in Midrand" value={caption} onChange={(e) => setCaption(e.target.value)} />

        <button className="btn btn-yellow" onClick={upload} disabled={busy || files.length === 0}>
          {busy ? 'Uploading…' : `Upload ${files.length || ''} picture${files.length === 1 ? '' : 's'}`}
        </button>
        {message && <p className="admin-msg">{message}</p>}

        <h3>Current pictures for this service ({images.length})</h3>
        <div className="admin-grid">
          {images.map((img) => (
            <div className="admin-thumb" key={img.id}>
              <img src={img.image_url} alt={img.caption || ''} />
              {img.caption && <small>{img.caption}</small>}
              <button onClick={() => remove(img)}>Delete</button>
            </div>
          ))}
          {images.length === 0 && <p>No pictures yet.</p>}
        </div>
      </div>
    </div>
  )
}