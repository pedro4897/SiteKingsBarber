import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createGlobalStyle, keyframes, styled } from 'styled-components'
import { onAuthStateChanged } from 'firebase/auth'
import Home from './containers/Home'
import Services from './containers/Services'
import { services } from './containers/Services/services'
import Booking from './containers/Services/Booking'
import Account from './containers/Account'
import About from './containers/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { firebaseAuth } from './firebase'

const crownSpecs = [
  { id: 1, symbol: '👑', size: 44, left: '8%', top: '12%', duration: 12, delay: 0 },
  { id: 2, symbol: '♔', size: 34, left: '24%', top: '22%', duration: 16, delay: 1.5 },
  { id: 3, symbol: '👑', size: 56, left: '68%', top: '8%', duration: 14, delay: 2.2 },
  { id: 4, symbol: '♛', size: 32, left: '85%', top: '32%', duration: 18, delay: 0.8 },
  { id: 5, symbol: '👑', size: 40, left: '12%', top: '72%', duration: 15, delay: 3.4 },
  { id: 6, symbol: '♚', size: 30, left: '52%', top: '78%', duration: 17, delay: 2.9 },
  { id: 7, symbol: '👑', size: 36, left: '76%', top: '66%', duration: 13, delay: 4.1 }
]

const floatAcross = keyframes`
  0% {
    transform: translate3d(-10vw, 0, 0) rotate(0deg);
    opacity: 0;
  }
  15% {
    opacity: 0.28;
  }
  50% {
    transform: translate3d(50vw, -20vh, 0) rotate(180deg);
    opacity: 0.9;
  }
  100% {
    transform: translate3d(115vw, -35vh, 0) rotate(360deg);
    opacity: 0;
  }
`

const CrownBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
`

const FloatingCrown = styled.span`
  position: absolute;
  display: inline-block;
  color: rgba(255, 215, 0, 0.9);
  font-size: ${({ $size }) => $size}px;
  opacity: 0;
  text-shadow: 0 0 18px rgba(255, 215, 0, 0.45);
  animation: ${floatAcross} ${({ $duration }) => $duration}s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`

const PageContent = styled.div`
  position: relative;
  z-index: 1;
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
  const [user, setUser] = useState(firebaseAuth?.currentUser ?? null)
  const [isAuthReady, setIsAuthReady] = useState(!firebaseAuth)

  useEffect(() => {
    const handleRouteChange = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', handleRouteChange)
    return () => window.removeEventListener('hashchange', handleRouteChange)
  }, [])

  useEffect(() => {
    if (!firebaseAuth) {
      return undefined
    }

    return onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser)
      setIsAuthReady(true)
    })
  }, [])

  useEffect(() => {
    if ((route !== '#agendamentos' && route !== '#/agendamentos') || !isAuthReady) {
      return
    }

    if (user) {
      window.sessionStorage.removeItem('kingsbarber-return-to-appointments')
      return
    }

    window.sessionStorage.setItem('kingsbarber-return-to-appointments', 'true')
    window.location.hash = '#conta'
  }, [route, user, isAuthReady])

  useEffect(() => {
    if (
      (route === '#conta' || route === '#/conta') &&
      user &&
      window.sessionStorage.getItem('kingsbarber-return-to-appointments') === 'true'
    ) {
      window.sessionStorage.removeItem('kingsbarber-return-to-appointments')
      window.location.hash = '#agendamentos'
    }
  }, [route, user])

  if (route === '#/agendamento' || route.startsWith('#/agendamento?')) {
    const query = route.split('?')[1] ?? ''
    const requestedService = new URLSearchParams(query).get('servico')
    const service = services.find((item) => item.name === requestedService) ?? services[0]

    return (
      <>
        <Booking service={service} />
        <Footer />
      </>
    )
  }

  if (
    (route === '#agendamentos' || route === '#/agendamentos') &&
    isAuthReady &&
    user
  ) {
    return (
      <>
        <Navbar activeRoute="agendamentos" />
        <PageContent>
          <Account appointmentsOnly />
        </PageContent>
        <Footer />
      </>
    )
  }

  const activeRoute = route === '#servicos' || route === '#/servicos'
    ? 'servicos'
    : route === '#conta' || route === '#/conta'
      ? 'conta'
      : route === '#agendamentos' || route === '#/agendamentos'
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
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <CrownBackground aria-hidden="true">
      {crownSpecs.map((crown) => (
        <FloatingCrown
          key={crown.id}
          $size={crown.size}
          $duration={crown.duration}
          $delay={crown.delay}
          style={{ left: crown.left, top: crown.top }}
        >
          {crown.symbol}
        </FloatingCrown>
      ))}
    </CrownBackground>
    <App />
  </StrictMode>
)
