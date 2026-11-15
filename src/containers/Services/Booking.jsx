import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  Timestamp,
  where
} from 'firebase/firestore'
import { firebaseAuth, firebaseConfigError, firebaseDb } from '../../firebase'
import LogoKings from '../Home/Logo Kings Barber.png'
import Account from '../Account'
import {
  createDefaultAvailability,
  getAvailableTimes,
  isWorkingDay
} from '../Barber/availability'
import {
  AppointmentForm,
  ConfirmButton,
  Confirmation,
  DateButton,
  DateGrid,
  FormField,
  ReturnButton,
  ScheduleContent,
  ScheduleHeader,
  ScheduleLogo,
  SchedulePage,
  ScheduleSection,
  ScheduleSubtitle,
  ScheduleTitle,
  SectionTitle,
  SelectionSummary,
  TimeButton,
  TimeGrid
} from './styles'

function getDateValue(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function getAvailableDates() {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date()
    date.setHours(12, 0, 0, 0)
    date.setDate(date.getDate() + index + 1)
    return date
  })
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length < 3) return digits

  const areaCode = digits.slice(0, 2)
  const subscriber = digits.slice(2)
  if (subscriber.length <= 4) return `(${areaCode}) ${subscriber}`

  const splitAt = digits.length === 10 ? 6 : 7
  return `(${areaCode}) ${digits.slice(2, splitAt)}-${digits.slice(splitAt)}`
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(new Date(`${dateValue}T12:00:00`))
}

function Booking({ service }) {
  const [dates] = useState(getAvailableDates)
  const [selectedDate, setSelectedDate] = useState(getDateValue(dates[0]))
  const [selectedTime, setSelectedTime] = useState('')
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [accountAppointments, setAccountAppointments] = useState([])
  const [user, setUser] = useState(firebaseAuth?.currentUser ?? null)
  const [isAuthReady, setIsAuthReady] = useState(!firebaseAuth)
  const [availability, setAvailability] = useState(null)
  const [isAvailabilityConfigured, setIsAvailabilityConfigured] = useState(false)
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(Boolean(firebaseAuth))
  const [confirmedAppointment, setConfirmedAppointment] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!firebaseAuth) {
      return undefined
    }

    const unsubscribeAuth = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser)
      setIsAuthReady(true)
      setNotice('')
    })

    return () => {
      unsubscribeAuth()
    }
  }, [])

  useEffect(() => {
    if (!user || !firebaseDb) {
      setAccountAppointments([])
      setAvailability(null)
      setIsAvailabilityConfigured(false)
      setIsLoadingAvailability(false)
      return undefined
    }

    setIsLoadingAvailability(true)
    let sharedAppointments = []
    let legacyAppointments = []
    const updateAppointments = () => {
      setAccountAppointments([...sharedAppointments, ...legacyAppointments])
    }

    const unsubscribeSharedAppointments = onSnapshot(
      query(collection(firebaseDb, 'appointments'), where('userId', '==', user.uid)),
      (snapshot) => {
        sharedAppointments = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data()
        }))
        updateAppointments()
      },
      (error) => setNotice(`Não foi possível carregar os agendamentos: ${error.message}`)
    )
    const unsubscribeLegacyAppointments = onSnapshot(
      collection(firebaseDb, 'users', user.uid, 'appointments'),
      (snapshot) => {
        legacyAppointments = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data()
        }))
        updateAppointments()
      },
      (error) => setNotice(`Não foi possível carregar os agendamentos antigos: ${error.message}`)
    )
    const unsubscribeAvailability = onSnapshot(
      doc(firebaseDb, 'settings', 'availability'),
      (snapshot) => {
        setAvailability(snapshot.exists() ? snapshot.data() : createDefaultAvailability())
        setIsAvailabilityConfigured(snapshot.exists())
        setIsLoadingAvailability(false)
      },
      (error) => {
        setAvailability(null)
        setIsAvailabilityConfigured(false)
        setIsLoadingAvailability(false)
        setNotice(`Não foi possível carregar os horários disponíveis: ${error.message}`)
      }
    )

    return () => {
      unsubscribeSharedAppointments()
      unsubscribeLegacyAppointments()
      unsubscribeAvailability()
    }
  }, [user])

  useEffect(() => {
    if (!availability) return

    const currentDate = dates.find((date) => getDateValue(date) === selectedDate)
    if (currentDate && !isWorkingDay(currentDate, availability)) {
      const nextWorkingDate = dates.find((date) => isWorkingDay(date, availability))
      if (nextWorkingDate) setSelectedDate(getDateValue(nextWorkingDate))
      setSelectedTime('')
    } else if (
      currentDate
      && selectedTime
      && !getAvailableTimes(currentDate, availability).includes(selectedTime)
    ) {
      setSelectedTime('')
    }
  }, [availability, dates, selectedDate, selectedTime])

  const goBack = () => {
    window.location.hash = 'servicos'
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!user || !firebaseDb) {
      setNotice(firebaseConfigError || 'Entre na sua conta para solicitar um agendamento.')
      return
    }

    const appointment = {
      service: service.name,
      date: selectedDate,
      time: selectedTime,
      name: name.trim(),
      whatsapp,
      scheduledAt: Timestamp.fromDate(new Date(`${selectedDate}T${selectedTime}:00`))
    }
    setIsSaving(true)
    setNotice('')
    try {
      await addDoc(collection(firebaseDb, 'appointments'), {
        ...appointment,
        userId: user.uid,
        status: 'pending',
        createdAt: serverTimestamp()
      })
      setConfirmedAppointment(appointment)
    } catch (error) {
      setNotice(`Não foi possível salvar o agendamento: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  const selectedDateObject = dates.find((date) => getDateValue(date) === selectedDate)
  const availableTimes = availability && selectedDateObject
    ? getAvailableTimes(selectedDateObject, availability)
    : []

  return (
    <SchedulePage>
      <ScheduleHeader>
        <ReturnButton type="button" onClick={goBack}>Voltar</ReturnButton>
        <ScheduleLogo src={LogoKings} alt="Logo da KingsBarber" />
      </ScheduleHeader>

      <ScheduleContent>
        <ScheduleTitle>
          {confirmedAppointment
            ? 'Solicitação enviada'
            : 'Escolha seu horário'}
        </ScheduleTitle>
        <ScheduleSubtitle>
          {confirmedAppointment
            ? 'A barbearia avaliará o pedido e atualizará o status.'
            : user
              ? 'Selecione uma data e um horário para continuar.'
              : 'Entre na sua conta para solicitar um horário e acompanhar a resposta da barbearia.'}
        </ScheduleSubtitle>

        <SelectionSummary>
          <strong>{service.name}</strong>
          <strong>{service.price}</strong>
        </SelectionSummary>

        {confirmedAppointment ? (
          <Confirmation>
            <h2>Solicitação enviada para a barbearia</h2>
            <p><strong>Nome:</strong> {confirmedAppointment.name}</p>
            <p><strong>WhatsApp:</strong> {confirmedAppointment.whatsapp}</p>
            <p><strong>Data:</strong> {formatDate(confirmedAppointment.date)}</p>
            <p><strong>Horário:</strong> {confirmedAppointment.time}</p>
            <p><strong>Serviço:</strong> {confirmedAppointment.service}</p>
          </Confirmation>
        ) : !isAuthReady ? (
          <p role="status">Verificando sua conta...</p>
        ) : !user ? (
          <Confirmation>
            <h2>Entre na sua conta para agendar</h2>
            <p>Depois de entrar, você poderá acompanhar o status e o motivo de uma eventual recusa.</p>
            <Account homeLogin />
          </Confirmation>
        ) : isLoadingAvailability ? (
          <p role="status">Carregando os horários da barbearia...</p>
        ) : !availability ? (
          <Confirmation>
            <h2>Agenda indisponível</h2>
              <p role="alert">
                {notice || 'Não foi possível carregar os dias e horários de atendimento.'}
              </p>
          </Confirmation>
        ) : (
          <>
              {!isAvailabilityConfigured && (
                <p role="status">
                  Horário padrão: todos os dias, das 09:00 às 17:00. O barbeiro pode personalizar a agenda.
                </p>
              )}
            <ScheduleSection>
              <SectionTitle>Data</SectionTitle>
              <DateGrid>
                {dates.map((date) => {
                  const dateValue = getDateValue(date)
                  const weekday = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(date)
                  const isWorking = isWorkingDay(date, availability)
                  return (
                    <DateButton
                      key={dateValue}
                      type="button"
                      $selected={selectedDate === dateValue}
                      aria-pressed={selectedDate === dateValue}
                      disabled={!isWorking}
                      onClick={() => {
                        setSelectedDate(dateValue)
                        setSelectedTime('')
                      }}
                    >
                      <span>{isWorking ? weekday : 'Fechado'}</span>
                      <strong>{date.getDate()}</strong>
                    </DateButton>
                  )
                })}
              </DateGrid>
            </ScheduleSection>

            <ScheduleSection>
              <SectionTitle>Horários disponíveis</SectionTitle>
              {availableTimes.length === 0 ? (
                <p>Não há horários disponíveis neste dia.</p>
              ) : (
                <TimeGrid>
                  {availableTimes.map((time) => {
                  const isBookedByAccount = accountAppointments.some(
                    (appointment) => appointment.date === selectedDate
                      && appointment.time === time
                      && ['pending', 'accepted'].includes(appointment.status ?? 'pending')
                  )
                  const isBooked = isBookedByAccount
                  return (
                    <TimeButton
                      key={time}
                      type="button"
                      $selected={selectedTime === time}
                      aria-pressed={selectedTime === time}
                      disabled={isBooked}
                      onClick={() => setSelectedTime(time)}
                    >
                      {isBooked ? 'Indisponível' : time}
                    </TimeButton>
                  )
                  })}
                </TimeGrid>
              )}
            </ScheduleSection>

            <AppointmentForm onSubmit={handleSubmit}>
              <FormField>
               Nome de quem irá comparecer
                <input
                  type="text" 
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </FormField>
              <FormField>
                WhatsApp
                <input
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(11) 99999-9999"
                  pattern="\(\d{2}\) \d{4,5}-\d{4}"
                  value={whatsapp}
                  onChange={(event) => setWhatsapp(formatPhone(event.target.value))}
                  required
                />
              </FormField>
              <ConfirmButton type="submit" disabled={!selectedTime || isSaving || !isAuthReady || !user}>
                {isSaving ? 'Salvando...' : 'Confirmar agendamento'}
              </ConfirmButton>
            </AppointmentForm>
            {notice && <p role="status">{notice}</p>}
          </>
        )}
      </ScheduleContent>
    </SchedulePage>
  )
}

export default Booking