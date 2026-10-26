import { useState } from 'react'
import {
  AccountCard,
  AccountForm,
  AccountPage,
  AccountSubtitle,
  AccountTitle,
  FormField,
  ModeButton,
  RecoveryButton,
  SubmitButton
} from './styles'

function Account() {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
  const [notice, setNotice] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setNotice('Esta tela é demonstrativa e ainda não está conectada a um sistema de contas.')
  }

  const changeMode = () => {
    setIsCreatingAccount((currentMode) => !currentMode)
    setNotice('')
  }

  const handlePasswordRecovery = () => {
    setNotice('A recuperação de senha ainda não está conectada a um sistema de contas.')
  }

  return (
    <AccountPage id="conta">
      <AccountCard>
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
              <input type="text" name="name" autoComplete="name" required />
            </FormField>
          )}
          <FormField>
            E-mail
            <input type="email" name="email" autoComplete="email" required />
          </FormField>
          <FormField>
            Senha
            <input
              type="password"
              name="password"
              autoComplete={isCreatingAccount ? 'new-password' : 'current-password'}
              required
            />
          </FormField>
          <SubmitButton type="submit">
            {isCreatingAccount ? 'Criar conta' : 'Entrar'}
          </SubmitButton>
        </AccountForm>

        {notice && <p role="status">{notice}</p>}

        <ModeButton type="button" onClick={changeMode}>
          {isCreatingAccount ? 'Já tem uma conta? Entrar' : 'Ainda não tem conta? Cadastre-se'}
        </ModeButton>
        {!isCreatingAccount && (
          <RecoveryButton type="button" onClick={handlePasswordRecovery}>
            Esqueci a senha
          </RecoveryButton>
        )}
      </AccountCard>
    </AccountPage>

    
  )
}

export default Account
