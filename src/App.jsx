import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ChatWidget from './components/ChatWidget'
import HomePage from './pages/HomePage'
import PropertiesPage from './pages/PropertiesPage'
import PropertyDetailPage from './pages/PropertyDetailPage'
import SellPropertyPage from './pages/SellPropertyPage'
import './index.css'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <HashRouter>
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/imoveis" element={<PropertiesPage />} />
          <Route path="/imovel/:id" element={<PropertyDetailPage />} />
          <Route path="/venda" element={<SellPropertyPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </HashRouter>
  )
}

export default App