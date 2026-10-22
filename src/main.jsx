import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createGlobalStyle, styled } from 'styled-components'
import Home from './containers/Home'
import Services from './containers/Services'
import { services } from './containers/Services/services'
import Booking from './containers/Services/Booking'
import Account from './containers/Account'
import About from './containers/About'
import Navbar from './components/Navbar'

const PageContent = styled.div`
  min-width: 0;
  margin-left: 11rem;

  @media (max-width: 700px) {
    margin-left: 0;
    padding-top: 8rem;
  }
`

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  html, body, #root {
    margin: 0;
    min-height: 100%;
    width: 100%;
    background: #181a1d;
  }

  body {
    min-height: 100vh;
    font-family: 'Times New Roman', Times, serif;
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

  const activeRoute = route === '#servicos' || route === '#/servicos'
    ? 'servicos'
    : route === '#conta' || route === '#/conta'
      ? 'conta'
      : route === '#sobre-nos'
        ? 'sobre-nos'
        : 'home'

  return (
    <>
      <Navbar activeRoute={activeRoute} />
      <PageContent>
        <Home />
        <Services />
        <About />
        <Account />
      </PageContent>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
)
