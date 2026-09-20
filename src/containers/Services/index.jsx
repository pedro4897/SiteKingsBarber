import {
  BackButton,
  BookingButton,
  BookingCard,
  BookingGrid,
  BookingPage,
  Crown,
  Header,
  Intro,
  Price,
  ServiceDescription,
  ServiceTitle,
  FloatingCrowns
} from './styles'

const crowns = [
  { id: 1, symbol: '👑', size: 44, left: '8%', top: '12%', duration: 12, delay: 0 },
  { id: 2, symbol: '♔', size: 34, left: '24%', top: '22%', duration: 16, delay: 1.5 },
  { id: 3, symbol: '👑', size: 56, left: '68%', top: '8%', duration: 14, delay: 2.2 },
  { id: 4, symbol: '♛', size: 32, left: '85%', top: '32%', duration: 18, delay: 0.8 },
  { id: 5, symbol: '👑', size: 40, left: '12%', top: '72%', duration: 15, delay: 3.4 },
  { id: 6, symbol: '♚', size: 30, left: '52%', top: '78%', duration: 17, delay: 2.9 },
  { id: 7, symbol: '👑', size: 36, left: '76%', top: '66%', duration: 13, delay: 4.1 }
]

const services = [
  {
    name: 'Corte clássico',
    description: 'Acabamento preciso e atemporal para todos os estilos.',
    price: 'R$ 45'
  },
  {
    name: 'Corte + barba',
    description: 'Corte completo com desenho e cuidado especial para a barba.',
    price: 'R$ 70'
  },
  {
    name: 'Barba premium',
    description: 'Toalha quente, alinhamento e finalização com produtos premium.',
    price: 'R$ 35'
  }
]

function Services() {
  const goHome = () => {
    window.history.pushState({}, '', window.location.pathname.replace(/\/services\/?$/, '') || '/')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <BookingPage>
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

      <Header>
        <BackButton onClick={goHome}>Voltar</BackButton>
        <span>KingsBarber</span>
      </Header>

      <Intro>
        <p>Agende seu momento</p>
        <h1>Escolha o seu corte</h1>
        <span>Selecione um serviço para continuar o agendamento.</span>
      </Intro>

      <BookingGrid>
        {services.map((service) => (
          <BookingCard key={service.name}>
            <ServiceTitle>{service.name}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
            <Price>{service.price}</Price>
            <BookingButton type="button" onClick={() => alert(`Serviço selecionado: ${service.name}`)}>
              Escolher horário
            </BookingButton>
          </BookingCard>
        ))}
      </BookingGrid>
    </BookingPage>
  )
}

export default Services