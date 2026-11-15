import { useEffect, useState } from 'react'
import {
  collection,
  collectionGroup,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { firebaseConfigError, firebaseDb } from '../../firebase'
import {
  createDefaultAvailability,
  SLOT_INTERVAL_HOURS,
  weekdays
} from './availability'
import {
  AvailabilityDay,
  AvailabilityDays,
  AvailabilityForm,
  AvailabilitySection,
  BarberCard,
  BarberPage,
  BarberSubtitle,
  BarberTitle,
  RequestActions,
  RequestButton,
  RequestHistory,
  RequestItem,
  RequestList,
  RejectForm,
  RequestReason,
  RequestStatus
} from './styles'

const statusLabels = {
  pending: 'Aguardando resposta',
  accepted: 'Aceito',
  rejected: 'Recusado',
  cancelled: 'Cancelado pelo cliente'
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
  const [rejectingId, setRejectingId] = useState('')
  const [rejectionReason, setRejectionReason] = useState('')
  const [availability, setAvailability] = useState(createDefaultAvailability)
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(Boolean(firebaseDb))
  const [isAvailabilityConfigured, setIsAvailabilityConfigured] = useState(false)
  const [isSavingAvailability, setIsSavingAvailability] = useState(false)
  const [availabilityError, setAvailabilityError] = useState('')
  const [availabilityNotice, setAvailabilityNotice] = useState('')

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

  useEffect(() => {
    if (!firebaseDb) {
      setIsAvailabilityLoading(false)
      return undefined
    }

    return onSnapshot(
      doc(firebaseDb, 'settings', 'availability'),
      (snapshot) => {
        setAvailability(snapshot.exists() ? snapshot.data() : createDefaultAvailability())
        setIsAvailabilityConfigured(snapshot.exists())
        setIsAvailabilityLoading(false)
        setAvailabilityError('')
      },
      (snapshotError) => {
        setAvailabilityError(`Não foi possível carregar os horários: ${snapshotError.message}`)
        setIsAvailabilityLoading(false)
      }
    )
  }, [])

  const handleUpdateStatus = async (appointment, status, reason = '') => {
    setUpdatingId(appointment.id)
    setError('')

    try {
      await updateDoc(appointment.reference, {
        status,
        ...(status === 'rejected' && { rejectionReason: reason.trim() })
      })
      setRejectingId('')
      setRejectionReason('')
    } catch (updateError) {
      setError(`Não foi possível atualizar a solicitação: ${updateError.message}`)
    } finally {
      setUpdatingId('')
    }
  }

  const handleReject = (event, appointment) => {
    event.preventDefault()
    if (!rejectionReason.trim()) {
      setError('Informe o motivo da recusa.')
      return
    }

    handleUpdateStatus(appointment, 'rejected', rejectionReason)
  }

  const handleAvailabilityChange = (dayId, field, value) => {
    setAvailability((currentAvailability) => ({
      ...currentAvailability,
      days: {
        ...currentAvailability.days,
        [dayId]: {
          ...currentAvailability.days[dayId],
          [field]: value
        }
      }
    }))
    setAvailabilityNotice('')
  }

  const handleSaveAvailability = async (event) => {
    event.preventDefault()
    const invalidSchedule = weekdays.some(({ id }) => {
      const day = availability.days[id]
      return day.enabled
        && (
          day.endHour < day.startHour
          || (day.endHour - day.startHour) % SLOT_INTERVAL_HOURS !== 0
        )
    })

    if (invalidSchedule) {
      setAvailabilityError('O último horário deve seguir o intervalo de duas horas a partir do primeiro.')
      return
    }

    setIsSavingAvailability(true)
    setAvailabilityError('')
    setAvailabilityNotice('')
    try {
      await setDoc(doc(firebaseDb, 'settings', 'availability'), {
        days: availability.days,
        updatedAt: serverTimestamp()
      })
      setIsAvailabilityConfigured(true)
      setAvailabilityNotice('Horários atualizados para os clientes.')
    } catch (saveError) {
      setAvailabilityError(`Não foi possível salvar os horários: ${saveError.message}`)
    } finally {
      setIsSavingAvailability(false)
    }
  }

  const activeAppointments = appointments.filter(
    (appointment) => !['rejected', 'cancelled'].includes(appointment.status)
  )
  const historyAppointments = appointments.filter(
    (appointment) => ['rejected', 'cancelled'].includes(appointment.status)
  )

  const renderAppointment = (appointment) => {
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
        {status === 'rejected' && appointment.rejectionReason && (
          <p><strong>Motivo da recusa:</strong> {appointment.rejectionReason}</p>
        )}
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
              onClick={() => {
                setRejectingId(appointment.id)
                setRejectionReason('')
              }}
              disabled={Boolean(updatingId)}
            >
              Recusar
            </RequestButton>
          </RequestActions>
        )}
        {status === 'pending' && rejectingId === appointment.id && (
          <RejectForm onSubmit={(event) => handleReject(event, appointment)}>
            <RequestReason>
              Motivo da recusa
              <textarea
                value={rejectionReason}
                onChange={(event) => setRejectionReason(event.target.value)}
                maxLength={500}
                required
                rows={3}
                disabled={isUpdating}
              />
            </RequestReason>
            <RequestActions>
              <RequestButton type="submit" $reject disabled={Boolean(updatingId)}>
                {isUpdating ? 'Salvando...' : 'Confirmar recusa'}
              </RequestButton>
              <RequestButton
                type="button"
                onClick={() => {
                  setRejectingId('')
                  setRejectionReason('')
                }}
                disabled={Boolean(updatingId)}
              >
                Cancelar
              </RequestButton>
            </RequestActions>
          </RejectForm>
        )}
      </RequestItem>
    )
  }

  return (
    <BarberPage id="barbeiro">
      <BarberCard>
        <BarberTitle>Solicitações de agendamento</BarberTitle>
        <BarberSubtitle>
          Gerencie os horários de trabalho e acompanhe as solicitações dos clientes.
        </BarberSubtitle>

        {!firebaseDb && <p role="alert">{firebaseConfigError}</p>}
        {isLoading && <p role="status">Carregando solicitações...</p>}
        {error && <p role="alert">{error}</p>}

        <AvailabilitySection>
          <summary>Gerenciar dias e horários de trabalho</summary>
          {isAvailabilityLoading && <p role="status">Carregando horários...</p>}
          {availabilityError && <p role="alert">{availabilityError}</p>}
          {!isAvailabilityLoading && !isAvailabilityConfigured && firebaseDb && (
            <p>Defina os dias e horários e salve para disponibilizar a agenda aos clientes.</p>
          )}
          {firebaseDb && !isAvailabilityLoading && (
            <AvailabilityForm onSubmit={handleSaveAvailability}>
              <p>Os horários são oferecidos em intervalos de duas horas; o último horário é o início do último atendimento.</p>
              <AvailabilityDays>
                {weekdays.map(({ id, label }) => {
                  const day = availability.days[id]

                  return (
                    <AvailabilityDay key={id}>
                      <legend>{label}</legend>
                      <label>
                        <input
                          type="checkbox"
                          checked={day.enabled}
                          onChange={(event) => (
                            handleAvailabilityChange(id, 'enabled', event.target.checked)
                          )}
                          disabled={isSavingAvailability}
                        />
                        Dia de trabalho
                      </label>
                      <label>
                        Primeiro horário
                        <input
                          type="time"
                          step="3600"
                          value={`${String(day.startHour).padStart(2, '0')}:00`}
                          onChange={(event) => (
                            handleAvailabilityChange(id, 'startHour', Number(event.target.value.slice(0, 2)))
                          )}
                          disabled={!day.enabled || isSavingAvailability}
                          required
                        />
                      </label>
                      <label>
                        Último horário
                        <input
                          type="time"
                          step="3600"
                          min={`${String(day.startHour).padStart(2, '0')}:00`}
                          value={`${String(day.endHour).padStart(2, '0')}:00`}
                          onChange={(event) => (
                            handleAvailabilityChange(id, 'endHour', Number(event.target.value.slice(0, 2)))
                          )}
                          disabled={!day.enabled || isSavingAvailability}
                          required
                        />
                      </label>
                    </AvailabilityDay>
                  )
                })}
              </AvailabilityDays>
              <RequestButton type="submit" disabled={isSavingAvailability}>
                {isSavingAvailability ? 'Salvando horários...' : 'Salvar horários'}
              </RequestButton>
              {availabilityNotice && <p role="status">{availabilityNotice}</p>}
            </AvailabilityForm>
          )}
        </AvailabilitySection>

        {!isLoading && !error && firebaseDb && appointments.length === 0 && (
          <p>Nenhuma solicitação de agendamento até o momento.</p>
        )}

        {activeAppointments.length > 0 && (
          <RequestList>
            {activeAppointments.map(renderAppointment)}
          </RequestList>
        )}

        {historyAppointments.length > 0 && (
          <RequestHistory>
            <summary>Histórico de agendamentos ({historyAppointments.length})</summary>
            <RequestList>
              {historyAppointments.map(renderAppointment)}
            </RequestList>
          </RequestHistory>
        )}
      </BarberCard>
    </BarberPage>
  )
}

export default Barber
