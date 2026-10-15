import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export function usePhone() {
  const [phone, setPhone] = useState('')

  useEffect(() => {
    let cancelled = false
    supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'phone')
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled && data) setPhone(data.value)
      })
    return () => { cancelled = true }
  }, [])

  return phone
}