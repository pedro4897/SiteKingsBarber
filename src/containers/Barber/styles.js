import styled from 'styled-components'

export const BarberPage = styled.section`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  padding: 3rem 1.25rem 2rem;
  color: #f5ead7;
`

export const BarberCard = styled.section`
  width: min(100%, 900px);
  align-self: flex-start;
  padding: clamp(1.5rem, 5vw, 2.5rem);
  border: 1px solid rgba(214, 168, 79, 0.35);
  border-radius: 8px;
  background: #222426;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.28);

  [role='status'] {
    color: #f4d48a;
    line-height: 1.5;
  }

  [role='alert'] {
    color: #ffb6a8;
    line-height: 1.5;
  }
`

export const BarberTitle = styled.h1`
  margin: 0;
  color: #f4d48a;
  font-size: clamp(1.8rem, 6vw, 2.4rem);
  font-weight: 500;
`

export const BarberSubtitle = styled.p`
  margin: 0.75rem 0 2rem;
  color: #b8aa99;
  line-height: 1.5;
`

export const RequestList = styled.div`
  display: grid;
  gap: 0.75rem;
`

export const RequestItem = styled.article`
  display: grid;
  gap: 0.45rem;
  padding: 1rem;
  border: 1px solid rgba(214, 168, 79, 0.28);
  border-radius: 6px;
  background: #181a1d;

  h2 {
    margin: 0 0 0.35rem;
    color: #f4d48a;
    font-size: 1.05rem;
  }

  p {
    margin: 0;
    color: #c7b9a7;
    font-size: 0.9rem;
    line-height: 1.45;
  }
`

export const RequestActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.5rem;
`

export const RequestButton = styled.button`
  min-height: 40px;
  padding: 0.55rem 0.85rem;
  border: 1px solid ${({ $reject }) => ($reject ? '#9a3e36' : '#d6a84f')};
  border-radius: 4px;
  color: ${({ $reject }) => ($reject ? '#fff' : '#20170e')};
  background: ${({ $reject }) => ($reject ? '#8b302b' : '#d6a84f')};
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 700;

  &:hover:not(:disabled) {
    background: ${({ $reject }) => ($reject ? '#a43b34' : '#f0c96d')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`

export const RequestStatus = styled.strong`
  color: ${({ $status }) => (
    $status === 'accepted' ? '#9bd19b' : $status === 'rejected' ? '#ffb6a8' : '#f4d48a'
  )};
  font-size: 0.9rem;
`
