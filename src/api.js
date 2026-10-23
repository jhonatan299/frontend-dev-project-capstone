const seededRandom = function (seed) {
  var m = 2 ** 35 - 31
  var a = 185852
  var s = seed % m
  return function () {
    return (s = (s * a) % m) / m
  }
}

export const fetchAPI = function (date) {
  if (typeof window !== 'undefined' && typeof window.fetchAPI === 'function' && window.fetchAPI !== fetchAPI) {
    try {
      const d = date instanceof Date ? date : new Date(date)
      return window.fetchAPI(d)
    } catch {
    }
  }

  const d = date instanceof Date ? date : new Date(date)
  const day = !isNaN(d.getDate()) ? d.getDate() : 1
  let result = []
  let random = seededRandom(day)

  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) {
      result.push(i + ':00')
    }
    if (random() < 0.5) {
      result.push(i + ':30')
    }
  }
  return result
}

export const submitAPI = function (formData) {
  if (typeof window !== 'undefined' && typeof window.submitAPI === 'function' && window.submitAPI !== submitAPI) {
    return window.submitAPI(formData)
  }
  return true
}

if (typeof window !== 'undefined') {
  window.fetchAPI = window.fetchAPI || fetchAPI
  window.submitAPI = window.submitAPI || submitAPI
}

