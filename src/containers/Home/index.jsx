import { BarberImage, Background, BarberPole, Content, ImageContainer, LeftPanel, PoleColumn, RightPanel, Title } from './styles'
import LogoKings from './Logo Kings Barber.png'

function Home() {
  return (
    <Background id="home">
      <Content>
        <LeftPanel>
          <Title>KingsBarber</Title>
          <p>Bem-vindo ao site da KingsBarber, com estilo e atitude. Conheça nossos serviços e tenha um atendimento de alto nível.</p>
        </LeftPanel>

        <PoleColumn>
          <BarberPole />
        </PoleColumn>

        <RightPanel>
          <ImageContainer>
            <BarberImage src={LogoKings} alt="Logo da KingsBarber" />
          </ImageContainer>
        </RightPanel>
      </Content>
    </Background>
  )
}

export default Home
