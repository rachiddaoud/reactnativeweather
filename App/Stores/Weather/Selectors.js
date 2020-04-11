export const todaysForecast = (state) => {
  if (Object.entries(state.weather.forecast).length <= 0) return null
  // tomorrow's unix time
  let lastTime = state.weather.forecast.list[0].dt + 90000

  return state.weather.forecast.list.filter((value) => value.dt < lastTime)
}
export const weekForecast = (state) => {
  if (Object.entries(state.weather.forecast).length <= 0) return null
  let oneDay = 86400
  let tomorrow = state.weather.forecast.list[0].dt + oneDay
  let days = []
  let keepGoing = true
  while (keepGoing) {
    let newValue = state.weather.forecast.list.find((value) => value.dt >= tomorrow)
    if (newValue) {
      tomorrow += oneDay
      days.push(newValue)
    } else {
      keepGoing = false
    }
  }

  return days
}
