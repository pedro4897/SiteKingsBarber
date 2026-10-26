import {
  BookingButton,
  BookingCard,
  BookingGrid,
  BookingPage,
  Intro,
  Price,
  ServiceImage,
  ServiceDescription,
  ServiceTitle
} from './styles'
import { services } from './services'

function Services() {
  return (
    <BookingPage id="servicos">
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