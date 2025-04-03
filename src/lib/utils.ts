import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  // Zod error client
  if (error.name === 'ZodError') {
    const fieldErros = Object.keys(error.errors).map((field) => {
      const errorMessage = error.error[field].message
      return `${error.errors[field].path}: ${errorMessage}` //field:errorMessage email:is required
    })
    return fieldErros.join('. ')

    // DB validation error
  } else if (error.name === 'ValidationError') {
    const fieldErros = Object.keys(error.errors).map((field) => {
      const errorMessage = error.error[field].message
      return errorMessage
    })
    return fieldErros.join('. ')
    // Duplicade ID in DB
  } else if (error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue)[0]
    return `${duplicateField} already exists`
  } else {
    // something else
    return typeof error.message === 'string'
      ? error.message
      : JSON.stringify(error.message)
  }
}

export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split('.')
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : int // 123 -> 123.99
}

// function to generate slugs
export const toSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\W\S-]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/, '')
    .replace(/-+/g, '-')

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 2,
})

const NUMBER_FORMATER = new Intl.NumberFormat('en-US')

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number)
}

export function formatNumber(number: number) {
  return NUMBER_FORMATER.format(number)
}

export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100

export const generateId = () =>
  Array.from({ length: 24 }, () =>
    Math.floor(Math.random() * 10).toString(),
  ).join('')

export function calculateFutureDate(days: number) {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + days)
  return currentDate
}
export function calculatePastDate(days: number) {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() - days)
  return currentDate
}
