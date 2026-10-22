import styled from 'styled-components'

export const Navigation = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  width: 11rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.25rem 0.75rem;
  border-right: 1px solid rgba(214, 168, 79, 0.2);
  background: rgba(24, 26, 29, 0.94);
  backdrop-filter: blur(12px);

  @media (max-width: 700px) {
    bottom: auto;
    width: 100%;
    min-height: 6.5rem;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 0.15rem;
    padding: 0.3rem 0.5rem 0.4rem;
    border-right: 0;
    border-bottom: 1px solid rgba(214, 168, 79, 0.2);
  }
`

export const Brand = styled.a`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  color: #f4d48a;
  text-decoration: none;
  white-space: nowrap;

  @media (max-width: 700px) {
    width: auto;
    align-self: center;
  }
`

export const BrandLogo = styled.img`
  display: block;
  width: 4.75rem;
  height: 5.25rem;
  align-self: center;
  object-fit: contain;

  @media (max-width: 700px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`

export const BrandName = styled.span`
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.04em;

  @media (max-width: 700px) {
    font-size: 0.85rem;
  }
`

export const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.25rem;
  width: 100%;
  margin-top: 0.25rem;

  @media (max-width: 700px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.1rem;
    margin-top: 0.05rem;
  }
`

export const NavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.5rem 0.55rem;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(214, 168, 79, 0.38)' : 'transparent')};
  border-radius: 8px;
  color: ${({ $active }) => ($active ? '#f4d48a' : '#f5ead7')};
  background: ${({ $active }) => ($active ? 'rgba(214, 168, 79, 0.12)' : 'transparent')};
  font-size: 0.95rem;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  text-decoration: none;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: #f4d48a;
    background: rgba(214, 168, 79, 0.1);
  }

  @media (max-width: 700px) {
    flex: 1;
    flex-direction: column;
    justify-content: center;
    gap: 0.2rem;
    min-width: 0;
    padding: 0.3rem 0.15rem;
    font-size: clamp(0.62rem, 2.6vw, 0.78rem);
    white-space: nowrap;
  }
`

export const NavIcon = styled.img`
  display: block;
  width: 1.55rem;
  height: 1.55rem;
  flex: 0 0 auto;
  object-fit: contain;
  filter: ${({ $highlight }) =>
    $highlight
      ? 'brightness(0) saturate(100%) invert(84%) sepia(31%) saturate(527%) hue-rotate(352deg) brightness(101%) contrast(92%)'
      : 'none'};

  @media (max-width: 700px) {
    width: 1.2rem;
    height: 1.2rem;
  }
`
