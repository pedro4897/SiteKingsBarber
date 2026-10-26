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
  NavLinks,
  NavSword,
  NavSwordMobile
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
      <NavSword viewBox="0 0 24 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="sword-blade" x1="0" x2="1">
            <stop offset="0" stopColor="#a8752d" />
            <stop offset="0.48" stopColor="#f4d48a" />
            <stop offset="1" stopColor="#9e6c27" />
          </linearGradient>
        </defs>
        <g transform="translate(0 1000) scale(1 -1)">
          <path d="M12 12 18 32v858l-6 10-6-10V32z" fill="url(#sword-blade)" />
          <path d="M12 25v858" fill="none" stroke="#fff0c2" strokeOpacity=".7" strokeWidth=".8" />
          <path d="M2 867h20l-2 12H4z" fill="#c99b4a" stroke="#f4d48a" strokeWidth="1.5" />
          <path d="M6 879h12v90l-6 8-6-8z" fill="#6f4b24" stroke="#d6a84f" strokeWidth="1.5" />
          <path d="m6.5 889 11 7m-11 7 11 7m-11 7 11 7m-11 7 11 7m-11 7 11 7m-11 7 11 7m-11 7 11 7" stroke="#e3bd70" strokeWidth="1.5" />
          <circle cx="12" cy="982" r="4" fill="#c99b4a" stroke="#f4d48a" strokeWidth="1.5" />
        </g>
      </NavSword>
      <NavSwordMobile viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="sword-blade-mobile" x1="0" x2="1">
            <stop offset="0" stopColor="#9e6c27" />
            <stop offset="0.52" stopColor="#f4d48a" />
            <stop offset="1" stopColor="#a8752d" />
          </linearGradient>
        </defs>
        <circle cx="14" cy="12" r="9" fill="#c99b4a" stroke="#f4d48a" strokeWidth="2" />
        <path d="M22 7h85v10H22z" fill="#6f4b24" stroke="#d6a84f" strokeWidth="2" />
        <path d="m32 7 8 10m8-10 8 10m8-10 8 10m8-10 8 10m8-10 8 10" stroke="#e3bd70" strokeWidth="2" />
        <path d="m107 3 16 0 8 9-8 9h-16z" fill="#c99b4a" stroke="#f4d48a" strokeWidth="2" />
        <path d="m131 9 827-6 28 9-28 9-827-6z" fill="url(#sword-blade-mobile)" />
        <path d="m136 11 819-6" fill="none" stroke="#fff0c2" strokeOpacity=".7" strokeWidth="1.5" />
      </NavSwordMobile>
    </Navigation>
  )
}

export default Navbar
