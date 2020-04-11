import { takeLatest, all } from 'redux-saga/effects'
import { UserTypes } from 'App/Stores/User/Actions'
import { WeatherTypes } from 'App/Stores/Weather/Actions'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { login, loginWithGoogle, subscribe } from './UserSaga'
import { fetchWeather, fetchForecast } from './WeatherSaga'
import { startup } from './StartupSaga'

export default function* root() {
  yield all([
    takeLatest(UserTypes.LOGIN, login),
    takeLatest(UserTypes.LOGIN_WITH_GOOGLE, loginWithGoogle),
    takeLatest(UserTypes.SUBSCRIBE, subscribe),
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(WeatherTypes.FETCH_WEATHER, fetchWeather),
    takeLatest(WeatherTypes.FETCH_FORECAST, fetchForecast),
  ])
}
