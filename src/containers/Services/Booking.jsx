import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { firebaseAuth, firebaseDb } from '../../firebase'
import LogoKings from '../Home/Logo Kings Barber.png'
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

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
const storageKey = 'kingsbarber-appointments'

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

function getSavedAppointments() {
  try {
    const appointments = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]')
    return Array.isArray(appointments) ? appointments : []
  } catch {
    return []
  }
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
  const dates = getAvailableDates()
  const [selectedDate, setSelectedDate] = useState(getDateValue(dates[0]))
  const [selectedTime, setSelectedTime] = useState('')
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [appointments, setAppointments] = useState(getSavedAppointments)
  const [accountAppointments, setAccountAppointments] = useState([])
  const [user, setUser] = useState(firebaseAuth?.currentUser ?? null)
  const [isAuthReady, setIsAuthReady] = useState(!firebaseAuth)
  const [confirmedAppointment, setConfirmedAppointment] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!firebaseAuth) {
      return undefined
    }

    let unsubscribeAppointments
    const unsubscribeAuth = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser)
      setIsAuthReady(true)
      setNotice('')
      unsubscribeAppointments?.()
      setAccountAppointments([])

      if (currentUser && firebaseDb) {
        unsubscribeAppointments = onSnapshot(
          collection(firebaseDb, 'users', currentUser.uid, 'appointments'),
          (snapshot) => {
            setAccountAppointments(snapshot.docs.map((document) => ({
              id: document.id,
              ...document.data()
            })))
          },
          (error) => {
            setNotice(`Não foi possível carregar os horários: ${error.message}`)
          }
        )
      }
    })

    return () => {
      unsubscribeAuth()
      unsubscribeAppointments?.()
    }
  }, [])

  const goBack = () => {
    window.location.hash = 'servicos'
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const appointment = {
      service: service.name,
      date: selectedDate,
      time: selectedTime,
      name: name.trim(),
      whatsapp
    }
    setIsSaving(true)
    setNotice('')
    try {
      if (user && firebaseDb) {
        await addDoc(collection(firebaseDb, 'users', user.uid, 'appointments'), {
          ...appointment,
          createdAt: serverTimestamp()
        })
      } else {
        const updatedAppointments = [...appointments, appointment]
        setAppointments(updatedAppointments)
        window.localStorage.setItem(storageKey, JSON.stringify(updatedAppointments))
      }
      setConfirmedAppointment(appointment)
    } catch (error) {
      setNotice(`Não foi possível salvar o agendamento: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <SchedulePage>
      <ScheduleHeader>
        <ReturnButton type="button" onClick={goBack}>Voltar</ReturnButton>
        <ScheduleLogo src={LogoKings} alt="Logo da KingsBarber" />
      </ScheduleHeader>

      <ScheduleContent>
        <ScheduleTitle>{confirmedAppointment ? 'Agendamento confirmado' : 'Escolha seu horário'}</ScheduleTitle>
        <ScheduleSubtitle>
          {confirmedAppointment
            ? 'Confira os dados do seu agendamento.'
            : 'Selecione uma data e um horário para continuar.'}
        </ScheduleSubtitle>

        <SelectionSummary>
          <strong>{service.name}</strong>
          <strong>{service.price}</strong>
        </SelectionSummary>

        {confirmedAppointment ? (
          <Confirmation>
            <h2>
              {user && firebaseDb
                ? 'Agendamento salvo na sua conta'
                : 'Agendamento salvo neste dispositivo'}
            </h2>
            <p>A barbearia ainda não foi notificada. Confirme o horário diretamente com a equipe.</p>
            <p><strong>Nome:</strong> {confirmedAppointment.name}</p>
            <p><strong>WhatsApp:</strong> {confirmedAppointment.whatsapp}</p>
            <p><strong>Data:</strong> {formatDate(confirmedAppointment.date)}</p>
            <p><strong>Horário:</strong> {confirmedAppointment.time}</p>
            <p><strong>Serviço:</strong> {confirmedAppointment.service}</p>
          </Confirmation>
        ) : (
          <>
            <ScheduleSection>
              <SectionTitle>Data</SectionTitle>
              <DateGrid>
                {dates.map((date) => {
                  const dateValue = getDateValue(date)
                  const weekday = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(date)
                  return (
                    <DateButton
                      key={dateValue}
                      type="button"
                      $selected={selectedDate === dateValue}
                      aria-pressed={selectedDate === dateValue}
                      onClick={() => {
                        setSelectedDate(dateValue)
                        setSelectedTime('')
                      }}
                    >
                      <span>{weekday}</span>
                      <strong>{date.getDate()}</strong>
                    </DateButton>
                  )
                })}
              </DateGrid>
            </ScheduleSection>

            <ScheduleSection>
              <SectionTitle>Horários disponíveis</SectionTitle>
              <TimeGrid>
                {timeSlots.map((time) => {
                  const isBookedLocally = appointments.some(
                    (appointment) => appointment.date === selectedDate && appointment.time === time
                  )
                  const isBookedByAccount = accountAppointments.some(
                    (appointment) => appointment.date === selectedDate && appointment.time === time
                  )
                  const isBooked = isBookedLocally || isBookedByAccount
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
              <ConfirmButton type="submit" disabled={!selectedTime || isSaving || !isAuthReady}>
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