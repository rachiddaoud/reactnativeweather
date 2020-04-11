import { put, call, select } from 'redux-saga/effects'
import WeatherActions from 'App/Stores/Weather/Actions'
import { weatherService } from 'App/Services/WeatherService'

export const getCity = (state) => state.weather.city

function* fetchWeather() {
  yield put(WeatherActions.fetchWeatherLoading())
  let city = yield select(getCity)
  const weather = yield call(weatherService.fetchWeather, city)
  if (weather) {
    yield put(WeatherActions.fetchWeatherSuccess(weather))
  } else {
    yield put(
      WeatherActions.fetchWeatherFailure('There was an error while fetching weather informations.')
    )
  }
}

function* fetchForecast() {
  yield put(WeatherActions.fetchForecastLoading())

  let city = yield select(getCity)
  const weather = yield call(weatherService.fetchForecast, city)
  if (weather) {
    yield put(WeatherActions.fetchForecastSuccess(weather))
  } else {
    yield put(
      WeatherActions.fetchForecastFailure('There was an error while fetching forecast informations.')
    )
  }
}

export { fetchWeather, fetchForecast }
