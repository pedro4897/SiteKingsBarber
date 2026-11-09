import styled from 'styled-components'

export const Title = styled.h1`
  color: rgba(255, 215, 0, 0.9);
  text-shadow: 0 0 18px rgba(255, 215, 0, 0.45);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: bold;
  margin: 0 0 0.75rem;
  position: relative;
  z-index: 1;

  @media (max-width: 700px) {
    font-size: clamp(2rem, 9vw, 3rem);
  }
`

export const HomeIntro = styled.div`
  margin: 0 0 1.25rem;

  p {
    max-width: 36rem;
    margin: 0;
    color: #e2d4d4;
    font-size: clamp(0.95rem, 1.5vw, 1.1rem);
    line-height: 1.6;
  }

  ${({ $loggedIn }) => $loggedIn && `
    width: 100%;
    text-align: center;

    p {
      margin-right: auto;
      margin-left: auto;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    }
  `}
`

export const ImageContainer = styled.div`
  position: relative;
  width: min(100%, 420px);
  height: min(100%, 520px);
  min-height: 0;
  padding: 1rem;
  overflow: hidden;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BarberImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`

export const Background = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: transparent;
  scroll-margin-top: 5.5rem;

  ${({ $loggedIn }) => $loggedIn && `
    min-height: 100vh;
    padding: 0;
  `}

  @media (max-width: 700px) {
    min-height: auto;
    padding: 1.25rem 0.75rem;

    ${({ $loggedIn }) => $loggedIn && `
      min-height: calc(100vh - 8rem);
      padding: 0;
    `}
  }
`

export const Content = styled.div`
  position: relative;
  z-index: 2;
  width: min(1120px, 100%);
  max-width: 1200px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 68px minmax(0, 1fr);
  gap: 0;
  min-height: 70vh;
  align-items: stretch;

  ${({ $loggedIn }) => $loggedIn && `
    width: 100%;
    max-width: none;
    min-height: 100vh;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 8px minmax(0, 1fr);
    overflow: hidden;
    border: 1px solid rgba(214, 168, 79, 0.8);
    background: transparent;
  `}

  @media (max-width: 700px) {
    width: 100%;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.75rem;
    min-height: 0;
    ${({ $loggedIn }) => $loggedIn && `
      min-height: calc(100vh - 8rem);
      gap: 0;
    `}
  }
`

export const HomeBanner = styled.div`
  position: relative;
  isolation: isolate;
  flex: 0 0 auto;
  width: calc(100% + 6rem);
  height: clamp(220px, 38vh, 440px);
  margin: clamp(2rem, 6vh, 5rem) 0 0 -3rem;
  overflow: hidden;

  &::after {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        to right,
        #181a1d 0%,
        rgba(24, 26, 29, 0.55) 24px,
        transparent 140px,
        transparent calc(100% - 140px),
        rgba(24, 26, 29, 0.55) calc(100% - 24px),
        #181a1d 100%
      ),
      linear-gradient(
        to bottom,
        #181a1d 0%,
        transparent 72px,
        transparent calc(100% - 72px),
        #181a1d 100%
      );
    content: '';
    pointer-events: none;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.95;
    filter: brightness(1) saturate(0.95);
  }

  @media (min-width: 1200px) {
    height: clamp(360px, 48vh, 600px);
  }

  @media (max-width: 700px) {
    width: calc(100% + 2.5rem);
    height: clamp(180px, 30vh, 300px);
    margin-left: -1.25rem;
  }
`

export const LeftPanel = styled.div`
  position: relative;
  z-index: 1;
  width: calc(100% + 24px);
  margin-right: -24px;
  background: transparent;
  border-radius: 24px 0 0 24px;
  clip-path: polygon(0 0, 100% 0, calc(100% - 24px) 100%, 0 100%);
  padding: 2rem 3rem 2rem 2rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.28);

  @media (max-width: 700px) {
    width: 100%;
    margin: 0;
    min-height: 0;
    padding: 0.75rem;
    border-radius: 12px;
    clip-path: none;
  }
`

export const PoleColumn = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  ${({ $loggedIn }) => $loggedIn && `
    grid-column: 1;
    grid-row: 1;
    height: 8px;
    overflow: hidden;
  `}

  @media (max-width: 700px) {
    ${({ $loggedIn }) => !$loggedIn && 'display: none;'}
  }
`

export const BarberPole = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  max-height: none;
  background: repeating-linear-gradient(
    135deg,
    #fff 0,
    #fff 12px,
    #d41f33 12px,
    #d41f33 24px,
    #0f56a3 24px,
    #0f56a3 36px
  );
  background-size: 50.91px 50.91px;
  background-position: 0 0;
  animation: ${({ $loggedIn }) => $loggedIn
    ? 'barber-pole-fall 1.2s linear infinite'
    : 'barber-pole-sideways 1.2s linear infinite'};
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $loggedIn }) => $loggedIn && `
    height: 100%;
    min-height: 0;
    box-shadow: none;
    clip-path: none;
  `}

  @keyframes barber-pole-fall {
    to {
      background-position: 0 50.91px;
    }
  }

  @keyframes barber-pole-sideways {
    to {
      background-position: 50.91px 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const RightPanel = styled.div`
  position: relative;
  z-index: 1;
  width: calc(100% + 24px);
  margin-left: -24px;
  background: #73673d;
  border-radius: 0 24px 24px 0;
  clip-path: polygon(24px 0, 100% 0, 100% 100%, 0 100%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.28);
  padding: clamp(1.5rem, 4vw, 3rem);
  
  ${({ $loggedIn }) => $loggedIn && `
    grid-column: 1;
    grid-row: 2;
    width: 100%;
    min-height: 0;
    margin: 0;
    border-radius: 0;
    clip-path: none;
    background: transparent;
    box-shadow: none;
  `}

  @media (max-width: 700px) {
    width: 100%;
    margin: 0;
    min-height: 0;
    border-radius: 12px;
    clip-path: none;
    padding: 1.25rem;
  }

  ${({ $loggedIn }) => $loggedIn && `
    @media (max-width: 700px) {
      padding: 1.25rem;
      border-radius: 0;
    }
  `}
`

export const ActionButton = styled.button`
 background-color: #968013;
 color: rgba(255, 215, 0, 0.9);
 text-shadow: 0 0 18px rgba(255, 215, 0, 0.45);
 color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
 margin-top: 1rem;
  

 &:hover {
   background-color: #45412f;
 }
`
