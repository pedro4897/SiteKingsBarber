import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import Home from './containers/Home'
import Services from './containers/Services'
import { services } from './containers/Services/services'
import Booking from './containers/Services/Booking'
import Account from './containers/Account'
import Navbar from './components/Navbar'

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
  const [route, setRoute] = useState(window.location.hash)

  useEffect(() => {
    const handleRouteChange = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', handleRouteChange)
    return () => window.removeEventListener('hashchange', handleRouteChange)
  }, [])

  if (route.startsWith('#/agendamento')) {
    const query = route.split('?')[1] ?? ''
    const requestedService = new URLSearchParams(query).get('servico')
    const service = services.find((item) => item.name === requestedService) ?? services[0]

    return <Booking service={service} />
  }

  const currentRoute = route.startsWith('#/servicos')
    ? 'servicos'
    : route.startsWith('#/conta')
      ? 'conta'
      : 'home'

  return (
    <>
      <Navbar activeRoute={currentRoute} />
      {currentRoute === 'servicos' && <Services />}
      {currentRoute === 'conta' && <Account />}
      {currentRoute === 'home' && <Home />}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
)
