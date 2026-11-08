import {
  BarberImage,
  BarbershopImagePlaceholder,
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

function Home({ user }) {
  const displayName = user?.displayName || user?.email || 'cliente'

  return (
    <Background id="home">
      <Content $loggedIn={Boolean(user)}>
        {!user && (
          <LeftPanel>
            <ImageContainer>
              <BarberImage src={LogoKings} alt="Logo da KingsBarber" />
            </ImageContainer>
          </LeftPanel>
        )}

        <PoleColumn $loggedIn={Boolean(user)}>
          <BarberPole $loggedIn={Boolean(user)} />
        </PoleColumn>

        <RightPanel $loggedIn={Boolean(user)}>
          <HomeIntro $loggedIn={Boolean(user)}>
            <Title>{user ? `Bem-vindo, ${displayName}!` : 'KingsBarber'}</Title>
            <p>
              {user
                ? 'Que bom ter você por aqui. Prepare-se para renovar o visual com a gente.'
                : 'Bem-vindo à KingsBarber: estilo e atitude em cada detalhe. Conheça nossos serviços e aproveite um atendimento de alto nível.'}
            </p>
          </HomeIntro>
          {user ? (
            <BarbershopImagePlaceholder
              role="img"
              aria-label="Espaço reservado para uma imagem da barbearia"
            >
              Imagem da barbearia
            </BarbershopImagePlaceholder>
          ) : (
            <Account homeLogin />
          )}
        </RightPanel>
      </Content>
    </Background>
  )
}

export default Home
