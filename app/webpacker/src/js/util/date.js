import { format,differenceInDays, parseISO } from "date-fns"
import pt from 'date-fns/locale/pt-BR'

// Returns the amount of days passed in a interval of dates
export const diffBetweenDays = (firstDate, lastDate) => (
  differenceInDays(
    parseISO(firstDate),
    parseISO(lastDate)
  )
)

// Formats the date using brazilian UTC
export const formatDate = (date) => (
  format(
    parseISO(date),
    'dd/MM/yyyy',{ locale: pt }
  )
)

// Formats the time using brazilian UTC
export const formatTime = (date) => (
  format(
    parseISO(date),
    'HH:mm',{ locale: pt }
  )
)
