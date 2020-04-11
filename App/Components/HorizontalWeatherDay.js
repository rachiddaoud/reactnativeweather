import React from 'react'
import { View, Image, Text } from 'react-native'
import { Helpers } from 'App/Theme'

const TIME_TEXT = { textAlign: 'center', color: 'white' }
const CONTAINER = { padding: 5 }
const IMAGE = { width: 50, height: 50 }
const HorizontalWeatherDay = (props) => {
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let dayName = days[new Date(props.timestamp * 1000).getDay()]
  return (
    <View style={[Helpers.rowCenter, Helpers.scrollSpaceBetween, CONTAINER]}>
      <Text style={TIME_TEXT}>{dayName}</Text>
      <Image
        style={IMAGE}
        source={{ uri: `https://openweathermap.org/img/wn/${props.icon}@2x.png` }}
      />
      <Text style={TIME_TEXT}>{Math.floor(props.temp)}°</Text>
    </View>
  )
}

export default HorizontalWeatherDay
