import { ActionButton, BarberImage, Background, BarberPole, Content, Crown, FloatingCrowns, ImageContainer, LeftPanel, PoleColumn, RightPanel, Title } from './styles'
import LogoKingsBarber from './LogoKingsBarber.png'

const crowns = [
  { id: 1, symbol: '👑', size: 44, left: '8%', top: '12%', duration: 12, delay: 0 },
  { id: 2, symbol: '♔', size: 34, left: '24%', top: '22%', duration: 16, delay: 1.5 },
  { id: 3, symbol: '👑', size: 56, left: '68%', top: '8%', duration: 14, delay: 2.2 },
  { id: 4, symbol: '♛', size: 32, left: '85%', top: '32%', duration: 18, delay: 0.8 },
  { id: 5, symbol: '👑', size: 40, left: '12%', top: '72%', duration: 15, delay: 3.4 },
  { id: 6, symbol: '♚', size: 30, left: '52%', top: '78%', duration: 17, delay: 2.9 },
  { id: 7, symbol: '👑', size: 36, left: '76%', top: '66%', duration: 13, delay: 4.1 }
]

function Home() {
  return (
    <Background>
      <FloatingCrowns>
        {crowns.map((crown) => (
          <Crown
            key={crown.id}
            $size={crown.size}
            $duration={crown.duration}
            $delay={crown.delay}
            style={{ left: crown.left, top: crown.top }}
          >
            {crown.symbol}
          </Crown>
        ))}
      </FloatingCrowns>

      <Content>
        <LeftPanel>
          <Title>KingsBarber</Title>
          <p>Bem-vindo ao Site das KingsBarber com estilo e atitude. Conheça nossos cortes com atendimento de alto nível.</p>
          <ActionButton onClick={() => window.location.href = '/services'}>Agendar Corte</ActionButton>
        </LeftPanel>

        <PoleColumn>
          <BarberPole />
        </PoleColumn>

        <RightPanel>
          <ImageContainer>
            <BarberImage src={LogoKingsBarber} alt="Logo KingsBarber" />
          </ImageContainer>
        </RightPanel>
      </Content>
    </Background>
  )
}

export default Home
