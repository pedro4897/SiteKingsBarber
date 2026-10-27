import styled from 'styled-components'

const FooterBar = styled.footer`
  position: relative;
  z-index: 1;
  padding: 2rem clamp(14rem, 5vw, 4rem);
  border-top: 1px solid rgba(214, 168, 79, 0.3);
  color: #c7b9a7;
  background: rgba(24, 26, 29, 0.94);

  @media (max-width: 700px) {
    padding: 2rem 1.25rem;
  }
`



const Brand = styled.div`
  h2 {
    margin: 0 0 0.4rem;
    color: #f4d48a;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
  }
`



function Footer() {
  return (
    <FooterBar>
        <Brand>
          <h2>KingsBarber</h2>
          <p>Estilo e atitude em cada detalhe.</p>
        </Brand>
       
    </FooterBar>
  )
}

export default Footer
