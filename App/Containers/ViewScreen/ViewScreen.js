/* eslint-disable react/prop-types */
import React from 'react'
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
} from 'react-native'
import { Helpers, Metrics } from 'App/Theme'
import { connect } from 'react-redux'
import WeatherActions from 'App/Stores/Weather/Actions'
import { todaysForecast, weekForecast } from 'App/Stores/Weather/Selectors'
import Colors from 'App/Theme/Colors'
import VerticalWeatherDay from 'App/Components/VerticalWeatherDay'
import HorizontalWeatherDay from 'App/Components/HorizontalWeatherDay'
import PrincipalWeatherDay from 'App/Components/PrincipalWeatherDay'
import { Divider } from 'react-native-elements'

class ViewScreen extends React.Component {
  componentDidMount() {
    this.props.fetchWeather()
    this.props.fetchForecast()
  }

  render() {
    return (
      <SafeAreaView
        style={[{ backgroundColor: Colors.primary }, Helpers.fillCol, Helpers.crossStretch]}
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.props.weatherIsLoading || this.props.forecastIsLoading}
              onRefresh={() => {
                this.props.fetchWeather()
                this.props.fetchForecast()
              }}
              progressBackgroundColor="white"
              tintColor="white"
            />
          }
        >
          <View style={[Metrics.mediumHorizontalMargin, Metrics.mediumBottomMargin]}>
            {this.props.weatherIsLoading || !this.props.weather ? (
              <ActivityIndicator size="small" color="#0000ff" style={{ margin: 50 }} />
            ) : this.props.weatherErrorMessage ? (
              <Text>{this.props.weatherErrorMessage}</Text>
            ) : (
              <PrincipalWeatherDay
                style={{ marginBottom: 10 }}
                city={this.props.city}
                temp={{
                  now: Math.round(this.props.weather.main.temp),
                  min: this.props.weather.main.temp_min,
                  max: this.props.weather.main.temp_max,
                }}
                icon={this.props.weather.weather[0].icon}
                humidity={this.props.weather.main.humidity}
                wind={this.props.weather.wind.speed}
                description={this.props.weather.weather[0].description}
              />
            )}
            {this.props.forecastIsLoading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : this.props.forecastErrorMessage ? (
              <Text>{this.props.forecastErrorMessage}</Text>
            ) : (
              <View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={Metrics.mediumBottomMargin}
                >
                  {this.props.todaysForecast.map((forecastDay, index) => (
                    <VerticalWeatherDay
                      key={index}
                      temp={Math.round(forecastDay.main.temp)}
                      timestamp={forecastDay.dt}
                      icon={forecastDay.weather[0].icon}
                    />
                  ))}
                </ScrollView>
                <ScrollView showsHorizontalScrollIndicator={false}>
                  {this.props.weekForecast.map((forecastDay, index) => (
                    <View key={index}>
                      <HorizontalWeatherDay
                        temp={Math.round(forecastDay.main.temp)}
                        timestamp={forecastDay.dt}
                        icon={forecastDay.weather[0].icon}
                      />
                      {index + 1 < this.props.weekForecast.length ? (
                        <Divider style={{ backgroundColor: 'white' }} />
                      ) : null}
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => ({
  city: state.weather.city,
  weather: state.weather.weather,
  forecast: state.weather.forecast,
  weatherIsLoading: state.weather.weatherIsLoading,
  weatherErrorMessage: state.weather.weatherErrorMessage,
  forecastIsLoading: state.weather.forecastIsLoading,
  forecastErrorMessage: state.weather.forecastErrorMessage,
  todaysForecast: todaysForecast(state),
  weekForecast: weekForecast(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchWeather: () => dispatch(WeatherActions.fetchWeather()),
  fetchForecast: () => dispatch(WeatherActions.fetchForecast()),
  changeCity: (city) => dispatch(WeatherActions.changeCity(city)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewScreen)
