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
  padding: 6rem 1rem 2rem;
  background: #181a1d;
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

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

export const LeftPanel = styled.div`
  position: relative;
  z-index: 1;
  width: calc(100% + 24px);
  margin-right: -24px;
  background: #3c3c35;
  border-radius: 24px 0 0 24px;
  clip-path: polygon(0 0, 100% 0, calc(100% - 24px) 100%, 0 100%);
  padding: 3rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #e2d4d4;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.28);

  @media (max-width: 700px) {
    width: 100%;
    margin-right: 0;
    min-height: 35vh;
    padding: 2rem;
    border-radius: 24px;
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

  @media (max-width: 700px) {
    display: none;
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
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.2);
  clip-path: polygon(35% 0, 100% 0, 65% 100%, 0 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const RightPanel = styled.div`
  position: relative;
  z-index: 1;
  width: calc(100% + 24px);
  margin-left: -24px;
  background: #121416;
  border-radius: 0 24px 24px 0;
  clip-path: polygon(24px 0, 100% 0, 100% 100%, 0 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.28);
  padding: 2rem;

  @media (max-width: 700px) {
    width: 100%;
    margin-left: 0;
    min-height: 35vh;
    border-radius: 24px;
    clip-path: none;
  }
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
