import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Nav from './Nav'
import Main from './Main'
import Footer from './Footer'
import './App.css'

function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, key])

  return null
}

function App() {
  return (
    <>
      <ScrollManager />
      <Header />
      <Nav />
      <Main />
      <Footer />
    </>
  )
}

export default App
