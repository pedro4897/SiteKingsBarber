import { useEffect, useRef, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { collection, deleteDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { firebaseAuth, firebaseConfigError, firebaseDb } from '../../firebase'
import {
  AppointmentItem,
  AppointmentList,
  AppointmentActions,
  AppointmentDeleteButton,
  AppointmentConfirm,
  AccountCard,
  AccountForm,
  AccountPage,
  AccountNotice,
  AccountSubtitle,
  AccountTitle,
  FormField,
  AccountActions,
  ModeButton,
  RecoveryButton,
  TextLink,
  SubmitButton
} from './styles'

function formatAppointmentDate(dateValue) {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(`${dateValue}T12:00:00`))
}

function getAppointmentStatus(status) {
  const labels = {
    pending: 'Aguardando resposta',
    accepted: 'Aceito',
    rejected: 'Recusado'
  }

  return labels[status] ?? labels.pending
}

function getAuthErrorMessage(error) {
  const messages = {
    'auth/email-already-in-use': 'Este e-mail já está cadastrado. Tente entrar.',
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/invalid-email': 'Informe um endereço de e-mail válido.',
    'auth/network-request-failed': 'Não foi possível conectar. Verifique sua internet e tente novamente.',
    'auth/operation-not-allowed': 'O login por e-mail e senha não está habilitado no Firebase.',
    'auth/too-many-requests': 'Muitas tentativas. Aguarde um pouco e tente novamente.',
    'auth/unauthorized-domain': 'Este domínio não está autorizado no Firebase Authentication.',
    'auth/weak-password': 'A senha é muito fraca. Use pelo menos 6 caracteres.',
    'auth/user-disabled': 'Esta conta foi desativada.',
    'auth/user-not-found': 'Não existe uma conta com este e-mail.',
    'auth/wrong-password': 'E-mail ou senha incorretos.'
  }

  return messages[error.code] ?? error.message ?? 'Ocorreu um erro na autenticação.'
}

function Account({ appointmentsOnly = false, homeLogin = false }) {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false)
  const [appointmentsError, setAppointmentsError] = useState('')
  const [appointmentToDelete, setAppointmentToDelete] = useState(null)
  const [deletingAppointmentId, setDeletingAppointmentId] = useState('')
  const [notice, setNotice] = useState(firebaseConfigError)
  const emailInput = useRef(null)

  useEffect(() => {
    if (!firebaseAuth) {
      return undefined
    }

    return onAuthStateChanged(
      firebaseAuth,
      (currentUser) => {
        setUser(currentUser)
        setNotice('')
      },
      (error) => setNotice(getAuthErrorMessage(error))
    )
  }, [])

  useEffect(() => {
    if (!user || !firebaseDb) {
      setAppointments([])
      setIsLoadingAppointments(false)
      setAppointmentsError('')
      return undefined
    }

    setIsLoadingAppointments(true)
    setAppointmentsError('')
    let accountAppointments = []
    let legacyAppointments = []
    let hasAccountSnapshot = false
    let hasLegacySnapshot = false

    const updateAppointments = () => {
      setAppointments([...accountAppointments, ...legacyAppointments].sort((first, second) => (
        (second.createdAt?.toMillis?.() ?? 0) - (first.createdAt?.toMillis?.() ?? 0)
      )))
      setIsLoadingAppointments(hasAccountSnapshot === false || hasLegacySnapshot === false)
    }

    const accountAppointmentsQuery = query(
      collection(firebaseDb, 'appointments'),
      where('userId', '==', user.uid)
    )
    const legacyAppointmentsQuery = query(
      collection(firebaseDb, 'users', user.uid, 'appointments'),
      orderBy('createdAt', 'desc')
    )

    const unsubscribeAccountAppointments = onSnapshot(
      accountAppointmentsQuery,
      (snapshot) => {
        accountAppointments = snapshot.docs.map((document) => ({
          id: document.id,
          reference: document.ref,
          ...document.data()
        }))
        hasAccountSnapshot = true
        updateAppointments()
      },
      (error) => {
        setAppointmentsError(`Não foi possível carregar seus agendamentos: ${error.message}`)
        setIsLoadingAppointments(false)
      }
    )

    const unsubscribeLegacyAppointments = onSnapshot(
      legacyAppointmentsQuery,
      (snapshot) => {
        legacyAppointments = snapshot.docs.map((document) => ({
          id: document.id,
          reference: document.ref,
          ...document.data()
        }))
        hasLegacySnapshot = true
        updateAppointments()
      },
      (error) => {
        setAppointmentsError(`Não foi possível carregar seus agendamentos antigos: ${error.message}`)
        setIsLoadingAppointments(false)
      }
    )

    return () => {
      unsubscribeAccountAppointments()
      unsubscribeLegacyAppointments()
    }
  }, [user])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!firebaseAuth) {
      setNotice(firebaseConfigError)
      return
    }

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email').trim()
    const password = formData.get('password')

    setIsLoading(true)
    setNotice('')

    try {
      if (isCreatingAccount) {
        const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
        const name = formData.get('name').trim()
        await updateProfile(credential.user, { displayName: name })
        setUser(credential.user)
      } else {
        const credential = await signInWithEmailAndPassword(firebaseAuth, email, password)
        setUser(credential.user)
      }
    } catch (error) {
      setNotice(getAuthErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  const changeMode = () => {
    setIsCreatingAccount((currentMode) => !currentMode)
    setNotice('')
  }

  const handlePasswordRecovery = async () => {
    if (!firebaseAuth) {
      setNotice(firebaseConfigError)
      return
    }

    const email = emailInput.current?.value.trim()
    if (!email) {
      setNotice('Informe seu e-mail para receber o link de recuperação.')
      emailInput.current?.focus()
      return
    }

    setIsLoading(true)
    setNotice('')

    try {
      await sendPasswordResetEmail(firebaseAuth, email)
      setNotice('Se houver uma conta com esse e-mail, você receberá um link para redefinir a senha.')
    } catch (error) {
      setNotice(getAuthErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    if (!firebaseAuth) {
      setNotice(firebaseConfigError)
      return
    }

    setIsLoading(true)
    setNotice('')

    try {
      await signOut(firebaseAuth)
      setUser(null)
    } catch (error) {
      setNotice(getAuthErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAppointment = async (appointment) => {
    if (!firebaseDb || !user) {
      setAppointmentsError('Não foi possível excluir o agendamento. Entre novamente na sua conta.')
      return
    }

    setDeletingAppointmentId(appointment.id)
    setAppointmentsError('')

    try {
      await deleteDoc(appointment.reference)
      setAppointmentToDelete(null)
    } catch (error) {
      setAppointmentsError(`Não foi possível excluir o agendamento: ${error.message}`)
    } finally {
      setDeletingAppointmentId('')
    }
  }

  return (
    <AccountPage
      id={homeLogin ? undefined : appointmentsOnly ? 'agendamentos' : 'conta'}
      $homeLogin={homeLogin}
    >
      <AccountCard $wide={appointmentsOnly} $homeLogin={homeLogin}>
        {user ? (
          <>
            <AccountTitle>{appointmentsOnly ? 'Seus agendamentos' : 'Sua conta'}</AccountTitle>
            <AccountSubtitle>
              Você está conectado como {user.displayName || user.email}.
            </AccountSubtitle>
            {isLoadingAppointments && <p role="status">Carregando agendamentos...</p>}
            {appointmentsError && <p role="alert">{appointmentsError}</p>}
            {appointmentsOnly && !isLoadingAppointments && !appointmentsError && appointments.length === 0 && (
              <p>Você ainda não tem agendamentos.</p>
            )}
            {appointmentsOnly && appointments.length > 0 && (
              <AppointmentList>
                {appointments.map((appointment) => (
                  <AppointmentItem key={appointment.id}>
                    <h2>{appointment.service}</h2>
                    <p><strong>Data:</strong> {formatAppointmentDate(appointment.date)}</p>
                    <p><strong>Horário:</strong> {appointment.time}</p>
                    <p><strong>Status:</strong> {getAppointmentStatus(appointment.status)}</p>
                    <p><strong>Nome:</strong> {appointment.name}</p>
                    <p><strong>WhatsApp:</strong> {appointment.whatsapp}</p>
                    {appointmentToDelete === appointment.id ? (
                      <AppointmentConfirm>
                        <p>Tem certeza que deseja excluir este agendamento?</p>
                        <AppointmentActions>
                          <AppointmentDeleteButton
                            type="button"
                            onClick={() => handleDeleteAppointment(appointment)}
                            disabled={deletingAppointmentId === appointment.id}
                          >
                            {deletingAppointmentId === appointment.id ? 'Excluindo...' : 'Sim, excluir'}
                          </AppointmentDeleteButton>
                          <AppointmentDeleteButton
                            type="button"
                            $secondary
                            onClick={() => setAppointmentToDelete(null)}
                            disabled={deletingAppointmentId === appointment.id}
                          >
                            Cancelar
                          </AppointmentDeleteButton>
                        </AppointmentActions>
                      </AppointmentConfirm>
                    ) : (
                      <AppointmentDeleteButton
                        type="button"
                        onClick={() => setAppointmentToDelete(appointment.id)}
                        disabled={Boolean(deletingAppointmentId)}
                      >
                        Excluir agendamento
                      </AppointmentDeleteButton>
                    )}
                  </AppointmentItem>
                ))}
              </AppointmentList>
            )}
            {appointmentsOnly ? (
              <ModeButton type="button" onClick={() => { window.location.hash = '#conta' }}>
                Voltar à conta
              </ModeButton>
            ) : (
              <AccountActions>
                {!homeLogin && !isLoadingAppointments && !appointmentsError && (
                  <TextLink href={appointments.length === 0 ? '#servicos' : '#agendamentos'}>
                    {appointments.length === 0 ? 'Agendar um horário' : 'Ver agendamentos'}
                  </TextLink>
                )}
                {homeLogin && (
                  <TextLink href="#conta">Gerenciar conta</TextLink>
                )}
                <SubmitButton type="button" onClick={handleSignOut} disabled={isLoading}>
                  {isLoading ? 'Saindo...' : 'Sair da conta'}
                </SubmitButton>
              </AccountActions>
            )}
          </>
        ) : (
          homeLogin ? (
            <>
              <AccountTitle>{isCreatingAccount ? 'Crie sua conta' : 'Acesse sua conta'}</AccountTitle>
              <AccountSubtitle>
                {isCreatingAccount
                  ? 'Cadastre-se para acompanhar seus agendamentos.'
                  : 'Entre para acompanhar seus agendamentos.'}
              </AccountSubtitle>

              <AccountForm onSubmit={handleSubmit}>
                {isCreatingAccount && (
                  <FormField>
                    Nome
                    <input type="text" name="name" autoComplete="name" required disabled={isLoading} />
                  </FormField>
                )}
                <FormField>
                  E-mail
                  <input
                    ref={emailInput}
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    disabled={isLoading}
                  />
                </FormField>
                <FormField>
                  Senha
                  <input
                    type="password"
                    name="password"
                    autoComplete={isCreatingAccount ? 'new-password' : 'current-password'}
                    required
                    minLength={isCreatingAccount ? 6 : undefined}
                    disabled={isLoading}
                  />
                </FormField>
                <SubmitButton type="submit" disabled={isLoading || !firebaseAuth}>
                  {isLoading ? 'Aguarde...' : isCreatingAccount ? 'Criar conta' : 'Entrar'}
                </SubmitButton>
              </AccountForm>

              <ModeButton type="button" onClick={changeMode} disabled={isLoading}>
                {isCreatingAccount ? 'Já tem uma conta? Entrar' : 'Ainda não tem conta? Cadastre-se'}
              </ModeButton>
              {!isCreatingAccount && (
                <RecoveryButton
                  type="button"
                  onClick={handlePasswordRecovery}
                  disabled={isLoading || !firebaseAuth}
                >
                  Esqueci a senha
                </RecoveryButton>
              )}
            </>
          ) : (
            <AccountNotice>
              <AccountTitle>Acesse sua conta pela Home</AccountTitle>
              <AccountSubtitle>
                Para entrar ou criar uma conta, use o formulário seguro na página inicial.
                Depois do login, você poderá gerenciar sua conta e acompanhar seus horários.
              </AccountSubtitle>
              <TextLink href="#home">Ir para a Home</TextLink>
            </AccountNotice>
          )
        )}

        {notice && <p role="status">{notice}</p>}
      </AccountCard>
    </AccountPage>
  )
}

export default Account
