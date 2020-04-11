import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchWeather: null,
  fetchWeatherLoading: null,
  fetchWeatherSuccess: ['weather'],
  fetchWeatherFailure: ['errorMessage'],

  fetchForecast: null,
  fetchForecastLoading: null,
  fetchForecastSuccess: ['forecast'],
  fetchForecastFailure: ['errorMessage'],

  changeCity: ['city'],
  addCity: ['city'],
  removeCity: ['index'],
  updateCity: ['city', 'index'],
})

export const WeatherTypes = Types
export default Creators
