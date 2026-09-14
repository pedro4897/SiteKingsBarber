import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './containers/Home'
import Services from './containers/Services'

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleNavigation = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handleNavigation)
    return () => window.removeEventListener('popstate', handleNavigation)
  }, [])

  return path.endsWith('/services') ? <Services /> : <Home />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
