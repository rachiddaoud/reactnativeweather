import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { WeatherTypes } from './Actions'

export const fetchWeatherLoading = (state) => ({
  ...state,
  weatherIsLoading: true,
  weatherErrorMessage: null,
})

export const fetchWeatherSuccess = (state, { weather }) => ({
  ...state,
  weather: weather,
  weatherIsLoading: false,
  weatherErrorMessage: null,
})

export const fetchWeatherFailure = (state, { errorMessage }) => ({
  ...state,
  weather: {},
  weatherIsLoading: false,
  weatherErrorMessage: errorMessage,
})

export const fetchForecastLoading = (state) => ({
  ...state,
  forecastIsLoading: true,
  forecastErrorMessage: null,
})

export const fetchForecastSuccess = (state, { forecast }) => ({
  ...state,
  forecast: forecast,
  forecastIsLoading: false,
  forecastErrorMessage: null,
})

export const fetchForecastFailure = (state, { errorMessage }) => ({
  ...state,
  forecast: {},
  forecastIsLoading: false,
  forecastErrorMessage: errorMessage,
})

export const changeCity = (state, { city }) => ({
  ...state,
  city: city,
})

export const addCity = (state, { city }) => ({
  ...state,
  cities: [...state.cities, city],
})

export const removeCity = (state, { index }) => ({
  ...state,
  cities: state.cities.filter((item, citiesIndex) => index !== citiesIndex),
})

export const updateCity = (state, { city, index }) => ({
  ...state,
  cities: state.cities.map((item, cityIndex) => {
    if (cityIndex === index) return city
    return item
  }),
})

export const reducer = createReducer(INITIAL_STATE, {
  [WeatherTypes.FETCH_WEATHER_LOADING]: fetchWeatherLoading,
  [WeatherTypes.FETCH_WEATHER_SUCCESS]: fetchWeatherSuccess,
  [WeatherTypes.FETCH_WEATHER_FAILURE]: fetchWeatherFailure,

  [WeatherTypes.FETCH_FORECAST_LOADING]: fetchForecastLoading,
  [WeatherTypes.FETCH_FORECAST_SUCCESS]: fetchForecastSuccess,
  [WeatherTypes.FETCH_FORECAST_FAILURE]: fetchForecastFailure,

  [WeatherTypes.CHANGE_CITY]: changeCity,
  [WeatherTypes.ADD_CITY]: addCity,
  [WeatherTypes.REMOVE_CITY]: removeCity,
  [WeatherTypes.UPDATE_CITY]: updateCity,
})
