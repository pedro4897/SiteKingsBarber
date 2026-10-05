import {
  BookingButton,
  BookingCard,
  BookingGrid,
  BookingPage,
  Crown,
  Intro,
  Price,
  ServiceImage,
  ServiceDescription,
  ServiceTitle,
  FloatingCrowns
} from './styles'
import { services } from './services'

const crowns = [
  { id: 1, symbol: '👑', size: 44, left: '8%', top: '12%', duration: 12, delay: 0 },
  { id: 2, symbol: '♔', size: 34, left: '24%', top: '22%', duration: 16, delay: 1.5 },
  { id: 3, symbol: '👑', size: 56, left: '68%', top: '8%', duration: 14, delay: 2.2 },
  { id: 4, symbol: '♛', size: 32, left: '85%', top: '32%', duration: 18, delay: 0.8 },
  { id: 5, symbol: '👑', size: 40, left: '12%', top: '72%', duration: 15, delay: 3.4 },
  { id: 6, symbol: '♚', size: 30, left: '52%', top: '78%', duration: 17, delay: 2.9 },
  { id: 7, symbol: '👑', size: 36, left: '76%', top: '66%', duration: 13, delay: 4.1 }
]

function Services() {
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

      <Intro>
        <p>Agende seu momento</p>
        <h1>Escolha o seu corte</h1>
        <span>Selecione um serviço para continuar o agendamento.</span>
      </Intro>

      <BookingGrid>
        {services.map((service) => (
          <BookingCard key={service.name}>
            <ServiceImage src={service.image} alt={service.name} />
            <ServiceTitle>{service.name}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
            <Price>{service.price}</Price>
            <BookingButton
              type="button"
              onClick={() => {
                window.location.hash = `/agendamento?servico=${encodeURIComponent(service.name)}`
              }}
            >
              Escolher horário
            </BookingButton>
          </BookingCard>
        ))}
      </BookingGrid>
    </BookingPage>
  )
}

export default Services