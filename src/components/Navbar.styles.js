import styled from 'styled-components'

const swordFall = `
  @keyframes sword-fall {
    0% {
      transform: translate(-50%, calc(-50% - 100vh)) rotate(-45deg);
    }
    78% {
      transform: translate(-50%, -44%) rotate(-45deg);
    }
    90% {
      transform: translate(-50%, -52%) rotate(-45deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`

const swordFallMobile = `
  @keyframes sword-fall-mobile {
    0% {
      transform: translate(-50%, calc(50% - 100vh)) rotate(-135deg);
    }
    78% {
      transform: translate(-50%, 56%) rotate(-135deg);
    }
    90% {
      transform: translate(-50%, 46%) rotate(-135deg);
    }
    100% {
      transform: translate(-50%, 50%) rotate(-135deg);
    }
  }
`

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
  gap: 1.25rem;
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
  gap: 0.8rem;
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

export const NavSword = styled.img`
  position: absolute;
  top: 50%;
  left: calc(100% + 1.5rem);
  width: 70.72vh;
  height: 70.72vh;
  object-fit: contain;
  transform: translate(-50%, -50%) rotate(-45deg);
  pointer-events: none;
  ${({ $animate }) => $animate && `animation: sword-fall 700ms cubic-bezier(0.2, 0.7, 0.2, 1) both;`}
  ${swordFall}

  @media (max-width: 700px) {
    top: auto;
    bottom: 0;
    left: 50%;
    width: calc((100vw - 1.5rem) * 0.7072);
    height: calc((100vw - 1.5rem) * 0.7072);
    transform: translate(-50%, 50%) rotate(-135deg);
    ${({ $animate }) => $animate && `animation: sword-fall-mobile 700ms cubic-bezier(0.2, 0.7, 0.2, 1) both;`}
    ${swordFallMobile}
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
