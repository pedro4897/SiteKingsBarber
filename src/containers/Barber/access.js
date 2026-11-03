export const BARBER_EMAIL = 'pedro123@gmail.com'

export function isBarberAccount(user) {
  return user?.email?.toLowerCase() === BARBER_EMAIL
}
