import {
  BarberImage,
  Background,
  BarberPole,
  Content,
  HomeIntro,
  ImageContainer,
  LeftPanel,
  PoleColumn,
  RightPanel,
  Title
} from './styles'
import LogoKings from './Logo Kings Barber.png'
import Account from '../Account'

function Home() {
  return (
    <Background id="home">
      <Content>
        <LeftPanel>
          <ImageContainer>
            <BarberImage src={LogoKings} alt="Logo da KingsBarber" />
          </ImageContainer>
        </LeftPanel>

        <PoleColumn>
          <BarberPole />
        </PoleColumn>

        <RightPanel>
          <HomeIntro>
            <Title>KingsBarber</Title>
            <p>
              Bem-vindo à KingsBarber: estilo e atitude em cada detalhe.
              Conheça nossos serviços e aproveite um atendimento de alto nível.
            </p>
          </HomeIntro>
          <Account homeLogin />
        </RightPanel>
      </Content>
    </Background>
  )
}

export default Home
