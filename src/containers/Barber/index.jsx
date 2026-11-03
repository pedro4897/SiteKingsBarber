import { useEffect, useState } from 'react'
import {
  collection,
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
  updateDoc
} from 'firebase/firestore'
import { firebaseConfigError, firebaseDb } from '../../firebase'
import {
  BarberCard,
  BarberPage,
  BarberSubtitle,
  BarberTitle,
  RequestActions,
  RequestButton,
  RequestItem,
  RequestList,
  RequestStatus
} from './styles'

const statusLabels = {
  pending: 'Aguardando resposta',
  accepted: 'Aceito',
  rejected: 'Recusado'
}

function formatAppointmentDate(dateValue) {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(`${dateValue}T12:00:00`))
}

function Barber() {
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(Boolean(firebaseDb))
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState('')

  useEffect(() => {
    if (!firebaseDb) {
      setIsLoading(false)
      return undefined
    }

    let currentAppointments = []
    let legacyAppointments = []
    let hasCurrentSnapshot = false
    let hasLegacySnapshot = false
    let currentError = ''
    let legacyError = ''

    const updateAppointments = () => {
      setAppointments([...currentAppointments, ...legacyAppointments].sort((first, second) => (
        (second.createdAt?.toMillis?.() ?? 0) - (first.createdAt?.toMillis?.() ?? 0)
      )))
      setIsLoading(hasCurrentSnapshot === false || hasLegacySnapshot === false)
    }
    const updateError = () => setError([currentError, legacyError].filter(Boolean).join(' '))

    const currentAppointmentsQuery = query(
      collection(firebaseDb, 'appointments'),
      orderBy('createdAt', 'desc')
    )
    const legacyAppointmentsQuery = query(collectionGroup(firebaseDb, 'appointments'))

    const unsubscribeCurrentAppointments = onSnapshot(
      currentAppointmentsQuery,
      (snapshot) => {
        currentAppointments = snapshot.docs.map((appointment) => ({
          id: appointment.ref.path,
          reference: appointment.ref,
          ...appointment.data()
        }))
        hasCurrentSnapshot = true
        currentError = ''
        updateError()
        updateAppointments()
      },
      (snapshotError) => {
        currentError = `Não foi possível carregar as solicitações: ${snapshotError.message}`
        updateError()
        setIsLoading(false)
      }
    )

    const unsubscribeLegacyAppointments = onSnapshot(
      legacyAppointmentsQuery,
      (snapshot) => {
        legacyAppointments = snapshot.docs
          .filter((appointment) => appointment.ref.parent.parent?.parent?.id === 'users')
          .map((appointment) => ({
            id: appointment.ref.path,
            reference: appointment.ref,
            ...appointment.data()
          }))
        hasLegacySnapshot = true
        legacyError = ''
        updateError()
        updateAppointments()
      },
      (snapshotError) => {
        legacyError = `Não foi possível carregar os agendamentos antigos: ${snapshotError.message}`
        updateError()
        setIsLoading(false)
      }
    )

    return () => {
      unsubscribeCurrentAppointments()
      unsubscribeLegacyAppointments()
    }
  }, [])

  const handleUpdateStatus = async (appointment, status) => {
    setUpdatingId(appointment.id)
    setError('')

    try {
      await updateDoc(appointment.reference, { status })
    } catch (updateError) {
      setError(`Não foi possível atualizar a solicitação: ${updateError.message}`)
    } finally {
      setUpdatingId('')
    }
  }

  return (
    <BarberPage id="barbeiro">
      <BarberCard>
        <BarberTitle>Solicitações de agendamento</BarberTitle>
        <BarberSubtitle>
          Acompanhe os pedidos dos clientes e confirme ou recuse cada horário.
        </BarberSubtitle>

        {!firebaseDb && <p role="alert">{firebaseConfigError}</p>}
        {isLoading && <p role="status">Carregando solicitações...</p>}
        {error && <p role="alert">{error}</p>}
        {!isLoading && !error && firebaseDb && appointments.length === 0 && (
          <p>Nenhuma solicitação de agendamento até o momento.</p>
        )}

        {appointments.length > 0 && (
          <RequestList>
            {appointments.map((appointment) => {
              const status = appointment.status ?? 'pending'
              const isUpdating = updatingId === appointment.id

              return (
                <RequestItem key={appointment.id}>
                  <h2>{appointment.service}</h2>
                  <p><strong>Data:</strong> {formatAppointmentDate(appointment.date)}</p>
                  <p><strong>Horário:</strong> {appointment.time}</p>
                  <p><strong>Nome:</strong> {appointment.name}</p>
                  <p><strong>WhatsApp:</strong> {appointment.whatsapp}</p>
                  <p>
                    <strong>Status: </strong>
                    <RequestStatus $status={status}>
                      {statusLabels[status] ?? statusLabels.pending}
                    </RequestStatus>
                  </p>
                  {status === 'pending' && (
                    <RequestActions>
                      <RequestButton
                        type="button"
                        onClick={() => handleUpdateStatus(appointment, 'accepted')}
                        disabled={Boolean(updatingId)}
                      >
                        {isUpdating ? 'Salvando...' : 'Aceitar'}
                      </RequestButton>
                      <RequestButton
                        type="button"
                        $reject
                        onClick={() => handleUpdateStatus(appointment, 'rejected')}
                        disabled={Boolean(updatingId)}
                      >
                        Recusar
                      </RequestButton>
                    </RequestActions>
                  )}
                </RequestItem>
              )
            })}
          </RequestList>
        )}
      </BarberCard>
    </BarberPage>
  )
}

export default Barber
