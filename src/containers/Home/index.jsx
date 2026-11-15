import {
  BarberImage,
  Background,
  BarberPole,
  Content,
  HomeBanner,
  HomeIntro,
  ImageContainer,
  LeftPanel,
  PoleColumn,
  RightPanel,
  Title
} from './styles'
import LogoKings from './Logo Kings Barber.png'
import Banner from '../../assets/banner.jpg'
import Account from '../Account'
import { isBarberAccount } from '../Barber/access'

function Home({ user }) {
  const displayName = user?.displayName || user?.email || 'cliente'
  const isAdministrator = isBarberAccount(user)

  return (
    <Background id="home" $loggedIn={Boolean(user)}>
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
            <Title>
              {isAdministrator
                ? 'Bem Vindo, Administrador'
                : user ? `Bem-vindo, ${displayName}!` : 'Kings Barber'}
            </Title>
            <p>
              {user
                ? 'Que bom ter você por aqui profissional!. Aproveite para gerenciar seus serviços e clientes com facilidade.'
                : 'Bem-vindo à Kings Barber: estilo e atitude em cada detalhe. Conheça nossos serviços e aproveite um atendimento de alto nível.'}
            </p>
          </HomeIntro>
          {user ? (
            <HomeBanner aria-hidden="true">
              <img src={Banner} alt="" />
            </HomeBanner>
          ) : (
            <Account homeLogin />
          )}
        </RightPanel>
      </Content>
    </Background>
  )
}

export default Home
