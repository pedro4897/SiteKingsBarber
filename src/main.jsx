import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import Home from './containers/Home'
import Services from './containers/Services'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0;
    min-height: 100%;
    width: 100%;
    background: #181a1d;
  }

  body {
    min-height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
  }
`

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
    <GlobalStyle />
    <App />
  </StrictMode>
)
