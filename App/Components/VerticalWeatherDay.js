import React from 'react'
import { View, Image, Text } from 'react-native'
import { Helpers } from 'App/Theme'

const TIME_TEXT = { textAlign: 'center', color: 'white' }
const CONTAINER = { width: 50, marginRight: 10 }
const IMAGE = { width: 50, height: 50 }
const VerticalWeatherDay = (props) => {
  return (
    <View style={[Helpers.col, CONTAINER]}>
      <Text style={TIME_TEXT}>{new Date(props.timestamp * 1000).getHours()} h</Text>
      <Image
        style={IMAGE}
        source={{ uri: `https://openweathermap.org/img/wn/${props.icon}@2x.png` }}
      />
      <Text style={TIME_TEXT}>{Math.floor(props.temp)}°</Text>
    </View>
  )
}

export default VerticalWeatherDay
