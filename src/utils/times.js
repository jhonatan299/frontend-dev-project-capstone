import { fetchAPI, submitAPI } from '../api'

export const parseLocalDate = (dateVal) => {
  if (dateVal instanceof Date) return dateVal
  if (typeof dateVal === 'string') {
    const parts = dateVal.split('-')
    if (parts.length === 3) {
      return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
    }
  }
  return new Date(dateVal)
}

export const getFetchAPI = () => {
  if (typeof window !== 'undefined' && typeof window.fetchAPI === 'function') {
    return window.fetchAPI
  }
  return fetchAPI
}

export const getSubmitAPI = () => {
  if (typeof window !== 'undefined' && typeof window.submitAPI === 'function') {
    return window.submitAPI
  }
  return submitAPI
}

export const initializeTimes = () => {
  const fetchFn = getFetchAPI()
  const today = new Date()
  return fetchFn(today)
}

export const updateTimes = (state, action) => {
  switch (action?.type) {
    case 'UPDATE_TIMES': {
      const fetchFn = getFetchAPI()
      const dateVal = action.payload || action.date || new Date()
      const dateObj = parseLocalDate(dateVal)
      return fetchFn(dateObj)
    }
    default:
      return state || initializeTimes()
  }
}

