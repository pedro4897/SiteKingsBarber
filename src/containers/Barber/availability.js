export const weekdays = [
  { id: 'sunday', label: 'Domingo', dayIndex: 0 },
  { id: 'monday', label: 'Segunda-feira', dayIndex: 1 },
  { id: 'tuesday', label: 'Terça-feira', dayIndex: 2 },
  { id: 'wednesday', label: 'Quarta-feira', dayIndex: 3 },
  { id: 'thursday', label: 'Quinta-feira', dayIndex: 4 },
  { id: 'friday', label: 'Sexta-feira', dayIndex: 5 },
  { id: 'saturday', label: 'Sábado', dayIndex: 6 }
]

export const SLOT_INTERVAL_HOURS = 2

export function createDefaultAvailability() {
  return {
    days: Object.fromEntries(weekdays.map(({ id }) => [id, {
      enabled: true,
      startHour: 9,
      endHour: 17
    }]))
  }
}

function getDaySchedule(date, availability) {
  const weekday = weekdays.find(({ dayIndex }) => dayIndex === date.getDay())
  return weekday ? availability?.days?.[weekday.id] : null
}

export function isWorkingDay(date, availability) {
  return getDaySchedule(date, availability)?.enabled === true
}

export function getAvailableTimes(date, availability) {
  const schedule = getDaySchedule(date, availability)
  if (!schedule?.enabled) return []

  const { startHour, endHour } = schedule
  if (
    !Number.isInteger(startHour)
    || !Number.isInteger(endHour)
    || startHour < 0
    || endHour > 23
    || endHour < startHour
    || (endHour - startHour) % SLOT_INTERVAL_HOURS !== 0
  ) {
    return []
  }

  return Array.from({
    length: (endHour - startHour) / SLOT_INTERVAL_HOURS + 1
  }, (_, index) => (
    `${String(startHour + index * SLOT_INTERVAL_HOURS).padStart(2, '0')}:00`
  ))
}
