import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'

function ScrollHandler() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 50)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <>
      <ScrollHandler />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:slug" element={<ServicePage />} />
      </Routes>
      {!isHome && <Footer />}
    </>
  )
}