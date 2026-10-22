import LogoKings from '../containers/Home/Logo Kings Barber.png'
import HomeIcon from '../assets/icons8-castelo-48.png'
import ServicesIcon from '../assets/icons8-barbeiro-100.png'
import AboutIcon from '../assets/icons8-barbearia-48.png'
import AccountIcon from '../assets/icons8-usuário-40.png'
import {
  Brand,
  BrandLogo,
  BrandName,
  Navigation,
  NavIcon,
  NavLink,
  NavLinks
} from './Navbar.styles'

const links = [
  { id: 'home', label: 'Home', href: '#home', icon: HomeIcon },
  { id: 'servicos', label: 'Serviços', href: '#servicos', icon: ServicesIcon },
  { id: 'sobre-nos', label: 'Sobre Nós', href: '#sobre-nos', icon: AboutIcon },
  { id: 'conta', label: 'Conta', href: '#conta', icon: AccountIcon }
]

function Navbar({ activeRoute }) {
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
    </Navigation>
  )
}

export default Navbar
