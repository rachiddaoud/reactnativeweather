import axios from 'axios'
import { Config } from 'App/Config'
import { is, curryN, gte } from 'ramda'

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number)
  return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
})
const in200s = isWithin(200, 299)

const apiClient = axios.create({
  baseURL: Config.WEATHER_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

function fetchWeather(city) {
  return apiClient
    .get('/weather', {
      params: {
        q: city,
        appid: '66ba0f0501f47b941c2dc1a483b221e0',
        units: 'metric',
        lang: 'fr',
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response.data
      }
      return null
    })
    .catch(() => {
      return null
    })
}

function fetchForecast(city) {
  return apiClient
    .get('/forecast', {
      params: {
        q: city,
        appid: '66ba0f0501f47b941c2dc1a483b221e0',
        units: 'metric',
        lang: 'fr',
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response.data
      }
      return null
    })
    .catch(() => {
      return null
    })
}

export const weatherService = {
  fetchWeather,
  fetchForecast,
}
