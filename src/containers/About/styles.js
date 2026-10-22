import styled from 'styled-components'

export const AboutPage = styled.section`
  font-family: 'Times New Roman', Times, serif;
  display: flex;
  min-height: 75vh;
  align-items: center;
  padding: 4rem clamp(1.25rem, 8vw, 7rem);
  color: #f5ead7;
  background: #222426;
  scroll-margin-top: 5.5rem;
`

export const AboutContent = styled.div`
  max-width: 760px;

  > p {
    font-family: 'Times New Roman', Times, serif;
    margin: 0 0 0.75rem;
    color: #d6a84f;
    font-size: 0.85rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
`

export const AboutTitle = styled.h2`
  margin: 0 0 1.25rem;
  color: #f4d48a;
  font-size: clamp(2.25rem, 6vw, 4rem);
  font-weight: 500;
`

export const AboutText = styled.p`
  margin: 0;
  color: #c7b9a7;
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.8;
`
