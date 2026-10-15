import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Gallery({ slug }) {
  const [images, setImages] = useState([])
  const [active, setActive] = useState(null)

  useEffect(() => {
    let cancelled = false
    supabase
      .from('gallery_images')
      .select('id, image_url, caption')
      .eq('service_slug', slug)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error.message)
        if (!cancelled) setImages(data || [])
      })
    return () => { cancelled = true }
  }, [slug])

  if (images.length === 0) return null

  return (
    <section className="gallery">
      <h3 className="gallery-title">Our Recent Work</h3>
      <div className="gallery-grid">
        {images.map((img) => (
          <button key={img.id} className="gallery-item" onClick={() => setActive(img)}>
            <img src={img.image_url} alt={img.caption || 'Project photo'} loading="lazy" />
          </button>
        ))}
      </div>

      {active && (
        <div className="lightbox" onClick={() => setActive(null)}>
          <img src={active.image_url} alt={active.caption || 'Project photo'} />
          {active.caption && <p>{active.caption}</p>}
        </div>
      )}
    </section>
  )
}