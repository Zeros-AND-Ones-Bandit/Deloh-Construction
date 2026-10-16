import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import AdminEnquiries from '../components/admin/AdminEnquiries'
import AdminPictures from '../components/admin/AdminPictures'
import AdminSettings from '../components/admin/AdminSettings'

export default function Admin() {
  const [session, setSession] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [checking, setChecking] = useState(true)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [tab, setTab] = useState('enquiries')
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setAuthReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

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

  const refreshUnread = async () => {
    const { count } = await supabase
      .from('enquiries')
      .select('id', { count: 'exact', head: true })
      .eq('is_read', false)
    setUnread(count || 0)
  }

  useEffect(() => {
    if (isAdmin) refreshUnread()
  }, [isAdmin, tab])

  const login = async (e) => {
    e.preventDefault()
    setLoginError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setLoginError(error.message)
  }

  if (!authReady || checking) return <div className="admin"><p>Loading…</p></div>

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
          <h2>Admin Panel</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/" className="btn btn-outline-dark btn-small">View site</Link>
            <button className="btn btn-outline-dark btn-small" onClick={() => supabase.auth.signOut()}>Log out</button>
          </div>
        </div>

        <div className="admin-tabs">
          <button className={tab === 'enquiries' ? 'active' : ''} onClick={() => setTab('enquiries')}>
            Enquiries {unread > 0 && <span className="badge">{unread}</span>}
          </button>
          <button className={tab === 'pictures' ? 'active' : ''} onClick={() => setTab('pictures')}>Pictures</button>
          <button className={tab === 'settings' ? 'active' : ''} onClick={() => setTab('settings')}>Site info</button>
        </div>

        {tab === 'enquiries' && <AdminEnquiries onChange={refreshUnread} />}
        {tab === 'pictures' && <AdminPictures />}
        {tab === 'settings' && <AdminSettings />}
      </div>
    </div>
  )
}