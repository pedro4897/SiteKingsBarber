import { Brand, Navigation, NavLink, NavLinks } from './Navbar.styles'

const links = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'servicos', label: 'Serviços', href: '#servicos' },
  { id: 'sobre-nos', label: 'Sobre Nós', href: '#sobre-nos' },
  { id: 'conta', label: 'Conta', href: '#conta' }
]

function Navbar({ activeRoute }) {
  return (
    <Navigation aria-label="Navegação principal">
      <Brand href="#home">KingsBarber</Brand>
      <NavLinks>
        {links.map((link) => (
          <NavLink
            key={link.id}
            href={link.href}
            $active={activeRoute === link.id}
            aria-current={activeRoute === link.id ? 'page' : undefined}
          >
            {link.label}
          </NavLink>
        ))}
      </NavLinks>
    </Navigation>
  )
}

export default Navbar
