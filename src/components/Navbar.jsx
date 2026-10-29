import { useEffect, useRef, useState } from 'react'
import LogoKings from '../containers/Home/Logo Kings Barber.png'
import HomeIcon from '../assets/icons8-castelo-48.png'
import ServicesIcon from '../assets/icons8-barbeiro-100.png'
import AboutIcon from '../assets/icons8-barbearia-48.png'
import AccountIcon from '../assets/icons8-usuário-40.png'
import AppointmentsIcon from '../assets/icons8-agendamentos.svg'
import SwordImage from '../assets/espada.png'
import {
  Brand,
  BrandLogo,
  BrandName,
  Navigation,
  NavIcon,
  NavLink,
  NavLinks,
  NavSword
} from './Navbar.styles'

const links = [
  { id: 'home', label: 'Home', href: '#home', icon: HomeIcon },
  { id: 'servicos', label: 'Serviços', href: '#servicos', icon: ServicesIcon },
  { id: 'sobre-nos', label: 'Sobre Nós', href: '#sobre-nos', icon: AboutIcon },
  { id: 'conta', label: 'Conta', href: '#conta', icon: AccountIcon },
  { id: 'agendamentos', label: 'Agendamentos', href: '#agendamentos', icon: AppointmentsIcon }
]

function Navbar({ activeRoute }) {
  const previousRoute = useRef(activeRoute)
  const [animateSword, setAnimateSword] = useState(false)

  useEffect(() => {
    if (previousRoute.current !== activeRoute) {
      previousRoute.current = activeRoute
      setAnimateSword(true)
    }
  }, [activeRoute])

  return (
    <Navigation aria-label="Navegação principal">
      <Brand href="#home" aria-label="KingsBarber - Home">
        <BrandLogo src={LogoKings} alt="" />
        <BrandName>KingsBarber</BrandName>
      </Brand>
      <NavLinks>
        {links.map((link) => (
          <NavLink
            key={link.id}
            href={link.href}
            $active={activeRoute === link.id}
            aria-current={activeRoute === link.id ? 'page' : undefined}
          >
            <NavIcon src={link.icon} alt="" $highlight={link.id === 'servicos'} />
            {link.label}
          </NavLink>
        ))}
      </NavLinks>
      <NavSword
        key={activeRoute}
        src={SwordImage}
        alt=""
        aria-hidden="true"
        $animate={animateSword}
      />
    </Navigation>
  )
}

export default Navbar
