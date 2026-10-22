import styled from 'styled-components'

export const AccountPage = styled.section`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.25rem 2rem;
  color: #f5ead7;
  background: #181a1d;
  scroll-margin-top: 5.5rem;
`

export const AccountCard = styled.section`
  width: min(100%, 460px);
  padding: clamp(1.5rem, 5vw, 2.5rem);
  border: 1px solid rgba(214, 168, 79, 0.35);
  border-radius: 8px;
  background: #222426;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.28);

  [role='status'] {
    margin: 1rem 0 0;
    color: #f4d48a;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`

export const AccountTitle = styled.h1`
  margin: 0;
  color: #f4d48a;
  font-size: clamp(1.8rem, 6vw, 2.4rem);
  font-weight: 500;
`

export const AccountSubtitle = styled.p`
  margin: 0.75rem 0 2rem;
  color: #b8aa99;
  line-height: 1.5;
`

export const AccountForm = styled.form`
  display: grid;
  gap: 1rem;
`

export const FormField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #e4d7c4;
  font-size: 0.9rem;

  input {
    width: 100%;
    min-height: 48px;
    padding: 0.75rem;
    border: 1px solid rgba(214, 168, 79, 0.35);
    border-radius: 4px;
    outline: none;
    color: #f5ead7;
    background: #181a1d;
    font: inherit;
  }

  input:focus {
    border-color: #d6a84f;
  }
`

export const SubmitButton = styled.button`
  min-height: 48px;
  margin-top: 0.5rem;
  border: 0;
  border-radius: 4px;
  color: #20170e;
  background: #d6a84f;
  cursor: pointer;
  font: inherit;
  font-weight: 700;

  &:hover {
    background: #f0c96d;
  }
`

export const ModeButton = styled.button`
  margin-top: 1.25rem;
  padding: 0.5rem 0;
  border: 0;
  color: #f4d48a;
  background: transparent;
  cursor: pointer;
  font: inherit;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`
