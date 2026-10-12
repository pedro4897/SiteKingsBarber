import styled from 'styled-components'

export const Navigation = styled.nav`
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  width: 100%;
  min-height: 4.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.75rem clamp(1rem, 5vw, 4rem);
  border-bottom: 1px solid rgba(214, 168, 79, 0.2);
  background: rgba(24, 26, 29, 0.94);
  backdrop-filter: blur(12px);
`

export const Brand = styled.a`
  color: #f4d48a;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  white-space: nowrap;
`

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.25rem, 2vw, 1.5rem);
`

export const NavLink = styled.a`
  padding: 0.55rem 0.75rem;
  border-radius: 4px;
  color: ${({ $active }) => ($active ? '#f4d48a' : '#f5ead7')};
  background: ${({ $active }) => ($active ? 'rgba(214, 168, 79, 0.12)' : 'transparent')};
  font-size: 0.95rem;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  text-decoration: none;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: #f4d48a;
  }

  @media (max-width: 420px) {
    padding: 0.5rem 0.4rem;
    font-size: 0.85rem;
  }
`
