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
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 70vh;
  padding: 1rem;
  position: relative;
  z-index: 1;
`

export const BarberImage = styled.img`
  display: block;
  max-width: min(90vw, 700px);
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
`

export const Background = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1e1f1d 0%, #434441 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  height: 100%;
  width: 100%;
`

export const FloatingCrowns = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
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
