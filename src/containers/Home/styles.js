import styled, { keyframes } from 'styled-components'

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

export const Title = styled.h1`
  color: #968013;
  color: rgba(255, 215, 0, 0.9);
  text-shadow: 0 0 18px rgba(255, 215, 0, 0.45);
  font-size: 3rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 52vh;
  overflow: hidden;
  border-radius: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BarberImage = styled.img`
  width: 70%;
  height: 80%;
  object-fit: cover;
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
  background: #181a1d;
`

export const Content = styled.div`
  position: relative;
  z-index: 2;
  width: min(1120px, 100%);
  max-width: 1200px;
  display: grid;
  grid-template-columns: minmax(320px, 1fr) minmax(100px, 120px) minmax(320px, 1fr);
  gap: 1.5rem;
  min-height: 70vh;
  align-items: stretch;
`

export const LeftPanel = styled.div`
  position: relative;
  background: #393f49;
  border-radius: 36px;
  padding: 3rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #f5f5f5;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.28);
  clip-path: polygon(0 0, 100% 0, 88% 100%, 0 100%);
`

export const PoleColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`

export const BarberPole = styled.div`
  width: 34px;
  height: 90%;
  min-height: 420px;
  max-height: 84vh;
  border-radius: 999px;
  background: repeating-linear-gradient(
    135deg,
    #fff 0,
    #fff 12px,
    #d41f33 12px,
    #d41f33 24px,
    #0f56a3 24px,
    #0f56a3 36px
  );
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 18px 40px rgba(0, 0, 0, 0.2);
  transform: rotate(14deg);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 48px;
    height: 16px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.92);
  }

  &::before {
    top: -10px;
  }

  &::after {
    bottom: -10px;
  }
`

export const RightPanel = styled.div`
  position: relative;
  background: #121416;
  border-radius: 36px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.28);
  clip-path: polygon(12% 0, 100% 0, 100% 100%, 0 100%);
  padding: 2rem;
`

export const FloatingCrowns = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
`

export const Crown = styled.span`
  position: absolute;
  display: inline-block;
  font-size: ${({ $size }) => $size}px;
  opacity: 0;
  color: rgba(255, 215, 0, 0.9);
  text-shadow: 0 0 18px rgba(255, 215, 0, 0.45);
  animation: ${floatAcross} ${({ $duration }) => $duration}s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;
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
