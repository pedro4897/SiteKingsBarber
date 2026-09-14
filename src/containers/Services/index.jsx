import {
  BackButton,
  BookingButton,
  BookingCard,
  BookingGrid,
  BookingPage,
  Header,
  Intro,
  Price,
  ServiceDescription,
  ServiceTitle
} from './styles'

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