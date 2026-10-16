import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export function useSettings() {
  const [settings, setSettings] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    supabase
      .from('site_settings')
      .select('key, value')
      .then(({ data }) => {
        if (cancelled) return
        const obj = {}
        ;(data || []).forEach((r) => { obj[r.key] = r.value })
        setSettings(obj)
        setLoaded(true)
      })
    return () => { cancelled = true }
  }, [])

  return { settings, loaded }
}