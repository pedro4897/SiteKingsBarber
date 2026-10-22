import styled from 'styled-components'

export const Navigation = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  width: 15rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem 1.25rem;
  border-right: 1px solid rgba(214, 168, 79, 0.2);
  background: rgba(24, 26, 29, 0.94);
  backdrop-filter: blur(12px);

  @media (max-width: 700px) {
    bottom: auto;
    width: 100%;
    min-height: 5rem;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding: 0.65rem 0.5rem;
    border-right: 0;
    border-bottom: 1px solid rgba(214, 168, 79, 0.2);
  }
`

export const Brand = styled.a`
  color: #f4d48a;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  white-space: nowrap;

  @media (max-width: 700px) {
    display: none;
  }
`

export const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;

  @media (max-width: 700px) {
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.1rem;
  }
`

export const NavLink = styled.a`
  padding: 0.7rem 0.75rem;
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

  @media (max-width: 700px) {
    padding: 0.5rem 0.35rem;
    font-size: clamp(0.68rem, 2.6vw, 0.85rem);
    white-space: nowrap;
  }
`
