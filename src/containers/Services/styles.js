import styled from 'styled-components'

export const BookingPage = styled.main`
  min-height: 100vh;
  padding: 2rem clamp(1.25rem, 5vw, 5rem);
  color: #f5ead7;
  background: radial-gradient(circle at top right, #45321f 0, #171312 42%, #0e0d0c 100%);
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1120px;
  margin: 0 auto;
  color: #d6a84f;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

export const BackButton = styled.button`
  padding: 0.65rem 1rem;
  border: 1px solid #87652d;
  border-radius: 5px;
  color: #f5ead7;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: 0.78rem;
  letter-spacing: 0.04em;

  &:hover {
    background: #87652d;
  }
`

export const Intro = styled.section`
  max-width: 1120px;
  margin: clamp(4rem, 10vh, 7rem) auto 3rem;

  p {
    margin: 0 0 0.75rem;
    color: #d6a84f;
    font-size: 0.85rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0 0 1rem;
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 500;
    line-height: 0.95;
  }

  span {
    color: #b8aa99;
    font-size: 1.05rem;
  }
`

export const BookingGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 1120px;
  margin: 0 auto;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`

export const BookingCard = styled.article`
  display: flex;
  flex-direction: column;
  min-height: 250px;
  padding: 1.75rem;
  border: 1px solid rgba(214, 168, 79, 0.35);
  border-radius: 8px;
  background: rgba(45, 31, 21, 0.78);
`

export const ServiceTitle = styled.h2`
  margin: 0;
  color: #f4d48a;
  font-size: 1.35rem;
`

export const ServiceDescription = styled.p`
  min-height: 3.5rem;
  margin: 1rem 0;
  color: #c7b9a7;
  line-height: 1.5;
`

export const Price = styled.strong`
  margin-top: auto;
  color: #fff2cc;
  font-size: 1.4rem;
`

export const BookingButton = styled.button`
  margin-top: 1.25rem;
  padding: 0.85rem 1rem;
  border: 0;
  border-radius: 4px;
  color: #20170e;
  background: #d6a84f;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background: #f0c96d;
  }
`